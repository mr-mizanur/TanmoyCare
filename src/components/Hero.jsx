"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, MapPin, Sparkles } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-[#07090e] text-slate-100 overflow-hidden py-16 lg:py-24">
     
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

         
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
          

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-100">
              Today's Hard Work, <br />
              <span className="font-serif italic font-normal text-violet-400">
                Tomorrow's Success.
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Empowering students across Science, Arts, and Commerce streams with structured guidance, regular testing, and personal attention to build a rock-solid academic foundation.
            </p>

          
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="font-medium">Experienced Teachers</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="font-medium">Weekly Exams & Solutions</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="font-medium">Special Care for Weak Students</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="font-medium">Complete Stream Support</span>
              </div>
            </div>

           
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/sign-up" 
                className="px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/20 transition-all flex items-center gap-2 text-sm"
              >
                Join Your Batch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/notices" 
                className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium transition-all text-sm"
              >
                View Notice Board
              </Link>
            </div>

          </div>

        
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm group">
              
             
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                <img 
                  src="/muntasir_ahmed_tanmoy.jpg" 
                  alt="Muntasir Ahmed Tanmoy" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
              
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800">
                  <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">Director</span>
                </div>
              </div>

             
              <div className="mt-4 text-center space-y-1 px-1">
                <h3 className="text-lg font-bold tracking-tight text-slate-100">Muntasir Ahmed Tanmoy</h3>
                <p className="text-xs font-medium text-violet-400">B.Sc (Hon's) in Mathematics</p>
                <p className="text-[11px] text-slate-400">Gopalganj Science & Technology University</p>
              </div>

            </div>
          </div>

        </div>

     
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-900">

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 bg-slate-900 border border-slate-800 text-violet-400 rounded-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Location</p>
              <p className="text-xs font-medium text-slate-300">Alimullah Madrasha Road, Chunarughat, Habigonj.</p>
            </div>
          </div>

          <a href="tel:01304700791" className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 group hover:border-violet-500/40 transition-all cursor-pointer">
            <div className="p-2.5 bg-slate-900 border border-slate-800 text-violet-400 rounded-lg">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Phone Inquiry</p>
              <p className="text-xs font-medium text-slate-300 group-hover:text-violet-400 transition-colors">01304-700791</p>
            </div>
          </a>

          <a href="https://www.facebook.com/profile.php?id=61578380676033" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 group hover:border-violet-500/40 transition-all cursor-pointer">
            <div className="p-2.5 bg-slate-900 border border-slate-800 text-violet-400 rounded-lg">
              <FaFacebook className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Official Facebook</p>
              <p className="text-xs font-medium text-slate-300 group-hover:text-violet-400 transition-colors">T@nmoy's Private Care</p>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}