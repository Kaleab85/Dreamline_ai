import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm">
              Your trusted partner in educational consulting, visa applications, and travel coordination.
            </p>
          </div>
          <div className="grid gap-4">
            <h4 className="font-headline font-semibold">Quick Links</h4>
            <nav className="grid gap-2">
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link href="/book-appointment" className="hover:text-primary transition-colors">Book Appointment</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
            <div className="text-sm">
              <p>123 Education Lane, Knowledge City, 12345</p>
              <p>Email: <a href="mailto:contact@dreamline.com" className="hover:text-primary transition-colors">contact@dreamline.com</a></p>
              <p>Phone: <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a></p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dreamline Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
