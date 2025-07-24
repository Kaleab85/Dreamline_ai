'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { setupSuperAdminAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';

const initialState = {
    type: null,
    errors: null,
    message: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Super Admin
      </Button>
    );
}

export default function SetupPage() {
  const [state, formAction] = useActionState(setupSuperAdminAction, initialState);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Admin Setup</CardTitle>
          <CardDescription>
            Welcome! Let's create the first super admin account. This page can only be used once.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="grid gap-4">
            {state?.type === 'error' && state.message && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Setup Failed</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="superadmin@example.com" required />
              {state.errors?.email && (
                <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required placeholder="Choose a strong password" />
              {state.errors?.password && (
                <p className="text-sm text-destructive mt-1">{state.errors.password[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
