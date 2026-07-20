import { NextRequest, NextResponse } from 'next/server';
import { recipeService } from '@/database/services';
import { getClientIp, rateLimit } from '@/lib/rateLimit';
import { siteConfig } from '@/lib/site';

function secureResponse(body: unknown, status = 200, extraHeaders: HeadersInit = {}) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      ...extraHeaders,
    },
  });
}

function isSameSiteRequest(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    return new URL(origin).hostname === new URL(siteConfig.url).hostname;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameSiteRequest(request)) {
      return secureResponse({ error: 'Invalid origin' }, 403);
    }

    const limiter = rateLimit(`recipe-analytics:write:${getClientIp(request)}`, 30, 60_000);
    if (!limiter.allowed) {
      return secureResponse(
        { error: 'Too many requests' },
        429,
        { 'Retry-After': String(limiter.retryAfterSeconds) },
      );
    }

    const body = await request.json();
    const { recipeId, type } = body;
    
    if (!recipeId || !type) {
      return secureResponse(
        { error: 'Recipe ID and interaction type are required' },
        400,
      );
    }

    if (!['VIEW', 'SHARE', 'PRINT'].includes(type)) {
      return secureResponse(
        { error: 'Invalid interaction type' },
        400,
      );
    }

    await recipeService.recordInteraction(recipeId, type);
    
    return secureResponse({ success: true });
    
  } catch (error) {
    console.error('Recipe analytics error:', error);
    return secureResponse(
      { error: 'Failed to record interaction' },
      500,
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const limiter = rateLimit(`recipe-analytics:read:${getClientIp(request)}`, 20, 60_000);
    if (!limiter.allowed) {
      return secureResponse(
        { error: 'Too many requests' },
        429,
        { 'Retry-After': String(limiter.retryAfterSeconds) },
      );
    }

    const stats = await recipeService.getStats();
    
    return secureResponse(stats);
    
  } catch (error) {
    console.error('Recipe stats error:', error);
    return secureResponse(
      { error: 'Failed to get recipe statistics' },
      500,
    );
  }
}
