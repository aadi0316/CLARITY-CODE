// 'use server';
/**
 * @fileOverview Code deobfuscation AI agent.
 *
 * - deobfuscateCode - A function that handles the code deobfuscation process.
 * - DeobfuscateCodeInput - The input type for the deobfuscateCode function.
 * - DeobfuscateCodeOutput - The return type for the deobfuscateCode function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DeobfuscateCodeInputSchema = z.object({
  obfuscatedCode: z.string().describe('The obfuscated code to deobfuscate.'),
});
export type DeobfuscateCodeInput = z.infer<typeof DeobfuscateCodeInputSchema>;

const DeobfuscateCodeOutputSchema = z.object({
  deobfuscatedCode: z.string().describe('The deobfuscated code.'),
  explanation: z.string().describe('Explanation of the original code functionality.'),
});
export type DeobfuscateCodeOutput = z.infer<typeof DeobfuscateCodeOutputSchema>;

export async function deobfuscateCode(input: DeobfuscateCodeInput): Promise<DeobfuscateCodeOutput> {
  return deobfuscateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'deobfuscateCodePrompt',
  input: {
    schema: z.object({
      obfuscatedCode: z.string().describe('The obfuscated code to deobfuscate.'),
    }),
  },
  output: {
    schema: z.object({
      deobfuscatedCode: z.string().describe('The deobfuscated code.'),
      explanation: z.string().describe('Explanation of the original code functionality.'),
    }),
  },
  prompt: `You are an expert software engineer specializing in reverse engineering and code deobfuscation.

You will be given obfuscated code, and your task is to deobfuscate it and explain the original code's functionality.

Here is the obfuscated code:

{{{obfuscatedCode}}}

Deobfuscated Code:`,
});

const deobfuscateCodeFlow = ai.defineFlow<
  typeof DeobfuscateCodeInputSchema,
  typeof DeobfuscateCodeOutputSchema
>({
  name: 'deobfuscateCodeFlow',
  inputSchema: DeobfuscateCodeInputSchema,
  outputSchema: DeobfuscateCodeOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
