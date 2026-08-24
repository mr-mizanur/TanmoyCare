import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 p-8 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm">
        
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-inner">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-sm font-semibold text-slate-900 tracking-wide">Loading...</h2>
          <p className="text-xs text-slate-500">T@nmoy's Private Care</p>
        </div>

      </div>
    </div>
  );
}