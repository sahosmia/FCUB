import SelectForm from "@/components/form/SelectForm";
import FormField from "@/components/form/form-field";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { roles, genders } from "@/constants";

export default function Edit({ user }) {
    const { batches } = usePage().props;

    const form = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "student",
        status: user.status || false,
        phone: user.phone || "",
        gender: user.gender || "",
        date_of_birth: user.date_of_birth || "",
        course_fee: user.course_fee || "",
        paid_fee: user.paid_fee || "",
        due_fee: user.due_fee || "",
        batch_id: user.batch_id || "",
        session: user.session || "",
        admission_document: user.admission_document || "",
        admission_fee: user.admission_fee || "",
        student_id: user.student_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(`/users/${user.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit User" />

            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <h1 className="text-xl font-semibold mb-4">
                            Edit User
                        </h1>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <FormField label="Name" error={form.errors.name}>
                                <Input
                                    value={form.data.name}
                                    placeholder="Enter user name"
                                    onChange={(e) =>
                                        form.setData("name", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Email */}
                            <FormField label="Email" error={form.errors.email}>
                                <Input
                                    type="email"
                                    value={form.data.email}
                                    placeholder="Enter user email"
                                    onChange={(e) =>
                                        form.setData("email", e.target.value)
                                    }
                                />
                            </FormField>
                            {/* Password */}
                            <FormField
                                label="Password"
                                error={form.errors.password}
                            >
                                <Input
                                    type="password"
                                    value={form.data.password}
                                    placeholder="Enter new password (leave blank to keep current)"
                                    onChange={(e) =>
                                        form.setData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>

                            {/* Phone */}
                            <FormField label="Phone" error={form.errors.phone}>
                                <Input
                                    value={form.data.phone}
                                    placeholder="Enter phone number"
                                    onChange={(e) =>
                                        form.setData("phone", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Gender */}
                            <SelectForm
                                label="Gender"
                                error={form.errors.gender}
                                value={form.data.gender}
                                onValueChange={(value) =>
                                    form.setData("gender", value)
                                }
                                placeholder="Select Gender"
                                options={genders}
                            />

                            {/* Date of Birth */}
                            <FormField
                                label="Date of Birth"
                                error={form.errors.date_of_birth}
                            >
                                <Input
                                    type="date"
                                    value={form.data.date_of_birth}
                                    onChange={(e) =>
                                        form.setData(
                                            "date_of_birth",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>

                            {/* Course Fee */}
                            <FormField
                                label="Course Fee"
                                error={form.errors.course_fee}
                            >
                                <Input
                                    type="number"
                                    value={form.data.course_fee}
                                    placeholder="Enter course fee"
                                    onChange={(e) =>
                                        form.setData(
                                            "course_fee",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>

                            {/* Paid Fee */}
                            <FormField
                                label="Paid Fee"
                                error={form.errors.paid_fee}
                            >
                                <Input
                                    type="number"
                                    value={form.data.paid_fee}
                                    placeholder="Enter paid fee"
                                    onChange={(e) =>
                                        form.setData(
                                            "paid_fee",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>

                            {/* Due Fee */}
                            <FormField
                                label="Due Fee"
                                error={form.errors.due_fee}
                            >
                                <Input
                                    type="number"
                                    value={form.data.due_fee}
                                    placeholder="Enter due fee"
                                    onChange={(e) =>
                                        form.setData("due_fee", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Batch */}
                            <SelectForm
                                label="Batch"
                                error={form.errors.batch_id}
                                value={String(form.data.batch_id)}
                                onValueChange={(value) =>
                                    form.setData("batch_id", value)
                                }
                                placeholder="Select Batch"
                                options={
                                    batches
                                        ? batches.map((batch) => ({
                                              value: batch.id,
                                              label: batch.name,
                                          }))
                                        : []
                                }
                            />

                            {/* Session */}
                            <FormField
                                label="Session"
                                error={form.errors.session}
                            >
                                <Input
                                    value={form.data.session}
                                    placeholder="Enter session"
                                    onChange={(e) =>
                                        form.setData("session", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Admission Document */}
                            <FormField
                                label="Admission Document"
                                error={form.errors.admission_document}
                            >
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        form.setData(
                                            "admission_document",
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </FormField>

                            {/* Admission Fee */}
                            <FormField
                                label="Admission Fee"
                                error={form.errors.admission_fee}
                            >
                                <Input
                                    type="number"
                                    value={form.data.admission_fee}
                                    placeholder="Enter admission fee"
                                    onChange={(e) =>
                                        form.setData(
                                            "admission_fee",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>

                            {/* Student ID */}
                            <FormField
                                label="Student ID"
                                error={form.errors.student_id}
                            >
                                <Input
                                    value={form.data.student_id}
                                    placeholder="Enter student ID"
                                    onChange={(e) =>
                                        form.setData(
                                            "student_id",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormField>

                            {/* Role */}
                            <SelectForm
                                label="Role"
                                options={roles}
                                value={form.data.role}
                                onValueChange={(value) =>
                                    form.setData("role", value)
                                }
                                error={form.errors.role}
                            />

                            {/* Status */}
                            <FormField
                                label="Status"
                                error={form.errors.status}
                            >
                                <div className="flex items-center space-x-4">
                                    <Checkbox
                                        id="status"
                                        checked={form.data.status}
                                        onCheckedChange={(checked) =>
                                            form.setData("status", checked)
                                        }
                                    />
                                    <Label htmlFor="status">
                                        {form.data.status
                                            ? "Active"
                                            : "Inactive"}
                                    </Label>
                                </div>
                            </FormField>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href="/users">Cancel</Link>
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? "Saving..."
                                        : "Save User"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
