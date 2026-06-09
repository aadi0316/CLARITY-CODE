// Explain Code Functionality Flow
'use server';
/**
 * @fileOverview Explains the functionality of a given code snippet.
 *
 * - explainCode - A function that explains the functionality of the code.
 * - ExplainCodeInput - The input type for the explainCode function.
 * - ExplainCodeOutput - The return type for the explainCode function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainCodeInputSchema = z.object({
  code: z.string().describe('The code to explain.'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the code functionality.'),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: {
    schema: z.object({
      code: z.string().describe('The code to explain.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('The explanation of the code functionality.'),
    }),
  },
  prompt: `You are an expert software developer. You are excellent at explaining code functionality to others.

  Explain the functionality of the following code:
  \n
  {{code}}
  `,
});

const explainCodeFlow = ai.defineFlow<
  typeof ExplainCodeInputSchema,
  typeof ExplainCodeOutputSchema
>({
  name: 'explainCodeFlow',
  inputSchema: ExplainCodeInputSchema,
  outputSchema: ExplainCodeOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
