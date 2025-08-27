import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Globe, Plane, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-accent">Our Services</h1>
          <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
            We provide a holistic suite of services to ensure your transition to studying abroad is seamless, successful, and stress-free.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 space-y-16">

          {/* Service 1: Educational Consultation */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Image
              src="/images/service1.png"
              width={600}
              height={400}
              alt="Educational Consultation"
              className="rounded-xl object-cover"
            />
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                <BookOpen className="h-5 w-5" />
                <span>Educational Consultation</span>
              </div>
              <h2 className="text-3xl font-headline font-bold">Find Your Perfect Fit</h2>
              <p className="text-muted-foreground text-lg">
                The world of education is vast. Our expert consultants help you navigate it. We provide personalized counseling to identify the universities and programs that align with your academic background, career aspirations, and financial situation.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>University and course selection</li>
                <li>Application review and assistance</li>
                <li>Statement of purpose and essay guidance</li>
                <li>Scholarship application support</li>
              </ul>
              <Button asChild>
                <Link href="/book-appointment">Consult an Expert <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Service 2: Visa Application Assistance */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-4 lg:order-last">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                <Globe className="h-5 w-5" />
                <span>Visa Application Assistance</span>
              </div>
              <h2 className="text-3xl font-headline font-bold">Navigate Immigration with Confidence</h2>
              <p className="text-muted-foreground text-lg">
                The visa process can be the most stressful part of your journey. We demystify it for you, providing meticulous guidance to ensure your application is complete, accurate, and submitted on time for the highest chance of success.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Document checklist and verification</li>
                <li>Application form filling and review</li>
                <li>Mock visa interview preparation</li>
                <li>Updates on immigration policies</li>
              </ul>
              <Button asChild>
                <Link href="/book-appointment">Get Visa Help <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Image
              src="/images/service2.png"
              width={600}
              height={400}
              alt="Visa Application"
              className="rounded-xl object-cover"
            />
          </div>

          {/* Service 3: Travel Coordination */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Image
              src="/images/service3.png"
              width={600}
              height={400}
              alt="Travel Coordination"
              className="rounded-xl object-cover"
            />
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                <Plane className="h-5 w-5" />
                <span>Travel Coordination</span>
              </div>
              <h2 className="text-3xl font-headline font-bold">Arrive Ready and Rested</h2>
              <p className="text-muted-foreground text-lg">
                Your journey doesn't end with an acceptance letter. We handle all your travel logistics, from finding the best flights to arranging accommodation, so you can focus on the exciting adventure ahead.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Flight booking and travel insurance</li>
                <li>Pre-departure briefings and checklists</li>
                <li>Accommodation arrangements</li>
                <li>Airport pickup coordination</li>
              </ul>
              <Button asChild>
                <Link href="/book-appointment">Plan Your Travel <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
