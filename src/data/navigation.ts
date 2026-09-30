export const categories = [
  { key: 'fundamentals', label: 'Understanding the body', short: 'Learn', icon: 'network', description: 'Start with the system. Glucose, insulin, and the biology of balance.' },
  { key: 'type-1', label: 'Type 1 diabetes', short: 'Type 1', icon: 'shield', description: 'The immune system, beta cells, and the journey to insulin deficiency.' },
  { key: 'type-2', label: 'Type 2 diabetes', short: 'Type 2', icon: 'layers', description: 'How insulin resistance and beta-cell dysfunction develop together.' },
  { key: 'prediabetes', label: 'Prediabetes', short: 'Prediabetes', icon: 'activity', description: 'An early signal. Understand the measurements and opportunities.' },
  { key: 'detection', label: 'Early detection', short: 'Detection', icon: 'scan', description: 'From subtle symptoms to the tests that make the picture clearer.' },
  { key: 'prevention', label: 'Prevention', short: 'Prevention', icon: 'leaf', description: 'What changes risk, how it works, and how strong the evidence is.' },
  { key: 'treatment', label: 'Treatment', short: 'Treatment', icon: 'pill', description: 'Insulin, medicines, technology, and whole-person care.' },
  { key: 'remission', label: 'Remission', short: 'Remission', icon: 'rotate', description: 'What remission means, how it can happen, and why follow-up matters.' },
  { key: 'complications', label: 'Complications', short: 'Complications', icon: 'heart', description: 'Connect molecular changes to organs, outcomes, and protection.' },
  { key: 'future', label: 'Future research', short: 'Future', icon: 'flask', description: 'Cell therapy, immune modulation, AI, and the questions still open.' },
  { key: 'prediction', label: 'Prediction & risk', short: 'Prediction', icon: 'chart', description: 'Separate risk signals, screening, diagnosis, and experimental models.' },
  { key: 'perspectives', label: 'Global perspectives', short: 'Perspectives', icon: 'globe', description: 'Population data, South Asia, childhood, and the history of diabetes.' },
  { key: 'comparisons', label: 'Comparisons', short: 'Compare', icon: 'layers', description: 'Side-by-side explanations of types, tests, and treatment concepts.' },
] as const;
export const learningPath = ['fundamentals/mental-model','fundamentals/glucose','fundamentals/pancreas','fundamentals/insulin','fundamentals/homeostasis','type-2/insulin-resistance','type-2/prediabetes','type-2/overview','type-1/autoimmunity','type-1/overview','detection/overview','prevention/overview','treatment/overview','type-2/remission','future/research-map'];
