"use client";

import { useState, useEffect } from "react";
import { Bell, Calendar, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/notices`);
        const data = await res.json();

        if (data.success) {
          setNotices(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch notices", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
        <span className="text-xs">Loading notices...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-violet-400" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
         
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-violet-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-100">All Notices & Announcements</h1>
                <p className="text-[11px] text-slate-400">Stay updated with the latest instructions and schedules.</p>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-violet-400 font-semibold shadow-inner">
              Total: {notices.length}
            </span>
          </div>

          {notices.length === 0 ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs backdrop-blur-sm">
              No notices published yet.
            </div>
          ) : (
            <div className="space-y-3.5">
              {notices.map((notice, index) => (
                <div 
                  key={notice._id || index}
                  className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl hover:border-violet-500/40 transition-all space-y-2.5 backdrop-blur-sm group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.5)]"></span>
                      {notice.title}
                    </h2>
                    
                    {notice.createdAt && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 flex-shrink-0 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                        <Calendar className="w-3 h-3 text-violet-400" />
                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap pl-3.5 border-l-2 border-violet-500/50">
                    {notice.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}