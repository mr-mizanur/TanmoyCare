"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8 text-center space-y-6">
        
        
        <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-inner">
          <FileQuestion className="w-8 h-8 text-zinc-400" />
        </div>

      
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">404</h1>
          <h2 className="text-base font-semibold text-zinc-200">Page Not Found</h2>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

       
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button 
            onClick={() => router.back()}
            className="w-full sm:flex-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link 
            href="/" 
            className="w-full sm:flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-xs"
          >
            <Home className="w-4 h-4" />
            <span>Home Page</span>
          </Link>
        </div>

        
        <p className="text-[11px] text-zinc-500 pt-2">
          T@nmoy's Private Care
        </p>

      </div>
    </div>
  );
}