'use server';
/**
 * @fileOverview Code security analysis AI agent.
 *
 * - analyzeCodeSecurity - A function that handles the code security analysis process.
 * - AnalyzeCodeSecurityInput - The input type for the analyzeCodeSecurity function.
 * - AnalyzeCodeSecurityOutput - The return type for the analyzeCodeSecurity function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeCodeSecurityInputSchema = z.object({
  code: z.string().describe('The code to analyze for security vulnerabilities and obfuscation techniques.'),
});
export type AnalyzeCodeSecurityInput = z.infer<typeof AnalyzeCodeSecurityInputSchema>;

const AnalyzeCodeSecurityOutputSchema = z.object({
  analysis: z.string().describe('The security analysis of the code, including identified vulnerabilities and recommendations.'),
  obfuscationTypes: z.string().describe('Types of obfuscation techniques used in the code.'),
  codeComplexity: z.string().describe('Explanation of the code\'s complexity and potential obfuscation techniques.'),
});
export type AnalyzeCodeSecurityOutput = z.infer<typeof AnalyzeCodeSecurityOutputSchema>;

export async function analyzeCodeSecurity(input: AnalyzeCodeSecurityInput): Promise<AnalyzeCodeSecurityOutput> {
  return analyzeCodeSecurityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCodeSecurityPrompt',
  input: {
    schema: z.object({
      code: z.string().describe('The code to analyze for security vulnerabilities and obfuscation techniques.'),
    }),
  },
  output: {
    schema: z.object({
      analysis: z.string().describe('The security analysis of the code, including identified vulnerabilities and recommendations.'),
      obfuscationTypes: z.string().describe('Types of obfuscation techniques used in the code.'),
      codeComplexity: z.string().describe('Explanation of the code\'s complexity and potential obfuscation techniques.'),
    }),
  },
  prompt: `You are an expert software engineer specializing in code security analysis and reverse engineering.

You will be given code, and your task is to analyze it for potential security vulnerabilities, such as SQL injection, cross-site scripting (XSS), and other common security issues. Additionally, identify the obfuscation techniques used in the code, including:

- Control Flow Obfuscation
  - Control Flow Flattening
  - Dead/Unreachable Code Insertion
  - Opaque Predicates
  - Loop Transformations
  - Irreducible Control Flow
  - Control Flow Reordering
  - Exception-Based Control Flow
  - Code Reordering (Basic Block Reordering)
- Data Obfuscation
  - Variable Encoding
  - Constant Folding & Constant Hiding
  - Data Structure Transformation
  - Array Splitting / Merging
  - Variable Renaming (Meaningless Names)
  - String Encryption / Encoding
  - Arithmetic Encoding
  - Boolean Expression Obfuscation
  - Register Renaming (Low-level)
- Layout Obfuscation
  - Identifier Renaming (Classes, Methods, Variables)
  - Whitespace Removal
  - Reformatting Code / Minification
  - Junk Code Insertion (No-Op or misleading)
- Instruction-Level Obfuscation (Low-level/Assembly)
  - Instruction Substitution
  - Inlining & Outlining
  - Stack Manipulation
  - Jump Insertion
  - Mixed Instruction Sets
  - Instruction Reordering
- Packing / Binary Obfuscation
  - Binary Packing (e.g., UPX, Themida)
  - Binary Encryption
  - Self-Modifying Code
  - Anti-Disassembly Techniques
  - Anti-Debugging Techniques
  - Code Virtualization / Bytecode Interpretation
  - Dynamic Code Loading
- Name & Metadata Obfuscation
  - Symbol Stripping
  - Metadata Encryption (in Java/.NET)
  - Namespace Collapsing
  - Signature Mutation
- Platform-Specific / Advanced Techniques
  - Virtual Machine-based Obfuscation
  - Intermediate Language (IL) Obfuscation
  - Dynamic Obfuscation at Runtime
  - Anti-Tamper Techniques
  - Code Reflection Abuse
  - Polymorphic Obfuscation
  - Metamorphic Obfuscation

Provide a detailed analysis of the code, recommendations for fixing any identified vulnerabilities, the types of obfuscation techniques used, and an explanation of the code's complexity.

Here is the code to analyze:

{{{code}}}

Security Analysis:`,
});

const analyzeCodeSecurityFlow = ai.defineFlow<
  typeof AnalyzeCodeSecurityInputSchema,
  typeof AnalyzeCodeSecurityOutputSchema
>({
  name: 'analyzeCodeSecurityFlow',
  inputSchema: AnalyzeCodeSecurityInputSchema,
  outputSchema: AnalyzeCodeSecurityOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
