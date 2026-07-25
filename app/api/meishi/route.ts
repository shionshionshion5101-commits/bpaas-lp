import { launch } from 'puppeteer';
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const W_MM = 91;
const H_MM = 55;
// PDF page size in points (1 inch = 72pt = 25.4mm)
const W_PT = (W_MM * 72 / 25.4).toFixed(2); // 258.14
const H_PT = (H_MM * 72 / 25.4).toFixed(2); // 155.91

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'public', 'Workle 名刺.html');
  const fontsPath = path.join(process.cwd(), 'public', 'fonts');

  let html = readFileSync(htmlPath, 'utf-8');
  const fontFaceCSS = buildEmbeddedFontCSS(fontsPath);

  html = html
    .replace(/<link[^>]+fonts\.googleapis\.com[^>]*>/g, '')
    .replace('<link rel="preconnect" href="https://fonts.googleapis.com" />', '')
    .replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />', '')
    .replace('</head>', `<style>${fontFaceCSS}</style>
<style>
  .dl-bar, .clabel { display: none !important; }
  .card { border-radius: 0 !important; box-shadow: none !important; }
  /* スケーラーJS無効化: カードを自然サイズ(91×55mm)で表示 */
  .scaler { transform: none !important; margin-bottom: 0 !important; }
</style></head>`);

  const browser = await launch({ headless: true });
  try {
    const page = await browser.newPage();
    // 4x scale → ~384dpi for a 91mm card (96dpi × 4 = 384dpi)
    await page.setViewport({ width: 1600, height: 2400, deviceScaleFactor: 4 });
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const clips = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.card')).map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })
    );

    const ts = Date.now();
    const pngPaths: string[] = [];

    for (let i = 0; i < clips.length; i++) {
      const buf = await page.screenshot({ clip: clips[i], type: 'png' });
      const p = path.join(tmpdir(), `meishi-${ts}-${i}.png`);
      writeFileSync(p, buf);
      pngPaths.push(p);
    }

    const outPath = path.join(tmpdir(), `meishi-out-${ts}.pdf`);
    const inputs = pngPaths.map(p => `"${p}"`).join(' ');

    // PNG → 2-page PDF (91×55mm @ 384dpi)
    // -density 384: 1px = 1/384inch として解釈 → 1376px = 91mm
    execSync(
      `magick -density 384 -units PixelsPerInch ${inputs} -compress Zip "${outPath}"`,
      { stdio: 'pipe' }
    );

    const pdfBuffer = readFileSync(outPath);
    for (const p of pngPaths) unlinkSync(p);
    unlinkSync(outPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Workle_meishi.pdf"',
      },
    });
  } finally {
    await browser.close();
  }
}

function buildEmbeddedFontCSS(fontsDir: string): string {
  const fontsCSS = readFileSync(path.join(fontsDir, 'fonts.css'), 'utf-8');
  return fontsCSS.replace(/url\('?\/fonts\/([^')]+)'?\)/g, (_match, fname) => {
    const filePath = path.join(fontsDir, fname);
    try {
      const b64 = readFileSync(filePath).toString('base64');
      return `url('data:font/woff2;base64,${b64}')`;
    } catch {
      return _match;
    }
  });
}
