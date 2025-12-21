import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";

import { semesters } from "@/constants";


import FormField from "@/components/form/form-field";
import SelectForm from "@/components/form/SelectForm";
import { Check } from "lucide-react";

export default function Edit({ course }) {
    const { users } = usePage().props;

    const form = useForm({
        title: course.title || "",
        description: course.description || "",
        duration: course.duration || "",
        semester: course.semester || "",
        is_active: course.is_active || false,
        user_id: course.user_id || "",
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

                            {/* Semester */}
                            <SelectForm
                                label="Semester"
                                error={form.errors.semester}
                                value={form.data.semester}
                                onValueChange={(value) =>
                                    form.setData("semester", value)
                                }
                                placeholder="Select Semester"
                                options={semesters.map((s) => ({
                                    label: s.label,
                                    value: s.value,
                                }))}
                            />
                              {/* User */}
                            <SelectForm
                                label="Assign to User"
                                error={form.errors.user_id}
                                value={form.data.user_id}
                                onValueChange={(value) =>
                                    form.setData("user_id", value)
                                }
                                placeholder="Select User"
                                options={users.map((u) => ({
                                    label: u.name,
                                    value: String(u.id),
                                }))}
                            />

                            {/* Status by checkbox*/}
                            <FormField
                                label="Active Status"
                                error={form.errors.is_active}
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={!!form.data.is_active}
                                        onCheckedChange={(checked) =>
                                            form.setData("is_active", checked ? 1 : 0)
                                        }
                                    />
                                    <Label htmlFor="is_active">{form.data.is_active ? "Active" : "Inactive"} </Label>
                                </div>
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
