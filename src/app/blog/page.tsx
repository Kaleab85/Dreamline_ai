import { getBlogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div>
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-accent">Dreamline Insights</h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
            Your source for expert advice on studying abroad, scholarships, visa tips, and immigration updates.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden group flex flex-col">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    width={400}
                    height={225}
                    alt={post.title}
                    data-ai-hint={post.aiHint}
                    className="aspect-video object-cover w-full group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <CardContent className="p-6 flex flex-col flex-1">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <h2 className="text-xl font-headline font-bold mt-2 flex-1">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-muted-foreground flex-1">{post.excerpt}</p>
                  <Button asChild variant="link" className="px-0 mt-4 self-start">
                    <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
