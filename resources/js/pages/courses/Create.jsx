import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { semesters } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


// custom components
import SelectForm from "@/components/Form/SelectForm";
import FormField from "@/components/Form/form-field";
import { Check } from "lucide-react";


export default function Create() {

    const {users} = usePage().props;


    const form = useForm({
        title: "",
        description: "",
        duration: "",
        semester: "",
        is_active: true,
        user_id: "",
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/courses");
    };

    return (
        <AppLayout>
            <Head title="Create Course" />

            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <h1 className="text-xl font-semibold mb-4">New Course</h1>
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
                                options={semesters}
                            />

                            {/* User ID    */}
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

                            {/* shadcn check box for is_active */}
                            <FormField
    label="Is Active"
    error={form.errors.is_active}
>
    <div className="flex items-center space-x-2">
        <Checkbox
            id="is_active"
            // Integer value-ke boolean-e convert kore deya (1 => true, 0 => false)
            checked={Boolean(form.data.is_active)}
            onCheckedChange={(checked) =>
                // Backend-e pathanor jonno integer format-e set kora
                form.setData("is_active", checked ? 1 : 0)
            }
        />
        <Label
            htmlFor="is_active"
            className="ml-2 cursor-pointer select-none"
        >
            {form.data.is_active == 1 ? "Active" : "Inactive"}
        </Label>
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
                                    {form.processing ? "Saving..." : "Save Course"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
