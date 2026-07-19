'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form data:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (isSubmitted) {
    return (
      <Card className="border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(237,248,240,0.82))] shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm">
        <CardContent className="p-8 text-center sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(53,84,65,0.12)] text-[rgba(53,84,65,0.96)]">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="display-title text-4xl text-[rgba(53,84,65,0.96)] mb-2">
            {t.contactForm.formSuccessTitle}
          </h3>
          <p className="mx-auto max-w-md text-sm leading-7 text-[rgba(53,84,65,0.88)] sm:text-base">
            {t.contactForm.formSuccessDesc}
          </p>
        </CardContent>
      </Card>
    );
  }

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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t.contactForm.formBtnSending}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                {t.contactForm.formBtnSend}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}