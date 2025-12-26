import { useState } from 'react';
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
import ConfirmDialog from '@/components/Common/ConfirmDialog';

export default function GenericActionMenu({ id, resource, actions = ['view', 'edit', 'delete'], children }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        router.delete(`/${resource}/${id}`, {
            onSuccess: () => setIsDeleteDialogOpen(false)
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
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

                    {children && (
                        <>
                            <DropdownMenuSeparator />
                            {children}
                        </>
                    )}

                    {actions.includes('delete') && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onSelect={() => setIsDeleteDialogOpen(true)}
                                className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description={`Are you sure you want to delete this ${resource.slice(0, -1)}?`}
                variant="destructive"
                confirmText="Delete Now"
            />
        </>
    );
}
