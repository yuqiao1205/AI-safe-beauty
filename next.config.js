/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // For puppeteer deployment on Vercel
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'puppeteer-extra': 'puppeteer-extra',
        'puppeteer-extra-plugin-stealth': 'puppeteer-extra-plugin-stealth'
      });
      
      // Exclude tesseract.js from being bundled as external
      // This ensures worker scripts are properly included
      config.externals = config.externals.filter(
        (external) => typeof external !== 'string' || !external.includes('tesseract')
      );
    }
    
    // Configure Tesseract.js worker files
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    return config;
  },
}

export default nextConfig
