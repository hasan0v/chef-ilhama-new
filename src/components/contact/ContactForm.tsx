'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getWhatsAppHref } from '@/lib/site';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const { t, locale } = useTranslation();

  const contactSchema = useMemo(() => z.object({
    name: z.string().min(2, t.contactForm.valNameError),
    email: z.string().email(t.contactForm.valEmailError),
    subject: z.string().min(5, t.contactForm.valSubjectError),
    message: z.string().min(10, t.contactForm.valMessageError),
  }), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    const message = [
      locale === 'az' ? 'Salam, sayt vasitəsilə əlaqə saxlayıram.' : 'Hello, I am contacting you through the website.',
      '',
      `${t.contactForm.formFieldName}: ${data.name}`,
      `${t.contactForm.formFieldEmail}: ${data.email}`,
      `${t.contactForm.formFieldSubject}: ${data.subject}`,
      `${t.contactForm.formFieldMessage}: ${data.message}`,
    ].join('\n');

    window.open(getWhatsAppHref(message), '_blank', 'noopener,noreferrer');
    reset();
  };

  return (
    <Card className="border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.contactForm.formFieldName}</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={t.contactForm.formFieldNamePlaceholder}
                className={`h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/84 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.contactForm.formFieldEmail}</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="email@example.com"
                className={`h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/84 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t.contactForm.formFieldSubject}</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder={t.contactForm.formFieldSubjectPlaceholder}
              className={`h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/84 ${errors.subject ? 'border-red-500' : ''}`}
            />
            {errors.subject && (
              <p className="text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.contactForm.formFieldMessage}</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder={t.contactForm.formFieldMessagePlaceholder}
              rows={6}
              className={`min-h-36 rounded-[1.5rem] border-[rgba(98,67,45,0.14)] bg-white/84 p-4 ${errors.message ? 'border-red-500' : ''}`}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)] cursor-pointer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t.contact.contactBtnWhatsApp}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
