'use client';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Calendar, UserPlus, Home } from 'lucide-react';

export function AdminSidebarNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
    const pathname = usePathname();
    
    const navItems = [
        { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
        ...(isSuperAdmin ? [{ href: '/admin/register', label: 'Register Admin', icon: UserPlus }] : []),
        { href: '/', label: 'Site Home', icon: Home },
    ];

    return (
        <SidebarMenu>
            {navItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>
                            <item.icon />
                            {item.label}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
