import { Reveal } from '@/components/site/reveal';

export function Timeline({ items }: { items: { year: string; event: string }[] }) {
  return (
    <ol className="my-8 space-y-0 border-l-2 border-brand/25 pl-6">
      {items.map((item, i) => (
        <Reveal as="li" key={item.year} delay={Math.min(i, 4) * 0.05} className="relative pb-6 last:pb-0">
          <span className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full border-2 border-brand bg-background" aria-hidden="true" />
          <p className="text-sm font-semibold text-brand-foreground">{item.year}</p>
          <p className="mt-0.5 leading-relaxed">{item.event}</p>
        </Reveal>
      ))}
    </ol>
  );
}
