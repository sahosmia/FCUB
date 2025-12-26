import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormField from '@/components/form/form-field';
import { Input } from '@/components/ui/input';
import SelectForm from '@/components/form/SelectForm';
import { usePage } from '@inertiajs/react';

export default function Create({users}) {

    const { auth } = usePage().props;
    // const defaultAmount = (user.course_fee / 8).toFixed(2);
    const defaultAmount = 2000;

    const form = useForm({
        amount: defaultAmount,
        receipt: null,
        payment_date: new Date().toISOString().slice(0, 10),
        user_id: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("aa");

        form.post('/payments');
    };



    return (
        <AppLayout>
            <Head title={`Add Payment for ${auth.name}`} />
            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <CardTitle>Add Payment for {auth.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>

                           <SelectForm
    label="User"
    error={form.errors.user_id}
    value={form.data.user_id?.toString()} // ভ্যালু স্ট্রিং হিসেবে পাঠানো ভালো
    onValueChange={(value) =>
        form.setData("user_id", value)
    }
    placeholder="Select User"
    options={
        users?.map((user) => ({
            value: user.id.toString(), // ID কে স্ট্রিং-এ রূপান্তর করুন
            label: user.name,
        })) || []
    }
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
                                    required
                                    onChange={(e) => form.setData('receipt', e.target.files[0])}
                                />
                            </FormField>

                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href='/payments'>Cancel</Link>
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
