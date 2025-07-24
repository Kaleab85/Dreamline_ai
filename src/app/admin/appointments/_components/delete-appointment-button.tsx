
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteAppointmentAction } from '@/lib/actions';
import { Trash2 } from 'lucide-react';
import { useFormStatus, useActionState } from 'react-dom';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <AlertDialogAction asChild>
      <Button variant="destructive" disabled={pending}>
        {pending ? 'Deleting...' : 'Delete'}
      </Button>
    </AlertDialogAction>
  );
}

const initialState = {
  type: null,
  message: '',
};

export function DeleteAppointmentButton({ appointmentId }: { appointmentId: string }) {
  const [state, formAction] = useActionState(deleteAppointmentAction, initialState);

  useEffect(() => {
    if (state.type === 'success' && state.message) {
      toast({
        title: 'Success',
        description: state.message,
      })
    } else if (state.type === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      })
    }
  },[state]);


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete appointment</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the appointment from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={formAction}>
            <AlertDialogFooter>
                <input type="hidden" name="id" value={appointmentId} />
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <DeleteButton />
            </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
