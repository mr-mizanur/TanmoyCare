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

 

  return (
    <main className="bg-slate-950 min-h-screen flex flex-col justify-between text-white">
      <div className="space-y-8 pb-10">
       
        <Hero />


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