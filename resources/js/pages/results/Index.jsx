import ConfirmDialog from '@/components/Common/ConfirmDialog';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {  Eye, FileText, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


export default function Index({ results }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { auth, flash } = usePage().props;
    const user = auth.user;
    const userRole = auth.user.role;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                id: 'success-toast',
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                id: 'error-toast',
            });
        }
    }, [flash]);
    const handleDelete = (id) => {
        if (selectedId) {
            router.delete(`/results/${selectedId}`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setSelectedId(null);
                },
            });
        }
    };
    return (
        <AppLayout>
            <Head title="Results" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Results</h1>

                    {user.role === 'admin' && (
                        <Link
                            href="/results/create"
                            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Upload Result
                        </Link>
                    )}
                </div>

                {/* Results Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {results.length > 0 ? (
                        results.map((result) => (
                            <div
                                key={result.id}
                                className="flex flex-col justify-between rounded-xl border bg-background p-4 transition hover:shadow-sm"
                            >
                                {/* Header */}
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="leading-tight font-medium">
                                            {result.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Uploaded on{' '}
                                            {new Date(
                                                result.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex items-center justify-between">
                                    {/* View / Download */}
                                    <div className="flex items-center gap-3">


                                        <a
                                            href={`/storage/${result.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="View"
                                            className="text-muted-foreground transition hover:text-primary"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </a>
                                    </div>

                                    {/* Admin actions */}
                                    {userRole === 'admin' && (
                                        <div className="flex items-center gap-3">
                                            {/* <button
                                                onClick={() =>
                                                    router.visit(
                                                        `/results/${result.id}/edit`,
                                                    )
                                                }
                                                title="Edit"
                                                className="text-muted-foreground transition hover:text-primary"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </button> */}

                                            <button
                                                onClick={() => {
                                                    setIsDeleteDialogOpen(true);
                                                    setSelectedId(result.id);
                                                }}
                                                className="text-muted-foreground transition hover:text-destructive"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-lg border p-10 text-center text-muted-foreground">
                            No results uploaded yet.
                        </div>
                    )}
                </div>
            </div>
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description={`Are you sure you want to delete this result?`}
                variant="destructive"
                confirmText="Delete Now"
            />
        </AppLayout>
    );
}
