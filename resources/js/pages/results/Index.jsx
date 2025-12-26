import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';

export default function Index({ results }) {
    const { auth } = usePage().props;
    const user = auth.user;

    console.log(results);
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
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>

                                    <div>
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

                                <a
                                    href={`/storage/${result.file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                                >
                                    View / Download
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-lg border p-10 text-center text-muted-foreground">
                            No results uploaded yet.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
