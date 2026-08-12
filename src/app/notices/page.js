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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-zinc-300" />
        <span className="text-xs">Loading notices...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Back to Home Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-zinc-100">All Notices & Announcements</h1>
                <p className="text-[11px] text-zinc-400">Stay updated with the latest instructions and schedules.</p>
              </div>
            </div>

            <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 font-medium">
              Total: {notices.length}
            </span>
          </div>

          {/* Notices List */}
          {notices.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400 text-xs">
              No notices published yet.
            </div>
          ) : (
            <div className="space-y-3">
              {notices.map((notice, index) => (
                <div 
                  key={notice._id || index}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-lg hover:border-zinc-700 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-zinc-400 flex-shrink-0"></span>
                      {notice.title}
                    </h2>
                    
                    {notice.createdAt && (
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 flex-shrink-0 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-zinc-700">
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