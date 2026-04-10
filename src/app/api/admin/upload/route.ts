import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());

    // Convert to WebP with high quality (lossless-like) using sharp
    const webpBuffer = await sharp(rawBuffer)
      .webp({ quality: 90, effort: 4 })
      .toBuffer();

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
    const filePath = `recipes/${fileName}`;

    const { error } = await supabaseAdmin.storage
      .from('recipe-images')
      .upload(filePath, webpBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('recipe-images')
      .getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
