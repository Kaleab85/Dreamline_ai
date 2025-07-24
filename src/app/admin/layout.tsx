
'use client';

import { useState, useEffect } from 'react';
import { getSession } from '@/lib/actions';
import type { SessionPayload } from '@/lib/session';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, UserCircle2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AdminSidebarNav } from './_components/admin-sidebar-nav';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const currentSession = await getSession();
      setSession(currentSession);
      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                {loading ? (
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : (
                  <AdminSidebarNav isSuperAdmin={session?.role === 'superadmin'} />
                )}
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="p-3 border-b flex items-center justify-between bg-background sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-semibold hidden md:block">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    {loading ? (
                        <Skeleton className="h-8 w-8 rounded-full" />
                    ) : (
                         <Avatar>
                            <AvatarFallback>
                                <UserCircle2 />
                            </AvatarFallback>
                        </Avatar>
                    )}
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
