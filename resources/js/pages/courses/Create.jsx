import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link } from "@inertiajs/react";

import FormField from "@/components/form/form-field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Create() {
    const form = useForm({
        title: "",
        description: "",
        duration: "",
        semester: "",
        is_active: true,
        user_id: "",
    });

    const semesters = [
        { value: 'spring', label: 'Spring' },
        { value: 'summer', label: 'Summer' },
        { value: 'fall', label: 'Fall' },
        { value: 'winter', label: 'Winter' },
    ];

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
                            <FormField
                                label="Semester"
                                error={form.errors.semester}
                            >
                               <Select
                                    value={form.data.semester}
                                    onValueChange={(value) =>
                                        form.setData("semester", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {semesters.map((semester) => (
                                            <SelectItem
                                                key={semester.value}
                                                value={semester.value}
                                            >
                                                {semester.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </FormField>  

                            {/* User ID    */}
                            <FormField
                                label="User ID"
                                error={form.errors.user_id}
                            >
                                <Select 
                                    value={form.data.user_id}
                                    onValueChange={(value) =>
                                        form.setData("user_id", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/** Assuming users data is available in the component */}
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id.toString()}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                               
                            </FormField>

                            {/* shadcn check box for is_active */}
                        
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
