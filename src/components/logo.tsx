import Link from 'next/link';
import Image from 'next/image';

// Text logo for hero section
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center" onClick={onClick}>
      <span className="text-2xl font-headline font-bold text-accent">
        Dreamline <span className="text-primary">Consultancy</span>
      </span>
    </Link>
  );
}

// Image logo for navbar
export function NavbarLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center" onClick={onClick}>
      <Image
        src="/images/dream_logo.png"
        alt="Dreamline Consultancy"
        width={320}
        height={85}
        className="h-16 md:h-28 w-auto"
        priority
      />
    </Link>
  );
}
