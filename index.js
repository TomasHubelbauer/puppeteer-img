const puppeteer = require('puppeteer');
const path = require('path');

// Crash on error
process.on('uncaughtException', error => { throw error; });
process.on('unhandledRejection', error => { throw error; });

void async function () {
  const browser = await puppeteer.launch({ headless: process.env.CI });
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
  await page.screenshot({ path: path.join(__dirname, 'img-screenshot.png'), clip });
  await browser.close();
}()

void async function () {
  const browser = await puppeteer.launch({ headless: process.env.CI });
  const [page] = await browser.pages();
  await page.goto('file://' + path.join(__dirname, 'HERO_-_Blender_Open_Movie-full_movie.webm.360p.vp9.webm'));
  await page.waitForFunction(() => document.getElementsByTagName('video')[0].readyState === 4);

  await page.evaluate(() => {
    /** @type {HTMLVideoElement} */
    const videoVideo = document.getElementsByTagName('video')[0];

    // Hide video controls so that they don't appear in the screenshot
    videoVideo.controls = false;

    // Scale down to a poster size
    videoVideo.style.maxWidth = 200;
    videoVideo.style.maxHeight = 200;

    // Seek to 10 % to skip likely blank frames at the start
    videoVideo.currentTime = videoVideo.duration * .1;
  });

  // Wait for the video to stop seeking before capturing the screenshot
  await page.waitForFunction(() => !document.getElementsByTagName('video')[0].seeking);

  const clip = await page.evaluate(() => document.getElementsByTagName('video')[0].getBoundingClientRect().toJSON());
  await page.screenshot({ path: path.join(__dirname, 'video-screenshot.png'), clip });
  await browser.close();
}()
