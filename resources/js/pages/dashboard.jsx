import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Book, UserCheck, UserX, DollarSign, BookOpen } from 'lucide-react';

export default function Dashboard() {
    const { auth, stats } = usePage().props;
    const { user } = auth;

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Welcome, {user.name}!</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {user.role === 'admin' ? (
                        <>
                            <StatCard icon={<Users />} title="Total Students" value={stats.total_students} />
                            <StatCard icon={<Book />} title="Total Courses" value={stats.total_courses} />
                            <StatCard icon={<UserX />} title="Pending Students" value={stats.pending_students} />
                            <StatCard icon={<UserCheck />} title="Active Students" value={stats.active_students} />
                        </>
                    ) : (
                        <>
                            <StatCard icon={<BookOpen />} title="Enrolled Courses" value={stats.enrolled_courses} />
                            <StatCard icon={<DollarSign />} title="Paid Fee" value={stats.paid_fee} />
                            <StatCard icon={<DollarSign />} title="Due Fee" value={stats.due_fee} />
                        </>
                    )}
                </div>
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
