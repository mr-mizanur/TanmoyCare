
//import { Award, Bell, FileText, Users, Trash2, ShieldAlert, ShieldCheck, CheckCircle, Loader2, PlusCircle, UserCheck, Calendar, BookOpen, Building2, Shield, Search } from "lucide-react";
//"use client";import { useState, useEffect } from "react";
//import NotFoundPage from "@/app/not-found"; 
//
//import { useSession } from "@/lib/auth-client"; 
//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
//
//
//export default function AdminDashboard() {
//  const { data: session, isPending: checkingAuth } = useSession();
//
//  
//  const userRole = session?.user?.role ? session.user.role.toLowerCase() : "student";
//  const [activeTab, setActiveTab] = useState("result");
//  const [loading, setLoading] = useState(false);
//  const [message, setMessage] = useState({ type: "", text: "" });
//
//  const [students, setStudents] = useState([]);
//  const [admins, setAdmins] = useState([]);
//  const [notices, setNotices] = useState([]);
//
//  
//  const [selectedStudentClass, setSelectedStudentClass] = useState("all");
//  const [studentSearchQuery, setStudentSearchQuery] = useState("");
//  const [resultForm, setResultForm] = useState({
//  studentRoll: "",
//    examName: "",
//
//    cqMarks: "",
//    mcqMarks: "",
//  });
//  const [noticeForm, setNoticeForm] = useState({
//  title: "",
//    description: "",
//
//  });
//  const fetchDashboardData = async () => {
//    try {
//
//      const studentRes = await fetch(`${API_URL}/api/students`, { credentials: "include" });
//      const studentData = await studentRes.json();
//      
//      if (studentData.success) {
//        const allUsers = studentData.data;
//
//        const onlyStudents = allUsers.filter((u) => {
//          const role = u.role ? u.role.toLowerCase() : "student";
//          return role === "student";
//        });
//        setStudents(onlyStudents);
//
//        const onlyAdmins = allUsers.filter((u) => {
//          const role = u.role ? u.role.toLowerCase() : "";
//          return role === "admin";
//        });
//        setAdmins(onlyAdmins);
//      }
//
//      const noticeRes = await fetch(`${API_URL}/api/notices`, { credentials: "include" });
//      const noticeData = await noticeRes.json();
//      if (noticeData.success) setNotices(noticeData.data);
//    } catch (err) {
//      console.error("Failed to fetch dashboard data", err);
//    }
//  };
//
//  useEffect(() => {
//    if (userRole === "admin") {
//      fetchDashboardData();
//    }
//  }, [userRole]);
//
// 
//  if (checkingAuth) {
//    return (
//      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
//        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
//      </div>
//    );
//  }
//
// 
//  if (userRole !== "admin") {
//    return <NotFoundPage />;
//  }
//
//  const handleResultSubmit = async (e) => {
//    e.preventDefault();
//    setLoading(true);
//    setMessage({ type: "", text: "" });
//
//    try {
//      const res = await fetch(`${API_URL}/api/results`, {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        credentials: "include",
//        body: JSON.stringify(resultForm),
//      });
//      const data = await res.json();
//
//      if (data.success) {
//        setMessage({ type: "success", text: "Exam result published successfully!" });
//        setResultForm({ studentRoll: "", examName: "", cqMarks: "", mcqMarks: "" });
//      } else {
//        setMessage({ type: "error", text: data.error || "Failed to publish result" });
//      }
//    } catch (err) {
//      setMessage({ type: "error", text: "Server connection error!" });
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  const handleNoticeSubmit = async (e) => {
//    e.preventDefault();
//    setLoading(true);
//    setMessage({ type: "", text: "" });
//
//    try {
//      const res = await fetch(`${API_URL}/api/notices`, {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        credentials: "include",
//        body: JSON.stringify(noticeForm),
//      });
//      const data = await res.json();
//
//      if (data.success) {
//        setMessage({ type: "success", text: "Notice published successfully!" });
//        setNoticeForm({ title: "", description: "" });
//        fetchDashboardData();
//      } else {
//        setMessage({ type: "error", text: data.error || "Failed to publish notice" });
//      }
//    } catch (err) {
//      setMessage({ type: "error", text: "Server connection error!" });
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  const handleDeleteNotice = async (id) => {
//    if (!confirm("Are you sure you want to delete this notice?")) return;
//    try {
//      const res = await fetch(`${API_URL}/api/notices/${id}`, { 
//        method: "DELETE",
//        credentials: "include" 
//      });
//      const data = await res.json();
//      if (data.success) {
//        setNotices(notices.filter((n) => n._id !== id));
//      }
//    } catch (err) {
//      console.error("Failed to delete notice", err);
//    }
//  };
//
//  const handleDeleteStudent = async (id) => {
//    if (!confirm("Are you sure you want to delete this user?")) return;
//    try {
//      const res = await fetch(`${API_URL}/api/students/${id}`, { 
//        method: "DELETE",
//        credentials: "include" 
//      });
//      const data = await res.json();
//      if (data.success) {
//        setStudents(students.filter((s) => s._id !== id));
//        setAdmins(admins.filter((a) => a._id !== id));
//      }
//    } catch (err) {
//      console.error("Failed to delete user", err);
//    }
//  };
//
//  const handleToggleBlock = async (id, currentStatus) => {
//    const newStatus = !currentStatus;
//    try {
//      const res = await fetch(`${API_URL}/api/students/block/${id}`, {
//        method: "PATCH",
//        headers: { "Content-Type": "application/json" },
//        credentials: "include",
//        body: JSON.stringify({ isBlocked: newStatus }),
//      });
//      const data = await res.json();
//      if (data.success) {
//        setStudents(students.map((s) => (s._id === id ? { ...s, isBlocked: newStatus } : s)));
//        setAdmins(admins.map((a) => (a._id === id ? { ...a, isBlocked: newStatus } : a)));
//      }
//    } catch (err) {
//      console.error("Failed to update status", err);
//    }
//  };
//
//  const filteredStudents = students.filter((student) => {
//    if (selectedStudentClass !== "all") {
//      const sClass = student.studentClass ? String(student.studentClass).trim() : "11";
//      if (sClass !== selectedStudentClass) return false;
//    }
//
//    const query = studentSearchQuery.toLowerCase();
//    const name = student.name ? student.name.toLowerCase() : "";
//    const roll = student.studentRoll ? String(student.studentRoll).toLowerCase() : "";
//    const college = student.collegeName ? student.collegeName.toLowerCase() : "";
//
//    return name.includes(query) || roll.includes(query) || college.includes(query);
//  });
//
//  const countAllStudents = students.length;
//  const countClass11 = students.filter(s => (s.studentClass ? String(s.studentClass).trim() : "11") === "11").length;
//  const countClass12 = students.filter(s => String(s.studentClass).trim() === "12").length;
//
//  return (
//    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
//      <div className="max-w-6xl mx-auto space-y-6">
//        
//        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
//          <div className="space-y-1">
//            <h1 className="text-xl font-bold flex items-center gap-2 text-zinc-100">
//              <UserCheck className="w-5 h-5 text-zinc-400" />
//              <span>Admin Dashboard</span>
//            </h1>
//            <p className="text-xs text-zinc-400">Manage results, notices, students, and admins efficiently.</p>
//          </div>
//
//          <div className="flex flex-wrap bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 gap-1.5">
//            <button
//              onClick={() => { setActiveTab("result"); setMessage({ type: "", text: "" }); }}
//              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
//                activeTab === "result" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//              }`}
//            >
//              <Award className="w-4 h-4" /> Add Result
//            </button>
//            <button
//              onClick={() => { setActiveTab("notice"); setMessage({ type: "", text: "" }); }}
//              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
//                activeTab === "notice" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//              }`}
//            >
//              <Bell className="w-4 h-4" /> Notices
//            </button>
//            <button
//              onClick={() => { setActiveTab("students"); setMessage({ type: "", text: "" }); }}
//              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
//                activeTab === "students" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//              }`}
//            >
//              <Users className="w-4 h-4" /> Students ({students.length})
//            </button>
//            <button
//              onClick={() => { setActiveTab("admins"); setMessage({ type: "", text: "" }); }}
//              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
//                activeTab === "admins" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//              }`}
//            >
//              <Shield className="w-4 h-4" /> Admins ({admins.length})
//            </button>
//          </div>
//        </div>
//
//        {message.text && (
//          <div className="bg-zinc-900 border border-zinc-700 text-zinc-200 p-4 rounded-2xl text-xs flex items-center gap-2">
//            <CheckCircle className="w-4 h-4 flex-shrink-0 text-zinc-400" />
//            <span>{message.text}</span>
//          </div>
//        )}
//
//        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
//          
//          {activeTab === "result" && (
//            <form onSubmit={handleResultSubmit} className="space-y-5">
//              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100 border-b border-zinc-800 pb-3">
//                <FileText className="w-4 h-4 text-zinc-400" /> Publish Result by Student Roll
//              </h2>
//
//              <div className="space-y-4">
//                <div>
//                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Student Roll Number</label>
//                  <input
//                    type="text"
//                    required
//                    placeholder="e.g. 101"
//                    value={resultForm.studentRoll}
//                    onChange={(e) => setResultForm({ ...resultForm, studentRoll: e.target.value })}
//                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
//                  />
//                </div>
//
//                <div>
//                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Exam Name</label>
//                  <input
//                    type="text"
//                    required
//                    placeholder="e.g. Physics Weekly Exam - 01"
//                    value={resultForm.examName}
//                    onChange={(e) => setResultForm({ ...resultForm, examName: e.target.value })}
//                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
//                  />
//                </div>
//
//                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                  <div>
//                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">CQ Marks</label>
//                    <input
//                      type="number"
//                      required
//                      placeholder="0"
//                      value={resultForm.cqMarks}
//                      onChange={(e) => setResultForm({ ...resultForm, cqMarks: e.target.value })}
//                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
//                    />
//                  </div>
//
//                  <div>
//                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">MCQ Marks</label>
//                    <input
//                      type="number"
//                      required
//                      placeholder="0"
//                      value={resultForm.mcqMarks}
//                      onChange={(e) => setResultForm({ ...resultForm, mcqMarks: e.target.value })}
//                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
//                    />
//                  </div>
//                </div>
//              </div>
//
//              <button
//                type="submit"
//                disabled={loading}
//                className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
//              >
//                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
//                <span>Publish Result</span>
//              </button>
//            </form>
//          )}
//
//          {activeTab === "notice" && (
//            <div className="space-y-8">
//              <form onSubmit={handleNoticeSubmit} className="space-y-5 border-b border-zinc-800 pb-8">
//                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100">
//                  <Bell className="w-4 h-4 text-zinc-400" /> Publish New Notice
//                </h2>
//
//                <div className="space-y-4">
//                  <div>
//                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Notice Title</label>
//                    <input
//                      type="text"
//                      required
//                      placeholder="e.g. Tomorrow Class Schedule Update"
//                      value={noticeForm.title}
//                      onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
//                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
//                    />
//                  </div>
//
//                  <div>
//                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Notice Description</label>
//                    <textarea
//                      required
//                      rows={3}
//                      placeholder="Write notice details here..."
//                      value={noticeForm.description}
//                      onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
//                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
//                    />
//                  </div>
//                </div>
//
//                <button
//                  type="submit"
//                  disabled={loading}
//                  className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
//                >
//                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
//                  <span>Publish Notice</span>
//                </button>
//              </form>
//
//              <div className="space-y-4">
//                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Existing Notices ({notices.length})</h3>
//                {notices.length === 0 ? (
//                  <p className="text-xs text-zinc-500 text-center py-4 italic">No notices published yet.</p>
//                ) : (
//                  <div className="space-y-3">
//                    {notices.map((notice) => (
//                      <div key={notice._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4">
//                        <div className="space-y-1 min-w-0">
//                          <h4 className="text-xs font-bold text-zinc-100 truncate">{notice.title}</h4>
//                          <p className="text-xs text-zinc-400 line-clamp-1">{notice.description}</p>
//                        </div>
//                        <button
//                          onClick={() => handleDeleteNotice(notice._id)}
//                          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all flex-shrink-0"
//                          title="Delete Notice"
//                        >
//                          <Trash2 className="w-4 h-4" />
//                        </button>
//                      </div>
//                    ))}
//                  </div>
//                )}
//              </div>
//            </div>
//          )}
//
//          {activeTab === "students" && (
//            <div className="space-y-4">
//              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-zinc-800 pb-4">
//                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100">
//                  <Users className="w-4 h-4 text-zinc-400" /> Enrolled Students Directory ({students.length})
//                </h2>
//
//                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
//                  <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
//                    <button
//                      onClick={() => setSelectedStudentClass("all")}
//                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                        selectedStudentClass === "all" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//                      }`}
//                    >
//                      All ({countAllStudents})
//                    </button>
//                    <button
//                      onClick={() => setSelectedStudentClass("11")}
//                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                        selectedStudentClass === "11" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//                      }`}
//                    >
//                      Class 11 ({countClass11})
//                    </button>
//                    <button
//                      onClick={() => setSelectedStudentClass("12")}
//                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                        selectedStudentClass === "12" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
//                      }`}
//                    >
//                      Class 12 ({countClass12})
//                    </button>
//                  </div>
//
//                  <div className="relative w-full sm:w-48">
//                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
//                      <Search className="w-3.5 h-3.5" />
//                    </span>
//                    <input
//                      type="text"
//                      placeholder="Search student..."
//                      value={studentSearchQuery}
//                      onChange={(e) => setStudentSearchQuery(e.target.value)}
//                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
//                    />
//                  </div>
//                </div>
//              </div>
//
//              {filteredStudents.length === 0 ? (
//                <p className="text-xs text-zinc-500 text-center py-8 italic">No students found.</p>
//              ) : (
//                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
//                  {filteredStudents.map((student) => {
//                    const studentClassVal = student.studentClass ? student.studentClass : "11";
//
//                    return (
//                      <div key={student._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//                        
//                        <div className="flex items-start gap-3.5 min-w-0">
//                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
//                            {student.image ? (
//                              <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
//                            ) : (
//                              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-400">
//                                {student.name?.charAt(0) || "S"}
//                              </div>
//                            )}
//                          </div>
//
//                          <div className="space-y-1 min-w-0">
//                            <div className="flex items-center gap-2 flex-wrap">
//                              <h4 className="text-xs font-bold text-zinc-100 truncate">{student.name || "Unnamed"}</h4>
//                              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg font-medium">
//                                Class {studentClassVal}
//                              </span>
//                              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg font-medium">
//                                Roll: {student.studentRoll || "N/A"}
//                              </span>
//                            </div>
//                            
//                            <p className="text-xs text-zinc-400">{student.email}</p>
//
//                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-zinc-300">
//                              {student.collegeName && (
//                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
//                                  <Building2 className="w-3 h-3 text-zinc-400" />
//                                  {student.collegeName}
//                                </span>
//                              )}
//                              {student.batch && (
//                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
//                                  <Users className="w-3 h-3 text-zinc-400" />
//                                  Batch: {student.batch}
//                                </span>
//                              )}
//                              {student.groupName && (
//                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
//                                  <BookOpen className="w-3 h-3 text-zinc-400" />
//                                  {student.groupName}
//                                </span>
//                              )}
//                              {student.academicYear && (
//                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
//                                  <Calendar className="w-3 h-3 text-zinc-400" />
//                                  {student.academicYear}
//                                </span>
//                              )}
//                            </div>
//                          </div>
//                        </div>
//
//                        <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800">
//                          <button
//                            onClick={() => handleToggleBlock(student._id, student.isBlocked)}
//                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
//                              student.isBlocked 
//                                ? "bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800" 
//                                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
//                            }`}
//                          >
//                            {student.isBlocked ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
//                            <span>{student.isBlocked ? "Unblock" : "Block"}</span>
//                          </button>
//
//                          <button
//                            onClick={() => handleDeleteStudent(student._id)}
//                            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
//                            title="Delete Student"
//                          >
//                            <Trash2 className="w-4 h-4" />
//                          </button>
//                        </div>
//
//                      </div>
//                    );
//                  })}
//                </div>
//              )}
//            </div>
//          )}
//
//          {activeTab === "admins" && (
//            <div className="space-y-4">
//              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100 border-b border-zinc-800 pb-3">
//                <Shield className="w-4 h-4 text-zinc-400" /> Admin Directory ({admins.length})
//              </h2>
//
//              {admins.length === 0 ? (
//                <p className="text-xs text-zinc-500 text-center py-8 italic">No admins found.</p>
//              ) : (
//                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
//                  {admins.map((admin) => (
//                    <div key={admin._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//                      
//                      <div className="flex items-start gap-3.5 min-w-0">
//                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
//                          {admin.image ? (
//                            <img src={admin.image} alt={admin.name} className="w-full h-full object-cover" />
//                          ) : (
//                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-400">
//                              {admin.name?.charAt(0) || "A"}
//                            </div>
//                          )}
//                        </div>
//
//                        <div className="space-y-1 min-w-0">
//                          <div className="flex items-center gap-2 flex-wrap">
//                            <h4 className="text-xs font-bold text-zinc-100 truncate">{admin.name || "Unnamed Admin"}</h4>
//                            <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg font-medium">
//                              Role: Admin
//                            </span>
//                          </div>
//                          
//                          <p className="text-xs text-zinc-400">{admin.email}</p>
//                        </div>
//                      </div>
//
//                      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800">
//                        <button
//                          onClick={() => handleToggleBlock(admin._id, admin.isBlocked)}
//                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
//                            admin.isBlocked 
//                              ? "bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800" 
//                              : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
//                          }`}
//                        >
//                          {admin.isBlocked ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
//                          <span>{admin.isBlocked ? "Unblock" : "Block"}</span>
//                        </button>
//
//                        <button
//                          onClick={() => handleDeleteStudent(admin._id)}
//                          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
//                          title="Delete Admin"
//                        >
//                          <Trash2 className="w-4 h-4" />
//                        </button>
//                      </div>
//
//                    </div>
//                  ))}
//                </div>
//              )}
//            </div>
//          )}
//
//        </div>
//
//      </div>
//    </main>
//  );
//}





"use client";

import { useState, useEffect } from "react";
import { Award, Bell, FileText, Users, Trash2, ShieldAlert, ShieldCheck, CheckCircle, Loader2, PlusCircle, UserCheck, Calendar, BookOpen, Building2, Shield, Search, UserMinus, UserPlus } from "lucide-react";
import NotFoundPage from "@/app/not-found"; 
import { useSession } from "@/lib/auth-client"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  
  const { data: session, isPending: checkingAuth } = useSession();
  
  const userRole = session?.user?.role ? session.user.role.toLowerCase() : "student";

  const [activeTab, setActiveTab] = useState("result");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [notices, setNotices] = useState([]);
  
  const [selectedStudentClass, setSelectedStudentClass] = useState("all");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  const [resultForm, setResultForm] = useState({
    studentRoll: "",
    examName: "",
    cqMarks: "",
    mcqMarks: "",
  });

  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
  });

  const fetchDashboardData = async () => {
    try {
      const studentRes = await fetch(`${API_URL}/api/students`, { credentials: "include" });
      const studentData = await studentRes.json();
      
      if (studentData.success) {
        const allUsers = studentData.data;

        const onlyStudents = allUsers.filter((u) => {
          const role = u.role ? u.role.toLowerCase() : "student";
          return role === "student";
        });
        setStudents(onlyStudents);

        const onlyAdmins = allUsers.filter((u) => {
          const role = u.role ? u.role.toLowerCase() : "";
          return role === "admin";
        });
        setAdmins(onlyAdmins);
      }

      const noticeRes = await fetch(`${API_URL}/api/notices`, { credentials: "include" });
      const noticeData = await noticeRes.json();
      if (noticeData.success) setNotices(noticeData.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  useEffect(() => {
    if (userRole === "admin") {
      fetchDashboardData();
    }
  }, [userRole]);

 
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

 
  if (userRole !== "admin") {
    return <NotFoundPage />;
  }

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${API_URL}/api/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${API_URL}/api/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

  const handleDeleteNotice = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`${API_URL}/api/notices/${id}`, { 
        method: "DELETE",
        credentials: "include" 
      });
      const data = await res.json();
      if (data.success) {
        setNotices(notices.filter((n) => n._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete notice", err);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/api/students/${id}`, { 
        method: "DELETE",
        credentials: "include" 
      });
      const data = await res.json();
      if (data.success) {
        setStudents(students.filter((s) => s._id !== id));
        setAdmins(admins.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleToggleBlock = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const res = await fetch(`${API_URL}/api/students/block/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

  // নতুন ফাংশন: রোল পরিবর্তন (Student থেকে Admin অথবা Admin থেকে Student) করার জন্য
  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole.toLowerCase() === "admin" ? "student" : "admin";
    const confirmMsg = newRole === "admin" 
      ? "Are you sure you want to promote this user to Admin?" 
      : "Are you sure you want to demote this Admin to Student?";
    
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`${API_URL}/api/students/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      
      if (data.success) {
       
        fetchDashboardData();
        setMessage({ type: "success", text: `User role successfully changed to ${newRole}!` });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update role" });
      }
    } catch (err) {
      console.error("Failed to update user role", err);
      setMessage({ type: "error", text: "Server connection error!" });
    }
  };

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

  const countAllStudents = students.length;
  const countClass11 = students.filter(s => (s.studentClass ? String(s.studentClass).trim() : "11") === "11").length;
  const countClass12 = students.filter(s => String(s.studentClass).trim() === "12").length;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold flex items-center gap-2 text-zinc-100">
              <UserCheck className="w-5 h-5 text-zinc-400" />
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-xs text-zinc-400">Manage results, notices, students, and admins efficiently.</p>
          </div>

          <div className="flex flex-wrap bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 gap-1.5">
            <button
              onClick={() => { setActiveTab("result"); setMessage({ type: "", text: "" }); }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "result" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Award className="w-4 h-4" /> Add Result
            </button>
            <button
              onClick={() => { setActiveTab("notice"); setMessage({ type: "", text: "" }); }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "notice" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Bell className="w-4 h-4" /> Notices
            </button>
            <button
              onClick={() => { setActiveTab("students"); setMessage({ type: "", text: "" }); }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "students" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Users className="w-4 h-4" /> Students ({students.length})
            </button>
            <button
              onClick={() => { setActiveTab("admins"); setMessage({ type: "", text: "" }); }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "admins" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Shield className="w-4 h-4" /> Admins ({admins.length})
            </button>
          </div>
        </div>

        {message.text && (
          <div className="bg-zinc-900 border border-zinc-700 text-zinc-200 p-4 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0 text-zinc-400" />
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {activeTab === "result" && (
            <form onSubmit={handleResultSubmit} className="space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100 border-b border-zinc-800 pb-3">
                <FileText className="w-4 h-4 text-zinc-400" /> Publish Result by Student Roll
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Student Roll Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 101"
                    value={resultForm.studentRoll}
                    onChange={(e) => setResultForm({ ...resultForm, studentRoll: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Exam Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics Weekly Exam - 01"
                    value={resultForm.examName}
                    onChange={(e) => setResultForm({ ...resultForm, examName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">CQ Marks</label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      value={resultForm.cqMarks}
                      onChange={(e) => setResultForm({ ...resultForm, cqMarks: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">MCQ Marks</label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      value={resultForm.mcqMarks}
                      onChange={(e) => setResultForm({ ...resultForm, mcqMarks: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                <span>Publish Result</span>
              </button>
            </form>
          )}

          {activeTab === "notice" && (
            <div className="space-y-8">
              <form onSubmit={handleNoticeSubmit} className="space-y-5 border-b border-zinc-800 pb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100">
                  <Bell className="w-4 h-4 text-zinc-400" /> Publish New Notice
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Notice Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tomorrow Class Schedule Update"
                      value={noticeForm.title}
                      onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Notice Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write notice details here..."
                      value={noticeForm.description}
                      onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                  <span>Publish Notice</span>
                </button>
              </form>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Existing Notices ({notices.length})</h3>
                {notices.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-4 italic">No notices published yet.</p>
                ) : (
                  <div className="space-y-3">
                    {notices.map((notice) => (
                      <div key={notice._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-xs font-bold text-zinc-100 truncate">{notice.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-1">{notice.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNotice(notice._id)}
                          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all flex-shrink-0"
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

          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100">
                  <Users className="w-4 h-4 text-zinc-400" /> Enrolled Students Directory ({students.length})
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedStudentClass("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedStudentClass === "all" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      All ({countAllStudents})
                    </button>
                    <button
                      onClick={() => setSelectedStudentClass("11")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedStudentClass === "11" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Class 11 ({countClass11})
                    </button>
                    <button
                      onClick={() => setSelectedStudentClass("12")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedStudentClass === "12" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Class 12 ({countClass12})
                    </button>
                  </div>

                  <div className="relative w-full sm:w-48">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>
              </div>

              {filteredStudents.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-8 italic">No students found.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredStudents.map((student) => {
                    const studentClassVal = student.studentClass ? student.studentClass : "11";

                    return (
                      <div key={student._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                            {student.image ? (
                              <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-400">
                                {student.name?.charAt(0) || "S"}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs font-bold text-zinc-100 truncate">{student.name || "Unnamed"}</h4>
                              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg font-medium">
                                Class {studentClassVal}
                              </span>
                              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg font-medium">
                                Roll: {student.studentRoll || "N/A"}
                              </span>
                            </div>
                            
                            <p className="text-xs text-zinc-400">{student.email}</p>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-zinc-300">
                              {student.collegeName && (
                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
                                  <Building2 className="w-3 h-3 text-zinc-400" />
                                  {student.collegeName}
                                </span>
                              )}
                              {student.batch && (
                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
                                  <Users className="w-3 h-3 text-zinc-400" />
                                  Batch: {student.batch}
                                </span>
                              )}
                              {student.groupName && (
                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
                                  <BookOpen className="w-3 h-3 text-zinc-400" />
                                  {student.groupName}
                                </span>
                              )}
                              {student.academicYear && (
                                <span className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800 text-zinc-300">
                                  <Calendar className="w-3 h-3 text-zinc-400" />
                                  {student.academicYear}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800 flex-wrap">
                          {/* স্টুডেন্টকে অ্যাডমিন বানানোর বাটন */}
                          <button
                            onClick={() => handleToggleRole(student._id, student.role || "student")}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                            title="Make Admin"
                          >
                            <UserPlus className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Make Admin</span>
                          </button>

                          <button
                            onClick={() => handleToggleBlock(student._id, student.isBlocked)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                              student.isBlocked 
                                ? "bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800" 
                                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            {student.isBlocked ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                            <span>{student.isBlocked ? "Unblock" : "Block"}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteStudent(student._id)}
                            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
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

          {activeTab === "admins" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-100 border-b border-zinc-800 pb-3">
                <Shield className="w-4 h-4 text-zinc-400" /> Admin Directory ({admins.length})
              </h2>

              {admins.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-8 italic">No admins found.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {admins.map((admin) => (
                    <div key={admin._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                          {admin.image ? (
                            <img src={admin.image} alt={admin.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-400">
                              {admin.name?.charAt(0) || "A"}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs font-bold text-zinc-100 truncate">{admin.name || "Unnamed Admin"}</h4>
                            <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg font-medium">
                              Role: Admin
                            </span>
                          </div>
                          
                          <p className="text-xs text-zinc-400">{admin.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800 flex-wrap">
                       
                        <button
                          onClick={() => handleToggleRole(admin._id, "admin")}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                          title="Remove Admin Role"
                        >
                          <UserMinus className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Demote to Student</span>
                        </button>

                        <button
                          onClick={() => handleToggleBlock(admin._id, admin.isBlocked)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                            admin.isBlocked 
                              ? "bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800" 
                              : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {admin.isBlocked ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                          <span>{admin.isBlocked ? "Unblock" : "Block"}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteStudent(admin._id)}
                          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
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