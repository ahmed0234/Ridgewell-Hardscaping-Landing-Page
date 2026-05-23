import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  Poppins,
  Outfit,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/Nav.png",
  },
  title: "Ridgewell Hardscaping",
  description:
    "Premium hardscaping solutions for your home. From patios and walkways to retaining walls and outdoor living spaces, we create beautiful, durable landscapes that enhance your property.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable}  ${poppins.variable}  ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
