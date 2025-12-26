import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    BookPlus,
    DollarSign,
    Folder,
    LayoutGrid,
    User,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth.user.role;
    const mainNavItems = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Courses',
            href: '/courses',
            icon: BookOpen,
        },
        {
            title: 'Profile',
            href: '/profile',
            icon: User,
        },

        {
            title: 'Payment',
            href: '/payments',
            icon: DollarSign,
        },
        {
            title: 'Results',
            href: '/results',
            icon: BookPlus,
        },
        {
            title: 'Routines',
            href: '/routines',
            icon: BookPlus,
        },

        ...(userRole === 'admin'
            ? [
                  {
                      title: 'Users',
                      href: '/users',
                      icon: User,
                  },
                  {
                      title: 'Batches',
                      href: '/batches',
                      icon: Folder,
                  },
              ]
            : []),
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
