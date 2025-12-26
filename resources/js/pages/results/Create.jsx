import FormField from '@/components/form/form-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
    const { auth } = usePage().props;

    const form = useForm({
        title: '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        form.post('/routines.store', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Upload Routine" />

            <div className="flex justify-center p-6">
                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <CardTitle>Upload New Routine</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {/* Admin check */}
                        {auth.user.role !== 'admin' ? (
                            <p className="text-sm text-red-500">
                                You are not authorized to access this page.
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Routine Title */}
                                <FormField
                                    label="Routine Title"
                                    error={form.errors.title}
                                >
                                    <Input
                                        type="text"
                                        placeholder="e.g. Mid Term Exam Routine"
                                        value={form.data.title}
                                        onChange={(e) =>
                                            form.setData(
                                                'title',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </FormField>

                                {/* PDF Upload */}
                                <FormField
                                    label="Routine PDF"
                                    error={form.errors.file}
                                >
                                    <Input
                                        type="file"
                                        accept="application/pdf"
                                        required
                                        onChange={(e) =>
                                            form.setData(
                                                'file',
                                                e.target.files[0],
                                            )
                                        }
                                    />
                                </FormField>

                                {/* Actions */}
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button asChild variant="outline">
                                        <Link href="/routines.index">
                                            Cancel
                                        </Link>
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                    >
                                        {form.processing
                                            ? 'Uploading...'
                                            : 'Upload Routine'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
