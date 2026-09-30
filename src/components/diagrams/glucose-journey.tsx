'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Example } from '@/components/site/example';
import { cn } from '@/lib/utils';

type Mode = 'Healthy' | 'Type 1' | 'Type 2';

const nodes = [
  { name: 'Digestion', short: 'Food becomes fuel', x: 310, y: 74,
    simple: 'When you eat, your tummy and gut break the food into tiny sugar pieces. One of them is glucose.',
    example: 'A slice of bread is taken apart into tiny blocks, like a toy taken apart into Lego pieces.',
    detail: 'Digestible carbohydrates are broken into simple sugars. Glucose crosses the small intestine into the portal blood, which reaches the liver first.' },
  { name: 'Bloodstream', short: 'The delivery road', x: 365, y: 178,
    simple: 'Blood is the delivery van. It carries glucose to every part of the body.',
    example: 'After a banana, its sugar rides in your blood the way parcels ride in a delivery truck.',
    detail: 'Blood distributes glucose to tissues. Concentration reflects glucose arriving from food and the liver, balanced against tissue use and storage.' },
  { name: 'Pancreas', short: 'Sense and signal', x: 302, y: 264,
    simple: 'The pancreas is the control room. It notices sugar rising and sends out insulin, the “please use the sugar” message.',
    example: 'It works like a smoke detector: it senses something and rings the bell.',
    detail: 'Beta cells in pancreatic islets couple glucose metabolism to insulin secretion. Nearby alpha cells release glucagon, especially when fasting.' },
  { name: 'Liver', short: 'Store and release', x: 221, y: 227,
    simple: 'The liver is the pantry. It stores extra sugar and lets some out between meals.',
    example: 'Like a fridge at home: you fill it after shopping and take from it when you are hungry later.',
    detail: 'The liver stores glycogen after meals and supplies glucose during fasting. Insulin suppresses liver glucose production; glucagon promotes it.' },
  { name: 'Muscle & fat', short: 'Use and save energy', x: 350, y: 347,
    simple: 'Muscles use sugar to move. Fat keeps extra energy for later. Insulin helps them take the sugar in.',
    example: 'Running for the bus uses sugar in your leg muscles, like a car using petrol.',
    detail: 'Insulin helps move GLUT4 transporters to muscle and fat-cell surfaces. Muscle uses glucose for work and stores glycogen; fat tissue also stores energy as triglycerides.' },
] as const;

const states: Record<Mode, { label: string; simple: string; example: string; detail: string }> = {
  Healthy: {
    label: 'A team that talks to each other',
    simple: 'Sugar goes up after food, insulin comes out, the body uses or stores the sugar, and the level comes back down.',
    example: 'Like a thermostat that keeps a room comfortable.',
    detail: 'Insulin secretion and tissue responses work together to keep glucose within a regulated range.',
  },
  'Type 1': {
    label: 'The insulin messenger is missing',
    simple: 'The body’s defenders have harmed the insulin makers, so little or no insulin is made. Insulin has to be given as medicine.',
    example: 'Like a school where the bell is broken: the class never gets the message.',
    detail: 'Autoimmune beta-cell loss reduces insulin supply. Insulin replacement is essential; the rest of the pancreas still has other functions.',
  },
  'Type 2': {
    label: 'The body listens less',
    simple: 'Insulin is there, but muscles, liver and fat do not respond as well. At first the pancreas shouts louder, but later it cannot keep up.',
    example: 'Like a bell that rings all day until everyone stops noticing it.',
    detail: 'Muscle, liver, and fat respond less effectively to insulin. Beta-cell output eventually becomes insufficient for the body’s needs.',
  },
};

export function GlucoseJourney({ compact = false, className }: { compact?: boolean; className?: string }) {
  const [mode, setMode] = useState<Mode>('Healthy');
  const [selected, setSelected] = useState(2);
  const id = useId();
  const active = mode === 'Healthy' ? nodes[selected] : null;
  const panel = active ?? states[mode];

  return (
    <figure className={cn('glucose-journey rounded-lg border bg-card', compact ? 'p-4 sm:p-5' : 'my-8 p-5 sm:p-6', className)} aria-label="Interactive glucose journey">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">Inside the body</p>
        <div className="inline-flex rounded-md border p-0.5" role="group" aria-label="Choose a situation">
          {(Object.keys(states) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className="rounded-[0.3125rem] px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={cn('grid items-center gap-5', compact ? '' : 'lg:grid-cols-[1.05fr_1fr]')}>
        <svg viewBox="0 0 540 432" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="mx-auto h-auto w-full max-w-[30rem]">
          <title id={`${id}-title`}>{`How the body handles glucose: ${mode}`}</title>
          <desc id={`${id}-desc`}>A simple picture, not to scale. Food is digested, glucose enters blood, and insulin from the pancreas tells the liver, muscle and fat what to do. {states[mode].simple}</desc>
          <defs>
            <pattern id={`${id}-grid`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="currentColor" opacity=".15" /></pattern>
            <linearGradient id={`${id}-body`} x1="0" x2="1"><stop stopColor="var(--brand)" stopOpacity=".16" /><stop offset="1" stopColor="var(--success)" stopOpacity=".07" /></linearGradient>
          </defs>
          <rect width="540" height="432" fill={`url(#${id}-grid)`} />
          <ellipse cx="277" cy="396" rx="97" ry="9" fill="var(--brand)" opacity=".08" />
          <g transform="translate(20,0)" fill={`url(#${id}-body)`} stroke="var(--brand)" strokeOpacity=".55" strokeWidth="1.4">
            <path d="M234 88c-14-7-22-19-22-36 0-21 16-35 35-35s36 14 36 35c0 17-8 29-22 36l1 21 42 14c14 5 24 15 30 34l30 99c3 11-9 19-15 8l-37-90-8 72 9 128c1 19-20 23-24 4l-17-106h-16l-14 106c-3 19-25 15-24-4l7-128-7-72-31 90c-5 12-19 5-16-7l27-100c5-20 17-30 32-35l32-13Z" />
            <path d="M236 112v36m25-36v36M248 137v66M247 144c-24-18-43 18-35 48 4 14 24 14 28 4M257 144c24-18 40 18 32 48-4 14-22 14-25 4" fill="none" opacity=".6" />
          </g>
          <path d="M274 88v75c0 12 19 12 23 24 6 18-12 30-28 19" stroke="var(--brand)" strokeWidth="2" fill="none" opacity=".55" />
          <path d="M219 208c14-9 30-7 45-3l24 10c-5 13-12 21-26 22l-39-7c-8-3-9-12-4-22Z" fill="var(--brand)" fillOpacity=".2" stroke="var(--brand)" strokeWidth="1.4" />
          <path d="M250 250c17-9 35-10 52-3 9 4 4 12-3 11l-47 2c-8 0-8-7-2-10Z" fill={mode === 'Type 1' ? 'var(--error)' : 'var(--secondary)'} fillOpacity=".6" stroke="var(--secondary)" strokeWidth="1.3" />
          <path d="M247 274c-19-4-27 6-16 14l51 2c20 0 18 14 0 14l-49-1c-17 0-19 14-1 16l48 1c17 0 18 13-1 14l-41-1" stroke="var(--brand)" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".25" />
          <g stroke="var(--brand)" strokeWidth="1.8" fill="none" opacity=".7">
            <path d="M298 259c49-11 61-40 31-68M299 260c42 18 39 55 46 91M249 255c-31 0-39-9-34-25" className={mode === 'Type 1' ? '' : 'flow-line'} strokeDasharray={mode === 'Type 1' ? '2 8' : undefined} />
          </g>
          {[{ x: 330, y: 210 }, { x: 340, y: 308 }, { x: 312, y: 173 }, { x: 322, y: 282 }].map((p, i) => (
            <g key={i} transform={`translate(${p.x},${p.y})`} fill="var(--brand)" opacity=".6">
              <path d="m0-4 4 2v4L0 4-4 2v-4Z" />
            </g>
          ))}
          {nodes.map((n, i) => {
            const right = i !== 3;
            const lineEnd = i === 0 ? 383 : i === 3 ? 130 : i < 3 ? 408 : 426;
            const tx = i === 3 ? 35 : i === 0 ? 386 : i < 3 ? 411 : 429;
            const on = mode === 'Healthy' && selected === i;
            return (
              <g key={n.name} style={{ cursor: 'pointer' }} onClick={() => { setMode('Healthy'); setSelected(i); }}>
                <path d={`M${n.x} ${n.y}H${lineEnd}`} fill="none" stroke="var(--border)" strokeWidth="1" />
                <circle cx={n.x} cy={n.y} r={on ? 9 : 5.5} fill="var(--card)" stroke="var(--brand)" strokeWidth="1.8" style={{ transition: 'r .25s' }} />
                {on && <circle cx={n.x} cy={n.y} r="3.5" fill="var(--brand)" />}
                <text x={tx} y={n.y - 7} fontSize="12" fill="var(--foreground)" fontWeight="600" textAnchor={right ? 'start' : 'start'}>{n.name}</text>
                <text x={tx} y={n.y + 9} fontSize="9.5" fill="var(--muted-foreground)">{n.short}</text>
              </g>
            );
          })}
          <circle cx="32" cy="408" r="3" fill="var(--brand)" /><text x="42" y="411" fontSize="9.5" fill="var(--muted-foreground)">Glucose pathway</text>
          <circle cx="154" cy="408" r="3" fill="var(--secondary)" /><text x="164" y="411" fontSize="9.5" fill="var(--muted-foreground)">Insulin makers (islets)</text>
        </svg>

        <div>
          <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Pick a body part to learn about">
            {nodes.map((n, i) => (
              <button
                key={n.name}
                type="button"
                aria-pressed={mode === 'Healthy' && selected === i}
                onClick={() => { setMode('Healthy'); setSelected(i); }}
                className="h-7 rounded-full border px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-brand-border aria-pressed:bg-brand-muted aria-pressed:text-brand-foreground"
              >
                {n.name}
              </button>
            ))}
          </div>
          <div className="diagram-explanation rounded-md border bg-tint p-4" aria-live="polite">
            <strong className="text-base font-semibold">{active ? active.name : states[mode].label}</strong>
            <p className="mt-1.5 leading-relaxed">{active ? active.simple : states[mode].simple}</p>
            <Example className="mt-3 text-sm">{panel.example}</Example>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground"><strong className="font-semibold">In science words:</strong> {panel.detail}</p>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-xs text-muted-foreground">
        A simple picture, not a medical simulation. <Link href="/fundamentals/homeostasis" className="font-medium text-brand hover:underline">Learn how the body stays balanced →</Link>
      </figcaption>
    </figure>
  );
}
