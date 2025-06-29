import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
            </Button>
        </div>
        
        <h1 className="text-4xl font-headline font-extrabold tracking-tight lg:text-5xl mb-4 text-accent">{post.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">Published on {post.date}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        
        <Image
          src={post.image}
          width={1200}
          height={675}
          alt={post.title}
          data-ai-hint={post.aiHint}
          className="rounded-xl object-cover aspect-video mb-8"
          priority
        />
        
        <div 
          className="prose prose-lg max-w-none text-foreground prose-h3:font-headline prose-h3:text-accent prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </article>
  );
}
