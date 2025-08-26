'use client';

import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { bookAppointmentClient, type AppointmentFormData, type AppointmentFormResult } from '@/lib/appointment-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

export default function BookAppointmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<AppointmentFormResult['errors']>({});
  const [selectedService, setSelectedService] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: AppointmentFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: selectedService,
      date: formData.get('date') as string,
      message: formData.get('message') as string,
    };

    try {
      const result = await bookAppointmentClient(data);
      
      if (result.success) {
        toast({
          title: "Appointment Booked!",
          description: result.message,
        });
        formRef.current?.reset();
        setSelectedService('');
      } else {
        setErrors(result.errors || {});
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" />
                  {errors?.name && <p className="text-sm text-destructive mt-1">{errors.name[0]}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" />
                    {errors?.email && <p className="text-sm text-destructive mt-1">{errors.email[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" />
                    {errors?.phone && <p className="text-sm text-destructive mt-1">{errors.phone[0]}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service">Service of Interest</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
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
                    {errors?.service && <p className="text-sm text-destructive mt-1">{errors.service[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" name="date" type="date" />
                    {errors?.date && <p className="text-sm text-destructive mt-1">{errors.date[0]}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea id="message" name="message" rows={4} placeholder="Tell us a bit about your goals..." />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Booking...' : 'Book My Appointment'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 z-10"></div>
          <div className="relative z-20 p-8 h-full flex flex-col justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-headline font-bold text-accent mb-4">Visit Our Office</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">London Cafe, Hawassa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Phone: +251 934 107 400</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Email: dreamlineet@gmail.com</span>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-3">Find us on the map:</p>
                <div className="aspect-video rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">📍 Dreamline Consultancy</p>
                    <p className="text-xs text-gray-500 mb-3">London Cafe, Hawassa, Ethiopia</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          const mapUrl = 'https://www.google.com/maps/place/DreamLine+Consultancy/@7.0512084,38.4741187,17z/data=!3m1!4b1!4m6!3m5!1s0x17b145586db6d6e5:0x844696ed6f68fb41!8m2!3d7.0512084!4d38.4741187!16s%2Fg%2F11pk9hbtxl?entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D';
                          window.open(mapUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors cursor-pointer w-full justify-center"
                      >
                        📍 View on Google Maps
                      </button>
                      <p className="text-xs text-gray-400">
                        Or search "Dreamline Consultancy Hawassa" on Google Maps
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        </div>
      </div>
    </div>
  );
}
