const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SVG_PATH = path.join(__dirname, '..', 'public', 'logo.svg');
const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');
const FAVICON_PATH = path.join(__dirname, '..', 'src', 'app', 'favicon.ico');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  const svgBuffer = fs.readFileSync(SVG_PATH);

  // Generate PNG icons for each size
  for (const size of sizes) {
    const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated: icon-${size}x${size}.png`);
  }

  // Generate favicon.ico (32x32 PNG saved as .ico - browsers handle PNG favicons)
  const favicon32 = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();
  
  // Create a proper ICO file with 16x16 and 32x32
  const favicon16 = await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toBuffer();

  // Build ICO file (simplified - single 32x32 PNG)
  const icoBuffer = createIco([
    { size: 16, buffer: favicon16 },
    { size: 32, buffer: favicon32 }
  ]);
  
  fs.writeFileSync(FAVICON_PATH, icoBuffer);
  console.log('Generated: favicon.ico');
  
  console.log('\nAll icons generated successfully!');
}

function createIco(images) {
  // ICO file format:
  // Header: 6 bytes
  // Directory entries: 16 bytes each
  // Image data: PNG buffers
  
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = images.length;
  let dataOffset = headerSize + (dirEntrySize * numImages);
  
  // Calculate total size
  let totalSize = dataOffset;
  for (const img of images) {
    totalSize += img.buffer.length;
  }
  
  const buffer = Buffer.alloc(totalSize);
  
  // ICO Header
  buffer.writeUInt16LE(0, 0);      // Reserved
  buffer.writeUInt16LE(1, 2);      // Type: 1 = ICO
  buffer.writeUInt16LE(numImages, 4); // Number of images
  
  let currentOffset = dataOffset;
  
  for (let i = 0; i < numImages; i++) {
    const img = images[i];
    const entryOffset = headerSize + (i * dirEntrySize);
    
    buffer.writeUInt8(img.size === 256 ? 0 : img.size, entryOffset);     // Width
    buffer.writeUInt8(img.size === 256 ? 0 : img.size, entryOffset + 1); // Height
    buffer.writeUInt8(0, entryOffset + 2);   // Color palette
    buffer.writeUInt8(0, entryOffset + 3);   // Reserved
    buffer.writeUInt16LE(1, entryOffset + 4); // Color planes
    buffer.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    buffer.writeUInt32LE(img.buffer.length, entryOffset + 8);  // Size of image data
    buffer.writeUInt32LE(currentOffset, entryOffset + 12);     // Offset to image data
    
    img.buffer.copy(buffer, currentOffset);
    currentOffset += img.buffer.length;
  }
  
  return buffer;
}

generateIcons().catch(console.error);
