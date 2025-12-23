import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { semesters, selectItems } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import { useState, useEffect } from 'react';
import { CheckCircle, Users } from 'lucide-react';

import { roles } from '@/constants';

// Custom Components
import Pagination from '@/components/DataTable/Pagination';
import StatusBadge from '@/components/DataTable/StatusBadeg';
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';

// Shadcn components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SelectForm from '@/components/form/SelectForm';


export default function Index() {
    const { users = {}, filters: serverFilters = {} } = usePage().props;

    const { filters, searchTerm, setSearchTerm, handleChange } = useTableFilters({
        search: serverFilters.search ?? '',
        sort_by: serverFilters.sort_by ?? 'created_at',
        sort_dir: serverFilters.sort_dir ?? 'desc',
        limit: serverFilters.limit ?? 10,
        status: serverFilters.status ?? '',
        role: serverFilters.role ?? '',
    });

    useEffect(() => {
        const t = setTimeout(() => {
            if (searchTerm !== filters.search) handleChange('search', searchTerm);
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="space-y-6 p-6">

                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <Button asChild><Link href="/users/create">New User</Link></Button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md mb-4"
                    />

                    {/* Dynamic Filter Reusable Pattern */}
                    {[
                        { key: 'sort_by', placeholder: 'Sort By', items: [{ label: 'Date', value: 'created_at' }, { label: 'Title', value: 'title' }] },
                        { key: 'limit', placeholder: 'Limit', items: selectItems },
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
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>{(users.from || 0) + index}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{user.student_id}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <StatusBadge
                                            status={user.status ? 'active' : 'inactive'}
                                            text={user.status ? 'Approved' : 'Pending'}
                                        />
                                    </TableCell>
                                    
                                    <TableCell className="text-right">
                                        <GenericActionMenu resource="users" id={user.id}>
                                            {/* Extra New Menu */}
                                            <DropdownMenuItem onClick={() => handleApprove(user.id)}>
                                                <CheckCircle className="mr-2 h-4 w-4" /> Approve User
                                            </DropdownMenuItem>

                                            
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


