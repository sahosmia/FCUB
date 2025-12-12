import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link } from "@inertiajs/react";

import FormField from "@/components/form/form-field";

export default function Edit({ course }) {
    const form = useForm({
        title: course.title || "",
        description: course.description || "",
        duration: course.duration || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(`/courses/${course.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Course" />

            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <h1 className="text-xl font-semibold mb-4">Edit Course</h1>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>

                            {/* Title */}
                            <FormField
                                label="Title"
                                error={form.errors.title}
                            >
                                <Input
                                    value={form.data.title}
                                    placeholder="Enter course title"
                                    onChange={(e) =>
                                        form.setData("title", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Description */}
                            <FormField
                                label="Description"
                                error={form.errors.description}
                            >
                                <Textarea
                                    rows={5}
                                    value={form.data.description}
                                    placeholder="Enter course description"
                                    onChange={(e) =>
                                        form.setData("description", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Duration */}
                            <FormField
                                label="Duration (hours)"
                                error={form.errors.duration}
                            >
                                <Input
                                    type="number"
                                    value={form.data.duration}
                                    placeholder="Enter course duration"
                                    onChange={(e) =>
                                        form.setData("duration", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href="/courses">Cancel</Link>
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
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
