"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client"; // আপনার auth-client থেকে
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, ShieldAlert, GraduationCap, Building2, Layers, Hash, Image as ImageIcon, Loader2, BookOpen } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // স্টুডেন্ট প্রোফাইল অতিরিক্ত ফিল্ডস (ক্লাস সহ)
  const [studentClass, setStudentClass] = useState("11");
  const [batch, setBatch] = useState("HSC 2026");
  const [studentRoll, setStudentRoll] = useState("");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [collegeName, setCollegeName] = useState("");
  const [groupName, setGroupName] = useState("Science");

  // ইমেজ আপলোড স্টেট
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  // ImgBB তে ছবি আপলোড করার ফাংশন
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=4f4340e1ee0cb258477b894e127112b2`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setProfileImage(data.data.url);
      } else {
        setError("Image upload failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong during image upload.");
    } finally {
      setUploadingImage(false);
    }
  };

  // ফর্ম সাবমিট ও রেজিস্ট্রেশন
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!profileImage) {
      setError("Please wait or upload a profile picture!");
      return;
    }

    setLoading(true);

    try {
      await signUp.email({
        email,
        password,
        name,
        role: "student",
        studentClass, // ক্লাস ডাটা পাঠানো হচ্ছে
        batch,
        studentRoll,
        academicYear,
        collegeName,
        groupName,
        image: profileImage,
      }, {
        onSuccess: () => {
          router.push("/student/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Registration failed!");
          setLoading(false);
        }
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Student Registration</h2>
          <p className="text-sm text-slate-400">T@nmoy's Private Care - Join Your Batch</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-sm flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          
          {/* প্রোফাইল ছবি আপলোড সেকশন */}
          <div className="flex flex-col items-center justify-center space-y-3 pb-2">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/50 bg-slate-950 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-600" />
              )}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                </div>
              )}
            </div>
            
            <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-medium transition-all border border-slate-700">
              <span>{uploadingImage ? "Uploading..." : "Upload Profile Picture"}</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    handleImageUpload(file);
                  }
                }}
              />
            </label>
          </div>

          {/* নাম ও ইমেল */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mizanur Rahman"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* পাসওয়ার্ড ও ক্লাস নির্বাচন */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Class</label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <select 
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                >
                  <option value="11">Class 11 (First Year)</option>
                  <option value="12">Class 12 (Second Year)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ব্যাচ নাম ও রোল */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Batch Name</label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="HSC 2026 Science"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Student Roll</label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  placeholder="Roll No (e.g. 101)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* শিক্ষাবর্ষ ও কলেজ নাম */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Academic Year</label>
              <input 
                type="text" 
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2025-2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">College Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Govt. College Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* গ্রুপ নাম */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Group Name</label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
              <select 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || uploadingImage || !profileImage}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? "Registering Student..." : "Complete Registration"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-indigo-400 hover:underline font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}