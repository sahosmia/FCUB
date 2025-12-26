import FormField from '@/components/form/form-field';
import SelectForm from '@/components/form/SelectForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit({ payment, users }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        amount: payment.amount || '',
        receipt: null,
        payment_date: payment.payment_date || new Date().toISOString().slice(0, 10),
        user_id: payment.user_id || '',
        _method: 'put',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/payments/${payment.id}`);
    };

    const canEdit = auth.user.role === 'admin' || (auth.user.role === 'student' && payment.status !== 'approved');

    return (
        <AppLayout>
            <Head title={`Edit Payment`} />
            <div className="flex justify-center p-4">
                <Card className="w-full max-w-2xl p-4">
                    <CardHeader>
                        <CardTitle>Edit Payment for {payment.user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            {auth.user.role === 'admin' && (
                                <SelectForm
                                    label="User"
                                    error={errors.user_id}
                                    value={data.user_id?.toString()}
                                    onValueChange={(value) =>
                                        setData('user_id', value)
                                    }
                                    placeholder="Select User"
                                    options={
                                        users?.map((user) => ({
                                            value: user.id.toString(),
                                            label: user.name,
                                        })) || []
                                    }
                                    disabled={!canEdit}
                                />
                            )}

                            <FormField
                                label="Amount"
                                error={errors.amount}
                            >
                                <Input
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData('amount', e.target.value)
                                    }
                                    disabled={!canEdit}
                                />
                            </FormField>

                            <FormField
                                label="Payment Date"
                                error={errors.payment_date}
                            >
                                <Input
                                    type="date"
                                    value={data.payment_date}
                                    onChange={(e) =>
                                        setData(
                                            'payment_date',
                                            e.target.value,
                                        )
                                    }
                                    disabled={!canEdit}
                                />
                            </FormField>

                            <FormField
                                label="New Receipt"
                                error={errors.receipt}
                            >
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'receipt',
                                            e.target.files[0],
                                        )
                                    }
                                    disabled={!canEdit}
                                />
                            </FormField>

                            {payment.receipt && (
                                <div className="mt-4">
                                    <a
                                        href={`/storage/${payment.receipt}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Current Receipt
                                    </a>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href="/payments">Cancel</Link>
                                </Button>
                                {canEdit && (
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Updating...'
                                            : 'Update Payment'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
