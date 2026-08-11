"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left column: Overview & Highlights */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold tracking-wide">
              <GraduationCap className="w-4 h-4" />
              <span>T@NMOY'S PRIVATE CARE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Today's Hard Work, <br />
              <span className="bg-gradient-to-r from-indigo-400 via-blue-300 to-indigo-500 bg-clip-text text-transparent">
                Tomorrow's Success
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Empowering students across Science, Arts, and Commerce streams with quality education, regular assessments, and expert guidance to build a brilliant future.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Experienced & Dedicated Teachers</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Regular Classes & Weekly Exams</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Special Care for Weak Students</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Detailed Solutions of Every Exam</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/sign-up" 
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 text-sm"
              >
                Join Your Batch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/notices" 
                className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium transition-all text-sm"
              >
                View Notices
              </Link>
            </div>

          </div>

          {/* Right column: Director's Professional Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative group hover:border-indigo-500/50 transition-all">
              
              {/* Director Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold tracking-widest px-6 py-1.5 rounded-full shadow-md uppercase">
                Director
              </div>

              {/* Director Image */}
              <div className="mt-4 flex flex-col items-center text-center space-y-4">
                <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-xl bg-slate-950">
                  <img 
                    src="/muntasir_ahmed_tanmoy.jpg" 
                    alt="Muntasir Ahmed Tanmoy" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Muntasir Ahmed Tanmoy</h3>
                  <p className="text-xs font-medium text-indigo-400">B.Sc (Hon's) in Mathematics</p>
                  <p className="text-xs text-slate-400">Gopalganj Science & Technology University</p>
                </div>

                {/* Signature text */}
                <div className="pt-2">
                  <span className="font-serif italic text-lg text-indigo-300/80 tracking-wider">Tanmoy</span>
                </div>

                {/* Card footer title */}
                <div className="w-full pt-3 border-t border-slate-800 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Director, T@NMOY'S Private Care
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Info Bar: Address, Clickable Phone, and Clickable Facebook */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Address</p>
              <p className="text-sm font-medium text-slate-200">Alimullah Madrasha Road, Chunarughat, Habigonj.</p>
            </div>
          </div>

          {/* Clickable Phone Number */}
          <a href="tel:01304700791" className="flex items-center justify-center md:justify-start gap-3.5 group cursor-pointer">
            <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl group-hover:bg-indigo-600/20 transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Contact</p>
              <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">01304-700791</p>
            </div>
          </a>

          {/* Clickable Facebook Link */}
          <a 
            href="https://www.facebook.com/profile.php?id=61578380676033" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center md:justify-start gap-3.5 group cursor-pointer"
          >
            <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl group-hover:bg-indigo-600/20 transition-all">
              <FaFacebook className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Follow Us</p>
              <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">T@NMOY'S Private Care</p>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}