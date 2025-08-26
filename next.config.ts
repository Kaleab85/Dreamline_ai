import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enable static export for shared hosting
  trailingSlash: true, // Add trailing slashes for better compatibility
  skipTrailingSlashRedirect: true,
  // Disable dev indicator in production
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable experimental features for better performance
  // experimental: {
  //   optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  // },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'perf_hooks': false,
      };
    }
    return config;
  }
};

export default nextConfig;
