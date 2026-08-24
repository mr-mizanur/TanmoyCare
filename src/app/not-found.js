"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center space-y-6 backdrop-blur-sm">
        
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-inner text-indigo-600">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">404</h1>
          <h2 className="text-base font-semibold text-slate-800">Page Not Found</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button 
            onClick={() => router.back()}
            className="w-full sm:flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>Go Back</span>
          </button>

          <Link 
            href="/" 
            className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 text-xs"
          >
            <Home className="w-4 h-4" />
            <span>Home Page</span>
          </Link>
        </div>

        <p className="text-[11px] text-slate-400 pt-2">
          T@nmoy's Private Care
        </p>

      </div>
    </div>
  );
}