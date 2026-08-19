"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Award, FileText, Loader2, Search } from "lucide-react";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [allResults, setAllResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all"); 

  useEffect(() => {
    async function fetchData() {
      try {
       const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
       const studentRes = await fetch(`${apiUrl}/api/students`);
       const studentData = await studentRes.json();

        if (studentData.success) {
          const studentList = studentData.data;

          const onlyStudents = studentList.filter((s) => {
            const role = s.role ? s.role.toLowerCase() : "student";
            return role === "student" && s.studentRoll;
          });

          setStudents(onlyStudents);

          const resultsMap = {};
          for (const student of onlyStudents) {
            const roll = student.studentRoll ? String(student.studentRoll).trim() : "";
            if (roll) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/results/roll/${roll}`);
              const resData = await res.json();
              if (resData.success) {
                resultsMap[roll] = resData.data;
              }
            }
          }
          setAllResults(resultsMap);
        }
      } catch (err) {
        console.error("Failed to load students and results", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredStudents = students.filter((student) => {
    if (selectedClass !== "all") {
      const studentClass = student.studentClass ? String(student.studentClass).trim() : "11";
      if (studentClass !== selectedClass) return false;
    }

    const query = searchQuery.toLowerCase();
    const name = student.name ? student.name.toLowerCase() : "";
    const roll = student.studentRoll ? String(student.studentRoll).toLowerCase() : "";
    const college = student.collegeName ? student.collegeName.toLowerCase() : "";

    return name.includes(query) || roll.includes(query) || college.includes(query);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
        <span className="text-xs">Loading...</span>
      </div>
    );
  }

  const countAll = students.length;
  const count11 = students.filter(s => (s.studentClass ? String(s.studentClass).trim() : "11") === "11").length;
  const count12 = students.filter(s => String(s.studentClass).trim() === "12").length;

  return (
    <div className="space-y-4">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-2.5 rounded-2xl shadow-xl backdrop-blur-sm">
        
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setSelectedClass("all")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              selectedClass === "all" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All ({countAll})
          </button>
          <button
            onClick={() => setSelectedClass("11")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              selectedClass === "11" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Class 11 ({count11})
          </button>
          <button
            onClick={() => setSelectedClass("12")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              selectedClass === "12" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Class 12 ({count12})
          </button>
        </div>

        <div className="relative w-full sm:w-60">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
            <Search className="w-3.5 h-3.5 text-violet-400" />
          </span>
          <input
            type="text"
            placeholder="Search student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-[11px] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-all shadow-inner"
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
          No students found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStudents.map((student, index) => {
            const roll = student.studentRoll ? String(student.studentRoll).trim() : "";
            const studentResults = allResults[roll] || [];
            const studentClassVal = student.studentClass ? student.studentClass : "11";

            return (
              <div
                key={student._id || index}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-xl hover:border-violet-500/40 transition-all flex flex-col justify-between backdrop-blur-sm group"
              >
                <div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex-shrink-0">
                      {student.image ? (
                        <img src={student.image} alt={student.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-violet-400">
                          {student.name?.charAt(0) || "S"}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-xs font-bold text-slate-100 truncate">{student.name || "Unnamed"}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md text-slate-300 font-medium">
                            Class {studentClassVal}
                          </span>
                          <span className="text-[10px] bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md text-violet-400 font-medium">
                            Roll: {roll || "N/A"}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{student.collegeName || "College N/A"}</p>
                    </div>
                  </div>

                 
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold flex items-center gap-1 text-slate-400 uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5 text-violet-400" /> Results ({studentResults.length})
                      </span>
                    </div>

                    {studentResults.length === 0 ? (
                      <p className="text-[10px] text-slate-500 text-center py-2 italic">No exam results yet.</p>
                    ) : (
                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                        {studentResults.map((res, rIndex) => {
                          const cq = Number(res.cqMarks || 0);
                          const mcq = Number(res.mcqMarks || 0);
                          const total = res.totalMarks !== undefined ? res.totalMarks : cq + mcq;

                          return (
                            <div
                              key={res._id || rIndex}
                              className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 flex flex-col gap-1 text-[11px]"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-slate-200 font-medium truncate">{res.examName}</span>
                                <span className="bg-violet-600/10 border border-violet-500/20 text-violet-400 font-semibold px-2 py-0.5 rounded-md flex-shrink-0 text-[10px]">
                                  Tot: {total}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                                <span>CQ: <strong className="text-slate-200">{cq}</strong></span>
                                <span className="text-slate-700">•</span>
                                <span>MCQ: <strong className="text-slate-200">{mcq}</strong></span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}