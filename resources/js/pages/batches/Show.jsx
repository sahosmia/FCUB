import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Layers } from 'lucide-react';

export default function Show({ batch }) {
    return (
        <AppLayout>
            <Head title={`Batch - ${batch.title}`} />

            <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
                {/* Back */}
                <Link
                    href="/batches"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Batches
                </Link>

                {/* Header Card */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Layers className="h-6 w-6" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">
                                {batch.title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Batch ID: #{batch.id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700">
                            Batch Information
                        </h3>

                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <span className="font-medium">Title:</span>{' '}
                                {batch.title}
                            </li>
                            <li>
                                <span className="font-medium">Created:</span>{' '}
                                {new Date(
                                    batch.created_at,
                                ).toLocaleDateString()}
                            </li>
                        </ul>
                    </div>

                    {/* Future ready */}
                    <div className="bg-dashed rounded-xl border p-5 text-sm text-muted-foreground">
                        Student list / stats will be added here 🚀
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button asChild variant="outline">
                        <Link href={`/batches/${batch.id}/edit`}>
                            Edit Batch
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
