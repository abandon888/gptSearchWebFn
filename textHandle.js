const axios = require('axios');
const cheerio = require('cheerio');
const { parseJsonSafely } = require('./utils')

async function fetchPageContent(url) {
    try {
        const response = await axios.get(url);
        return response.data; // 页面的HTML内容
    } catch (error) {
        console.error(`Error fetching page content from ${url}: `, error);
        return ''; // 出错时返回空字符串
    }
}

function parseJobDetail(htmlContent) {
    const $ = cheerio.load(htmlContent);

    // 提取所有<p>标签的文本内容
    let allText = '';
    $('p').each((i, elem) => {
        allText += $(elem).text().trim() + ' '; // 将所有段落文本合并，每个段落后面加一个空格以保持间隔
    });

    // 如果需要，可以进一步处理allText以提取或格式化信息
    // 例如，去除过长的空格、合并断行等

    // 返回包含所有提取文本的对象
    return { allText };
}

async function fetchJobDetails(searchResults) {
  const jobDetails = [];

  for (const result of searchResults) {
      const detailPageContent = await fetchPageContent(result.href);
      const jobInfo = parseJobDetail(detailPageContent);
      jobDetails.push(jobInfo);
  }

  return jobDetails;
}

const fetchWebPageContent = async (url)=> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch ${url}:`);
        return null;
    }
};

const extractTextFromHtml = (html) => {
    const $ = cheerio.load(html);
    let text = $('p').text()||$('span').text()
    text = formatText(text);
    return limitTextLength(text);
};



const fetchAndParseUrls = async (urlsJson, searchRes) => {
    // 如果urlsJson是字符串，则解析为对象
    urlsJson = parseJsonSafely(urlsJson);
    const results = {};
    for (const key in urlsJson) {
        //console.log(key)
        const index = urlsJson[key].序号;
        const htmlContent = await fetchWebPageContent(searchRes[index].href);
        if (htmlContent !== null) {
            const textContent = extractTextFromHtml(htmlContent);
            results[key] = {
                content: textContent,
                url: searchRes[index].href
            };
        } else {
            results[key] = null;
        }
    }

    return results;
};

/**
 * @description: 限制文本内容的长度不超过2000字，如果超出限制则截断并在末尾加上省略号
 * @param {string} htmlContent
 * @returns {string} 筛选后的文本内容
 */
const limitTextLength = (htmlContent) => {
    const maxLength = 2000;
    if (htmlContent.length > maxLength) {
        return htmlContent.slice(0, maxLength) + '...';
    }
    return htmlContent;
}

/**
 * @description: 去除文本内容中的换行符、多余空格等
 * @param {string} text
 * @returns {string} 格式化后的文本
 */
const formatText = (text) => {
    return text.replace(/\s+/g, ' ').trim();
}


// 示例用法
// const urlsJson = {
//     "最有价值的搜索结果1": {
//         链接: "https://developer.mozilla.org/zh-CN/docs/learn/Front-end_web_developer"
//     },
//     "最有价值的搜索结果2": {
//         链接: "https://www.zhihu.com/topic/19550901/intro"
//     },
//     "最有价值的搜索结果3": {
//         链接: "https://zhuanlan.zhihu.com/p/337513783"
//     }
// };

// fetchAndParseUrls(urlsJson).then(results => {
//     console.log(JSON.stringify(results, null, 2));
// });


module.exports = {
    fetchAndParseUrls,
    fetchPageContent,
    parseJobDetail,
    fetchJobDetails
}