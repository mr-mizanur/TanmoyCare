"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";


import Hero from "@/components/Hero";
import StudentList from "@/components/StudentList";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: session, isPending } = useSession();
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setLoadingResults(true);
      async function fetchResults() {
        try {
          const res = await fetch(`http://localhost:5000/api/results/${session.user.email}`);
          const data = await res.json();
          if (data.success) {
            setResults(data.data);
          }
        } catch (err) {
          console.error("Failed to load results", err);
        } finally {
          setLoadingResults(false);
        }
      }
      fetchResults();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
      </div>
    );
  }

  const student = session?.user;

  return (
    <main className="bg-slate-950 min-h-screen flex flex-col justify-between text-white">
      <div className="space-y-8 pb-10">
        {/* হিরো সেকশন */}
        <Hero />


        {/* সকল স্টুডেন্টের ছোট কার্ডের তালিকা */}
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="border-t border-slate-800/80 pt-6 text-center">
            <h2 className="text-lg font-bold tracking-tight text-white">
              All Enrolled Students
            </h2>
          </div>
          <StudentList />
        </div>
      </div>
    </main>
  );
}