/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server output for cPanel/shared hosting (Node.js Selector /
  // Passenger) — produces .next/standalone/server.js with only the runtime
  // deps it actually needs, instead of requiring the full node_modules
  // (incl. devDependencies) to be installed on the host. See README's
  // "Deploy to cPanel" section for the full steps.
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Shared hosting (cPanel/CloudLinux LVE) caps how many OS processes an
  // account may spawn at once. Next's build normally forks multiple child
  // processes for its static-generation worker pool, which can fail there
  // with "spawn ... EAGAIN". Capping to a single worker avoids forking more
  // than one extra process during the build.
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
