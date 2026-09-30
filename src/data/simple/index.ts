import { fundamentals } from './fundamentals';
import { care } from './care';
import { more } from './more';
import type { Simple } from './types';

export type { Simple, SimpleStep } from './types';

/** Plain-language explainers, keyed by article slug. */
export const simpleBySlug: Record<string, Simple> = { ...fundamentals, ...care, ...more };
