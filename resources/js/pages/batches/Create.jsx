import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


// custom components
import SelectForm from "@/components/Form/SelectForm";
import FormField from "@/components/Form/form-field";
import { Check } from "lucide-react";

export default function Create() {

    const {batch} = usePage().props;


    const form = useForm({
        title : "",

    });



    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/batches");
    };

    return (
        <AppLayout>
            <Head title="Create Batch" />

            <div className="p-4 flex justify-center">
                <Card className="max-w-2xl w-full p-4">
                    <CardHeader>
                        <h1 className="text-xl font-semibold mb-4">New Batch</h1>
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
                                    placeholder="Enter batch title"
                                    onChange={(e) =>
                                        form.setData("title", e.target.value)
                                    }
                                />
                            </FormField>





                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href="/batches">Cancel</Link>
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing ? "Saving..." : "Save Batch"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
