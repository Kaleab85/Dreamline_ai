'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { generateTagsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Loader2 } from 'lucide-react';

const initialState = {
  type: null,
  tags: [],
  errors: null,
  message: null
};

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
        {pending ? 'Generating...' : 'Generate Tags'}
      </Button>
    );
}

export default function NewPostPage() {
  const [state, formAction] = useActionState(generateTagsAction, initialState);

  return (
    <div className="container max-w-2xl mx-auto py-12 md:py-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-accent">AI Tag Generator</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
                Paste your blog post content below and let our AI assistant generate relevant, SEO-optimized tags for you.
            </p>
        </div>
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Enter your blog content to generate tags.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Blog Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Paste your blog post content here. For best results, use at least 100 characters."
                rows={15}
              />
              {state.errors?.content && (
                  <p className="text-sm text-destructive">{state.errors.content[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-start">
            <SubmitButton />
            {state.type === 'error' && state.message && (
                <p className="text-sm text-destructive mt-2">{state.message}</p>
            )}
          </CardFooter>
        </form>
      </Card>
      
      {state.tags && state.tags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-headline font-bold mb-4">Generated Tags:</h2>
            <div className="flex flex-wrap gap-2">
                {state.tags.map((tag, index) => (
                    <Badge key={index} variant="default" className="text-base py-1 px-3">
                        {tag}
                    </Badge>
                ))}
            </div>
          </div>
      )}
    </div>
  );
}
