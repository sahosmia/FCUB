import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

// Reusable Info Row Component
const InfoRow = ({ label, value, children }) => (
    <div className="mb-3 flex flex-col border-b border-gray-50 pb-2 last:border-0 sm:mb-4 sm:flex-row">
        <span className="w-full text-sm text-gray-500 sm:w-48">{label}</span>
        <div className="flex flex-1 items-center text-sm font-medium text-gray-700">
            <span className="mr-2 hidden text-gray-400 sm:inline">:</span>
            {children ? children : value || '—'}
        </div>
    </div>
);

export default function Show({ user }) {
    const [activeTab, setActiveTab] = useState('PERSONAL');

    const tabs = ['PERSONAL', 'ADDRESS', 'EDUCATION'];

    return (
        <AppLayout>
            <Head title={`Profile - ${user.name}`} />

            <div className="min-h-screen bg-slate-50 p-4 font-sans sm:p-8">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-1 text-xs text-slate-500">
                    <Link
                        href="/dashboard"
                        className="text-red-500 hover:underline"
                    >
                        Home
                    </Link>
                    <span>&gt;</span>
                    <span className="text-gray-600">View Profile</span>
                    <span>&gt;</span>
                    <span className="text-gray-400">{user.name}</span>
                </div>

                {/* Page Title */}
                <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-700 uppercase">
                    Student Profile
                </h1>

                {/* Main Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    {/* Header Section */}
                    <div className="p-6 pb-0">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold tracking-wider text-slate-600 uppercase">
                                {user.role}
                            </span>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-full border px-6 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
                                        activeTab === tab
                                            ? 'border-slate-800 bg-slate-800 text-white shadow-md'
                                            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 transition-all">
                        {/* 1. PERSONAL TAB */}
                        {activeTab === 'PERSONAL' && (
                            <div className="animate-in duration-300 fade-in slide-in-from-bottom-2">
                                <div className="mb-6 inline-block rounded bg-amber-100 px-3 py-1 text-xs font-bold tracking-wide text-amber-800 uppercase">
                                    Personal Information
                                </div>
                                <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Mobile Number
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.phone}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Email Address
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.email}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Home Phone
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.home_phone}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Gender
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.gender}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Date of Birth
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.date_of_birth}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Blood Group
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.blood_group}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Marital Status
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.marital_status}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                National Id
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.national_id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Father's Name
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.father_name}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Father's Occupation
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.father_occupation}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Mother's Name
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.mother_name}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Mother's Occupation
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.mother_occupation}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-40 text-gray-600">
                                                Parents Phone
                                            </span>
                                            <span className="text-gray-500">
                                                : {user.parents_phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button className="rounded bg-[#2c3e50] px-6 py-2 text-xs font-bold text-white uppercase transition hover:bg-[#34495e]">
                                        Edit Personal
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 2. ADDRESS TAB */}
                        {activeTab === 'ADDRESS' && (
                            <div className="animate-in duration-300 fade-in slide-in-from-bottom-2">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    {/* Present Address */}
                                    <div>
                                        <div className="mb-6 inline-block rounded bg-green-100 px-3 py-1 text-xs font-bold tracking-wide text-green-800 uppercase">
                                            Present Address
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Address
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.present_address}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Thana
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.present_thana}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Post Code
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.present_post_code}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    District
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.present_district}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Country
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.present_country}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Permanent Address */}
                                    <div>
                                        <div className="mb-6 inline-block rounded bg-green-100 px-3 py-1 text-xs font-bold tracking-wide text-green-800 uppercase">
                                            Permanent Address
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Address
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.permanent_address}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Thana
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.permanent_thana}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Post Code
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.permanent_post_code}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    District
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.permanent_district}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Country
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.permanent_country}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button className="rounded bg-[#2c3e50] px-6 py-2 text-xs font-bold text-white uppercase transition hover:bg-[#34495e]">
                                        Edit Address
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 3. EDUCATION TAB */}
                        {activeTab === 'EDUCATION' && (
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    {/* SSC/EQUIVALENT */}
                                    <div>
                                        <div className="mb-6 inline-block rounded bg-blue-100 px-3 py-1 text-xs tracking-wide text-blue-800 uppercase">
                                            SSC/EQUIVALENT
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Exam Name
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.ssc_exam_name}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Group
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.ssc_group}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Result
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.ssc_result}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Passing Year
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.ssc_passing_year}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Institute Name
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.ssc_institute_name}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Board
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.ssc_board}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* HSC/EQUIVALENT */}
                                    <div>
                                        <div className="mb-6 inline-block rounded bg-blue-100 px-3 py-1 text-xs tracking-wide text-blue-800 uppercase">
                                            HSC/EQUIVALENT
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Exam Name
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.hsc_exam_name}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Group
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.hsc_group}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Result
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.hsc_result}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Passing Year
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.hsc_passing_year}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Institute Name
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.hsc_institute_name}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-32 text-gray-600">
                                                    Board
                                                </span>
                                                <span className="text-gray-500">
                                                    : {user.hsc_board}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button className="rounded bg-[#2c3e50] px-6 py-2 text-white transition-colors hover:bg-[#34495e]">
                                        Edit Education
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
