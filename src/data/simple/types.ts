/** One small idea, explained in everyday words, followed by a real-life example. */
export interface SimpleStep {
  title: string;
  text: string;
  example: string;
}

/** The plain-language layer that sits above every full article. */
export interface Simple {
  /** The whole article in one or two easy sentences. */
  tldr: string;
  /** Two or three steps, each with its own example. */
  steps: SimpleStep[];
  /** One sentence worth remembering. */
  remember: string;
}

export const simple = (
  tldr: string,
  remember: string,
  ...steps: [title: string, text: string, example: string][]
): Simple => ({
  tldr,
  remember,
  steps: steps.map(([title, text, example]) => ({ title, text, example })),
});
