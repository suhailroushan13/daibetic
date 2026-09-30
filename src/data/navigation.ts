export const categoryGroups = [
  { key: 'foundations', label: 'The basics' },
  { key: 'act', label: 'Find it, prevent it, treat it' },
  { key: 'further', label: 'Go further' },
] as const;

/**
 * `tone` classes are written out in full so Tailwind can see them.
 * `kid` is a one-line, everyday-words description shown on cards.
 */
export const categories = [
  { key: 'fundamentals', label: 'Understanding the body', short: 'The body', icon: 'network', group: 'foundations', tone: 'sky', kid: 'How your body turns food into energy — and who is in charge.', description: 'Start with the system. Glucose, insulin, and the biology of balance.' },
  { key: 'type-1', label: 'Type 1 diabetes', short: 'Type 1', icon: 'shield', group: 'foundations', tone: 'violet', kid: 'When the body’s defenders make a mistake and the insulin makers stop working.', description: 'The immune system, beta cells, and the journey to insulin deficiency.' },
  { key: 'type-2', label: 'Type 2 diabetes', short: 'Type 2', icon: 'layers', group: 'foundations', tone: 'amber', kid: 'When the body stops listening to insulin as well as it should.', description: 'How insulin resistance and beta-cell dysfunction develop together.' },
  { key: 'prediabetes', label: 'Prediabetes', short: 'Prediabetes', icon: 'activity', group: 'foundations', tone: 'emerald', kid: 'A yellow light, not a red one. A chance to change direction.', description: 'An early signal. Understand the measurements and opportunities.' },
  { key: 'detection', label: 'Early detection', short: 'Detection', icon: 'scan', group: 'act', tone: 'rose', kid: 'The signs to watch for and the tests that give a clear answer.', description: 'From subtle symptoms to the tests that make the picture clearer.' },
  { key: 'prevention', label: 'Prevention', short: 'Prevention', icon: 'leaf', group: 'act', tone: 'emerald', kid: 'Food, moving, sleep and stress: what really helps and what does not.', description: 'What changes risk, how it works, and how strong the evidence is.' },
  { key: 'treatment', label: 'Treatment', short: 'Treatment', icon: 'pill', group: 'act', tone: 'sky', kid: 'Insulin, medicines and gadgets that help keep sugar in a safe range.', description: 'Insulin, medicines, technology, and whole-person care.' },
  { key: 'remission', label: 'Remission', short: 'Remission', icon: 'rotate', group: 'act', tone: 'violet', kid: 'What it means when diabetes goes quiet, and why check-ups still matter.', description: 'What remission means, how it can happen, and why follow-up matters.' },
  { key: 'complications', label: 'Complications', short: 'Complications', icon: 'heart', group: 'act', tone: 'rose', kid: 'How too much sugar for too long can hurt eyes, kidneys, nerves and heart.', description: 'Connect molecular changes to organs, outcomes, and protection.' },
  { key: 'future', label: 'Future research', short: 'Future', icon: 'flask', group: 'further', tone: 'amber', kid: 'New ideas scientists are testing, and what is still not solved.', description: 'Cell therapy, immune modulation, AI, and the questions still open.' },
  { key: 'prediction', label: 'Prediction & risk', short: 'Prediction', icon: 'chart', group: 'further', tone: 'sky', kid: 'How doctors guess who is at higher risk, and why a guess is not a diagnosis.', description: 'Separate risk signals, screening, diagnosis, and experimental models.' },
  { key: 'perspectives', label: 'Global perspectives', short: 'Perspectives', icon: 'globe', group: 'further', tone: 'emerald', kid: 'Diabetes around the world, in children, in India, and through history.', description: 'Population data, South Asia, childhood, and the history of diabetes.' },
  { key: 'comparisons', label: 'Comparisons', short: 'Compare', icon: 'compare', group: 'further', tone: 'violet', kid: 'Side-by-side tables to see how things are alike and different.', description: 'Side-by-side explanations of types, tests, and treatment concepts.' },
] as const;

export type Category = (typeof categories)[number];
export type Tone = Category['tone'];

/** Full class strings per tone (kept literal for Tailwind's scanner). */
export const toneClasses: Record<Tone, { chip: string; icon: string; bar: string }> = {
  sky: { chip: 'bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-200', icon: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300', bar: 'bg-sky-500' },
  violet: { chip: 'bg-violet-100 text-violet-900 dark:bg-violet-500/15 dark:text-violet-200', icon: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300', bar: 'bg-violet-500' },
  amber: { chip: 'bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200', icon: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300', bar: 'bg-amber-500' },
  emerald: { chip: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-200', icon: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', bar: 'bg-emerald-500' },
  rose: { chip: 'bg-rose-100 text-rose-900 dark:bg-rose-500/15 dark:text-rose-200', icon: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300', bar: 'bg-rose-500' },
};

export { learningPath } from './guide';
