//"use client";
//
//import { useState } from "react";
//import Link from "next/link";
//import { usePathname } from "next/navigation";
//import { 
//  Menu, X, Bell, User, LogOut, BookOpen, 
//  Home, Users, LayoutDashboard, ShieldCheck 
//} from "lucide-react";
//import { authClient } from "@/lib/auth-client"; 
//
//export default function Navbar() {
//  const [isOpen, setIsOpen] = useState(false);
//  const [showDropdown, setShowDropdown] = useState(false);
//  const pathname = usePathname();
//
//  const { data: session, isPending } = authClient.useSession();
//
//  const isAdmin = session?.user?.role === "admin";
//  const isStudent = session?.user?.role === "student";
//
//  const isActive = (path) => pathname === path;
//
//  return (
//    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
//      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//        <div className="flex items-center justify-between h-20">
//         
//       
//          <div className="flex-shrink-0">
//            <Link href="/" className="flex items-center gap-2.5">
//             <div>
//              <img src="/logo.PNG" alt="Logo" className="w-10 h-10 rounded-full object-cover border border-zinc-800" />
//             </div>
//              <div>
//                <span className="text-xl font-bold text-zinc-100 tracking-tight">T@NMOY'S</span>
//                <span className="block text-[10px] text-zinc-400 font-semibold tracking-[0.2em]">PRIVATE CARE</span>
//              </div>
//            </Link>
//          </div>
//
//          {/* Desktop Navigation */}
//          <nav className="hidden md:flex items-center space-x-1">
//            <Link 
//              href="/" 
//              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                isActive("/") ? "bg-zinc-900 text-zinc-100 border border-zinc-800" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
//              }`}
//            >
//              <Home className="w-4 h-4" /> Home
//            </Link>
//            <Link 
//              href="/results" 
//              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                isActive("/results") ? "bg-zinc-900 text-zinc-100 border border-zinc-800" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
//              }`}
//            >
//              <Users className="w-4 h-4" /> Results
//            </Link>
//            <Link 
//              href="/notices" 
//              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                isActive("/notices") ? "bg-zinc-900 text-zinc-100 border border-zinc-800" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
//              }`}
//            >
//              <Bell className="w-4 h-4" /> Notices
//            </Link>
//          </nav>
//
//     
//          <div className="hidden md:flex items-center space-x-4">
//            {!isPending && session ? (
//              <div className="relative">
//                <button
//                  onClick={() => setShowDropdown(!showDropdown)}
//                  className="flex items-center gap-3 p-1.5 pl-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
//                >
//                  <span className="text-sm text-zinc-200">{session.user.name}</span>
//                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover" />
//                </button>
//
//                {showDropdown && (
//                  <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 z-50">
//                    <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-400">
//                      Role: <span className="font-bold text-zinc-200 uppercase">{session.user.role}</span>
//                    </div>
//                    
//                    {isAdmin && (
//                      <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60">
//                        <ShieldCheck className="w-4 h-4 text-zinc-400" /> Admin Dashboard
//                      </Link>
//                    )}
//                    {isStudent && (
//                      <Link href="/student/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60">
//                        <LayoutDashboard className="w-4 h-4 text-zinc-400" /> Student Profile
//                      </Link>
//                    )}
//
//                    <button 
//                      onClick={() => authClient.signOut()}
//                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10"
//                    >
//                      <LogOut className="w-4 h-4" /> Logout
//                    </button>
//                  </div>
//                )}
//              </div>
//            ) : (
//              <div className="flex items-center gap-3">
//                <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-zinc-200 px-3 py-2">Login</Link>
//                <Link href="/sign-up" className="px-4 py-2 text-sm bg-zinc-100 text-zinc-900 font-medium rounded-lg hover:bg-zinc-200 transition-all">Register</Link>
//              </div>
//            )}
//          </div>
//
//          
//          <div className="flex md:hidden items-center">
//            <button
//              onClick={() => setIsOpen(!isOpen)}
//              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
//            >
//              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//            </button>
//          </div>
//
//        </div>
//      </div>
//
//   
//      {isOpen && (
//        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
//          <nav className="flex flex-col space-y-1">
//            <Link 
//              href="/" 
//              onClick={() => setIsOpen(false)}
//              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
//                isActive("/") ? "bg-zinc-900 text-zinc-100 border border-zinc-800" : "text-zinc-400"
//              }`}
//            >
//              <Home className="w-4 h-4" /> Home
//            </Link>
//            <Link 
//              href="/results" 
//              onClick={() => setIsOpen(false)}
//              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
//                isActive("/results") ? "bg-zinc-900 text-zinc-100 border border-zinc-800" : "text-zinc-400"
//              }`}
//            >
//              <Users className="w-4 h-4" /> Results
//            </Link>
//            <Link 
//              href="/notices" 
//              onClick={() => setIsOpen(false)}
//              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
//                isActive("/notices") ? "bg-zinc-900 text-zinc-100 border border-zinc-800" : "text-zinc-400"
//              }`}
//            >
//              <Bell className="w-4 h-4" /> Notices
//            </Link>
//          </nav>
//
//          <div className="pt-4 border-t border-zinc-800">
//            {!isPending && session ? (
//              <div className="space-y-3">
//                <div className="flex items-center gap-3 px-2">
//                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover" />
//                  <div>
//                    <span className="block text-sm font-bold text-zinc-100">{session.user.name}</span>
//                    <span className="text-xs text-zinc-400 uppercase font-semibold">{session.user.role}</span>
//                  </div>
//                </div>
//
//                {isAdmin && (
//                  <Link 
//                    href="/admin/dashboard" 
//                    onClick={() => setIsOpen(false)} 
//                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl"
//                  >
//                    <ShieldCheck className="w-4 h-4 text-zinc-400" /> Admin Dashboard
//                  </Link>
//                )}
//                {isStudent && (
//                  <Link 
//                    href="/student/dashboard" 
//                    onClick={() => setIsOpen(false)} 
//                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl"
//                  >
//                    <LayoutDashboard className="w-4 h-4 text-zinc-400" /> Student Profile
//                  </Link>
//                )}
//
//                <button 
//                  onClick={() => { authClient.signOut(); setIsOpen(false); }}
//                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20"
//                >
//                  <LogOut className="w-4 h-4" /> Logout
//                </button>
//              </div>
//            ) : (
//              <div className="grid grid-cols-2 gap-3">
//                <Link 
//                  href="/sign-in" 
//                  onClick={() => setIsOpen(false)} 
//                  className="text-center py-2.5 text-sm font-medium bg-zinc-900 text-zinc-300 rounded-xl border border-zinc-800 hover:bg-zinc-800/80"
//                >
//                  Login
//                </Link>
//                <Link 
//                  href="/sign-up" 
//                  onClick={() => setIsOpen(false)} 
//                  className="text-center py-2.5 text-sm font-medium bg-zinc-100 text-zinc-900 rounded-xl hover:bg-zinc-200"
//                >
//                  Register
//                </Link>
//              </div>
//            )}
//          </div>
//        </div>
//      )}
//    </header>
//  );
//}




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
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-[#07090e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
         
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div>
                <img src="/logo.PNG" alt="Logo" className="w-10 h-10 rounded-full object-cover border border-slate-800" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-100 tracking-tight">T@NMOY'S</span>
                <span className="block text-[10px] text-violet-400 font-semibold tracking-[0.2em]">PRIVATE CARE</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/") ? "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Home className="w-4 h-4 text-violet-400" /> Home
            </Link>
            <Link 
              href="/results" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/results") ? "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Users className="w-4 h-4 text-violet-400" /> Results
            </Link>
            <Link 
              href="/notices" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/notices") ? "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Bell className="w-4 h-4 text-violet-400" /> Notices
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isPending && session ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-inner"
                >
                  <span className="text-sm font-medium text-slate-200">{session.user.name}</span>
                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0c0f17] border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-800/80 text-xs text-slate-400">
                      Role: <span className="font-bold text-violet-400 uppercase tracking-wider">{session.user.role}</span>
                    </div>
                    
                    {isAdmin && (
                      <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 transition-colors">
                        <ShieldCheck className="w-4 h-4 text-violet-400" /> Admin Dashboard
                      </Link>
                    )}
                    {isStudent && (
                      <Link href="/student/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-violet-400" /> Student Profile
                      </Link>
                    )}

                    <button 
                      onClick={() => authClient.signOut()}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="text-sm font-medium text-slate-400 hover:text-slate-200 px-3 py-2 transition-colors">Login</Link>
                <Link href="/sign-up" className="px-5 py-2 text-sm bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/20 transition-all">Register</Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#07090e] border-b border-slate-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1.5">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive("/") ? "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm" : "text-slate-400"
              }`}
            >
              <Home className="w-4 h-4 text-violet-400" /> Home
            </Link>
            <Link 
              href="/results" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive("/results") ? "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm" : "text-slate-400"
              }`}
            >
              <Users className="w-4 h-4 text-violet-400" /> Results
            </Link>
            <Link 
              href="/notices" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive("/notices") ? "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm" : "text-slate-400"
              }`}
            >
              <Bell className="w-4 h-4 text-violet-400" /> Notices
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-900">
            {!isPending && session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-1">
                  <img src={session.user.image || "/avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover border border-slate-800" />
                  <div>
                    <span className="block text-sm font-bold text-slate-100">{session.user.name}</span>
                    <span className="text-xs text-violet-400 uppercase font-semibold tracking-wider">{session.user.role}</span>
                  </div>
                </div>

                {isAdmin && (
                  <Link 
                    href="/admin/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 bg-slate-900 border border-slate-800 rounded-xl"
                  >
                    <ShieldCheck className="w-4 h-4 text-violet-400" /> Admin Dashboard
                  </Link>
                )}
                {isStudent && (
                  <Link 
                    href="/student/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 bg-slate-900 border border-slate-800 rounded-xl"
                  >
                    <LayoutDashboard className="w-4 h-4 text-violet-400" /> Student Profile
                  </Link>
                )}

                <button 
                  onClick={() => { authClient.signOut(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/sign-in" 
                  onClick={() => setIsOpen(false)} 
                  className="text-center py-3 text-sm font-medium bg-slate-900 text-slate-300 rounded-xl border border-slate-800 hover:bg-slate-800/80 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/sign-up" 
                  onClick={() => setIsOpen(false)} 
                  className="text-center py-3 text-sm font-semibold bg-violet-600 text-white rounded-xl shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-colors"
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
