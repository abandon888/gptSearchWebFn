const puppeteer = require("puppeteer");

async function googleSearch(query) {
  try {
    //https://serpapi.com/search-api
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com.hk/search?q=${encodeURIComponent(
        query
      )}&oq=${encodeURIComponent(
        query
      )}&uule=w+CAIQICIaQXVzdGluLFRleGFzLFVuaXRlZCBTdGF0ZXM&hl=en&gl=us&sourceid=chrome&ie=UTF-8%22#ip=1`
    );
    const summaries = await page.evaluate(() => {
      const liElements = Array.from(
        document.querySelector("#search > div > div").childNodes
      );
      const firstFiveLiElements = liElements.slice(0, 5);
      return firstFiveLiElements.map((li) => {
        const linkElement = li.querySelector("a");
        const href = linkElement.getAttribute("href");
        const title = linkElement.querySelector("a > h3").textContent;
        const abstract = Array.from(
          li.querySelectorAll("div > div > div > div > div > div > span")
        )
          .map((e) => e.textContent)
          .join("");
        return { href, title, abstract };
      });
    });
    await browser.close();
    console.log(summaries);
    return summaries;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function bingSearch(query) {
  try {
    //https://serpapi.com/bing-search-api
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
      });
    const page = await browser.newPage();
    await Promise.all([
      page.waitForNavigation(), // 等待页面导航
      page.goto(`https://cn.bing.com/search?q=${encodeURIComponent(query)}`), // 导航到搜索页面    
    ]);
    
    // await page.goto(
    //   `https://cn.bing.com/search?q=${encodeURIComponent(
    //     query
    //   )}`
    // );
    await new Promise(resolve => setTimeout(resolve, 2000)); // 等待 2 秒
    // page.on('console', msg => {
    //   for (let i = 0; i < msg._args.length; ++i)
    //       console.log(`${i}: ${msg._args[i]}`);
    // }
    // );
    await page.waitForSelector('#b_results', { timeout: 30000 })
    const summaries = await page.evaluate(() => {
      //const results = document.querySelector("#b_results")
     // console.log('results',results)
      const liElements = Array.from(
        document.querySelectorAll("#b_results > .b_algo")
      );
      //console.log(liElements)
      const firstFiveLiElements = liElements.slice(0, 8);
      return firstFiveLiElements.map((li) => {
        const abstractElement = li.querySelector(".b_caption > p");
        const linkElement = li.querySelector("a");
        const href = linkElement.getAttribute("href");
        const title = linkElement.textContent;

        const abstract = abstractElement ? abstractElement.textContent : "";
        return { href, title, abstract };
      });
    });
    console.log(summaries);
    await browser.close();
    return summaries;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function yahooSearch(query) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://search.yahoo.com/search?p=${encodeURIComponent(
        query
      )}&ei=UTF-8&fr=fp-tts`
    );
    const summaries = await page.evaluate(() => {
      const liElements = Array.from(
        document.querySelector(".searchCenterMiddle").childNodes
      );
      const firstFiveLiElements = liElements.slice(0, 5);
      return firstFiveLiElements.map((li) => {
        const compTextElement = li.querySelector(".compText");
        const linkElement = li.querySelector("a");
        const href = linkElement.getAttribute("href");
        const title = linkElement.getAttribute("aria-label");

        const abstract = compTextElement ? compTextElement.textContent : "";
        return { href, title, abstract };
      });
    });
    await browser.close();
    return summaries;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function duckduckgoSearch(query) {
  try {
    //https://serpapi.com/duckduckgo-search-api
    // 可以改区域，这些设置的是港区
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://duckduckgo.com/?q=${encodeURIComponent(query)}&kl=hk-tzh&ia=web`
    );
    const summaries = await page.evaluate(() => {
      const liElements = Array.from(
        document.querySelectorAll("#react-layout ol li")
      );
      const firstFiveLiElements = liElements.slice(0, 5);
      return firstFiveLiElements.map((li) => {
        const abstractElement = li
          .querySelector("div:nth-child(3)")
          .querySelector("div");
        const linkElement = li
          .querySelector("div:nth-child(2)")
          .querySelector("a");
        const href = linkElement.getAttribute("href");
        const title = linkElement.textContent;

        const abstract = abstractElement ? abstractElement.textContent : "";
        return { href, title, abstract };
      });
    });
    await browser.close();
    console.log(summaries);
    return summaries;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = {
  googleSearch,
  bingSearch,
  yahooSearch,
  duckduckgoSearch,
};

bingSearch('前端开发相关比赛').then((res) => {
  console.log(res);
});
