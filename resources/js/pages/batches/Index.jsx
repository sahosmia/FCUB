import { selectItems } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import Pagination from '@/components/DataTable/Pagination';

// UI
import SelectForm from '@/components/form/SelectForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function Index() {
    const {
        batches = {},
        filters: serverFilters = {},
        flash,
    } = usePage().props;

    const { filters, searchTerm, setSearchTerm, handleChange } =
        useTableFilters({
            search: serverFilters.search ?? '',
            status: serverFilters.status ?? '',
            limit: serverFilters.limit ?? 10,
        });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    useEffect(() => {
        const t = setTimeout(() => {
            if (searchTerm !== filters.search)
                handleChange('search', searchTerm);
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    return (
        <AppLayout>
            <Head title="Batches" />

            <div className="max-w-8xl space-y-8 px-6 py-8">
                {/* ================= HEADER ================= */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Batches
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage all academic batches in one place
                        </p>
                    </div>

                    <Button asChild className="gap-2">
                        <Link href="/batches/create">
                            <Plus className="h-4 w-4" />
                            New Batch
                        </Link>
                    </Button>
                </div>

                {/* ================= FILTER CARD ================= */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <Input
                            placeholder="Search batch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="sm:max-w-sm"
                        />

                        <SelectForm
                            label={null}
                            error={null}
                            value={String(filters.limit)}
                            onValueChange={(v) => handleChange('limit', v)}
                            placeholder="Limit"
                            options={selectItems}
                        />
                    </div>
                </div>

                {/* ================= GRID ================= */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {batches.data.length > 0 ? (
                        batches.data.map((batch, index) => (
                            <div
                                key={batch.id}
                                className="group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-primary/30"
                            >
                                {/* Action Menu */}
                                <div className="absolute top-3 right-3">
                                    <GenericActionMenu
                                        resource="batches"
                                        id={batch.id}
                                        actions={['edit', 'delete']}
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Layers className="h-5 w-5" />
                                        </div>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                            #{(batches.from || 0) + index}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/batches/${batch.id}`}
                                        className="text-lg font-semibold text-gray-900 transition hover:text-primary"
                                    >
                                        {batch.title}
                                    </Link>
                                </div>

                                {/* Footer */}
                                <p className="mt-6 text-xs text-muted-foreground">
                                    Use actions to edit or remove batch
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-xl border p-10 text-center text-muted-foreground">
                            No batches found.
                        </div>
                    )}
                </div>

                {/* ================= PAGINATION ================= */}
                <Pagination paginator={batches} />
            </div>
        </AppLayout>
    );
}
