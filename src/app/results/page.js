import StudentList from '@/components/StudentList';
import Link from 'next/link';
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const page = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
           
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-sm"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                </Link>
            </div>

           
            <StudentList />
        </div>
    );
};

export default page;