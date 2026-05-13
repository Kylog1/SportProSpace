/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep pdfkit as a real Node module at runtime; bundling breaks its
    // internal AFM/font data file lookups.
    serverComponentsExternalPackages: ["pdfkit"],
    // Ensure PDFKit fonts and AFM/data files are bundled into the serverless
    // function on Vercel.
    outputFileTracingIncludes: {
      "/api/submit-assessment": [
        "./lib/assessment/pdf-fonts/**/*",
        "./node_modules/pdfkit/js/data/**/*",
      ],
    },
  },
};

module.exports = nextConfig;
