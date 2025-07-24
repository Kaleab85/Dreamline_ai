'use client';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Calendar, UserPlus, Home, Tags } from 'lucide-react';

export function AdminSidebarNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
    const pathname = usePathname();
    
    const navItems = [
        { href: '/admin/appointments', label: 'Appointments', icon: Calendar, adminOnly: false },
        { href: '/admin/generate-tags', label: 'Generate Tags', icon: Tags, adminOnly: false },
        { href: '/admin/register', label: 'Register Admin', icon: UserPlus, adminOnly: true },
        { href: '/', label: 'Site Home', icon: Home, adminOnly: false },
    ];

    return (
        <SidebarMenu>
            {navItems.map(item => {
                 if (item.adminOnly && !isSuperAdmin) {
                     return null;
                 }
                 return (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                            <Link href={item.href}>
                                <item.icon />
                                {item.label}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 )
            })}
        </SidebarMenu>
    );
}
