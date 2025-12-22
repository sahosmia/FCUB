import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Toaster } from "@/components/ui/sonner"


export default ({ children, breadcrumbs, ...props }) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster richColors position="bottom-right" />
    </AppLayoutTemplate>
);
