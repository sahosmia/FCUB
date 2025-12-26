import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { semesters } from '@/constants';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

// custom components
import SelectForm from '@/components/Form/SelectForm';
import FormField from '@/components/Form/form-field';

export default function Create() {
    const form = useForm({
        title: '',
        code: '',
        credit: '',
        semester: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post('/courses');
    };

    return (
        <AppLayout>
            <Head title="Create Course" />

            <div className="flex justify-center p-4">
                <Card className="w-full max-w-2xl p-4">
                    <CardHeader>
                        <h1 className="mb-4 text-xl font-semibold">
                            New Course
                        </h1>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            {/* Title */}
                            <FormField label="Title" error={form.errors.title}>
                                <Input
                                    value={form.data.title}
                                    placeholder="Enter course title"
                                    onChange={(e) =>
                                        form.setData('title', e.target.value)
                                    }
                                />
                            </FormField>



                            {/* code */}
                            <FormField
                                label="Code"
                                error={form.errors.code}
                            >
                                <Input
                                    type="text"
                                    value={form.data.code}
                                    placeholder="Enter course code"
                                    onChange={(e) =>
                                        form.setData('code', e.target.value)
                                    }
                                />
                            </FormField>


                            {/* Credit */}
                            <FormField
                                label="Credit"
                                error={form.errors.credit}
                            >
                                <Input
                                    type="number"
                                    value={form.data.credit}
                                    placeholder="Enter course credit"
                                    onChange={(e) =>
                                        form.setData('credit', e.target.value)
                                    }
                                />
                            </FormField>
                            {/* Semester */}
                            <SelectForm
                                label="Semester"
                                error={form.errors.semester}
                                value={form.data.semester}
                                onValueChange={(value) =>
                                    form.setData('semester', value)
                                }
                                placeholder="Select Semester"
                                options={semesters}
                            />



                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href="/courses">Cancel</Link>
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? 'Saving...'
                                        : 'Save Course'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
