import { selectItems } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

import { roles } from '@/constants';

// Custom Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import Pagination from '@/components/DataTable/Pagination';
import StatusBadge from '@/components/DataTable/StatusBadeg';

// Shadcn components
import SelectForm from '@/components/form/SelectForm';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
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
    const { users = {}, filters: serverFilters = {} } = usePage().props;

    const { filters, searchTerm, setSearchTerm, handleChange } =
        useTableFilters({
            search: serverFilters.search ?? '',
            sort_by: serverFilters.sort_by ?? 'created_at',
            sort_dir: serverFilters.sort_dir ?? 'desc',
            limit: serverFilters.limit ?? 10,
            status: serverFilters.status ?? '',
            role: serverFilters.role ?? '',
        });

    useEffect(() => {
        const t = setTimeout(() => {
            if (searchTerm !== filters.search)
                handleChange('search', searchTerm);
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const handleApprove = (id) => {
        router.post(`/users/${id}/approve`);
    };

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="space-y-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <Button asChild>
                        <Link href="/users/create">New User</Link>
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
                        { key: 'role', placeholder: 'Roles', items: roles },
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
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                 <TableHead>Phone</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        {(users.from || 0) + index}
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{user.student_id}</TableCell>
                                    <TableCell>
                                        {user.role}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge active={user.status} />
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <GenericActionMenu
                                            resource="users"
                                            id={user.id}
                                        >
                                            {/* Extra New Menu */}
                                            {!user.status && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleApprove(user.id)
                                                    }
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve User
                                                </DropdownMenuItem>
                                            )}
                                        </GenericActionMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination paginator={users} />
            </div>
        </AppLayout>
    );
}
