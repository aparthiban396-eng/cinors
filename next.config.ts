import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = "";
let assetPrefix = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "cinors";
  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`;
}

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    basePath,
    assetPrefix,
  }),
};

export default nextConfig;

