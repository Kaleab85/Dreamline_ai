'use client';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Calendar, UserPlus, Home } from 'lucide-react';

export function AdminSidebarNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
    const pathname = usePathname();
    
    const navItems = [
        { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
        { href: '/admin/register', label: 'Register Admin', icon: UserPlus },
        { href: '/', label: 'Site Home', icon: Home },
    ];

    return (
        <SidebarMenu>
            {navItems.map(item => (
                //  The registration link is only shown to superadmins, but the logic was moved to the page itself for redirection.
                 (item.href !== '/admin/register' || isSuperAdmin) && (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                            <Link href={item.href}>
                                <item.icon />
                                {item.label}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 )
            ))}
        </SidebarMenu>
    );
}
