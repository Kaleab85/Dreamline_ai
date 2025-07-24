
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { RegisterAdminForm } from './_components/register-admin-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default async function RegisterAdminPage() {
  const session = await getSession();

  if (session?.role !== 'superadmin') {
    redirect('/admin/appointments');
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-secondary p-3 rounded-lg">
              <UserPlus className="h-6 w-6 text-accent" />
          </div>
          <div>
              <CardTitle className="font-headline text-2xl">Register New Admin</CardTitle>
              <CardDescription>
                  Create a new admin account with access to the appointments list.
              </CardDescription>
          </div>
      </CardHeader>
      <CardContent>
        <RegisterAdminForm />
      </CardContent>
    </Card>
  );
}
