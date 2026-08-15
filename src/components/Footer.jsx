import Link from "next/link";
import { MapPin, Phone, Mail, Heart, Sparkles } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#07090e] text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          <div className="space-y-4">
              <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div>
                <img src="/logo.PNG" alt="Logo" className="w-10 h-10 rounded-full object-cover border border-slate-800" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-100 tracking-tight">T@NMOY'S</span>
                <span className="block text-[10px] text-violet-400 font-semibold tracking-[0.2em]">PRIVATE CARE</span>
              </div>
            </Link>
          </div>
            <p className="text-sm leading-relaxed text-slate-400 font-normal">
              Empowering students with quality education, regular assessments, and expert mentorship to achieve academic excellence and a bright future.
            </p>
            <div className="pt-1">
              <span className="text-xs font-medium text-slate-500 italic">"আজকের পরিশ্রম, আগামীর সফলতা"</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-slate-100 text-xs font-bold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link className="hover:text-violet-400 transition-colors" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-violet-400 transition-colors" href="/students">Enrolled Students</Link>
              </li>
              <li>
                <Link className="hover:text-violet-400 transition-colors" href="/notices">Notice Board</Link>
              </li>
              <li>
                <Link className="hover:text-violet-400 transition-colors" href="/sign-up">Student Registration</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-slate-100 text-xs font-bold uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0 mt-1" />
                <span>Alimullah Madrasha Road, Chunarughat, Habigonj.</span>
              </li>
              <li>
                <a href="tel:01304700791" className="flex items-center gap-3 hover:text-violet-400 transition-colors">
                  <Phone className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <span>01304-700791</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span>tanmoysprivatecare@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-slate-100 text-xs font-bold uppercase tracking-wider">Stay Connected</h3>
            <p className="text-sm text-slate-400">
              Follow our official Facebook page for daily updates, routine changes, and notices.
            </p>
            <div className="pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61578380676033" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-sm transition-all"
              >
                <FaFacebook className="w-4 h-4 text-violet-400" />
                <span>Follow on Facebook</span>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} T@nmoy's Private Care. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by{" "}
            <a 
              href="https://mizanurdev.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-slate-300 hover:text-slate-100 transition-colors"
            >
              Mizanur Rahman
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}