import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

import WhatsAppButton from "@/components/WhatsAppButton";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DetallOsos - Boutique Floral & Regalos Premium",
  description: "Arreglos florales exclusivos y regalos inolvidables.",
  icons: {
    icon: "/logo-new.png",
    apple: "/logo-new.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(outfit.className, "bg-gray-50")} suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <CartSheet />
        <WhatsAppButton />
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
