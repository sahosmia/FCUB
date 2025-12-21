import { Link, router } from '@inertiajs/react';
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function GenericActionMenu({
    id,
    resource,
    actions = ['view', 'edit', 'delete'],
    children // Ei children-ei amra extra menu items pathabo
}) {

    const handleDelete = () => {
        if (confirm(`Are you sure?`)) {
            router.delete(`/${resource}/${id}`);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                {/* Standard Actions */}
                {actions.includes('view') && (
                    <DropdownMenuItem asChild>
                        <Link href={`/${resource}/${id}`} className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                        </Link>
                    </DropdownMenuItem>
                )}

                {actions.includes('edit') && (
                    <DropdownMenuItem asChild>
                        <Link href={`/${resource}/${id}/edit`} className="flex items-center text-blue-600 cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </DropdownMenuItem>
                )}

                {/* Yekhane Custom Menu add hobe */}
                {children && (
                    <>
                        <DropdownMenuSeparator />
                        {children}
                    </>
                )}

                {/* Delete Action (Sobshomoy niche thaka bhalo) */}
                {actions.includes('delete') && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
