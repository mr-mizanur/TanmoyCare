import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  
  title: {
    default: "Tanmoy Care - Enrolled Students & Learning Portal",
    template: "%s | Tanmoy Care",
  },
  description:
    "Tanmoy Care is a modern student learning portal. Explore enrolled students, check academic results, track progress, and manage your complete learning journey in one place.",
  keywords: [
    "Tanmoy Care",
    "Student Portal",
    "Enrolled Students",
    "Online Learning",
    "Education Platform",
    "Academic Results",
    "Student Management",
    "Learning Management System",
    "LMS",
    "Online Education Bangladesh",
  ],
  authors: [{ name: "Tanmoy Care", url: "https://tanmoycare.vercel.app" }],
  creator: "Tanmoy Care",
  publisher: "Tanmoy Care",
  applicationName: "Tanmoy Care",
  category: "Education",

  metadataBase: new URL("https://tanmoycare.vercel.app"),
  alternates: {
    canonical: "/",
  },


  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanmoycare.vercel.app/",
    siteName: "Tanmoy Care",
    title: "Tanmoy Care - Enrolled Students & Learning Portal",
    description:
      "Explore enrolled students, check academic results, and manage your learning journey efficiently with Tanmoy Care.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tanmoy Care - Student Learning Portal",
        type: "image/jpeg",
      },
    ],
  },

  
  twitter: {
    card: "summary_large_image",
    title: "Tanmoy Care - Enrolled Students & Learning Portal",
    description:
      "Explore enrolled students, check academic results, and manage your learning journey efficiently with Tanmoy Care.",
    images: ["/og-image.jpg"],
    creator: "@tanmoycare", 
  },

  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest", 

  
  other: {
    "theme-color": "#020617", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-950 text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}