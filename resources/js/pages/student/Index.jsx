
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ students }) {
    return (
        <AppLayout>
            <Head title="Students" />

            <div className="p-6">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Students</h1>
                    <Link
                        href="/students/create"
                        className="rounded bg-slate-800 px-4 py-2 text-white"
                    >
                        Add Student
                    </Link>
                </div>

                <table className="w-full border">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Batch</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td className="border p-2">{student.name}</td>
                                <td className="border p-2">{student.email}</td>
                                <td className="border p-2">
                                    {student.batch?.name}
                                </td>
                                <td className="border p-2">
                                    <Link
                                        href={`/students/${student.id}`}
                                        className="text-blue-600"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
