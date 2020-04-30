const puppeteer = require('puppeteer');
const path = require('path');

void async function () {
  const browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  await page.goto('file://' + path.join(__dirname, 'PM5544_with_non-PAL_signals.png'));
  await page.waitForFunction(() => document.images[0].complete);

  // Scale down to a thumb size
  await page.evaluate(() => {
    const imageImg = document.images[0];
    imageImg.style.maxWidth = 200;
    imageImg.style.maxHeight = 200;
  });

  const clip = await page.evaluate(() => document.images[0].getBoundingClientRect().toJSON());
  await page.screenshot({ path: path.join(__dirname, 'screenshot.png'), clip });
  await browser.close();
}()
