import ConfirmDialog from '@/components/Common/ConfirmDialog';
import { selectItems } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle, Pencil, Trash2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';

// Custom Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import Pagination from '@/components/DataTable/Pagination';

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
import PaymentStatusBadge from '../../components/DataTable/PaymentStatusBadge';
import { paymentStatus } from '../../constants';

export default function Index() {
    const {
        payments = {},
        filters: serverFilters = {},
        flash,
        auth,
    } = usePage().props;

    const [confirmConfig, setConfirmConfig] = useState({
        open: false,
        id: null,
    });

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

    useEffect(() => {
        const t = setTimeout(() => {
            if (searchTerm !== filters.search)
                handleChange('search', searchTerm);
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const handleApprove = (id) => {
        router.post(`/payments/${id}/approve`);
    };

    const handleDelete = (id) => {
        setConfirmConfig({ open: true, id });
    };

    const handleConfirmDelete = () => {
        router.delete(`/payments/${confirmConfig.id}`, {
            onSuccess: () => setConfirmConfig({ open: false, id: null }),
        });
    };

    const handleReject = (id) => {
        router.post(`/payments/${id}/reject`);
    };

    const getActions = (userRole, payment) => {
        const studentAction =
            userRole === 'student' && payment.status !== 'approved';
        const adminAction =
            userRole === 'admin' && payment.status === 'pending';

        return (
            <>
                {studentAction && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/payments/${payment.id}/edit`}
                                className="flex cursor-pointer items-center text-blue-600"
                            >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => handleDelete(payment.id)}
                            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </>
                )}
                {adminAction && (
                    <>
                        <DropdownMenuItem
                            onClick={() => handleApprove(payment.id)}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve Payment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleReject(payment.id)}
                            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                    </>
                )}
            </>
        );
    };

    return (
        <AppLayout>
            <Head title="Payments" />
            <div className="space-y-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Payments</h1>
                    <Button asChild>
                        <Link href="/payments/create">New Payment</Link>
                    </Button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Search by name and student id..."
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
                                { label: 'Amount', value: 'amount' },
                            ],
                        },
                        {
                            key: 'limit',
                            placeholder: 'Limit',
                            items: selectItems,
                        },
                        {
                            key: 'status',
                            placeholder: 'Status',
                            items: paymentStatus,
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
                                <TableHead>User Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Date</TableHead>
                                <TableHead>Receipt</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.data.map((payment, index) => (
                                <TableRow key={payment.id}>
                                    <TableCell>
                                        {(payments.from || 0) + index}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {payment.user?.name || 'N/A'}
                                    </TableCell>
                                    <TableCell>৳{payment.amount}</TableCell>
                                    <TableCell>
                                        {payment.payment_date}
                                    </TableCell>
                                    <TableCell>
                                        {payment.receipt ? (
                                            <a
                                                href={`/storage/${payment.receipt}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 underline transition-colors hover:text-blue-800"
                                            >
                                                View Receipt
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground italic">
                                                No Receipt
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <PaymentStatusBadge
                                            status={payment.status}
                                        />{' '}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <GenericActionMenu
                                            resource="payments"
                                            id={payment.id}
                                            actions={['view']}
                                        >
                                            {/* Extra New Menu */}
                                            {getActions(
                                                auth.user.role,
                                                payment,
                                            )}
                                        </GenericActionMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination paginator={payments} />
            </div>

            <ConfirmDialog
                isOpen={confirmConfig.open}
                onOpenChange={(open) =>
                    setConfirmConfig({ ...confirmConfig, open })
                }
                onConfirm={handleConfirmDelete}
                title="Delete Payment"
                description="Are you sure you want to delete this payment? This action cannot be undone."
                variant="destructive"
            />
        </AppLayout>
    );
}
