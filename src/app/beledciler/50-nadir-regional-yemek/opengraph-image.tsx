import { renderGuideOpenGraph } from '@/lib/guideOpenGraph';

export const alt = '39 ölkədən kəşf etməyə dəyər 50 nadir regional yemək';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return renderGuideOpenGraph('az');
}
