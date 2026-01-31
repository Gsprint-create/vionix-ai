import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vionix AI",
  description: "Create. Morph. Transform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070B14] text-white">
        {/* Subtle grid + glow */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-[0.22]" />
          <div className="absolute inset-0 bg-radial" />
        </div>

        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
