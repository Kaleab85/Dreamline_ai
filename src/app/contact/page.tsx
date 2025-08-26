'use client';

import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { submitContactFormClient, type ContactFormData, type ContactFormResult } from '@/lib/contact-client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ContactFormResult['errors']>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const result = await submitContactFormClient(data);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        formRef.current?.reset();
      } else {
        setErrors(result.errors || {});
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
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
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-accent">Get in Touch</h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
            Have questions or ready to start your journey? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Contact Information</CardTitle>
                    <CardDescription>Find us at the following location or reach out via phone or email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-lg">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <span>London Cafe, Hawassa, Ethiopia</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                        <a href="mailto:dreamlineet@gmail.com" className="hover:text-primary">dreamlineet@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                        <a href="tel:+251934107400" className="hover:text-primary">+251 934 107 400</a>
                    </div>
                </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                  {errors?.name && <p className="text-sm text-destructive mt-1">{errors.name[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" />
                  {errors?.email && <p className="text-sm text-destructive mt-1">{errors.email[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Question about services" />
                  {errors?.subject && <p className="text-sm text-destructive mt-1">{errors.subject[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} placeholder="Your message here..." />
                  {errors?.message && <p className="text-sm text-destructive mt-1">{errors.message[0]}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}