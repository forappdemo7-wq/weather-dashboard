import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Global Weather Hub',
  description: 'Premium real-time weather and air quality tracking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen overflow-x-hidden bg-black`}>
        
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=3540')" 
          }}
        />

        {/* Dark Immersive Overlay */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-brightness-75" />

        {/* Main Content Container */}
        <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-7xl animate-fade-in-up">
          {children}
        </main>

        {/* Optional: Subtle Footer */}
        <footer className="relative z-10 text-center py-8 text-white/40 text-sm">
          © 2026 Global Weather Hub • Data provided by OpenWeather
        </footer>
      </body>
    </html>
  );
}