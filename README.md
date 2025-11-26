# AI Makeup Rating - Safe Beauty Analyzer

Transform your beauty routine with cutting-edge AI technology. Instantly analyze cosmetic ingredients for safety risks through intelligent text parsing, advanced image recognition, and comprehensive URL scanning. Discover hidden dangers and make informed choices for healthier skin.

## Overview

AI Makeup Rating is a web application that leverages artificial intelligence to analyze cosmetic products and assess their safety based on ingredient composition. The app provides instant risk assessments by categorizing ingredients into high, medium, and low-risk categories, along with an overall safety score and detailed explanations.

The application uses advanced AI models to:
- Extract ingredients from product images using computer vision
- Scrape and analyze product pages from URLs
- Parse and evaluate ingredient lists from text input
- Provide expert-level safety analysis powered by large language models

## Features

### 🔍 Multi-Input Analysis
- **Text Analysis**: Paste ingredient lists directly for instant safety evaluation
- **Image Recognition**: Upload product photos to automatically extract and analyze ingredients using AI-powered OCR
- **URL Scanning**: Provide product page URLs for comprehensive web scraping and analysis

### 🧪 Intelligent Risk Assessment
- **Three-Tier Risk Classification**: High, Medium, and Low risk categories
- **Overall Safety Score**: Excellent, Fair, or Poor ratings
- **Detailed Explanations**: AI-generated insights for each ingredient's safety profile
- **Expert Analysis**: Powered by advanced language models trained on cosmetic safety data

### 🚀 User-Friendly Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Results**: Instant analysis with loading indicators
- **Clear Visual Feedback**: Color-coded risk levels (🔴 High, 🟡 Medium, 🟢 Low)
- **Intuitive Navigation**: Simple input methods with guided user experience

## Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library with modern hooks
- **CSS Modules** - Component-scoped styling

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Next.js API Routes** - Serverless API endpoints

### AI & Machine Learning
- **OpenRouter API** - Multi-model AI platform
- **Grok Models** - xAI's advanced language models for ingredient analysis
- **GPT-4o** - OpenAI's vision model for image text extraction

### Web Scraping & Automation
- **Puppeteer** - Headless browser automation
- **Puppeteer Extra Stealth Plugin** - Anti-detection measures for web scraping

### Utilities
- **Tesseract.js** - OCR fallback for text extraction
- **Dotenv** - Environment variable management

## Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- OpenRouter API key (for AI analysis)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yuqiao1205/AI-safe-beauty
   cd ai-makeup-rating
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Usage & Use Cases

### For Consumers
- **Product Research**: Before purchasing, analyze any cosmetic product's ingredients
- **Brand Comparison**: Compare safety profiles across different brands
- **Allergy Awareness**: Identify potentially irritating ingredients
- **Educational Tool**: Learn about cosmetic chemistry and safety

### For Beauty Professionals
- **Product Recommendations**: Advise clients on safer alternatives
- **Inventory Assessment**: Evaluate product lines for safety compliance
- **Formulation Review**: Analyze custom formulations

### For Researchers & Educators
- **Safety Studies**: Quick analysis of ingredient combinations
- **Teaching Aid**: Demonstrate cosmetic safety concepts
- **Data Collection**: Gather insights on ingredient prevalence

### Example Workflows

1. **Quick Ingredient Check**
   - Paste an ingredient list from a product label
   - Receive instant safety analysis

2. **Online Product Review**
   - Enter a product URL from Sephora, Ulta, or brand websites
   - Automatic scraping and analysis

3. **Photo-Based Analysis**
   - Take a photo of product packaging
   - Upload for AI-powered text extraction and evaluation

## API Keys & Configuration

The application requires an OpenRouter API key for AI functionality. Sign up at [OpenRouter.ai](https://openrouter.ai) and obtain your API key. The key should be stored in your `.env.local` file as `OPENROUTER_API_KEY`.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

© 2025 Yan Peng. All rights reserved.

## Disclaimer

This application provides AI-powered analysis for educational and informational purposes only. It is not a substitute for professional medical advice, allergy testing, or dermatological consultation. Always consult with healthcare professionals for personal health decisions.
