import { selectItems, semesters } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// Custom Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import Pagination from '@/components/DataTable/Pagination';
import { toast } from 'sonner';

// Shadcn components
import SelectForm from '@/components/form/SelectForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Index() {
    const {
        courses = {},
        filters: serverFilters = {},
        flash,
    } = usePage().props;

    const { filters, searchTerm, setSearchTerm, handleChange } =
        useTableFilters({
            search: serverFilters.search ?? '',
            sort_by: serverFilters.sort_by ?? 'created_at',
            sort_dir: serverFilters.sort_dir ?? 'desc',
            limit: serverFilters.limit ?? 10,
            is_active: serverFilters.is_active ?? '',
            semester: serverFilters.semester ?? '',
        });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                id: 'success-toast',
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                id: 'error-toast',
            });
        }
    }, [flash]);

    // Debounce search effect (ekhaneo rakha jay ba hook-e neya jay)
    useEffect(() => {
        const t = setTimeout(() => {
            if (searchTerm !== filters.search)
                handleChange('search', searchTerm);
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    return (
        <AppLayout>
            <Head title="Courses" />
            <div className="space-y-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Courses</h1>
                    <Button asChild>
                        <Link href="/courses/create">New Course</Link>
                    </Button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 max-w-md"
                    />

                    {/* Dynamic Filter Reusable Pattern */}
                    {[
                        {
                            key: 'sort_by',
                            placeholder: 'Sort By',
                            items: [
                                { label: 'Date', value: 'created_at' },
                                { label: 'Title', value: 'title' },
                            ],
                        },
                        {
                            key: 'limit',
                            placeholder: 'Limit',
                            items: selectItems,
                        },
                        {
                            key: 'semester',
                            placeholder: 'Semester',
                            items: semesters,
                        },
                    ].map((config) => (
                        <SelectForm
                            key={config.key}
                            label={null}
                            error={null}
                            value={String(filters[config.key])}
                            onValueChange={(v) => handleChange(config.key, v)}
                            placeholder={config.placeholder}
                            options={config.items}
                        />
                    ))}
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Credit</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.data.map((course, index) => (
                                <TableRow key={course.id}>
                                    <TableCell>
                                        {(courses.from || 0) + index}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {course.title}
                                    </TableCell>
                                    <TableCell>{course.code}</TableCell>
                                    <TableCell>{course.credit}</TableCell>
                                    <TableCell>{course.semester}</TableCell>

                                    <TableCell className="text-right">
                                        <GenericActionMenu
                                            resource="courses"
                                            id={course.id}
                                            actions={['edit', 'delete']}
                                        ></GenericActionMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination paginator={courses} />
            </div>
        </AppLayout>
    );
}
