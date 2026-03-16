// borrowed from qwik's showcase generator script :3

import { existsSync, mkdirSync } from 'fs';
import { chromium, devices, type Page } from 'playwright';

const websites = [
  'https://3compute.org',
  'https://birdflop.com',
  'https://burgersonfleek.ca',
  'https://ui.luminescent.dev',
  // 'https://mineplace.me', broken for some reason
  'https://luminaramc.org',
  'https://cactie.luminescent.dev'
]

async function captureMultipleScreenshots() {
  if (!existsSync('public/showcases')) {
    mkdirSync('public/showcases');
  }

  let browser = null;
  try {
    // launch headless Chromium browser
    browser = await chromium.launch({
      headless: true,
    });
    const context = await browser.newContext({
      // pretend to be a desktop browser
      ...devices['Desktop Chrome'],
    });

    for (const url of websites) {
      let page: Page;
      try {
        page = await context.newPage();

        // set viewport width and height
        await page.setViewportSize({
          width: 1440,
          height: 1080,
        });

        console.log('Opening page', url);
        await page.goto(url);

        const filename = url
          .replace('https://', '')
          .replace('/', '_')
          .replace('.', '_')
          .replace('.', '_')
          .toLowerCase();

        await wait(5000);
        const path = `public/showcases/${filename}.jpeg`;
        await page.screenshot({
          path: path,
          type: 'jpeg',
          quality: 50,
        });
        console.log(`✅ ${url} - (${path})`);
      } catch (err) {
        console.error(err);
      } finally {
        if (page!) await page.close();
      }
    }
  } catch (err) {
    console.log(`❌ Error: ${(err as Error)?.message || err}`);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log(`\n🎉 ${websites.length} screenshots captured.`);
  }
}

captureMultipleScreenshots();

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}