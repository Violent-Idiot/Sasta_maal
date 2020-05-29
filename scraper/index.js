"use strict";
const puppeteer = require("puppeteer");

(async () => {
  //   const browser = await puppeteer.launch({
  //     headless: true,
  //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
  //   });
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "./node_modules/puppeteer/.local-chromium/win64-756035/chrome-win/chrome.exe",
  });
  try {
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
    );
    var url =
      "https://www.amazon.in/Test-Exclusive-746/dp/B07DJHXTLJ/ref=sr_1_3?crid=1LGP2TA6H7XXL&dchild=1&keywords=one+pluse7tmobile&qid=1590588896&sprefix=one+plus%2Caps%2C321&sr=8-3";
    await page.goto(url);
    // const element = await page.$eval("#productTitle", (e) =>
    //   console.log(e)
    // );
    const product = await page.$("#productTitle");
    const text = await (await product.getProperty("textContent")).jsonValue();
    const price = await page.$("#priceblock_ourprice");
    const text2 = await (await price.getProperty("textContent")).jsonValue();
    console.log(text.trim());
    console.log(text2.trim());
  } catch (err) {
    console.log(err.message);
  } finally {
    await browser.close();
  }
})();
