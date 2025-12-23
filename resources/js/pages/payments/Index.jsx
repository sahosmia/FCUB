import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/DataTable/Pagination';
import { FileText, Plus } from 'lucide-react';

export default function Index({ user, payments }) {
    return (
        <AppLayout>
            <Head title={`Payments for ${user.name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Payments for {user.name}</h1>
                    <Button asChild>
                        <Link href={route('users.payments.create', user.id)}>
                            <Plus className="mr-2 h-4 w-4" /> Add Payment
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Semester</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Date</TableHead>
                                <TableHead>Receipt</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.data.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.semester}</TableCell>
                                    <TableCell>{payment.amount}</TableCell>
                                    <TableCell>{payment.payment_date}</TableCell>
                                    <TableCell>
                                        {payment.receipt && (
                                            <a href={`/storage/${payment.receipt}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                                <FileText className="h-5 w-5" />
                                            </a>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('payments.destroy', payment.id)} method="delete" as="button" className="text-red-500 hover:underline">
                                            Delete
                                        </Link>
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
