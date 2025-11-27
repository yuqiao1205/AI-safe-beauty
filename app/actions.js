'use server'

const { OpenAI } = require('openai');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

// Extract ingredients using OpenRouter
async function extractIngredientsWithLLM(text) {
  const prompt = `You are a cosmetic ingredient expert. Extract and return only the ingredients as a comma-separated list.

Extract only cosmetic ingredients from this text.
Return a single comma-separated list, no explanations.
Text:
${text}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "x-ai/grok-4.1-fast:free",
      messages: [
        {
          role: "system",
          content: "You are a cosmetic ingredient expert. Extract and return only the ingredients as a comma-separated list."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error in OpenRouter ingredient extraction:', error);
    return '';
  }
}

// Analyze product ingredients
async function analyzeProduct(rawText) {
  const ingredients = rawText.split(/[,;\n]/).map(x => x.trim()).filter(Boolean);

  if (!ingredients.length) {
    return {
      overall_score: "Unknown",
      high_risk: [],
      medium_risk: [],
      low_risk: [],
      explanation: "No ingredients detected."
    };
  }

  const prompt = `You are a cosmetic safety expert. Analyze ingredients and return a JSON response with risk assessments.

First, check if the input contains actual cosmetic ingredient names. If the input does not contain recognizable cosmetic ingredients (like water, glycerin, etc.) or contains questions/unrelated text, do not analyze and return:

{
  "message": "Please provide cosmetic ingredient names, then I can give you a safety analysis.",
  "overall_score": "",
  "high_risk": [],
  "medium_risk": [],
  "low_risk": [],
  "explanation": ""
}

If the input contains cosmetic ingredients, proceed with analysis:

For each ingredient below, write a JSON object with:
- name: the ingredient name
- summary: 1-2 sentence explanation of its effect or safety concern
Classify ingredients into high, medium, or low risk.

Then provide overall_score (Excellent, Fair, Poor) and a short explanation.

Return output as valid JSON like this:

{
  "overall_score": "Fair",
  "high_risk": [
    {"name": "Titanium Dioxide (CI 77891)", "summary": "Titanium Dioxide may be harmful when inhaled as powder; safe in creams."}
  ],
  "medium_risk": [
    {"name": "Propanediol", "summary": "Acts as a humectant and solvent, retains moisture."}
  ],
  "low_risk": [
    {"name": "Water", "summary": "Solvent that dissolves other ingredients."}
  ],
  "explanation": "Most ingredients are low risk, only Titanium Dioxide requires caution when inhaled."
}

Ingredients:
${ingredients.join(', ')}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "x-ai/grok-4.1-fast:free",
      messages: [
        {
          role: "system",
          content: "You are a cosmetic safety expert. Analyze ingredients and return a JSON response with risk assessments."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    const text = response.choices[0].message.content.trim();

    // Remove markdown code blocks if present
    let jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let data = JSON.parse(jsonText);

    return data || {
      overall_score: "Unknown",
      high_risk: [],
      medium_risk: [],
      low_risk: [],
      explanation: text
    };
  } catch (error) {
    console.error('Error in analyzeProduct:', error);
    return {
      overall_score: "Error",
      high_risk: [],
      medium_risk: [],
      low_risk: [],
      explanation: error.message
    };
  }
}

export async function analyzeText(text) {
  try {
    const result = await analyzeProduct(text);
    return result;
  } catch (error) {
    return { error: error.message };
  }
}

export async function analyzeUrl(url) {
  let browser = null;
  try {
    if (!url) {
      return { error: 'URL is required' };
    }

    console.log('Analyzing URL:', url);

    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-setuid-sandbox'
      ]
    });

    console.log('Browser launched');

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setDefaultTimeout(30000);

    console.log('Navigating to URL...');
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('Waiting for content to load...');
    // Wait for any dynamic content to load using Promise
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('Searching for ingredients...');
    // Scroll through the page to trigger lazy loading
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Wait a bit after scrolling
    await new Promise(resolve => setTimeout(resolve, 2000));
    const ingredientText = await page.evaluate(() => {
      // Try different selectors and keywords
      const keywords = ['ingredients', 'composition', 'ingredient list', 'what\'s in it'];
      const sections = Array.from(document.querySelectorAll('div, p, span, li, section, article'))
        .filter(el => {
          const text = el.textContent.toLowerCase();
          return keywords.some(keyword => text.includes(keyword));
        })
        .map(el => ({
          element: el,
          text: el.textContent.trim()
        }))
        .filter(({ text }) => text.split(',').length > 5);

      // Sort by text length to get the most detailed ingredient list
      sections.sort((a, b) => b.text.length - a.text.length);

      return sections.length > 0 ? sections[0].text : null;
    });

    if (!ingredientText) {
      console.log('No ingredients found');
      return { error: 'No ingredient list found on the page' };
    }

    console.log('Found ingredients, extracting...');
    const ingredients = await extractIngredientsWithLLM(ingredientText);

    if (!ingredients) {
      return { error: 'Failed to extract ingredients from text' };
    }

    console.log('Analyzing ingredients...');
    const result = await analyzeProduct(ingredients);
    return result;
  } catch (error) {
    console.error('Error in analyze-url:', error);
    return {
      error: error.message,
      details: error.stack
    };
  } finally {
    if (browser) {
      try {
        await browser.close();
        console.log('Browser closed');
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
  }
}

export async function analyzeImage(formData) {
  try {
    const file = formData.get('image');
    if (!file) {
      return { error: 'No image uploaded' };
    }

    console.log('Processing image:', file.name, file.type);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Buffer created, size:', buffer.length);

    // Use OpenRouter Vision to extract text from image
    console.log('Using OpenRouter Vision to extract text from image...');

    // Convert buffer to base64
    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';

    const prompt = "Extract all text from this image. Focus on ingredient lists if present. Return only the extracted text, no explanations.";

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      temperature: 0.3
    });

    const text = response.choices[0].message.content.trim();
    
    console.log('Text extracted from image:', text.substring(0, 200));

    if (!text || text.trim().length === 0) {
      return { error: 'No text detected in the image. Please ensure the image contains readable text.' };
    }

    console.log('Extracting ingredients with LLM...');
    const ingredients = await extractIngredientsWithLLM(text);

    if (!ingredients || ingredients.trim().length === 0) {
      return { error: 'No ingredients found in the extracted text. Please ensure the image contains an ingredient list.' };
    }

    console.log('Analyzing ingredients:', ingredients.substring(0, 100));
    const analysisResult = await analyzeProduct(ingredients);
    return analysisResult;
  } catch (error) {
    console.error('Error in analyzeImage:', error);
    return { 
      error: error.message,
      details: error.stack 
    };
  }
}
