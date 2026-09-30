export interface GuideStep {
  slug: string;
  /** A friendly question or plain title for the step. */
  title: string;
  /** One short sentence saying what you will learn. */
  hook: string;
}

export interface GuideModule {
  id: string;
  icon: 'network' | 'shield' | 'scan' | 'leaf' | 'flask';
  title: string;
  /** Plain-words summary of the whole chapter. */
  summary: string;
  /** A real-life picture that ties the chapter together. */
  example: string;
  outcomes: string[];
  steps: GuideStep[];
}

/** The guided course on /learn. Steps are read top to bottom. */
export const guideModules: GuideModule[] = [
  {
    id: 'body',
    icon: 'network',
    title: 'Meet your body’s fuel system',
    summary: 'Your body runs on a sugar called glucose. A tiny messenger called insulin helps keep the amount just right. Learn who does what.',
    example: 'Think of a car. Food is the petrol, glucose is the fuel in the tank, and insulin is the pump attendant who makes sure the fuel gets where it is needed.',
    outcomes: ['Say what glucose and insulin are in one sentence each', 'Name the body parts that help: pancreas, liver and muscles', 'Explain how the body keeps sugar “just right”'],
    steps: [
      { slug: 'fundamentals/mental-model', title: 'The big picture on one page', hook: 'See the whole story before the details.' },
      { slug: 'fundamentals/glucose', title: 'What is glucose?', hook: 'Follow your lunch from plate to energy.' },
      { slug: 'fundamentals/pancreas', title: 'What does the pancreas do?', hook: 'Meet the small organ that makes insulin.' },
      { slug: 'fundamentals/insulin', title: 'What is insulin?', hook: 'A message with many jobs, not just a door key.' },
      { slug: 'fundamentals/homeostasis', title: 'How does the body stay balanced?', hook: 'Learn the feedback loop that keeps sugar steady.' },
    ],
  },
  {
    id: 'breakdown',
    icon: 'shield',
    title: 'When the balance breaks',
    summary: 'Diabetes happens when insulin is missing, or when the body stops listening to it. There are two main kinds, and they are not the same.',
    example: 'Imagine a school bell. In Type 1 the bell is broken and cannot ring. In Type 2 the bell rings, but the students have got used to it and do not react.',
    outcomes: ['Tell Type 1 and Type 2 apart', 'Understand prediabetes as a warning, not a fate', 'Know why you cannot tell the type by body size'],
    steps: [
      { slug: 'type-2/insulin-resistance', title: 'What is insulin resistance?', hook: 'When cells hear insulin but respond weakly.' },
      { slug: 'type-2/prediabetes', title: 'What is prediabetes?', hook: 'The yellow light, and the numbers behind it.' },
      { slug: 'type-2/overview', title: 'How does Type 2 develop?', hook: 'A slow change that can be noticed early.' },
      { slug: 'type-1/autoimmunity', title: 'Why does Type 1 begin?', hook: 'The body’s defenders make a mistake.' },
      { slug: 'type-1/overview', title: 'The whole Type 1 journey', hook: 'From a silent start to daily care.' },
      { slug: 'comparisons/type-1-vs-type-2', title: 'Type 1 and Type 2 side by side', hook: 'One clear table to compare them.' },
    ],
  },
  {
    id: 'spot',
    icon: 'scan',
    title: 'Spot it early',
    summary: 'Many people feel fine at the start. Blood tests can find diabetes early, and knowing the warning signs helps you get help fast.',
    example: 'A smoke alarm beeps before you see flames. Blood tests work like that alarm: they can warn you before you feel anything.',
    outcomes: ['Recognize common warning signs', 'Know what the main blood tests measure', 'Know which signs need help right away'],
    steps: [
      { slug: 'detection/symptoms', title: 'What are the warning signs?', hook: 'Thirst, tiredness and other clues, and their limits.' },
      { slug: 'detection/overview', title: 'How do doctors find diabetes?', hook: 'Four questions that are often mixed up.' },
      { slug: 'detection/hba1c', title: 'What is an HbA1c test?', hook: 'A three-month sugar diary in your blood.' },
    ],
  },
  {
    id: 'act',
    icon: 'leaf',
    title: 'Stay well: prevent and treat',
    summary: 'Small, steady habits can lower the chance of Type 2. Treatment has many tools, and knowing the emergency signs keeps people safe.',
    example: 'Looking after your health is like looking after a garden: a little water, sun and care most days works better than one huge effort once a year.',
    outcomes: ['Know what the big prevention study actually showed', 'See treatment as a team effort', 'Recognize emergency warning signs'],
    steps: [
      { slug: 'prevention/overview', title: 'Can Type 2 be prevented?', hook: 'What the evidence really supports.' },
      { slug: 'treatment/overview', title: 'How is diabetes treated?', hook: 'Many tools, one team, one goal.' },
      { slug: 'treatment/emergencies', title: 'What are the emergencies?', hook: 'Sugar too low, sugar too high, and when to get help.' },
    ],
  },
  {
    id: 'future',
    icon: 'flask',
    title: 'Remission and the road ahead',
    summary: 'Some people with Type 2 can reach remission. Scientists are also working on new ways to help Type 1. Learn what is real and what is still a hope.',
    example: 'Remission is like a fire that has gone quiet. The flames are out, but you keep an eye on the embers. It is good news, but it is not the same as the fire being gone forever.',
    outcomes: ['Explain remission in your own words', 'Know the main research directions', 'Keep realistic hopes about a “cure”'],
    steps: [
      { slug: 'type-2/remission', title: 'What is remission?', hook: 'Possible, wonderful, and not the same as a cure.' },
      { slug: 'future/research-map', title: 'How close is a cure?', hook: 'A map of what is solved and what is not.' },
    ],
  },
];

export const guideSteps: (GuideStep & { moduleId: string })[] = guideModules.flatMap((m) =>
  m.steps.map((s) => ({ ...s, moduleId: m.id })),
);

export const learningPath = guideSteps.map((s) => s.slug);

export function guidePosition(slug: string) {
  const index = learningPath.indexOf(slug);
  if (index === -1) return undefined;
  const step = guideSteps[index];
  const moduleIndex = guideModules.findIndex((m) => m.id === step.moduleId);
  return {
    index,
    step: index + 1,
    total: learningPath.length,
    module: guideModules[moduleIndex],
    moduleIndex,
    current: step,
    prev: guideSteps[index - 1],
    next: guideSteps[index + 1],
  };
}
