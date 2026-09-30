export const evidenceLevels = ['Established', 'Strong Evidence', 'Moderate Evidence', 'Limited Evidence', 'Preliminary', 'Experimental', 'Unknown'] as const;
export type EvidenceLevel = typeof evidenceLevels[number];
export const evidenceDescriptions: Record<EvidenceLevel, string> = {
  Established: 'Consistent clinical guidance or well-established human physiology. This is an editorial classification, not a formal GRADE rating.',
  'Strong Evidence': 'Supported by substantial human evidence, with population and outcome limitations still relevant.',
  'Moderate Evidence': 'Human evidence supports the finding, but uncertainty or generalizability limits confidence.',
  'Limited Evidence': 'Small, indirect, or inconsistent human studies; conclusions remain uncertain.',
  Preliminary: 'Early human findings that need independent replication and longer follow-up.',
  Experimental: 'Investigational therapy or method, including preclinical research. Not routine clinical care.',
  Unknown: 'Insufficient evidence to draw a reliable conclusion.',
};
