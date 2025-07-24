// This file was previously src/app/blog/new/page.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { generateTagsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Loader2, Tags } from 'lucide-react';

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

export default function GenerateTagsPage() {
  const [state, formAction] = useActionState(generateTagsAction, initialState);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg">
                <Tags className="h-6 w-6 text-accent" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">AI Tag Generator</CardTitle>
                <CardDescription>
                    Paste your blog post content below to generate relevant, SEO-optimized tags.
                </CardDescription>
            </div>
        </CardHeader>
        <form action={formAction}>
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
          <Card className="mt-8">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Generated Tags</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {state.tags.map((tag, index) => (
                        <Badge key={index} variant="default" className="text-base py-1 px-3">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
          </Card>
      )}
    </div>
  );
}
