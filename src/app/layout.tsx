import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { PerformanceMonitor } from '@/components/performance-monitor';

export const metadata: Metadata = {
  title: 'Dreamline Consultancy',
  description: 'Your trusted partner in educational consulting, visa applications, and travel coordination.',
  keywords: 'education consultancy, visa application, study abroad, travel coordination',
  authors: [{ name: 'Dreamline Consultancy' }],
  openGraph: {
    title: 'Dreamline Consultancy',
    description: 'Your trusted partner in educational consulting, visa applications, and travel coordination.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://placehold.co" />
        
        {/* Optimized font loading with font-display: swap */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
