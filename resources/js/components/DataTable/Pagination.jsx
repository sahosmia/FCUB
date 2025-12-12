import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

export default function Pagination({ paginator }) {
    if (!paginator || paginator.total === 0) return null;

    return (
        <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
                Showing {paginator.from} to {paginator.to} of {paginator.total}
            </p>

            <div className="flex gap-1">
                {paginator.links.map((link, index) => (
                    <Button
                        key={index}
                        disabled={!link.url}
                        onClick={() =>
                            link.url &&
                            router.visit(link.url, { preserveState: true })
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        variant={link.active ? 'default' : 'ghost'}
                        size="sm"
                    />
                ))}
            </div>
        </div>
    );
}
