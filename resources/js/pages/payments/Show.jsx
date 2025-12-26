import ConfirmDialog from '@/components/Common/ConfirmDialog';
import PaymentStatusBadge from '@/components/DataTable/PaymentStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle,
    CreditCard,
    User,
    XCircle,
    Trash2,
    Edit3
} from 'lucide-react';
import { useState } from 'react';

export default function Show({ payment }) {
    const { auth } = usePage().props;
   const userRole = auth.user.role; // Inertia auth object structure

    const [confirmConfig, setConfirmConfig] = useState({
        open: false,
        type: '',
        title: '',
        variant: 'default',
    });

    const openConfirm = (type) => {
        const isApprove = type === 'approve';
        setConfirmConfig({
            open: true,
            type: type,
            title: isApprove ? 'Approve Payment?' : 'Reject Payment?',
            description: isApprove
                ? 'This will update student fees.'
                : 'This will mark the payment as invalid.',
            variant: isApprove ? 'default' : 'destructive',
        });
    };

    const handleAction = () => {
        router.post(
            `/payments/${payment.id}/${confirmConfig.type}`,
            {},
            {
                onSuccess: () =>
                    setConfirmConfig({ ...confirmConfig, open: false }),
            },
        );
    };

    return (
        <AppLayout>
            <Head title={`Payment: ${payment.user.name}`} />
            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <Button variant="outline" asChild>
                    <Link href="/payments">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Link>
                </Button>

                <Card className="shadow-sm">
                    <CardHeader className="border-b pb-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold">
                                    {payment.user.name}
                                </CardTitle>

                            </div>
                            <PaymentStatusBadge status={payment.status} />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 border-b pb-2 font-semibold">
                                    <CreditCard className="h-4 w-4" /> Details
                                </h3>
                                <p className="flex justify-between">
                                    <span>Amount:</span>{' '}
                                    <span className=" font-bold text-green-600">
                                        ৳ {payment.amount}
                                    </span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Date:</span>{' '}
                                    <span>{payment.payment_date}</span>
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 border-b pb-2 font-semibold">
                                    <User className="h-4 w-4" /> Student
                                </h3>
                                <p className="flex justify-between">
                                    <span>Student ID:</span>{' '}
                                    <span>
                                        {payment.user.student_id || 'N/A'}
                                    </span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Email:</span>{' '}
                                    <span>
                                        {payment.user.email}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons Section */}
                        <div className="flex justify-end gap-3 border-t pt-6">

                            {/* Admin Actions: Only for Pending */}
                            {userRole === 'admin' && payment.status === 'pending' && (
                                <>
                                    <Button variant="outline" className="text-red-600" onClick={() => openConfirm('rejected')}>
                                        <XCircle className="mr-2 h-4 w-4" /> Reject
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => openConfirm('approve')}>
                                        <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                    </Button>
                                </>
                            )}

                            {/* Student Actions: If not approved yet */}
                            {userRole === 'student' && payment.status !== 'approved' && (
                                <>
                                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => openConfirm('delete')}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Request
                                    </Button>

                                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                        <Link href={`/payments/${payment.id}/edit`}>
                                            <Edit3 className="mr-2 h-4 w-4" /> Edit Details
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ConfirmDialog
                isOpen={confirmConfig.open}
                onOpenChange={(open) =>
                    setConfirmConfig({ ...confirmConfig, open })
                }
                onConfirm={handleAction}
                title={confirmConfig.title}
                description={confirmConfig.description}
                variant={confirmConfig.variant}
            />
        </AppLayout>
    );
}
