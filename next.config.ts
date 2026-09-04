import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server output for cPanel/shared hosting (Node.js Selector /
  // Passenger) — produces .next/standalone/server.js with only the runtime
  // deps it actually needs, instead of requiring the full node_modules
  // (incl. devDependencies) to be installed on the host. See README's
  // "Deploy to cPanel" section for the full steps.
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
