import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center space-y-4">
        
       
        <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-inner">
          <Loader2 className="w-6 h-6 text-zinc-100 animate-spin" />
        </div>

       
        <div className="text-center space-y-1">
          <h2 className="text-sm font-semibold text-zinc-100 tracking-wide">Loading...</h2>
          <p className="text-xs text-zinc-400">T@nmoy's Private Care</p>
        </div>

      </div>
    </div>
  );
}