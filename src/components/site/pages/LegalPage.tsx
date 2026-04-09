import type { ReactNode } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { LegalBlock, PageHero, SectionLabel } from '@/components/site/marketing';

interface LegalSectionItem {
  index: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  sections: LegalSectionItem[];
  updatedAt: string;
}

export default function LegalPage({ eyebrow, title, description, sections, updatedAt }: LegalPageProps) {
  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>{eyebrow}</SectionLabel>}
          title={title}
          description={description}
          stats={[
            { value: `${sections.length}`, label: 'əsas bölmə' },
            { value: updatedAt, label: 'yenilənmə' },
            { value: 'AZ', label: 'lokal xidmət' },
          ]}
        />

        <section className="px-4 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-5">
            {sections.map((section) => (
              <LegalBlock key={section.index} index={section.index} title={section.title}>
                {section.content}
              </LegalBlock>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
