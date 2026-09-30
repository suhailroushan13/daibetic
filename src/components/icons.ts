import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, BookText, ChartLine, Check, ChevronDown, ChevronLeft,
  ChevronRight, CircleCheck, CircleHelp, Clock, Compass, Download, ExternalLink, FileText, FlaskConical,
  GitCompareArrows, Globe, GraduationCap, HeartPulse, House, Layers, Leaf, Library, Lightbulb, ListChecks, Map,
  Microscope, Moon, Network, PanelLeft, Pill, Quote, RotateCcw, Rss, ScanSearch, Search, ShieldCheck, Sparkles,
  Sun, Table2, Target, TriangleAlert, Undo2, X, Info, Route, Milestone, type LucideIcon,
} from 'lucide-react';

export const icons: Record<string, LucideIcon> = {
  home: House, book: BookOpen, 'book-text': BookText, guide: GraduationCap, library: Library, search: Search,
  sun: Sun, moon: Moon, panel: PanelLeft, menu: PanelLeft, close: X,
  chevron: ChevronRight, 'chevron-down': ChevronDown, 'chevron-left': ChevronLeft,
  arrow: ArrowUpRight, right: ArrowRight, left: ArrowLeft, external: ExternalLink,
  check: Check, 'check-circle': CircleCheck, clock: Clock, file: FileText, download: Download, rss: Rss,
  network: Network, shield: ShieldCheck, layers: Layers, activity: Activity, scan: ScanSearch, leaf: Leaf,
  pill: Pill, rotate: RotateCcw, heart: HeartPulse, flask: FlaskConical, chart: ChartLine, globe: Globe,
  compare: GitCompareArrows, info: Info, warning: TriangleAlert, lightbulb: Lightbulb, sparkles: Sparkles,
  spark: Sparkles, help: CircleHelp, quote: Quote, map: Map, route: Route, milestone: Milestone, target: Target,
  list: ListChecks, compass: Compass, microscope: Microscope, table: Table2, reset: Undo2,
};
