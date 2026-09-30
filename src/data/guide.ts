export interface GuideModule {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  slugs: string[];
}

/** The guided course on /learn. Order matters: steps are read top to bottom. */
export const guideModules: GuideModule[] = [
  {
    id: 'body',
    title: 'How the body handles glucose',
    summary: 'Build the mental model first: what glucose is, where insulin comes from, and how the body keeps the level in balance.',
    outcomes: ['Explain what insulin does — and what it does not do', 'Describe the jobs of the liver, muscle and pancreas', 'Picture the glucose–insulin feedback loop'],
    slugs: ['fundamentals/mental-model', 'fundamentals/glucose', 'fundamentals/pancreas', 'fundamentals/insulin', 'fundamentals/homeostasis'],
  },
  {
    id: 'breakdown',
    title: 'When regulation breaks down',
    summary: 'See how insulin resistance and autoimmunity lead to Type 2 and Type 1 diabetes, and why the two are different conditions.',
    outcomes: ['Tell Type 1 and Type 2 apart by mechanism', 'Read prediabetes as a risk range, not a destiny', 'Know why body size alone cannot identify the type'],
    slugs: ['type-2/insulin-resistance', 'type-2/prediabetes', 'type-2/overview', 'type-1/autoimmunity', 'type-1/overview'],
  },
  {
    id: 'act',
    title: 'Detect, prevent and treat',
    summary: 'Learn what the laboratory tests measure, what the prevention evidence supports, and how treatment is organised.',
    outcomes: ['Recognise the HbA1c, fasting glucose and OGTT ranges', 'Know what the prevention trials actually showed', 'Understand treatment as a coordinated system'],
    slugs: ['detection/overview', 'prevention/overview', 'treatment/overview'],
  },
  {
    id: 'future',
    title: 'Remission and the road ahead',
    summary: 'Separate remission from cure, then map where research is heading and which problems remain unsolved.',
    outcomes: ['Use the formal definition of Type 2 remission', 'Map the main research directions', 'Keep realistic expectations about a “cure”'],
    slugs: ['type-2/remission', 'future/research-map'],
  },
];

export const learningPath = guideModules.flatMap((m) => m.slugs);

export function guidePosition(slug: string) {
  const index = learningPath.indexOf(slug);
  if (index === -1) return undefined;
  const moduleIndex = guideModules.findIndex((m) => m.slugs.includes(slug));
  return {
    index,
    step: index + 1,
    total: learningPath.length,
    module: guideModules[moduleIndex],
    moduleIndex,
    prev: learningPath[index - 1],
    next: learningPath[index + 1],
  };
}
