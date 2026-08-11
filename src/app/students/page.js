"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, Shield, Loader2, GraduationCap } from "lucide-react";

export default function PublicStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = theUrl => fetch(theUrl);
      

     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
       const res = await fetch(`${apiUrl}/api/students`);



        const result = await res.json();
        
        if (result.success) {
          setStudents(result.data);
        } else {
          setError("Failed to load students data.");
        }
      } catch (err) {
        setError("Something went wrong connecting to the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          <span>Loading students directory...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>T@NMOY'S PRIVATE CARE</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Enrolled Students Directory</h1>
            <p className="text-slate-400 text-sm mt-1">Total active students: {students.length}</p>
          </div>
        </div>

        {/* Students Table */}
        {students.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            No students found in the database.
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Student Name</th>
                    <th className="py-4 px-6 font-semibold">Email Address</th>
                    <th className="py-4 px-6 font-semibold">Phone Number</th>
                    <th className="py-4 px-6 font-semibold">Status / Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {students.map((student, index) => (
                    <tr key={student._id || index} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold uppercase">
                          {student.name ? student.name.charAt(0) : "S"}
                        </div>
                        <span>{student.name || "Unnamed Student"}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span>{student.email || "N/A"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <span>{student.phone || "N/A"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          <Shield className="w-3.5 h-3.5" />
                          {student.role || "Student"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}