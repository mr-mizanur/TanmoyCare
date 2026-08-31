"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Bell, User, LogOut, 
  Home, Users, LayoutDashboard, ShieldCheck, Sparkles 
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
         
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div>
                <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">T@NMOY'S</span>
                <span className="block text-[10px] text-indigo-600 font-semibold tracking-[0.2em]">PRIVATE CARE</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/") ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Home className="w-4 h-4 text-indigo-600" /> Home
            </Link>
            <Link 
              href="/results" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/results") ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" /> Results
            </Link>
            <Link 
              href="/notices" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/notices") ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Bell className="w-4 h-4 text-indigo-600" /> Notices
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isPending && session ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-full bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-inner"
                >
                  <span className="text-sm font-semibold text-slate-700">{session.user.name}</span>
                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100 text-xs text-slate-500">
                      Role: <span className="font-bold text-indigo-600 uppercase tracking-wider">{session.user.role}</span>
                    </div>
                    
                    {isAdmin && (
                      <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" /> Admin Dashboard
                      </Link>
                    )}
                    {isStudent && (
                      <Link href="/student/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" /> Student Profile
                      </Link>
                    )}

                    <button 
                      onClick={() => authClient.signOut()}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors">Login</Link>
                <Link href="/sign-up" className="px-5 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all">Register</Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1.5">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold ${
                isActive("/") ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" : "text-slate-600"
              }`}
            >
              <Home className="w-4 h-4 text-indigo-600" /> Home
            </Link>
            <Link 
              href="/results" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold ${
                isActive("/results") ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" : "text-slate-600"
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" /> Results
            </Link>
            <Link 
              href="/notices" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold ${
                isActive("/notices") ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" : "text-slate-600"
              }`}
            >
              <Bell className="w-4 h-4 text-indigo-600" /> Notices
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-100">
            {!isPending && session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-1">
                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
                  <div>
                    <span className="block text-sm font-bold text-slate-900">{session.user.name}</span>
                    <span className="text-xs text-indigo-600 uppercase font-semibold tracking-wider">{session.user.role}</span>
                  </div>
                </div>

                {isAdmin && (
                  <Link 
                    href="/admin/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600" /> Admin Dashboard
                  </Link>
                )}
                {isStudent && (
                  <Link 
                    href="/student/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" /> Student Profile
                  </Link>
                )}

                <button 
                  onClick={() => { authClient.signOut(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-rose-50 text-rose-600 rounded-2xl border border-rose-200 transition-colors shadow-sm"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/sign-in" 
                  onClick={() => setIsOpen(false)} 
                  className="text-center py-3 text-sm font-semibold bg-slate-50 text-slate-700 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Login
                </Link>
                <Link 
                  href="/sign-up" 
                  onClick={() => setIsOpen(false)} 
                  className="text-center py-3 text-sm font-semibold bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
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