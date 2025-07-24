
'use client';

import { useState, useEffect } from 'react';
import { getSession, SessionPayload } from '@/lib/auth';
import { User, getUserById } from '@/lib/user-data';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdminSidebarNav } from './_components/admin-sidebar-nav';
import { Skeleton } from '@/components/ui/skeleton';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      setLoading(true);
      const currentSession = await getSession();
      setSession(currentSession);

      if (currentSession?.userId) {
        const currentUser = await getUserById(currentSession.userId);
        setUser(currentUser);
      }
      setLoading(false);
    };

    fetchSessionAndUser();
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
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                     ) : user ? (
                        <>
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
                        </>
                     ) : null}
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
