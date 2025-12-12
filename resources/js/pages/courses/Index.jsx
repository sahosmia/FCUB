import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Pagination from '../../components/DataTable/Pagination';

export default function Index() {
    /**
     * Server-provided paginated data & initial filters
     */
    const { courses = {}, filters: serverFilters = {} } = usePage().props;
    const items = courses.data || [];

    /**
     * Local filter state (search, sort, limit)
     * Maintains UI-level state independently of server response.
     */
    const [filters, setFilters] = useState({
        search: serverFilters.search ?? '',
        sort_by: serverFilters.sort_by ?? 'created_at',
        sort_dir: serverFilters.sort_dir ?? 'desc',
        limit: serverFilters.limit ?? 10,
    });

    /**
     * Dedicated search term for debouncing user typing
     */
    const [searchTerm, setSearchTerm] = useState(filters.search);

    useEffect(() => setSearchTerm(filters.search), [filters.search]);

    /**
     * Debounce search for smoother UX (500ms)
     */
    useEffect(() => {
        const t = setTimeout(() => {
            applyFilters({ search: searchTerm, page: 1 });
        }, 500);

        return () => clearTimeout(t);
    }, [searchTerm]);

    /**
     * Sends updated query params to the server using Inertia
     * Automatically merges local UI filters with server-side pagination.
     */
    function applyFilters(partial = {}) {
        const next = { ...filters, ...partial };

        const query = {
            search: next.search || undefined,
            sort_by: next.sort_by,
            sort_dir: next.sort_dir,
            limit: next.limit,
            ...(partial.page !== undefined && { page: partial.page }),
        };

        router.get(window.location.pathname, query, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    /**
     * Handles immediate filter changes (sort_by, sort_dir, limit)
     */
    function handleChange(key, value) {
        setFilters((s) => ({ ...s, [key]: value }));
        if (key !== 'search') applyFilters({ [key]: value, page: 1 });
    }

    /**
     * Extracts the page number from pagination URLs
     */
    function handlePagination(url) {
        if (!url) return;
        const urlParams = new URLSearchParams(new URL(url).search);
        const nextPage = urlParams.get('page');
        if (nextPage) applyFilters({ page: nextPage });
    }

    /**
     * Course deletion handler with confirmation
     */
    function handleDelete(id) {
        if (!confirm('Are you sure you want to delete this course?')) return;

        router.delete(`/courses/${id}`);
    }

    return (
        <AppLayout>
            <Head title="Courses" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Courses</h1>

                    <Button asChild>
                        <Link href="/courses/create">New Course</Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchTerm(value);
                            setFilters((f) => ({ ...f, search: value }));
                        }}
                        className="max-w-md"
                    />

                    <Select
                        value={filters.sort_by}
                        onValueChange={(v) => handleChange('sort_by', v)}
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="created_at">
                                Created Date
                            </SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.sort_dir}
                        onValueChange={(v) => handleChange('sort_dir', v)}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Direction" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">DESC</SelectItem>
                            <SelectItem value="asc">ASC</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={String(filters.limit)}
                        onValueChange={(v) => handleChange('limit', Number(v))}
                    >
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-40 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="py-6 text-center"
                                    >
                                        No courses found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((course, index) => (
                                    <TableRow key={course.id}>
                                        <TableCell>
                                            {(courses.from || 0) + index}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {course.title}
                                        </TableCell>

                                        <TableCell className="max-w-md truncate text-gray-600">
                                            {course.description}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                        title="More Options"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/courses/${course.id}`}
                                                            className="flex items-center"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/courses/${course.id}/edit`}
                                                            className="flex items-center text-blue-600"
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit Course
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDelete(
                                                                course.id,
                                                            )
                                                        }
                                                        className="flex cursor-pointer items-center text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Course
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>


                <Pagination paginator={courses} />

            </div>
        </AppLayout>
    );
}
