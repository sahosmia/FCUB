import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormField from '@/components/form/form-field';
import { Input } from '@/components/ui/input';
import SelectForm from '@/components/form/SelectForm';

export default function Create({ user }) {
    const defaultAmount = (user.course_fee / 8).toFixed(2);

    const form = useForm({
        amount: defaultAmount,
        receipt: null,
        payment_date: new Date().toISOString().slice(0, 10),
        semester: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('users.payments.store', user.id));
    };

    const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
        value: i + 1,
        label: `Semester ${i + 1}`,
    }));

    return (
        <AppLayout>
            <Head title={`Add Payment for ${user.name}`} />
            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <CardTitle>Add Payment for {user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <SelectForm
                                label="Semester"
                                error={form.errors.semester}
                                value={form.data.semester}
                                onValueChange={(value) => form.setData('semester', value)}
                                placeholder="Select Semester"
                                options={semesterOptions}
                            />

                            <FormField label="Amount" error={form.errors.amount}>
                                <Input
                                    type="number"
                                    value={form.data.amount}
                                    onChange={(e) => form.setData('amount', e.target.value)}
                                />
                            </FormField>

                            <FormField label="Payment Date" error={form.errors.payment_date}>
                                <Input
                                    type="date"
                                    value={form.data.payment_date}
                                    onChange={(e) => form.setData('payment_date', e.target.value)}
                                />
                            </FormField>

                            <FormField label="Receipt" error={form.errors.receipt}>
                                <Input
                                    type="file"
                                    onChange={(e) => form.setData('receipt', e.target.files[0])}
                                />
                            </FormField>

                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href={route('users.payments.index', user.id)}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={form.processing}>
                                    {form.processing ? 'Saving...' : 'Save Payment'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
