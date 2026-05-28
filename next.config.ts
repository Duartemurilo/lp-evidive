import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cursos/primeira-experiencia-de-mergulho",
        destination: "/cursos/emotion-dive",
        permanent: true,
      },
      {
        source: "/cursos/divemaster",
        destination: "/cursos/padi-divemaster",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/admin/login",
        permanent: false,
      },
      {
        source: "/sign-up/:path*",
        destination: "/admin/login",
        permanent: false,
      },
    ];
  },
  // Disable source maps in production to prevent easy code inspection
  productionBrowserSourceMaps: false,
  // Additional optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
