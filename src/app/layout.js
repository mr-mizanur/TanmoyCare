import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "T@nmoy's Private Care",
  description: "Private Care Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}>
        {/* Navbar কম্পোনেন্টটি অবশ্যই body ট্যাগের ভেতরে থাকতে হবে */}
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}