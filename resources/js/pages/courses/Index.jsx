import { selectItems, semesters } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import Pagination from '@/components/DataTable/Pagination';
import { toast } from 'sonner';

// UI
import SelectForm from '@/components/form/SelectForm';
import { Badge } from '@/components/ui/badge';
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
        auth,
    } = usePage().props;

    console.log(courses);
    const user = auth.user;

    const { filters, searchTerm, setSearchTerm, handleChange } =
        useTableFilters({
            search: serverFilters.search ?? '',
            sort_by: serverFilters.sort_by ?? 'created_at',
            sort_dir: serverFilters.sort_dir ?? 'desc',
            limit: serverFilters.limit ?? 10,
            semester: serverFilters.semester ?? '',
        });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

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
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold">Courses</h1>

                    {user.role === 'admin' && (
                        <Button asChild>
                            <Link href="/courses/create">+ New Course</Link>
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 rounded-lg border p-4">
                    <Input
                        placeholder="Search course..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />

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

                {/* Table */}
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead className="text-center">
                                    Credit
                                </TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {courses.data.length > 0 ? (
                                courses.data.map((course, index) => (
                                    <TableRow
                                        key={course.id}
                                        className="hover:bg-muted/40"
                                    >
                                        <TableCell>
                                            {(courses.from || 0) + index}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {course.title}
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">
                                                {course.code}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {course.credit}
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="secondary">
                                                Semester {course.semester}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <GenericActionMenu
                                                resource="courses"
                                                id={course.id}
                                                actions={['edit', 'delete']}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No courses found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <Pagination paginator={courses} />
            </div>
        </AppLayout>
    );
}
