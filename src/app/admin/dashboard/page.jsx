"use client";

import { useState, useEffect } from "react";
import { Award, Bell, FileText, Users, Trash2, ShieldAlert, ShieldCheck, CheckCircle, Loader2, PlusCircle, UserCheck, Calendar, BookOpen, Building2, Shield, Search } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("result");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ডাটা লিস্ট স্টেট
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [notices, setNotices] = useState([]);
  
  // স্টুডেন্ট ট্যাব ফিল্টার স্টেট ("all", "11", "12")
  const [selectedStudentClass, setSelectedStudentClass] = useState("all");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  // রেজাল্ট ফর্ম স্টেট (studentRoll ব্যবহার করা হয়েছে)
  const [resultForm, setResultForm] = useState({
    studentRoll: "",
    examName: "",
    cqMarks: "",
    mcqMarks: "",
  });

  // নোটিশ ফর্ম স্টেট
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
  });

  // ইউজার এবং নোটিশ ডাটা ফেচ ও রোল অনুযায়ী ফিল্টার করার জন্য
  const fetchDashboardData = async () => {
    try {
      const studentRes = await fetch("http://localhost:5000/api/students");
      const studentData = await studentRes.json();
      
      if (studentData.success) {
        const allUsers = studentData.data;

        // ১. রোল চেক করে স্টুডেন্ট লিস্ট আলাদা করা
        const onlyStudents = allUsers.filter((u) => {
          const role = u.role ? u.role.toLowerCase() : "student";
          return role === "student";
        });
        setStudents(onlyStudents);

        // ২. রোল চেক করে অ্যাডমিন লিস্ট আলাদা করা
        const onlyAdmins = allUsers.filter((u) => {
          const role = u.role ? u.role.toLowerCase() : "";
          return role === "admin";
        });
        setAdmins(onlyAdmins);
      }

      const noticeRes = await fetch("http://localhost:5000/api/notices");
      const noticeData = await noticeRes.json();
      if (noticeData.success) setNotices(noticeData.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ১. রেজাল্ট সাবমিট হ্যান্ডলার
  const handleResultSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultForm),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Exam result published successfully!" });
        setResultForm({ studentRoll: "", examName: "", cqMarks: "", mcqMarks: "" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to publish result" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server connection error!" });
    } finally {
      setLoading(false);
    }
  };

  // ২. নোটিশ সাবমিট হ্যান্ডলার
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticeForm),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Notice published successfully!" });
        setNoticeForm({ title: "", description: "" });
        fetchDashboardData();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to publish notice" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server connection error!" });
    } finally {
      setLoading(false);
    }
  };

  // ৩. নোটিশ ডিলিট হ্যান্ডলার
  const handleDeleteNotice = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/notices/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNotices(notices.filter((n) => n._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete notice", err);
    }
  };

  // ৪. স্টুডেন্ট/ইউজার ডিলিট হ্যান্ডলার
  const handleDeleteStudent = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStudents(students.filter((s) => s._id !== id));
        setAdmins(admins.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  // ৫. স্টুডেন্ট ব্লক/আনব্লক হ্যান্ডলার
  const handleToggleBlock = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const res = await fetch(`http://localhost:5000/api/students/block/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setStudents(students.map((s) => (s._id === id ? { ...s, isBlocked: newStatus } : s)));
        setAdmins(admins.map((a) => (a._id === id ? { ...a, isBlocked: newStatus } : a)));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // স্টুডেন্ট ফিল্টারিং লজিক (ক্লাস এবং সার্চ কুয়েরি অনুযায়ী)
  const filteredStudents = students.filter((student) => {
    if (selectedStudentClass !== "all") {
      const sClass = student.studentClass ? String(student.studentClass).trim() : "11";
      if (sClass !== selectedStudentClass) return false;
    }

    const query = studentSearchQuery.toLowerCase();
    const name = student.name ? student.name.toLowerCase() : "";
    const roll = student.studentRoll ? String(student.studentRoll).toLowerCase() : "";
    const college = student.collegeName ? student.collegeName.toLowerCase() : "";

    return name.includes(query) || roll.includes(query) || college.includes(query);
  });

  // বিভিন্ন ক্লাসের স্টুডেন্ট কাউন্ট
  const countAllStudents = students.length;
  const countClass11 = students.filter(s => (s.studentClass ? String(s.studentClass).trim() : "11") === "11").length;
  const countClass12 = students.filter(s => String(s.studentClass).trim() === "12").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ড্যাশবোর্ড হেডার ও ট্যাব সুইচিং */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-indigo-400" />
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Manage results, notices, students, and admins.</p>
          </div>

          <div className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
            <button
              onClick={() => { setActiveTab("result"); setMessage({ type: "", text: "" }); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "result" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Award className="w-4 h-4" /> Add Result
            </button>
            <button
              onClick={() => { setActiveTab("notice"); setMessage({ type: "", text: "" }); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "notice" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Bell className="w-4 h-4" /> Notices
            </button>
            <button
              onClick={() => { setActiveTab("students"); setMessage({ type: "", text: "" }); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "students" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Students ({students.length})
            </button>
            <button
              onClick={() => { setActiveTab("admins"); setMessage({ type: "", text: "" }); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "admins" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Shield className="w-4 h-4" /> Admins ({admins.length})
            </button>
          </div>
        </div>

        {/* অ্যালার্ট মেসেজ */}
        {message.text && (
          <div className={`p-4 rounded-xl border text-xs flex items-center gap-2 ${
            message.type === "success" 
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" 
              : "bg-rose-950/40 border-rose-500/30 text-rose-300"
          }`}>
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* মূল কন্টেন্ট এরিয়া */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* ================= 1. ADD RESULT TAB ================= */}
          {activeTab === "result" && (
            <form onSubmit={handleResultSubmit} className="space-y-5">
              <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
                <FileText className="w-5 h-5" /> Publish Result by Student Roll
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Student Roll Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 101"
                    value={resultForm.studentRoll}
                    onChange={(e) => setResultForm({ ...resultForm, studentRoll: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Exam Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics Weekly Exam - 01"
                    value={resultForm.examName}
                    onChange={(e) => setResultForm({ ...resultForm, examName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">CQ Marks</label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      value={resultForm.cqMarks}
                      onChange={(e) => setResultForm({ ...resultForm, cqMarks: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">MCQ Marks</label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      value={resultForm.mcqMarks}
                      onChange={(e) => setResultForm({ ...resultForm, mcqMarks: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                <span>Publish Result</span>
              </button>
            </form>
          )}

          {/* ================= 2. NOTICES TAB ================= */}
          {activeTab === "notice" && (
            <div className="space-y-8">
              <form onSubmit={handleNoticeSubmit} className="space-y-5 border-b border-slate-800 pb-8">
                <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                  <Bell className="w-5 h-5" /> Publish New Notice
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Notice Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tomorrow Class Schedule Update"
                      value={noticeForm.title}
                      onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Notice Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write notice details here..."
                      value={noticeForm.description}
                      onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                  <span>Publish Notice</span>
                </button>
              </form>

              {/* নোটিশ লিস্ট ও ডিলিট অপশন */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-300">Existing Notices ({notices.length})</h3>
                {notices.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No notices published yet.</p>
                ) : (
                  <div className="space-y-3">
                    {notices.map((notice) => (
                      <div key={notice._id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{notice.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{notice.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNotice(notice._id)}
                          className="p-2 rounded-xl bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all flex-shrink-0"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= 3. STUDENTS MANAGEMENT TAB ================= */}
          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                  <Users className="w-5 h-5" /> Enrolled Students Directory ({students.length})
                </h2>

                {/* ক্লাস ফিল্টার ট্যাব ও সার্চ */}
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedStudentClass("all")}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        selectedStudentClass === "all" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      All ({countAllStudents})
                    </button>
                    <button
                      onClick={() => setSelectedStudentClass("11")}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        selectedStudentClass === "11" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Class 11 ({countClass11})
                    </button>
                    <button
                      onClick={() => setSelectedStudentClass("12")}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        selectedStudentClass === "12" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Class 12 ({countClass12})
                    </button>
                  </div>

                  <div className="relative w-full sm:w-48">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {filteredStudents.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No students found.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredStudents.map((student) => {
                    const studentClassVal = student.studentClass ? student.studentClass : "11";

                    return (
                      <div key={student._id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        {/* স্টুডেন্ট ইনফো ও ইমেজ */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-900 flex-shrink-0">
                            {student.image ? (
                              <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm font-bold text-indigo-400">
                                {student.name?.charAt(0) || "S"}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-white truncate">{student.name || "Unnamed"}</h4>
                              <span className="text-[10px] bg-indigo-950 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-md font-semibold">
                                Class {studentClassVal}
                              </span>
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold">
                                Roll: {student.studentRoll || "N/A"}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-400">{student.email}</p>

                            {/* এক্সট্রা ডিটেইলস (Batch, Academic Year, College, Group) */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300">
                              {student.collegeName && (
                                <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                                  <Building2 className="w-3 h-3 text-indigo-400" />
                                  {student.collegeName}
                                </span>
                              )}
                              {student.batch && (
                                <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                                  <Users className="w-3 h-3 text-indigo-400" />
                                  Batch: {student.batch}
                                </span>
                              )}
                              {student.groupName && (
                                <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                                  <BookOpen className="w-3 h-3 text-indigo-400" />
                                  {student.groupName}
                                </span>
                              )}
                              {student.academicYear && (
                                <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                                  <Calendar className="w-3 h-3 text-indigo-400" />
                                  {student.academicYear}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* অ্যাকশন বাটনস */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                          {/* ব্লক / আনব্লক বাটন */}
                          <button
                            onClick={() => handleToggleBlock(student._id, student.isBlocked)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                              student.isBlocked 
                                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white" 
                                : "bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600 hover:text-white"
                            }`}
                          >
                            {student.isBlocked ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                            <span>{student.isBlocked ? "Unblock" : "Block"}</span>
                          </button>

                          {/* ডিলিট বাটন */}
                          <button
                            onClick={() => handleDeleteStudent(student._id)}
                            className="p-2 rounded-xl bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                            title="Delete Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= 4. ADMINS MANAGEMENT TAB ================= */}
          {activeTab === "admins" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
                <Shield className="w-5 h-5" /> Admin Directory ({admins.length})
              </h2>

              {admins.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No admins found.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {admins.map((admin) => (
                    <div key={admin._id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      
                      {/* অ্যাডমিন ইনফো ও ইমেজ */}
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-900 flex-shrink-0">
                          {admin.image ? (
                            <img src={admin.image} alt={admin.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-indigo-400">
                              {admin.name?.charAt(0) || "A"}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-white truncate">{admin.name || "Unnamed Admin"}</h4>
                            <span className="text-[10px] bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-md font-semibold">
                              Role: Admin
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-400">{admin.email}</p>
                        </div>
                      </div>

                      {/* অ্যাকশন বাটনস */}
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                        {/* ব্লক / আনব্লক বাটন */}
                        <button
                          onClick={() => handleToggleBlock(admin._id, admin.isBlocked)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                            admin.isBlocked 
                              ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white" 
                              : "bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600 hover:text-white"
                          }`}
                        >
                          {admin.isBlocked ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                          <span>{admin.isBlocked ? "Unblock" : "Block"}</span>
                        </button>

                        {/* ডিলিট বাটন */}
                        <button
                          onClick={() => handleDeleteStudent(admin._id)}
                          className="p-2 rounded-xl bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                          title="Delete Admin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}