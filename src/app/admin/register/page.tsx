import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RegisterAdminForm } from './_components/register-admin-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function RegisterAdminPage() {
  const session = await getSession();

  if (session?.role !== 'superadmin') {
    redirect('/admin/appointments');
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/admin/appointments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Appointments
          </Link>
        </Button>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Register New Admin</CardTitle>
          <CardDescription>
            Create a new admin account. They will have access to view the appointments list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterAdminForm />
        </CardContent>
      </Card>
    </div>
  );
}
