'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { bookAppointment } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

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
      {pending ? 'Booking...' : 'Book My Appointment'}
    </Button>
  );
}

export default function BookAppointmentPage() {
  const [state, formAction] = useActionState(bookAppointment, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.type === 'success') {
      toast({
        title: "Appointment Booked!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.type === 'error') {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 min-h-screen">
        <div className="bg-secondary p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tighter text-accent mb-4">Book a Consultation</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Take the first step towards your international education journey. Fill out the form to schedule a free, no-obligation consultation with one of our expert advisors.
            </p>
            <Card>
              <form ref={formRef} action={formAction} className="space-y-6 p-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" />
                  {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" />
                    {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" />
                    {state.errors?.phone && <p className="text-sm text-destructive mt-1">{state.errors.phone[0]}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service">Service of Interest</Label>
                    <Select name="service">
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational-consultation">Educational Consultation</SelectItem>
                        <SelectItem value="visa-assistance">Visa Application Assistance</SelectItem>
                        <SelectItem value="travel-coordination">Travel Coordination</SelectItem>
                        <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                     {state.errors?.service && <p className="text-sm text-destructive mt-1">{state.errors.service[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" name="date" type="date" />
                     {state.errors?.date && <p className="text-sm text-destructive mt-1">{state.errors.date[0]}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea id="message" name="message" rows={4} placeholder="Tell us a bit about your goals..." />
                </div>
                <SubmitButton />
              </form>
            </Card>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="https://placehold.co/800x1200.png"
            width={800}
            height={1200}
            alt="Consultation"
            data-ai-hint="friendly advisor meeting"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
