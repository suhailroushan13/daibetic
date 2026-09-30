import { evidenceDescriptions, type EvidenceLevel } from '@/data/evidence';
import { cn } from '@/lib/utils';

/** Status-dot colours: green for well proven, blue for moderate, amber for early, quiet grey otherwise. */
const dot: Record<EvidenceLevel, string> = {
  Established: 'bg-status-solved',
  'Strong Evidence': 'bg-status-solved',
  'Moderate Evidence': 'bg-status-solving',
  'Limited Evidence': 'bg-warning',
  Preliminary: 'bg-warning',
  Experimental: 'bg-status-stale',
  Unknown: 'bg-status-open',
};

export function EvidenceBadge({ level, className }: { level: EvidenceLevel; className?: string }) {
  return (
    <span
      data-slot="badge"
      className={cn('inline-flex h-6 w-fit shrink-0 items-center gap-1.5 rounded-full border bg-background px-2.5 text-xs font-medium whitespace-nowrap text-foreground', className)}
      title={evidenceDescriptions[level]}
    >
      <span className={cn('size-1.5 rounded-full', dot[level])} aria-hidden="true" />
      {level}
    </span>
  );
}
