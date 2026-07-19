'use client';

import type { ReactNode } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { LegalBlock, PageHero, SectionLabel } from '@/components/site/marketing';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';

  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>{eyebrow}</SectionLabel>}
          title={title}
          description={description}
          stats={[
            { value: `${sections.length}`, label: isEn ? 'sections' : 'bölmə' },
            { value: updatedAt, label: t.legal.lastUpdated },
            { value: 'AZ / EN', label: isEn ? 'language' : 'dil' },
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
