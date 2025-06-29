
import { getAppointments } from '@/lib/appointment-data';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/actions';
import { LogOut, UserPlus, CalendarDays, Inbox } from 'lucide-react';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button variant="outline" size="sm">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </form>
  )
}

async function RegisterAdminButton() {
  const session = await getSession();

  if (session?.role !== 'superadmin') {
    return null;
  }

  return (
    <Button asChild size="sm">
      <Link href="/admin/register">
        <UserPlus className="mr-2 h-4 w-4" />
        Register Admin
      </Link>
    </Button>
  );
}

function formatServiceName(service: string) {
    if (!service) return 'N/A';
    return service
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export default async function AdminAppointmentsPage() {
  const appointments = getAppointments();
  
  return (
    <div className="min-h-screen bg-muted/40">
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-secondary p-3 rounded-lg">
                        <CalendarDays className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-2xl">Appointments</CardTitle>
                        <CardDescription>A list of all scheduled appointments.</CardDescription>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <RegisterAdminButton />
                    <LogoutButton />
                </div>
                </CardHeader>
                <CardContent>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                        <TableRow className="bg-secondary/50 hover:bg-secondary/60">
                            <TableHead className="w-[250px] font-semibold">Client</TableHead>
                            <TableHead className="font-semibold">Service</TableHead>
                            <TableHead className="font-semibold">Preferred Date</TableHead>
                            <TableHead className="font-semibold">Message</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell className="font-medium">
                                    <div>{appointment.name}</div>
                                    <div className="text-sm text-muted-foreground">{appointment.email}</div>
                                    <div className="text-sm text-muted-foreground">{appointment.phone}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{formatServiceName(appointment.service)}</Badge>
                                </TableCell>
                                <TableCell>{appointment.date ? format(new Date(appointment.date + 'T00:00'), 'PPP') : 'N/A'}</TableCell>
                                <TableCell className="max-w-sm truncate">{appointment.message || 'N/A'}</TableCell>
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-48 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <Inbox className="h-12 w-12" />
                                        <h3 className="text-xl font-semibold">No appointments yet</h3>
                                        <p>New appointments will appear here once submitted.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
