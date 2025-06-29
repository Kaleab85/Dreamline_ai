import Link from 'next/link';
import { University } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <University className="h-8 w-8 text-primary" />
      <span className="text-2xl font-headline font-bold text-accent">
        Dreamline <span className="text-primary">Consultancy</span>
      </span>
    </Link>
  );
}
