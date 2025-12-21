import { redirect } from 'next/navigation';

export default function WhatsAppRedirect() {
  // Server-side redirect - URL encoded message
  redirect('https://wa.me/994103794577?text=Salam%20Chef%20%C4%B0lham%C9%99%2C%20a%C5%9Fpaz%20xidm%C9%99ti%20haqq%C4%B1nda%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m');
}
