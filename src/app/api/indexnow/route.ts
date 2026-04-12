import { NextRequest, NextResponse } from 'next/server';

// IndexNow API endpoint
// Allows notifying search engines about content changes
// See: https://www.indexnow.org/documentation

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'chef-ilhama-indexnow-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls?: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array is required' }, { status: 400 });
    }

    // Fan out to IndexNow endpoints
    const indexNowEndpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];

    const payload = {
      host: 'chef-ilhama.food',
      key: INDEXNOW_KEY,
      keyLocation: `https://chef-ilhama.food/${INDEXNOW_KEY}.txt`,
      urlList: urls.map((u) =>
        u.startsWith('http') ? u : `https://chef-ilhama.food${u}`
      ),
    };

    const results = await Promise.allSettled(
      indexNowEndpoints.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        })
      )
    );

    const summary = results.map((r, i) => ({
      endpoint: indexNowEndpoints[i],
      status: r.status === 'fulfilled' ? r.value.status : 'failed',
    }));

    return NextResponse.json({ ok: true, summary });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'IndexNow',
    usage: 'POST with { "urls": ["/resept/plov", "/reseptler"] }',
  });
}
