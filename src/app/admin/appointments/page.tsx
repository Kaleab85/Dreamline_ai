
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CalendarDays, UserPlus } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppointmentFilters } from './_components/appointment-filters';
import { AppointmentsTable } from './_components/appointments-table';
import { Suspense } from 'react';

export default async function AdminAppointmentsPage() {
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
            <CardTitle className="font-headline text-2xl">
              Appointments
            </CardTitle>
            <CardDescription>
              A list of all scheduled appointments.
            </CardDescription>
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
        <Suspense>
          <AppointmentFilters />
          <AppointmentsTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}
