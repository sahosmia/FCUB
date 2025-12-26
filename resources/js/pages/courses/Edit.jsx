import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link } from "@inertiajs/react";
import { semesters } from "@/constants";

// custom components
import FormField from "@/components/Form/form-field";
import SelectForm from "@/components/Form/SelectForm";

export default function Edit({ course, users }) {
    // ফর্ম ইনিশিয়ালাইজেশন - Create পেজের ফিল্ডগুলোর সাথে মিল রেখে
    const form = useForm({
        title: course.title || "",
        code: course.code || "",       // Create পেজে 'code' ছিল
        credit: course.credit || "",   // Create পেজে 'credit' ছিল
        semester: course.semester || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Laravel Resource Route অনুযায়ী PUT রিকোয়েস্ট
        form.put(`/courses/${course.id}`);
    };

    return (
        <AppLayout>
            <Head title={`Edit Course: ${course.title}`} />

            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4 shadow-sm">
                    <CardHeader>
                        <h1 className="text-xl font-semibold mb-4">Edit Course</h1>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Title */}
                            <FormField label="Title" error={form.errors.title}>
                                <Input
                                    value={form.data.title}
                                    placeholder="Enter course title"
                                    onChange={(e) => form.setData("title", e.target.value)}
                                />
                            </FormField>

                            {/* Code */}
                            <FormField label="Code" error={form.errors.code}>
                                <Input
                                    value={form.data.code}
                                    placeholder="Enter course code"
                                    onChange={(e) => form.setData("code", e.target.value)}
                                />
                            </FormField>

                            {/* Credit */}
                            <FormField label="Credit" error={form.errors.credit}>
                                <Input
                                    type="number"
                                    value={form.data.credit}
                                    placeholder="Enter course credit"
                                    onChange={(e) => form.setData("credit", e.target.value)}
                                />
                            </FormField>

                            {/* Semester */}
                            <SelectForm
                                label="Semester"
                                error={form.errors.semester}
                                value={form.data.semester}
                                onValueChange={(value) => form.setData("semester", value)}
                                placeholder="Select Semester"
                                options={semesters}
                            />

                          
                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
                                <Button asChild variant="outline">
                                    <Link href="/courses">Cancel</Link>
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {form.processing ? "Updating..." : "Update Course"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
