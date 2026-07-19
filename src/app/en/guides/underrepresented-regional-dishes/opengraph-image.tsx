import { renderGuideOpenGraph } from '@/lib/guideOpenGraph';

export const alt = '50 underrepresented regional dishes from 39 countries';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return renderGuideOpenGraph('en');
}
