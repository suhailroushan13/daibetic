import type { Metadata } from 'next';
import Link from 'next/link';
import { evidenceDescriptions, evidenceLevels, evidenceSimple } from '@/data/evidence';
import { PageHeader } from '@/components/site/section-heading';
import { EvidenceBadge } from '@/components/site/evidence-badge';

export const metadata: Metadata = {
  title: 'About and how we check facts',
  description: 'How The Diabetes Guide picks sources, labels how well proven a claim is, and is honest about what it cannot do.',
  alternates: { canonical: '/about' },
};

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-12 mb-3 text-h3 text-foreground">{children}</h2>;

export default function AboutPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <PageHeader eyebrow="How we work" title="Clear words. Visible proof. Honest limits." />
      <div className="article-prose mt-8 max-w-3xl">
        <p>The Diabetes Guide is an independent learning project. It explains how the body handles sugar, how diabetes develops, how it is found and treated, and what scientists are trying next. It is <strong>not</strong> a healthcare provider.</p>

        <div className="my-8 rounded-lg border border-warning/40 bg-warning-subtle p-5 text-foreground">
          <p className="m-0"><strong>Please read this.</strong> Use this site to prepare good questions for a doctor or nurse. Do not use it to diagnose yourself, work out a medicine dose or stop a treatment. If someone may be having an emergency, get urgent local medical help.</p>
        </div>

        <H>Every idea has two layers</H>
        <p>Each article starts with <strong>“In simple words”</strong>: a short summary, a few small steps, and a real-life example under every step. Below that is <strong>“The full story”</strong>, which keeps the real science words and sources. You can stop after the first layer and still walk away with the main idea.</p>

        <H>Who checked this?</H>
        <p>This library was written with AI help. Linked sources were checked on 30 September 2026. It has <strong>not been independently reviewed by a qualified medical professional</strong>. The date shown on each page is a source-check date, not a medical stamp of approval.</p>

        <H>How we choose sources</H>
        <p>We lean on current guidance from the American Diabetes Association and official pages from NIH/NIDDK, CDC, WHO and FDA. Specific study claims link to the original report when we can. Rules and approvals name the country. A trial being registered is never counted as a good result.</p>
        <p>This is a curated reading library, not a systematic review. We do not claim to cover every study up to 2026.</p>

        <H>“How well proven” labels</H>
        <p>Each article carries a label. Here is what each one means, in two ways:</p>
        <ul className="my-5 grid gap-3">
          {evidenceLevels.map((level) => (
            <li key={level} className="rounded-lg border bg-card p-4">
              <EvidenceBadge level={level} />
              <p className="mt-2.5 mb-1 text-[0.9375rem]"><strong>Simple:</strong> {evidenceSimple[level].words} <em>{evidenceSimple[level].example}</em></p>
              <p className="text-sm text-muted-foreground"><strong>Precise:</strong> {evidenceDescriptions[level]}</p>
            </li>
          ))}
        </ul>

        <H>Which studies count most?</H>
        <ol>
          <li>Reviews of many studies, and major guidelines.</li>
          <li>Randomized controlled trials.</li>
          <li>Large studies that follow people over time.</li>
          <li>Observational studies.</li>
          <li>Small human studies.</li>
          <li>Lab and animal research.</li>
          <li>Expert opinion.</li>
          <li>Guesses.</li>
        </ol>
        <p>This is a starting point, not an automatic score. A review of weak studies is still weak. Who was studied, what was measured, bias and follow-up time all matter.</p>

        <H>Facts, comparisons and pictures</H>
        <p>Statements with a small number next to them come from a source. “For example” boxes and analogies are comparisons to help understanding; they are not evidence. Diagrams are simple pictures, with no measured predictions. Charts say what was counted and what the limits are.</p>

        <H>Privacy</H>
        <p>Search runs on your own device. There are no trackers, no accounts, no outside AI calls and no health data collected. Your theme choice and your guide progress are saved in your own browser only. The “explore the signals” page keeps your choices in memory only.</p>

        <H>Corrections</H>
        <p>Content lives in version-controlled files. A change needs a source check and passes automatic tests. Old sources are flagged for review, and older classic studies are kept with context. Hosting this site does not automatically update its medical content, and guidelines differ from country to country.</p>

        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2"><Link href="/sources" className="font-semibold text-brand hover:underline">Look at the sources →</Link><Link href="/report" className="font-semibold text-brand hover:underline">Read the 18-part report →</Link></p>
      </div>
    </div>
  );
}
