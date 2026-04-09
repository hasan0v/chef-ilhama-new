import { redirect } from 'next/navigation';
import { getWhatsAppHref } from '@/lib/site';

export default function WhatsAppRedirect() {
  redirect(getWhatsAppHref());
}
