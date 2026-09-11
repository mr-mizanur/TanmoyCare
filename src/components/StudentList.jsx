"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Award, FileText, Loader2, Search, Trophy, CheckCircle2, XCircle } from "lucide-react";

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

        const [studentRes, resultRes] = await Promise.all([
          fetch(`${apiUrl}/api/students`),
          fetch(`${apiUrl}/api/results`),
        ]);

        const studentData = await studentRes.json();
        const resultData = await resultRes.json();

        if (studentData.success) {
          const studentList = studentData.data;

          const onlyStudents = studentList.filter((s) => {
            const role = s.role ? s.role.toLowerCase() : "student";
            return role === "student" && s.studentRoll;
          });

          setStudents(onlyStudents);
        }

        if (resultData.success) {
          const resultsMap = {};
          resultData.data.forEach((item) => {
            if (item.studentRoll !== undefined && item.studentRoll !== null) {
              const roll = String(item.studentRoll).trim();
              if (!resultsMap[roll]) {
                resultsMap[roll] = [];
              }
              resultsMap[roll].push(item);
            }
          });

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

  // ====================== RANKING LOGIC ======================
  // Priority:
  // 1. Passed ALL subjects → sort by total marks (high to low)
  // 2. Passed SOME subjects → sort by total marks
  // 3. Failed ALL → sort by total marks
  // Everyone gets a position (1st, 2nd, 3rd...)

  const rankMap = {};

  const studentsWithScore = students.map((student) => {
    const roll = student.studentRoll ? String(student.studentRoll).trim() : "";
    const results = allResults[roll] || [];

    let passCount = 0;
    let totalScore = 0;

    results.forEach((res) => {
      const cq = Number(res.cqMarks || 0);
      const mcq = Number(res.mcqMarks || 0);
      const total = res.totalMarks !== undefined ? Number(res.totalMarks) : cq + mcq;
      totalScore += total;

      if (cq >= 15 && mcq >= 25) {
        passCount += 1;
      }
    });

    const totalExams = results.length;
    const passedAll = totalExams > 0 && passCount === totalExams;
    const passedSome = passCount > 0 && passCount < totalExams;
    const failedAll = passCount === 0;

    // Priority number (lower is better)
    let priority = 3; // failed all
    if (passedAll) priority = 1;
    else if (passedSome) priority = 2;

    return {
      roll,
      totalScore,
      priority,
      passCount,
      totalExams,
    };
  });

  // Sort: first by priority, then by totalScore (descending)
  studentsWithScore.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.totalScore - a.totalScore; // higher marks first
  });

  // Assign rank 1, 2, 3...
  studentsWithScore.forEach((item, index) => {
    rankMap[item.roll] = index + 1;
  });
  // ===========================================================

  const filteredStudents = students
    .filter((student) => {
      if (selectedClass !== "all") {
        const studentClass = student.studentClass
          ? String(student.studentClass).trim()
          : "11";
        if (studentClass !== selectedClass) return false;
      }

      const query = searchQuery.toLowerCase();
      const name = student.name ? student.name.toLowerCase() : "";
      const roll = student.studentRoll
        ? String(student.studentRoll).toLowerCase()
        : "";
      const college = student.collegeName
        ? student.collegeName.toLowerCase()
        : "";

      return (
        name.includes(query) || roll.includes(query) || college.includes(query)
      );
    })
    .sort((a, b) => {
      const rollA = a.studentRoll ? String(a.studentRoll).trim() : "";
      const rollB = b.studentRoll ? String(b.studentRoll).trim() : "";

      const rankA = rankMap[rollA] || 9999;
      const rankB = rankMap[rollB] || 9999;

      return rankA - rankB;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        <span className="text-xs">Loading...</span>
      </div>
    );
  }

  const count11 = students.filter(
    (s) =>
      (s.studentClass ? String(s.studentClass).trim() : "11") === "11"
  ).length;
  const count12 = students.filter(
    (s) => String(s.studentClass).trim() === "12"
  ).length;

  // Helper to show rank text
  const getRankText = (rank) => {
    if (!rank) return null;
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    return `${rank}th`;
  };

  return (
    <div className="space-y-4">
      {/* Filter + Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white text-slate-800 py-6 px-4 sm:px-6 border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => setSelectedClass("11")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedClass === "11"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Class 11 ({count11})
          </button>
          <button
            onClick={() => setSelectedClass("12")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedClass === "12"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Class 12 ({count12})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-indigo-600" />
          </span>
          <input
            type="text"
            placeholder="Search student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Student Cards */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 text-xs shadow-sm">
          No students found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student, index) => {
            const roll = student.studentRoll
              ? String(student.studentRoll).trim()
              : "";
            const studentResults = allResults[roll] || [];
            const studentClassVal = student.studentClass
              ? student.studentClass
              : "11";

            const studentRank = rankMap[roll];

            return (
              <div
                key={student._id || index}
                className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xl shadow-slate-200/40 hover:border-indigo-300 hover:shadow-indigo-100/50 transition-all flex flex-col justify-between backdrop-blur-sm group"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0 shadow-sm">
                      {student.image ? (
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-indigo-600 bg-indigo-50">
                          {student.name?.charAt(0) || "S"}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-xs font-bold text-slate-900 truncate">
                          {student.name || "Unnamed"}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-700 font-semibold">
                            Class {studentClassVal}
                          </span>
                          <span className="text-[10px] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg text-indigo-600 font-semibold">
                            Roll: {roll || "N/A"}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {student.collegeName || "College N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold flex items-center gap-1 text-slate-500 uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5 text-indigo-600" /> Results
                        ({studentResults.length})
                      </span>

                      {/* Global Rank Badge - Always show */}
                      {studentRank && (
                        <span className="bg-amber-50 border border-amber-200 text-amber-600 font-semibold px-2.5 py-0.5 rounded-lg text-[10px] flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {getRankText(studentRank)}
                        </span>
                      )}
                    </div>

                    {studentResults.length === 0 ? (
                      <p className="text-[10px] text-slate-400 text-center py-2 italic">
                        No exam results yet.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {studentResults.map((res, rIndex) => {
                          const cq = Number(res.cqMarks || 0);
                          const mcq = Number(res.mcqMarks || 0);
                          const total =
                            res.totalMarks !== undefined
                              ? res.totalMarks
                              : cq + mcq;

                          const isPassed = cq >= 15 && mcq >= 25;

                          return (
                            <div
                              key={res._id || rIndex}
                              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex flex-col gap-1.5 text-[11px]"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-slate-800 font-semibold truncate">
                                  {res.examName}
                                </span>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <span
                                    className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold flex items-center gap-0.5 border ${
                                      isPassed
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                        : "bg-rose-50 border-rose-200 text-rose-600"
                                    }`}
                                  >
                                    {isPassed ? (
                                      <CheckCircle2 className="w-2.5 h-2.5" />
                                    ) : (
                                      <XCircle className="w-2.5 h-2.5" />
                                    )}
                                    {isPassed ? "Pass" : "Fail"}
                                  </span>

                                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-lg text-[9px]">
                                    Tot: {total}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                                <span>
                                  CQ:{" "}
                                  <strong className="text-slate-800">
                                    {cq}
                                  </strong>
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>
                                  MCQ:{" "}
                                  <strong className="text-slate-800">
                                    {mcq}
                                  </strong>
                                </span>
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