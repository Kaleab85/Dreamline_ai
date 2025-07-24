
import { getAppointments } from '@/lib/appointment-data';
import type { AppointmentStatus } from '@/lib/appointment-data';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Inbox, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppointmentFilters } from './_components/appointment-filters';
import { cn } from '@/lib/utils';
import { DeleteAppointmentButton } from './_components/delete-appointment-button';

function formatServiceName(service: string) {
    if (!service) return 'N/A';
    return service
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

const statusBadgeVariants: Record<AppointmentStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
    Confirmed: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
    Completed: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100'
}

export default async function AdminAppointmentsPage({
  searchParams,
}: {
  searchParams?: {
    service?: string;
    status?: AppointmentStatus;
  };
}) {
  const appointments = await getAppointments(searchParams);
  const session = await getSession();
  const isSuperAdmin = session?.role === 'superadmin';
  
  return (
    <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <CardTitle className="font-headline text-2xl">Appointments</CardTitle>
                    <CardDescription>A list of all scheduled appointments.</CardDescription>
                </div>
            </div>
            {isSuperAdmin && (
              <Button asChild>
                <Link href="/admin/register">
                  <UserPlus className="mr-2" />
                  Register Admin
                </Link>
              </Button>
            )}
        </CardHeader>
        <CardContent>
        <AppointmentFilters />
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/60">
                    <TableHead className="w-[250px] font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Service</TableHead>
                    <TableHead className="font-semibold">Preferred Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Message</TableHead>
                    <TableHead className="w-[100px] text-right font-semibold">Actions</TableHead>
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
                        <TableCell>
                           <Badge className={cn(statusBadgeVariants[appointment.status])}>
                             {appointment.status}
                           </Badge>
                        </TableCell>
                        <TableCell className="max-w-sm truncate">{appointment.message || 'N/A'}</TableCell>
                        <TableCell className="text-right">
                           <DeleteAppointmentButton appointmentId={appointment.id} />
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="h-48 text-center">
                            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                <Inbox className="h-12 w-12" />
                                <h3 className="text-xl font-semibold">No appointments found</h3>
                                <p>There are no appointments matching the current filters.</p>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        </CardContent>
    </Card>
  );
}
