import type { EvidenceLevel } from '@/data/evidence';

/** The small, serializable part of an article that cards and filters need (safe for client components). */
export interface ArticleSummary {
  slug: string;
  route: string;
  title: string;
  description: string;
  tldr: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  evidenceLevel: EvidenceLevel;
  readingTime: number;
  featured: boolean;
  tags: string[];
}

export const difficultyLabel: Record<ArticleSummary['difficulty'], string> = {
  Beginner: 'Easy read',
  Intermediate: 'Medium read',
  Advanced: 'Deep dive',
};
