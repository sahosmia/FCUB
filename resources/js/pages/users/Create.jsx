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
import { roles } from "@/constants";

export default function Create() {

    const {users} = usePage().props;


    const form = useForm({
        name : "",
        email : "",
        password : "",
        status: true,
        role : "student",
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/users");
    };

    return (
        <AppLayout>
            <Head title="Create User" />

            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <h1 className="text-xl font-semibold mb-4">New User</h1>
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
                                    placeholder="Enter user password"
                                    onChange={(e) =>
                                        form.setData("password", e.target.value)
                                    }
                                />
                            </FormField>

                            {/* Role */}
                            <SelectForm
                                label="Role"
                                error={form.errors.role}
                                value={form.data.role}
                                onValueChange={(value) =>
                                    form.setData("role", value)
                                }
                                placeholder="Select Role"
                                options={roles}
                            />

                            {/* Status */}
                            <FormField
                                label="Status"
                                error={form.errors.status}
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="status"
                                        checked={Boolean(form.data.status)}
                                        onCheckedChange={(checked) =>
                                            form.setData("status", checked ? 1 : 0)
                                        }
                                    />
                                    <Label
                                        htmlFor="status"
                                        className="ml-2 cursor-pointer select-none"
                                    >
                                        {form.data.status == 1 ? "Active" : "Inactive"}
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
