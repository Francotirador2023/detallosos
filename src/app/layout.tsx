import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSheet from '@/components/CartSheet';
import { Toaster } from 'sonner';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://detallosos.vercel.app'),
  title: "DetallOsos | Regalos y Arreglos Florales en Lima",
  description: "Sorprende con los mejores arreglos florales y regalos personalizados en Lima. Envío express y calidad garantizada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <Navbar />
        <CartSheet />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
