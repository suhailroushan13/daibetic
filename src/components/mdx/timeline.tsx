export function Timeline({ items }: { items: { year: string; event: string }[] }) {
  return (
    <ol className="my-8 border-l pl-6">
      {items.map((item) => (
        <li key={item.year} className="relative pb-6 last:pb-0">
          <span className="absolute top-1.5 -left-[1.845rem] size-2.5 rounded-full border-2 border-brand bg-background" aria-hidden="true" />
          <p className="num text-sm font-semibold text-foreground">{item.year}</p>
          <p className="mt-0.5 leading-relaxed">{item.event}</p>
        </li>
      ))}
    </ol>
  );
}
