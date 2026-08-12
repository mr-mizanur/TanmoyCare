"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden py-16 lg:py-24 border-b border-zinc-800">
      
     
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-900/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
      
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium tracking-wide">
              <span>T@NMOY'S PRIVATE CARE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-zinc-100">
              Today's Hard Work, <br />
              <span className="text-zinc-400">
                Tomorrow's Success
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Empowering students across Science, Arts, and Commerce streams with quality education, regular assessments, and expert guidance to build a brilliant future.
            </p>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Experienced & Dedicated Teachers</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Regular Classes & Weekly Exams</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Special Care for Weak Students</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Detailed Solutions of Every Exam</span>
              </div>
            </div>

            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/sign-up" 
                className="px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                Join Your Batch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/notices" 
                className="px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-medium transition-all text-sm"
              >
                View Notices
              </Link>
            </div>

          </div>

      
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative group hover:border-zinc-700 transition-all">
              
             
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-100 text-zinc-900 text-xs font-bold tracking-widest px-6 py-1.5 rounded-full shadow-md uppercase">
                Director
              </div>

              
              <div className="mt-4 flex flex-col items-center text-center space-y-4">
                <div className="w-44 h-44 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl bg-zinc-950">
                  <img 
                    src="/muntasir_ahmed_tanmoy.jpg" 
                    alt="Muntasir Ahmed Tanmoy" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-zinc-100">Muntasir Ahmed Tanmoy</h3>
                  <p className="text-xs font-medium text-zinc-400">B.Sc (Hon's) in Mathematics</p>
                  <p className="text-xs text-zinc-500">Gopalganj Science & Technology University</p>
                </div>

                <div className="pt-2">
                  <span className="font-serif italic text-lg text-zinc-400 tracking-wider">Tanmoy</span>
                </div>

                <div className="w-full pt-3 border-t border-zinc-800 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                    Director, T@NMOY'S Private Care
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

       
        <div className="mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-semibold">Address</p>
              <p className="text-sm font-medium text-zinc-300">Alimullah Madrasha Road, Chunarughat, Habigonj.</p>
            </div>
          </div>

          <a href="tel:01304700791" className="flex items-center justify-center md:justify-start gap-3.5 group cursor-pointer">
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl group-hover:border-zinc-700 transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-semibold">Contact</p>
              <p className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">01304-700791</p>
            </div>
          </a>

          <a 
            href="https://www.facebook.com/profile.php?id=61578380676033" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center md:justify-start gap-3.5 group cursor-pointer"
          >
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl group-hover:border-zinc-700 transition-all">
              <FaFacebook className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-semibold">Follow Us</p>
              <p className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">T@NMOY'S Private Care</p>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}