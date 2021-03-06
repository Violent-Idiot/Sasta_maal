"use strict";
const puppeteer = require("puppeteer");

var checker = async (link) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    // executablePath:
    //   "./node_modules/puppeteer/.local-chromium/win64-756035/chrome-win/chrome.exe",
  });
  try {
    console.log("start");
    const page = await browser.newPage();
    // await page.waitFor(30000);
    console.log(link);
    var arr = [];
    console.log(link);
    await page.goto(link);
    const product = await page.$("#productTitle");
    const text = await (await product.getProperty("textContent")).jsonValue();
    const price = await page.$("#priceblock_ourprice");
    const text2 = await (await price.getProperty("textContent")).jsonValue();
    var tag = text2.trim();
    console.log(text.trim());
    console.log(tag);
    const reg = /[0-9]+/g;
    var result = tag.match(reg);
    var arr = result.join();
    arr = arr.replace(/\,/g, "");
    var reg_arr = arr.slice(0, -2);
    console.log(reg_arr);
    return [text.trim(), reg_arr];
  } catch (err) {
    console.log(err.message);
  } finally {
    await browser.close();
  }
};
module.exports = checker;
