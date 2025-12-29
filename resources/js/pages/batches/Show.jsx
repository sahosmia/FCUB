import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Layers, Users } from 'lucide-react';

// Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import StatusBadge from '@/components/DataTable/StatusBadge';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Show({ batch, users }) {
    return (
        <AppLayout>
            <Head title={`Batch - ${batch.title}`} />

            <div className="max-w-8xl space-y-8 px-6 py-8">
                {/* Back */}
                <Link
                    href="/batches"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Batches
                </Link>

                {/* Header */}
                <div className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Layers className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {batch.title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Batch ID: #{batch.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {users.length} Students
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <h3 className="mb-4 text-sm font-semibold text-gray-700">
                            Batch Information
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <span className="font-medium">Title:</span>{' '}
                                {batch.title}
                            </li>
                            <li>
                                <span className="font-medium">Created At:</span>{' '}
                                {new Date(
                                    batch.created_at,
                                ).toLocaleDateString()}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Students Table */}
                <div className="rounded-xl border bg-white shadow-sm">
                    <div className="border-b px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-700">
                            Students List
                        </h2>
                    </div>

                    {users.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Student ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow
                                            key={user.id}
                                            className="hover:bg-muted/50"
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">
                                                {user.name}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.phone || '—'}
                                            </TableCell>
                                            <TableCell>
                                                {user.gender || '—'}
                                            </TableCell>
                                            <TableCell>
                                                {user.student_id || '—'}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    active={user.status}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <GenericActionMenu
                                                    resource="users"
                                                    id={user.id}
                                                >
                                                    {!user.status && (
                                                        <DropdownMenuItem>
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
                    ) : (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            No students found in this batch.
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="flex justify-end">
                    <Button asChild variant="outline">
                        <Link href={`/batches/${batch.id}/edit`}>
                            Edit Batch
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
