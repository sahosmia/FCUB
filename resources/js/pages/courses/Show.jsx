import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Show({ course }) {
    return (
        <AppLayout>
            <Head title={course.title} />
            <div className="p-4 max-w-2xl">
                <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="text-sm text-gray-500">Duration: {course.duration ?? '—'} hours</div>
            </div>
        </AppLayout>
    );
}
