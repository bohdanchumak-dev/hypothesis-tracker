/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Turbopack ignores lockfiles above this repo.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
