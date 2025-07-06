/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la"
    ],
  },
};

module.exports = nextConfig;
