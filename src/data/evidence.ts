export const evidenceLevels = ['Established', 'Strong Evidence', 'Moderate Evidence', 'Limited Evidence', 'Preliminary', 'Experimental', 'Unknown'] as const;
export type EvidenceLevel = (typeof evidenceLevels)[number];

export const evidenceDescriptions: Record<EvidenceLevel, string> = {
  Established: 'Consistent clinical guidance or well-established human physiology. This is an editorial classification, not a formal GRADE rating.',
  'Strong Evidence': 'Supported by substantial human evidence, with population and outcome limitations still relevant.',
  'Moderate Evidence': 'Human evidence supports the finding, but uncertainty or generalizability limits confidence.',
  'Limited Evidence': 'Small, indirect, or inconsistent human studies; conclusions remain uncertain.',
  Preliminary: 'Early human findings that need independent replication and longer follow-up.',
  Experimental: 'Investigational therapy or method, including preclinical research. Not routine clinical care.',
  Unknown: 'Insufficient evidence to draw a reliable conclusion.',
};

/** The same ideas in everyday words, with an example. */
export const evidenceSimple: Record<EvidenceLevel, { words: string; example: string }> = {
  Established: { words: 'Doctors and scientists agree. This is well known.', example: 'Like “the sun rises in the east”.' },
  'Strong Evidence': { words: 'Many good studies agree, with a few limits.', example: 'Like a big taste test where almost everyone picked the same flavor.' },
  'Moderate Evidence': { words: 'Good studies point the same way, but we are less sure it fits everyone.', example: 'Like a weather forecast that is usually right.' },
  'Limited Evidence': { words: 'Only a few small studies, and they do not fully agree.', example: 'Like asking three friends and getting three answers.' },
  Preliminary: { words: 'Early results. They need to be repeated.', example: 'Like a first test drive of a new car.' },
  Experimental: { words: 'Still being tested. Not everyday care.', example: 'Like a recipe still in the test kitchen.' },
  Unknown: { words: 'Not enough proof to say.', example: 'Like a locked box we have not opened yet.' },
};
