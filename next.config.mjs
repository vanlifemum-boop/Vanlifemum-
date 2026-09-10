/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Statischer Export für GitHub Pages (vanlifemum.de)
  output: "export",
  // erzeugt ziele/index.html statt ziele.html — so liefert Pages saubere URLs
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
