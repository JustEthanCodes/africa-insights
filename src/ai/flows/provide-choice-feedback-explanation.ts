'use server';

/**
 * @fileOverview Provides feedback on a player's choice and, if needed, an AI-powered explanation.
 *
 * - provideChoiceFeedbackWithExplanation - A function that provides feedback and explanation for a choice.
 * - ProvideChoiceFeedbackWithExplanationInput - The input type for the provideChoiceFeedbackWithExplanation function.
 * - ProvideChoiceFeedbackWithExplanationOutput - The return type for the provideChoiceFeedbackWithExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideChoiceFeedbackWithExplanationInputSchema = z.object({
  choiceCorrect: z.boolean().describe('Whether the choice was correct or not.'),
  explanationNeeded: z.boolean().describe('Whether an explanation is needed or not.'),
  challenge: z.string().describe('The challenge presented to the player.'),
  choice: z.string().describe('The choice the player made.'),
  correctAnswer: z.string().describe('The correct answer to the challenge.'),
});
export type ProvideChoiceFeedbackWithExplanationInput = z.infer<typeof ProvideChoiceFeedbackWithExplanationInputSchema>;

const ProvideChoiceFeedbackWithExplanationOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the choice.'),
  explanation: z.string().optional().describe('AI-powered explanation of the reasoning behind the correct answer, if needed.'),
});
export type ProvideChoiceFeedbackWithExplanationOutput = z.infer<typeof ProvideChoiceFeedbackWithExplanationOutputSchema>;

export async function provideChoiceFeedbackWithExplanation(input: ProvideChoiceFeedbackWithExplanationInput): Promise<ProvideChoiceFeedbackWithExplanationOutput> {
  return provideChoiceFeedbackWithExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideChoiceFeedbackWithExplanationPrompt',
  input: {schema: ProvideChoiceFeedbackWithExplanationInputSchema},
  output: {schema: ProvideChoiceFeedbackWithExplanationOutputSchema},
  prompt: `You are a helpful assistant that provides feedback on choices made in a game about African challenges and opportunities. 

  Challenge: {{{challenge}}}
  Choice Made: {{{choice}}}
  Correct Answer: {{{correctAnswer}}}

  {% if choiceCorrect %}
  Feedback: That's correct!
  {% else %}
  Feedback: That's incorrect.
  {% endif %}

  {% if explanationNeeded %}
  Explanation: Here's why the correct answer is {{{correctAnswer}}}: Let me explain it in a way that will help you learn. 
  {% endif %}
`,
});

const explanationPrompt = ai.definePrompt({
  name: 'explanationPrompt',
  input: {schema: ProvideChoiceFeedbackWithExplanationInputSchema},
  output: {schema: z.string().describe('AI-powered explanation of the reasoning behind the correct answer.')},
  prompt: `You are an AI assistant that explains the reasoning behind the correct answer in a game about African challenges and opportunities.

  Challenge: {{{challenge}}}
  Choice Made: {{{choice}}}
  Correct Answer: {{{correctAnswer}}}

  Explanation: Explain why the correct answer is {{{correctAnswer}}} in a way that will help the player learn from their mistake. Focus on the underlying concepts and reasoning. Keep your explanation concise and clear.
  `,
});

const provideChoiceFeedbackWithExplanationFlow = ai.defineFlow(
  {
    name: 'provideChoiceFeedbackWithExplanationFlow',
    inputSchema: ProvideChoiceFeedbackWithExplanationInputSchema,
    outputSchema: ProvideChoiceFeedbackWithExplanationOutputSchema,
  },
  async input => {
    const {
      choiceCorrect,
      explanationNeeded,
    } = input;

    const {output: feedbackOutput} = await prompt(input);

    let explanation = undefined;

    if (explanationNeeded) {
      const {output: explanationOutput} = await explanationPrompt(input);
      explanation = explanationOutput;
    }

    return {
      feedback: feedbackOutput.feedback,
      explanation: explanation,
    };
  }
);
