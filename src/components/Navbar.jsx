"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Bell, User, LogOut, BookOpen, 
  Home, Users, LayoutDashboard, ShieldCheck 
} from "lucide-react";
import { authClient } from "@/lib/auth-client"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();


  const { data: session, isPending } = authClient.useSession();


  const isAdmin = session?.user?.role === "admin";
  const isStudent = session?.user?.role === "student";


  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
         
        
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
             <div>
              <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
             </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">T@NMOY'S</span>
                <span className="block text-[10px] text-indigo-400 font-semibold tracking-[0.2em]">PRIVATE CARE</span>
              </div>
            </Link>
          </div>

       
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/") ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-300 hover:text-white"
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link 
              href="/results" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/results") ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-300 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Results
            </Link>
            <Link 
              href="/notices" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/notices") ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-300 hover:text-white"
              }`}
            >
              <Bell className="w-4 h-4" /> Notices
            </Link>
          </nav>

         
          <div className="hidden md:flex items-center space-x-4">
            {!isPending && session ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all"
                >
                  <span className="text-sm text-slate-200">{session.user.name}</span>
                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
                      Role: <span className="font-bold text-indigo-400 uppercase">{session.user.role}</span>
                    </div>
                    
                    {isAdmin && (
                      <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
                        <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}
                    {isStudent && (
                      <Link href="/student/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
                        <LayoutDashboard className="w-4 h-4" /> Student Profile
                      </Link>
                    )}

                    <button 
                      onClick={() => authClient.signOut()}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="text-sm text-slate-300 hover:text-white">Login</Link>
                <Link href="/sign-up" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">Register</Link>
              </div>
            )}
          </div>

         
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive("/") ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-300"
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link 
              href="/results" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive("/results") ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-300"
              }`}
            >
              <Users className="w-4 h-4" /> Results
            </Link>
            <Link 
              href="/notices" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive("/notices") ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-300"
              }`}
            >
              <Bell className="w-4 h-4" /> Notices
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-800">
            {!isPending && session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <span className="block text-sm font-bold text-white">{session.user.name}</span>
                    <span className="text-xs text-indigo-400 uppercase font-semibold">{session.user.role}</span>
                  </div>
                </div>

                {/* মোবাইল মেনুর জন্য ড্যাশবোর্ড বা প্রোফাইল লিংক */}
                {isAdmin && (
                  <Link 
                    href="/admin/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 rounded-xl"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-400" /> Admin Dashboard
                  </Link>
                )}
                {isStudent && (
                  <Link 
                    href="/student/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 rounded-xl"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Student Profile
                  </Link>
                )}

                <button 
                  onClick={() => { authClient.signOut(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/sign-in" 
                  onClick={() => setIsOpen(false)} 
                  className="text-center py-2.5 text-sm font-semibold bg-slate-900 text-slate-300 rounded-xl border border-slate-800"
                >
                  Login
                </Link>
                <Link 
                  href="/sign-up" 
                  onClick={() => setIsOpen(false)} 
                  className="text-center py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}