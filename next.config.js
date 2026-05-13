/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Ensure PDFKit fonts and AFM files are bundled in serverless deployments (Vercel).
    outputFileTracingIncludes: {
      "/api/submit-assessment": [
        "./lib/assessment/pdf-fonts/**/*",
        "./node_modules/pdfkit/js/data/**/*",
      ],
    },
  },
};

module.exports = nextConfig;
