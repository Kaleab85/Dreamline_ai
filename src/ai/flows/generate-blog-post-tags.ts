// src/ai/flows/generate-blog-post-tags.ts
'use server';
/**
 * @fileOverview Generates SEO-optimized tags for blog posts using AI.
 *
 * - generateBlogPostTags - A function that generates tags for a blog post.
 * - GenerateBlogPostTagsInput - The input type for the generateBlogPostTags function.
 * - GenerateBlogPostTagsOutput - The return type for the generateBlogPostTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostTagsInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post to generate tags for.'),
});
export type GenerateBlogPostTagsInput = z.infer<typeof GenerateBlogPostTagsInputSchema>;

const GenerateBlogPostTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of SEO-optimized tags for the blog post.'),
});
export type GenerateBlogPostTagsOutput = z.infer<typeof GenerateBlogPostTagsOutputSchema>;

export async function generateBlogPostTags(
  input: GenerateBlogPostTagsInput
): Promise<GenerateBlogPostTagsOutput> {
  return generateBlogPostTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostTagsPrompt',
  input: {schema: GenerateBlogPostTagsInputSchema},
  output: {schema: GenerateBlogPostTagsOutputSchema},
  prompt: `You are an SEO expert. Generate 5-10 SEO-optimized tags for the following blog post content:

  {{blogPostContent}}

  Return the tags as a JSON array of strings.
  Do not include any other text or explanation.
  The tags should be relevant to the content of the blog post and should be popular search terms.
  The tags should be short and concise.
  The tags should be in lowercase.
  The tags should not include any special characters.
  The tags should not include any stop words (e.g. "the", "a", "an", "in", "on", "of", "to", "for", "with", "at", "by", "from", "up", "about", "into", "over", "after", "before", "during", "without", "between", "among").
  The tags should be comma separated.
  Example: immigration, study abroad, scholarships, international students, visa application
  `,
});

const generateBlogPostTagsFlow = ai.defineFlow(
  {
    name: 'generateBlogPostTagsFlow',
    inputSchema: GenerateBlogPostTagsInputSchema,
    outputSchema: GenerateBlogPostTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
