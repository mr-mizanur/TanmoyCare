"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Edit3, User, BookOpen, Award, Bell, LogOut, CheckCircle, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 

export default function StudentDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState("overview"); 
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [studentResults, setStudentResults] = useState([]);
  const [notices, setNotices] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    studentRoll: "",
    batch: "",
    academicYear: "",
    collegeName: "",
    groupName: "",
    studentClass: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        studentRoll: session.user.studentRoll || "",
        batch: session.user.batch || "",
        academicYear: session.user.academicYear || "",
        collegeName: session.user.collegeName || "",
        groupName: session.user.groupName || "",
        studentClass: session.user.studentClass || "",
        image: session.user.image || "",
      });

      if (session.user.studentRoll) {
        fetchStudentResults(session.user.studentRoll);
      }
      fetchNotices();
    }
  }, [session]);

  const fetchStudentResults = async (roll) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/results/roll/${roll}`);
      const data = await res.json();
      if (data.success) {
        setStudentResults(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch results:", err);
    }
  };

  const fetchNotices = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/notices`);
      const data = await res.json();
      if (data.success) {
        setNotices(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch notices:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    setUploadingImage(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const apiKey = "4f4340e1ee0cb258477b894e127112b2";
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageFormData,
      });
      const data = await res.json();

      if (data.success) {
        setFormData({ ...formData, image: data.data.url });
      } else {
        setErrorMessage("Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong during image upload!");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/students/profile/${session.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Profile updated successfully! Refresh to see final updates.");
      } else {
        setErrorMessage(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-300" />
        <span className="text-xs">Loading Student Dashboard...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Profile Summary Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img 
              src={formData.image || "/avatar.png"} 
              alt="Profile" 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-700 shadow-lg bg-zinc-950" 
            />
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-zinc-100">{formData.name || "Student Name"}</h1>
              <p className="text-xs text-zinc-400">Roll: <span className="text-zinc-200 font-semibold">{formData.studentRoll || "Not Set"}</span> | Class: <span className="text-zinc-200 font-semibold">{formData.studentClass || "N/A"}</span></p>
              <p className="text-xs text-zinc-500">{session?.user?.email}</p>
            </div>
          </div>

          {/* Navigation Tab Buttons */}
          <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${activeTab === "overview" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${activeTab === "results" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              My Results
            </button>
            <button 
              onClick={() => setActiveTab("edit-profile")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${activeTab === "edit-profile" ? "bg-zinc-100 text-zinc-900 shadow" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-zinc-300">
                <User className="w-5 h-5 text-zinc-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-100">Academic Details</h2>
              </div>
              <div className="space-y-2 text-xs text-zinc-300">
                <p className="flex justify-between border-b border-zinc-800 pb-2"><span>Batch:</span> <span className="font-semibold text-zinc-100">{formData.batch || "N/A"}</span></p>
                <p className="flex justify-between border-b border-zinc-800 pb-2"><span>Academic Year:</span> <span className="font-semibold text-zinc-100">{formData.academicYear || "N/A"}</span></p>
                <p className="flex justify-between border-b border-zinc-800 pb-2"><span>College:</span> <span className="font-semibold text-zinc-100">{formData.collegeName || "N/A"}</span></p>
                <p className="flex justify-between"><span>Group:</span> <span className="font-semibold text-zinc-100">{formData.groupName || "N/A"}</span></p>
              </div>
            </div>

            <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-zinc-300">
                <Bell className="w-5 h-5 text-zinc-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-100">Recent Notices</h2>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {notices.length > 0 ? (
                  notices.slice(0, 3).map((notice, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                      <h3 className="text-xs font-bold text-zinc-100">{notice.title || "Important Notice"}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">{notice.description || notice.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 italic">No notices available right now.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MY RESULTS ================= */}
        {activeTab === "results" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
              <Award className="w-5 h-5 text-zinc-400" />
              <h2 className="text-lg font-bold text-zinc-100">Exam Results History</h2>
            </div>
            
            <div className="space-y-3">
              {studentResults.length > 0 ? (
                studentResults.map((resItem, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800 gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100">{resItem.examName || "Class Assessment"}</h3>
                      <p className="text-xs text-zinc-500">Roll: {resItem.studentRoll}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                        CQ: {resItem.cqMarks || 0} | MCQ: {resItem.mcqMarks || 0}
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold">
                        Total: {resItem.totalMarks || 0}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-zinc-500 text-xs italic">
                  No results found for your roll ({formData.studentRoll || "Unassigned"}).
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: EDIT PROFILE ================= */}
        {activeTab === "edit-profile" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
              <Edit3 className="w-5 h-5 text-zinc-400" />
              <h2 className="text-lg font-bold text-zinc-100">Edit Student Profile & Information</h2>
            </div>

            {successMessage && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-zinc-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-zinc-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Student Roll</label>
                <input 
                  type="text" 
                  name="studentRoll" 
                  value={formData.studentRoll} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Class</label>
                <input 
                  type="text" 
                  name="studentClass" 
                  value={formData.studentClass} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Batch</label>
                <input 
                  type="text" 
                  name="batch" 
                  value={formData.batch} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Academic Year</label>
                <input 
                  type="text" 
                  name="academicYear" 
                  value={formData.academicYear} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">College Name</label>
                <input 
                  type="text" 
                  name="collegeName" 
                  value={formData.collegeName} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Group Name (Science/Arts/Commerce)</label>
                <input 
                  type="text" 
                  name="groupName" 
                  value={formData.groupName} 
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-zinc-300">Profile Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-800 bg-zinc-950" 
                    />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-100 file:text-zinc-900 hover:file:bg-zinc-200 cursor-pointer"
                  />
                </div>
                {uploadingImage && <p className="text-xs text-zinc-400 animate-pulse pt-1">Uploading image to ImgBB...</p>}
              </div>

              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Profile Changes</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}