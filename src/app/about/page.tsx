import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Eye, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-accent">Our Story</h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              Founded on the principle that education knows no borders, Dreamline Consultancy was created to empower students to pursue their academic goals anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x600.png"
                width={600}
                height={600}
                alt="Our Team"
                data-ai-hint="professional team photo"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tight">Our Mission, Vision, and Values</h2>
                <p className="text-muted-foreground">
                  We are driven by a core set of beliefs that guide every interaction and decision.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Eye className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-headline font-semibold text-lg">Our Vision</h3>
                    <p className="text-muted-foreground">To be the most trusted and respected educational consultancy, creating a world where every student can access the best education, regardless of their origin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Award className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-headline font-semibold text-lg">Our Mission</h3>
                    <p className="text-muted-foreground">To provide exceptional, personalized guidance and support to students, simplifying the complexities of studying abroad and empowering them to achieve their full potential.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <HeartHandshake className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-headline font-semibold text-lg">Our Values</h3>
                    <p className="text-muted-foreground">Integrity, Excellence, Empowerment, and Collaboration are the pillars of our consultancy. We operate with transparency and a relentless commitment to our students' success.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tight">Ready to Start Your Journey?</h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
              Let our experienced consultants guide you. Your dream university is closer than you think.
            </p>
            <Button size="lg" asChild>
              <Link href="/book-appointment">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
