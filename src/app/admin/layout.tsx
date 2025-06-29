import { getSession } from '@/lib/auth';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/user-data';
import { AdminSidebarNav } from './_components/admin-sidebar-nav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession();
  const user = session ? getUserById(session.userId) : null;

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <AdminSidebarNav isSuperAdmin={session?.role === 'superadmin'} />
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="p-3 border-b flex items-center justify-between bg-background sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-semibold hidden md:block">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                     <div className="flex flex-col text-right items-end">
                        <span className="text-sm font-semibold">{user?.email}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                        <AvatarFallback>
                            <UserCircle2 />
                        </AvatarFallback>
                    </Avatar>
                    <form action={logoutAction}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Logout</span>
                      </Button>
                    </form>
                </div>
            </header>
            <main className="p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
