import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth, stats } = usePage().props;
    const { user } = auth;
    console.log(stats);

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-semibold">
                    Welcome, {user.name}!
                </h1>

                {/* ================= ROLE BASED DASHBOARD ================= */}
                {user.role === 'admin' ? (
                    <>
                        {/* ADMIN STATS */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Total Students"
                                value={stats.total_students}
                            />
                            <StatCard
                                title="Active Students"
                                value={stats.active_students}
                            />
                            <StatCard
                                title="Pending Students"
                                value={stats.pending_students}
                            />
                            <StatCard
                                title="Total Courses"
                                value={stats.total_courses}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* STUDENT STATS */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Total Payable"
                                value={stats.total_payable}
                            />
                            <StatCard title="Paid Fee" value={stats.paid_fee} />
                            <StatCard title="Due Fee" value={stats.due_fee} />
                            <StatCard title="Batch" value="26th" />
                        </div>

                        {/* COURSES SECTION */}
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <CourseTable title="Completed Courses" />
                            <StatusBox
                                title="Upcoming Courses"
                                message="There is no offered course for next semester."
                            />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Student Basic Info */}
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100"></div>
                                    <div>
                                        <h2 className="text-gray-900">
                                            Student Basic Info
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            First Capital University of
                                            Bangladesh
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <span className="text-sm text-gray-600">
                                                Name:{' '}
                                            </span>
                                            <span className="text-gray-900">
                                                Nasimul Noyon Ontor
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">
                                                Department:{' '}
                                            </span>
                                            <span className="text-gray-900">
                                                Department Of English
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">
                                                Faculty:{' '}
                                            </span>
                                            <span className="text-gray-900">
                                                FHSS
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">
                                                Mobile:{' '}
                                            </span>
                                            <span className="text-gray-900">
                                                01759799999
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">
                                                Blood Group:{' '}
                                            </span>
                                            <span className="text-gray-900">
                                                O+
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="flex h-40 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-300"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Semester Wise SGPA */}
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100"></div>
                                        <div>
                                            <h2 className="text-gray-900">
                                                Semester Wise SGPA
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                First Capital University of
                                                Bangladesh
                                            </p>
                                        </div>
                                    </div>
                                    <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                        <option>Year 2023</option>
                                        <option>Year 2022</option>
                                        <option>Year 2021</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}

const StatCard = ({ icon, title, value }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);
function CourseTable({ title }) {
    return (
        <div className="rounded-xl border bg-background">
            <div className="bg-muted px-6 py-3 text-sm font-semibold uppercase">
                {title}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Code</th>
                            <th className="p-3 text-left">Course Name</th>
                            <th className="p-3 text-left">Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index} className="border-b last:border-0">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 text-primary">
                                    {course.code}
                                </td>
                                <td className="p-3">{course.name}</td>
                                <td className="p-3">{course.credit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBox({ title, message }) {
    return (
        <div className="rounded-xl border bg-background">
            <div className="bg-muted px-6 py-3 text-sm font-semibold uppercase">
                {title}
            </div>
            <div className="p-4 text-sm text-muted-foreground">{message}</div>
        </div>
    );
}
const courses = [
    { code: 'CSE 201', name: 'Intro to Programming Lab', credit: '1.5' },
    { code: 'CSE 202', name: 'Intro to Programming', credit: '3.0' },
    { code: 'ENG 206', name: 'Professional Communication', credit: '2.0' },
];
