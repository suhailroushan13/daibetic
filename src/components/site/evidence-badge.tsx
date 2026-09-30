import { Badge } from '@/components/ui/badge';
import { evidenceDescriptions, type EvidenceLevel } from '@/data/evidence';
import { cn } from '@/lib/utils';

const styles: Record<EvidenceLevel, string> = {
  Established: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-200',
  'Strong Evidence': 'bg-teal-100 text-teal-900 dark:bg-teal-500/15 dark:text-teal-200',
  'Moderate Evidence': 'bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-200',
  'Limited Evidence': 'bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200',
  Preliminary: 'bg-orange-100 text-orange-900 dark:bg-orange-500/15 dark:text-orange-200',
  Experimental: 'bg-violet-100 text-violet-900 dark:bg-violet-500/15 dark:text-violet-200',
  Unknown: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-500/15 dark:text-zinc-200',
};

export function EvidenceBadge({ level, className }: { level: EvidenceLevel; className?: string }) {
  return (
    <Badge variant="muted" className={cn(styles[level], className)} title={evidenceDescriptions[level]}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {level}
    </Badge>
  );
}
