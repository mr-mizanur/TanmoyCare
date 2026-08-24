import StudentList from '@/components/StudentList';
import Link from 'next/link';
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Page = () => {
    return (
        <main className="min-h-screen bg-slate-50 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                <StudentList />
            </div>
        </main>
    );
};

export default Page;