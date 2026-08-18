/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent clickjacking — no iframes allowed
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer info sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Disable unnecessary browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy
  // unsafe-inline is required for Next.js inline scripts and Tailwind styles;
  // to remove it, implement nonce-based CSP via middleware.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
