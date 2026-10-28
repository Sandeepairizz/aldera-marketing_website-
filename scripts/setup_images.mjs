import fs from 'fs';
import path from 'path';

const baseDir = path.resolve(process.cwd(), 'public/img');

const folders = ['hero', 'about', 'services', 'works', 'projects', 'process'];
for (const f of folders) {
  fs.mkdirSync(path.join(baseDir, f), { recursive: true });
}

// Curated high-res full-color photography photos (no logos, no trademarked brands, sharp, cinema quality)
const photoPool = [
  'photo-1634942537034-2531766767d1', // Luxury foil brand book
  'photo-1600132806370-bf17e65e942f', // Stationery terracotta
  'photo-1618005182384-a83a8bd57fbe', // 3D abstract chromatic
  'photo-1541701494587-cb58502866ab', // Architecture illuminated
  'photo-1507238691740-187a5b1d37b8', // Minimalist stationery
  'photo-1542744094-3a31f272c490', // Strategic moodboard
  'photo-1551024709-8f23befc6f87', // Botanical beverage cans
  'photo-1620916566398-39f1143ab7be', // Amber serum bottle
  'photo-1592945403244-b3fbafd7f539', // Sculptural perfume bottle
  'photo-1552346154-21d32810aba3', // High performance sneaker
  'photo-1505740420928-5e560c06d30e', // Aluminum wireless headphones
  'photo-1559056199-641a0ac8b55e', // Specialty coffee packaging
  'photo-1583394838336-acd977736f90', // Matte black headphones
  'photo-1526170375885-4d8ecf77b99f', // Classic analog camera
  'photo-1509198397868-475647b2a1e5', // High-end console controller
  'photo-1572635196237-14b3f281503f', // Designer sunglasses
  'photo-1512496015851-a90fb38ba796', // Skincare cosmetics
  'photo-1584308666744-24d5c474f2ae', // Amber dropper vial
  'photo-1509631179647-0177331693ae', // Haute couture runway
  'photo-1515886657613-9f3515b0c78f', // High fashion avant-garde
  'photo-1539109136881-3be0616acf4b', // Studio fashion portrait
  'photo-1490481651871-ab68de25d43d', // Minimalist apparel editorial
  'photo-1469334031218-e382a71b716b', // Runway model editorial
  'photo-1503342217505-b0a15ec3261c', // Outdoor cinematic portrait
  'photo-1529139574466-a303027c1d8b', // Fashion lookbook portrait
  'photo-1534528741775-53994a69daeb', // High fashion beauty portrait
  'photo-1517841905240-472988babdf9', // Studio beauty light
  'photo-1492691527719-9d1e07e534b4', // Dramatic cinematic portrait
  'photo-1500917293891-ef795e70e1f6', // Fashion lookbook trench
  'photo-1483985988355-763728e1935b', // Autumn luxury collection
  'photo-1508296695146-257a814070b4', // Sunglasses reflection
  'photo-1511556532299-8f662fc26c06', // Luxury footwear leather
  'photo-1506152983158-b4a74a01c721', // Cinematic neon lighting
  'photo-1536240478700-b869070f9279', // 35mm golden hour
  'photo-1492691527719-9d1e07e534b4', // Prism light refraction
  'photo-1518173946687-a4c8a383392e', // Natural light shadows
  'photo-1574717024653-61fd2cf4d44d', // Cinema rig monitor
  'photo-1514306191717-452ec28c7814', // 16mm film reel texture
  'photo-1486406146926-c627a92ad1ab', // Geometric skyscraper facade
  'photo-1513694203232-719a280e022f', // Brutalist concrete gallery
  'photo-1600585154340-be6161a56a0c', // Sculptural marble reception
  'photo-1497366216548-37526070297c', // Modern architectural atrium
  'photo-1497366811353-6870744d04b2', // Sunlit concrete courtyard
  'photo-1441986300917-64674bd600d8', // Flagship boutique gallery
  'photo-1555529669-e69e7aa0ba9a', // Ceramic and glassware display
  'photo-1519710164239-da123dc03ef4', // Mid-century lounge wood
];

const downloads = [];

// 1. Hero: 24 images at 3:4 (w=1500, h=2000)
for (let i = 1; i <= 24; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i - 1) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'hero', `${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1500&h=2000&q=90&fm=webp`,
  });
}

// 2. About:
// 3 capsules at 21:9 (w=1680, h=720)
for (let i = 1; i <= 3; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 5) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'about', `capsule-${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1680&h=720&q=90&fm=webp`,
  });
}
// 4 tiles at 4:5 (w=1200, h=1500)
for (let i = 1; i <= 4; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 10) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'about', `0${i}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&h=1500&q=90&fm=webp`,
  });
}

// 3. Services:
// 6 main at 4:5 (w=1200, h=1500)
for (let i = 1; i <= 6; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 15) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'services', `${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&h=1500&q=90&fm=webp`,
  });
}
// 18 thumbnails at 1:1 (w=800, h=800)
for (let i = 1; i <= 18; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 20) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'services', `thumb-${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&h=800&q=90&fm=webp`,
  });
}

// 4. Works pass: 12 images at 4:5 (w=1200, h=1500)
for (let i = 1; i <= 12; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 2) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'works', `${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&h=1500&q=90&fm=webp`,
  });
}

// 5. Selected projects: 6 images at 16:9 (w=1920, h=1080)
for (let i = 1; i <= 6; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 8) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'projects', `${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1920&h=1080&q=90&fm=webp`,
  });
}

// 6. Process: 4 images at 3:4 (w=1500, h=2000)
for (let i = 1; i <= 4; i++) {
  const num = String(i).padStart(2, '0');
  const photo = photoPool[(i + 14) % photoPool.length];
  downloads.push({
    file: path.join(baseDir, 'process', `${num}.webp`),
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1500&h=2000&q=90&fm=webp`,
  });
}

console.log(`Total images to download: ${downloads.length}`);

// Download with concurrency limit of 6
async function run() {
  let count = 0;
  const queue = [...downloads];

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) break;
      if (fs.existsSync(item.file) && fs.statSync(item.file).size > 1000) {
        count++;
        continue;
      }
      try {
        const res = await fetch(item.url);
        if (!res.ok) {
          console.error(`Failed ${item.url}: status ${res.status}`);
          continue;
        }
        const arrayBuf = await res.arrayBuffer();
        fs.writeFileSync(item.file, Buffer.from(arrayBuf));
        count++;
        if (count % 10 === 0) {
          console.log(`Downloaded ${count}/${downloads.length}`);
        }
      } catch (err) {
        console.error(`Error downloading ${item.file}:`, err.message);
      }
    }
  }

  const workers = Array.from({ length: 6 }, () => worker());
  await Promise.all(workers);
  console.log(`Finished downloading all ${count} images!`);
}

run();
