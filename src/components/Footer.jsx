"use client";

import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Heart } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/60">
          
        
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium tracking-wide">
              <span>T@NMOY'S PRIVATE CARE</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Empowering students with quality education, regular assessments, and expert mentorship to achieve academic excellence and a bright future.
            </p>
            <div className="pt-1">
              <span className="text-xs font-medium text-zinc-500 italic">"আজকের পরিশ্রম, আগামীর সফলতা"</span>
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-zinc-100 text-sm font-bold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-zinc-200 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/students" className="hover:text-zinc-200 transition-colors">Enrolled Students</Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-zinc-200 transition-colors">Notice Board</Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-zinc-200 transition-colors">Student Registration</Link>
              </li>
            </ul>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-zinc-100 text-sm font-bold uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-1" />
                <span>Alimullah Madrasha Road, Chunarughat, Habigonj.</span>
              </li>
              <li>
                <a href="tel:01304700791" className="flex items-center gap-3 hover:text-zinc-200 transition-colors">
                  <Phone className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span>01304-700791</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>tanmoysprivatecare@gmail.com</span>
              </li>
            </ul>
          </div>

       
          <div className="space-y-4">
            <h3 className="text-zinc-100 text-sm font-bold uppercase tracking-wider">Stay Connected</h3>
            <p className="text-sm text-zinc-400">
              Follow our official Facebook page for daily updates, routine changes, and notices.
            </p>
            <div className="pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61578380676033" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-sm transition-all"
              >
                <FaFacebook className="w-4 h-4" />
                <span>Follow on Facebook</span>
              </a>
            </div>
          </div>

        </div>

       
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} T@nmoy's Private Care. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by{" "}
            <a 
              href="https://mizanurdev.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              Mizanur Rahman
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}