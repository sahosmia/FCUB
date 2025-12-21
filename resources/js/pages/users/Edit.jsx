import SelectForm from "@/components/form/SelectForm";
import FormField from "@/components/form/form-field";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { roles } from "@/constants";



export default function Edit({ user }) {
    const form = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "student",
        status: user.status || false,
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
                        <h1 className="text-xl font-semibold mb-4">Edit User</h1>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>

                            {/* Name */}
                            <FormField
                                label="Name"
                                error={form.errors.name}
                            >
                                <Input
                                    value={form.data.name}
                                    placeholder="Enter user name"
                                    onChange={(e) =>
                                        form.setData("name", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Email */}
                            <FormField
                                label="Email"
                                error={form.errors.email}
                            >
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
                                        form.setData("password", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Role */}
                            <SelectForm
                                label="Role"
                                options={roles}
                                value={form.data.role}
                                onChange={(value) => form.setData("role", value)}
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
                                        {form.data.status ? "Active" : "Inactive"}
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
                                    {form.processing ? "Saving..." : "Save User"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>      
        </AppLayout>
    );
}
