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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
        <span className="text-xs">Loading notices...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
         
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xl shadow-slate-200/50 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900">All Notices & Announcements</h1>
                <p className="text-[11px] text-slate-500">Stay updated with the latest instructions and schedules.</p>
              </div>
            </div>

            <span className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-indigo-600 font-semibold shadow-inner">
              Total: {notices.length}
            </span>
          </div>

          {notices.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 text-xs shadow-sm">
              No notices published yet.
            </div>
          ) : (
            <div className="space-y-3.5">
              {notices.map((notice, index) => (
                <div 
                  key={notice._id || index}
                  className="bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/40 hover:border-indigo-300 hover:shadow-indigo-100/50 transition-all space-y-2.5 backdrop-blur-sm group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0 shadow-sm"></span>
                      {notice.title}
                    </h2>
                    
                    {notice.createdAt && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 flex-shrink-0 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                        <Calendar className="w-3 h-3 text-indigo-600" />
                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap pl-3.5 border-l-2 border-indigo-500/50">
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