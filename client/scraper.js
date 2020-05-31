"use strict";
const puppeteer = require("puppeteer");
const { findUrl } = require("./config/db");
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath:
      "./node_modules/puppeteer/.local-chromium/win64-756035/chrome-win/chrome.exe",
  });
  try {
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
    );
    await page.waitFor(30000);
    var url = await findUrl();

    for (const i of url) {
      console.log(i.link);
      await page.goto(i.link);
      //   await page.waitFor(10000);
      const product = await page.$("#productTitle");
      const text = await (await product.getProperty("textContent")).jsonValue();
      const price = await page.$("#priceblock_ourprice");
      const text2 = await (await price.getProperty("textContent")).jsonValue();
      console.log(text.trim());
      console.log(text2.trim());
    }
  } catch (err) {
    console.log(err.message);
  }
  await browser.close();
})();
