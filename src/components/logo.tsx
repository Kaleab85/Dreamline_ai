import Link from 'next/link';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center" onClick={onClick}>
      <span className="text-2xl font-headline font-bold text-accent">
        Dreamline <span className="text-primary">Consultancy</span>
      </span>
    </Link>
  );
}
