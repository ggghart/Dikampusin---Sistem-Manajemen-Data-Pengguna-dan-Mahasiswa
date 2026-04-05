import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Mail } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiKampusin - Sistem Manajemen Mahasiswa",
  description: "Dibuat dengan Next.js dan Supabase",
  openGraph: {
    title: "DiKampusin - Sistem Manajemen Mahasiswa",
    description: "Platform sistem informasi manajemen mahasiswa terpadu yang cepat, aman, dan mantap betul.",
    siteName: "DiKampusin",
    images: [
      {
        url: "/og-dikampusin.png",
        width: 1200,
        height: 630,
        alt: "DiKampusin Open Graph Image",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiKampusin - Sistem Manajemen Mahasiswa",
    description: "Platform sistem informasi manajemen mahasiswa terpadu yang cepat, aman, dan mantap betul.",
    images: ["/og-dikampusin.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="w-full py-6 mt-auto border-t border-[var(--color-glass-border)] bg-black/5 dark:bg-white/5 backdrop-blur-md">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500/80 gap-4">
            <p>&copy; 2026 DiKampusin. All rights reserved.</p>
            <a 
              href="mailto:tegarhartoto12@gmail.com" 
              className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">Contact Us</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
