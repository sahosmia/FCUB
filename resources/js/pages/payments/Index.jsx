import { selectItems } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

import { roles } from '@/constants';
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
    } = usePage().props;

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

                {/* Summary Cards */}
                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                     <StatCard icon={<DollarSign />} title="Total Payable" value='200000' />
                            <StatCard icon={<DollarSign />} title="Paid Fee" value='150000' />
                            <StatCard icon={<DollarSign />} title="Due Fee" value='50000' />
                </div>

                  {/* Fees Information */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-400 text-white px-6 py-3 uppercase text-sm flex items-center gap-2">
          <span>🔶</span>
          <span>Fees Information</span>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Title</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">Admission Fee</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">5,500.00 BDT</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">Course Fee (Total)</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">130,000.00 BDT</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">Semester Fee</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">15,250.00 BDT × 8 semester(s)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">Monthly Equivalent</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">2,709.00 BDT approx.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">Payment Term</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">Monthly/Semester</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Payment Records</h2>
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
                        { key: 'status', placeholder: 'Status', items: paymentStatus },
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
                                            {!payment.status && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleApprove(
                                                            payment.id,
                                                        )
                                                    }
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve Payment
                                                </DropdownMenuItem>
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
