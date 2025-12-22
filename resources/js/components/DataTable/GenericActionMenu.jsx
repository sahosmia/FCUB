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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function GenericActionMenu({
    id,
    resource,
    actions = ['view', 'edit', 'delete'],
    children
}) {
    // পপআপ ওপেন কি না তা ট্র্যাকিং করার জন্য স্টেট
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
                                // এখানে সরাসরি ডিলিট না করে পপআপ স্টেট ট্রু করা হচ্ছে
                                onSelect={() => setIsDeleteDialogOpen(true)}
                                className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* কনফার্মেশন ডায়ালগ মেনুর বাইরে রাখা হয়েছে যাতে মেনু বন্ধ হলেও এটি দেখা যায় */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this
                            <strong> {resource.slice(0, -1)}</strong> and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
