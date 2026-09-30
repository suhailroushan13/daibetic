import { Activity, BookOpen, Check, ChevronRight, Clock, FileText, FlaskConical, GitCompare, Globe, Heart, Layers, Leaf, LineChart, Network, Pill, RotateCcw, ScanSearch, Search, Shield, type LucideProps } from 'lucide-react';

const icons = {
  network: Network,
  shield: Shield,
  layers: Layers,
  activity: Activity,
  scan: ScanSearch,
  leaf: Leaf,
  pill: Pill,
  rotate: RotateCcw,
  heart: Heart,
  flask: FlaskConical,
  chart: LineChart,
  globe: Globe,
  compare: GitCompare,
  book: BookOpen,
  check: Check,
  chevron: ChevronRight,
  clock: Clock,
  file: FileText,
  search: Search,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as IconName] ?? Network;
  return <Cmp aria-hidden="true" {...props} />;
}
