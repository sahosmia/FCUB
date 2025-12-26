import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Head } from '@inertiajs/react';
import { User, GraduationCap } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth, stats } = usePage().props;
    const { user } = auth;

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">

                {/* TOP SUMMARY CARDS */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card title="Total Payable" value="$4,200" note="Study Year: 2020–2024" />
                    <Card title="Total Paid" value="$2,000" note="Last Payment: 12-05-2023" />
                    <Card title="Total Due" value="$2,200" note="Updated: 10-06-2023" />

                    <div className="rounded-xl border bg-background p-4">
                        <h4 className="text-sm font-semibold text-yellow-600">
                            🎓 B.Sc in Computer Science & Engineering
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Batch: 26th
                        </p>
                    </div>
                </div>

                {/* COURSES */}
                <div className="grid gap-4 md:grid-cols-2">
                    <CourseTable title="COMPLETED COURSES" />
                    <StatusBox
                        title="UPCOMING COURSES"
                        message="There is no offered course for next semester."
                    />
                </div>

                {/* STUDENT INFO + SGPA */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Student Basic Info */}
                    <div className="rounded-xl border bg-background p-6">
                        <SectionHeader
                            icon={<User className="h-4 w-4" />}
                            title="Student Basic Info"
                            subtitle="First Capital University of Bangladesh"
                        />

                        <div className="flex gap-6">
                            <div className="flex-1 space-y-3 text-sm">
                                <InfoRow label="Name" value="Nasimul Noyon Ontor" />
                                <InfoRow label="Department" value="Department of English" />
                                <InfoRow label="Faculty" value="FHSS" />
                                <InfoRow label="Mobile" value="01759799999" />
                                <InfoRow label="Blood Group" value="O+" />
                            </div>

                            <div className="flex-shrink-0">
                                <div className="flex h-40 w-32 items-center justify-center rounded-lg bg-muted">
                                    <User className="h-16 w-16 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Semester Wise SGPA */}
                    <div className="rounded-xl border bg-background p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <SectionHeader
                                icon={<GraduationCap className="h-4 w-4" />}
                                title="Semester Wise SGPA"
                                subtitle="First Capital University of Bangladesh"
                            />

                            <select className="rounded-md border bg-background px-3 py-2 text-sm">
                                <option>Year 2023</option>
                                <option>Year 2022</option>
                                <option>Year 2021</option>
                            </select>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            SGPA data will be displayed here.
                        </p>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

/* ================= COMPONENTS ================= */

function Card({ title, value, note }) {
    return (
        <div className="rounded-xl border bg-background p-4">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h2 className="mt-1 text-2xl font-bold">{value}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{note}</p>
        </div>
    );
}

function StatusBox({ title, message }) {
    return (
        <div className="rounded-xl border bg-background">
            <div className="bg-muted px-6 py-3 text-sm font-semibold uppercase">
                {title}
            </div>
            <div className="p-4 text-sm text-muted-foreground">
                {message}
            </div>
        </div>
    );
}

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
                                <td className="p-3 text-primary">{course.code}</td>
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

function SectionHeader({ icon, title, subtitle }) {
    return (
        <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                {icon}
            </div>
            <div>
                <h2 className="font-semibold leading-none">{title}</h2>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div>
            <span className="text-muted-foreground">{label}: </span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

/* ================= MOCK DATA ================= */

const courses = [
    { code: 'CSE 201', name: 'Intro to Programming Lab', credit: '1.5' },
    { code: 'CSE 202', name: 'Intro to Programming', credit: '3.0' },
    { code: 'ENG 206', name: 'Professional Communication', credit: '2.0' },
];

