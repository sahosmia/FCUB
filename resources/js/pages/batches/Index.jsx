import { selectItems } from '@/constants';
import { useTableFilters } from '@/hooks/useTableFilters';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// Custom Components
import GenericActionMenu from '@/components/DataTable/GenericActionMenu';
import Pagination from '@/components/DataTable/Pagination';

// Shadcn components
import SelectForm from '@/components/form/SelectForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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

    useEffect(() => {
        const t = setTimeout(() => {
            if (searchTerm !== filters.search)
                handleChange('search', searchTerm);
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    return (
        <AppLayout>
            <Head title="Batch" />
            <div className="mx-auto w-xl space-y-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Batches</h1>
                    <Button asChild>
                        <Link href="/batches/create">New Batch</Link>
                    </Button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 max-w-md"
                    />

                    {/* Dynamic Filter Reusable Pattern */}
                    {[
                        {
                            key: 'limit',
                            placeholder: 'Limit',
                            items: selectItems,
                        },
                    ].map((config) => (
                        <SelectForm
                            key={config.key}
                            label={null}
                            error={null}
                            value={String(filters[config.key])}
                            onValueChange={(v) => handleChange(config.key, v)}
                            placeholder={config.placeholder}
                            options={config.items}
                        />
                    ))}
                </div>
g
                <Pagination paginator={batches} />
            </div>
        </AppLayout>
    );
}
