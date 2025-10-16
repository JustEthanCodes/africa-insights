'use server';

/**
 * @fileOverview A flow for generating relevant challenge and opportunity scenarios facing Africa.
 *
 * - generateChallengeScenario - A function that generates a challenge or opportunity scenario.
 * - GenerateChallengeScenarioInput - The input type for the generateChallengeScenario function.
 * - GenerateChallengeScenarioOutput - The return type for the generateChallengeScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChallengeScenarioInputSchema = z.object({
  topic: z
    .string()
    .default('a relevant challenge or opportunity facing Africa')
    .describe('The topic to generate a scenario about.'),
});
export type GenerateChallengeScenarioInput = z.infer<
  typeof GenerateChallengeScenarioInputSchema
>;

const GenerateChallengeScenarioOutputSchema = z.object({
  scenario: z.string().describe('A challenge or opportunity scenario.'),
});
export type GenerateChallengeScenarioOutput = z.infer<
  typeof GenerateChallengeScenarioOutputSchema
>;

export async function generateChallengeScenario(
  input: GenerateChallengeScenarioInput
): Promise<GenerateChallengeScenarioOutput> {
  return generateChallengeScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChallengeScenarioPrompt',
  input: {schema: GenerateChallengeScenarioInputSchema},
  output: {schema: GenerateChallengeScenarioOutputSchema},
  prompt: `You are a game master creating scenarios for a game about the challenges and opportunities facing Africa.  Generate a realistic and engaging scenario based on the following topic: {{{topic}}}`,
});

const generateChallengeScenarioFlow = ai.defineFlow(
  {
    name: 'generateChallengeScenarioFlow',
    inputSchema: GenerateChallengeScenarioInputSchema,
    outputSchema: GenerateChallengeScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
