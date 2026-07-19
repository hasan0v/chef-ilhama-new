import { NextRequest, NextResponse } from 'next/server';
import { notifyIndexNow } from '@/lib/indexNow';

// IndexNow API endpoint
// Allows notifying search engines about content changes
// See: https://www.indexnow.org/documentation

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.INDEXNOW_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: 'IndexNow webhook is not configured' }, { status: 503 });
    }
    if (request.headers.get('authorization') !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { urls } = body as { urls?: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array is required' }, { status: 400 });
    }

    const result = await notifyIndexNow(urls);
    return NextResponse.json(result, { status: result.ok ? 200 : result.status });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'IndexNow',
    usage: 'Authenticated publishing webhook',
  });
}
