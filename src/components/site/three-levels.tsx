'use client';

import { Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const levels = [
  {
    value: 'child',
    label: 'Like I’m 8',
    text: 'Insulin is a tiny messenger in your body. After you eat, it tells your body: “Use this sugar for energy, and save some for later!”',
    example: 'It is like a teacher ringing the bell that says “Time to tidy up the classroom”. Everybody knows what to do.',
  },
  {
    value: 'parent',
    label: 'Like I’m a parent',
    text: 'Insulin is a hormone made by the pancreas. After a meal it helps muscle and fat cells take in sugar, and it tells the liver to release less. In diabetes there is too little insulin, or the body does not respond to it well, so sugar stays high in the blood.',
    example: 'A house where the delivery person rings, but nobody comes to the door: the parcels (sugar) pile up outside.',
  },
  {
    value: 'science',
    label: 'The science words',
    text: 'Beta cells secrete insulin in response to rising glucose. Insulin binds a receptor tyrosine kinase, triggering IRS, PI3K and Akt signaling. In muscle and fat this moves GLUT4 transporters to the surface, while in the liver it suppresses glucose production.',
    example: 'The same idea as before, told with the technical names. Every article on this site starts simple and ends here.',
  },
];

export function ThreeLevels() {
  return (
    <Tabs defaultValue="child" className="w-full">
      <TabsList className="flex-wrap" aria-label="Pick a level of explanation">
        {levels.map((l) => <TabsTrigger key={l.value} value={l.value}>{l.label}</TabsTrigger>)}
      </TabsList>
      {levels.map((l) => (
        <TabsContent key={l.value} value={l.value} className="data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2">
          <div className="rounded-3xl border bg-card p-6 shadow-xs sm:p-8">
            <p className="font-serif text-xl leading-relaxed sm:text-2xl">{l.text}</p>
            <p className="mt-5 flex gap-3 rounded-2xl bg-sun-soft p-4 text-sun-foreground">
              <Lightbulb className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span><strong>For example: </strong>{l.example}</span>
            </p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
