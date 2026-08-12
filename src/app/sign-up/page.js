"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, AlertCircle, GraduationCap, Building2, Layers, Hash, Image as ImageIcon, Loader2, BookOpen } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [studentClass, setStudentClass] = useState("11");
  const [batch, setBatch] = useState("HSC 2026");
  const [studentRoll, setStudentRoll] = useState("");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [collegeName, setCollegeName] = useState("");
  const [groupName, setGroupName] = useState("Science");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

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
        studentClass, 
        batch,
        studentRoll,
        academicYear,
        collegeName,
        groupName,
        image: profileImage,
      }, {
        onSuccess: () => {
          router.push("/");
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8 space-y-6">
        
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold text-zinc-100">Student Registration</h2>
          <p className="text-xs text-zinc-400">T@nmoy's Private Care - Join Your Batch</p>
        </div>

        {error && (
          <div className="bg-zinc-950 border border-zinc-800 text-zinc-300 p-4 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-zinc-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
        
          <div className="flex flex-col items-center justify-center space-y-3 pb-2">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-zinc-600" />
              )}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-zinc-300 animate-spin" />
                </div>
              )}
            </div>
            
            <label className="cursor-pointer bg-zinc-950 hover:bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-zinc-800">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mizanur Rahman"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="space-y-1.5">
  <label className="text-xs font-semibold text-zinc-300">Password</label>
  <div className="relative">
    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
    <input 
      type="text"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
    />
  </div>
</div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Class</label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <select 
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                >
                  <option value="11">Class 11 (First Year)</option>
                  <option value="12">Class 12 (Second Year)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Batch Name</label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="HSC 2026 Science"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Student Roll</label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  placeholder="Roll No (e.g. 101)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Academic Year</label>
              <input 
                type="text" 
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2025-2026"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">College Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Govt. College Name"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Group Name</label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <select 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
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
            className="w-full mt-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-xs disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            <span>{loading ? "Registering Student..." : "Complete Registration"}</span>
          </button>
        </form>

        <p className="text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-zinc-200 hover:underline font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}