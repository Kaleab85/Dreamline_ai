import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Globe, Plane } from 'lucide-react';

import { Logo } from '@/components/logo';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Logo />
                  <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-accent">
                    Unlock Your Global Future
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Dreamline Consultancy is your premier partner for educational consulting, seamless visa applications, and expert travel coordination. Let us pave your way to success.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/book-appointment">Book an Appointment</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/services">Our Services</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/images/Hero.jpg"
                width="600"
                height="400"
                alt="Dreamline Consultancy - Your pathway to global education"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Your Journey, Simplified</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a comprehensive suite of services to ensure your international education and travel aspirations are realized smoothly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">Educational Consultation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Expert guidance to find the right universities and programs that match your ambitions.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <Globe className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">Visa Application</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Stress-free assistance with visa paperwork and processes for a successful application.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <Plane className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">Travel Coordination</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Complete travel arrangements, from flights to accommodation, for a seamless journey.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/images/About.jpg"
                width="600"
                height="400"
                alt="About Dreamline Consultancy - Professional education consultants"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">About Dreamline Consultancy</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We are a team of dedicated professionals passionate about helping students achieve their dreams of studying abroad. Our mission is to provide transparent, reliable, and personalized guidance every step of the way.
                  </p>
                </div>
                <Button asChild variant="link" className="px-0">
                  <Link href="/about">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section id="success-stories" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Success Stories</div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Our Students' Achievements</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from students who have successfully achieved their dreams of studying abroad with our guidance and support.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">N</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold">Natnael Yohannes</h3>
                      <p className="text-sm text-muted-foreground">University of Toronto, Canada</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Dreamline Consultancy made my dream of studying computer science in Canada a reality. Their guidance through the visa process was invaluable."
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">N</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold">Nardos Shamebo</h3>
                      <p className="text-sm text-muted-foreground">University of British Columbia, Canada</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The team helped me secure a scholarship for my Master's degree. Their expertise in international education is unmatched."
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">B</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold">Bereket Belayneh</h3>
                      <p className="text-sm text-muted-foreground">McGill University, Canada</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "From application to arrival, Dreamline supported me every step of the way. Now I'm pursuing my PhD at McGill!"
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
             <div className="text-center mt-12">
               <Button asChild size="lg" variant="outline">
                 <Link href="/contact">Share Your Success Story</Link>
               </Button>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
