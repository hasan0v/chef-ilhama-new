import { NextRequest, NextResponse } from 'next/server';
import { recipeService } from '@/database/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipeId, type } = body;
    
    if (!recipeId || !type) {
      return NextResponse.json(
        { error: 'Recipe ID and interaction type are required' },
        { status: 400 }
      );
    }

    if (!['VIEW', 'SHARE', 'PRINT'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid interaction type' },
        { status: 400 }
      );
    }

    await recipeService.recordInteraction(recipeId, type);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Recipe analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to record interaction' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = await recipeService.getStats();
    
    return NextResponse.json(stats);
    
  } catch (error) {
    console.error('Recipe stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get recipe statistics' },
      { status: 500 }
    );
  }
}