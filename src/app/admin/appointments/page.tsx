
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
import { LogOut } from 'lucide-react';

function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button variant="outline">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </form>
  )
}

export default function AdminAppointmentsPage() {
  const appointments = getAppointments();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>A list of all scheduled appointments.</CardDescription>
          </div>
          <LogoutButton />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.message || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
