const { bingSearch, googleSearch } = require('./searchTool')
const { fetchJobDetails, fetchAndParseUrls } = require('./textHandle')
const { getAIResponse } = require('./gpt')
const { parseJsonSafely } = require('./utils')

/**
 * 获取搜索结果的详细信息
 * @param {string} query - 查询字符串
 * @param {boolean} isSort - 是否排序
 * @param {string} simpleQuery - 简化查询字符串
 * @param {string} type - 类型
 * @returns {Promise<any>} - 搜索结果的详细信息
 */
async function searchQuery (query, isSort, simpleQuery, type) {
  try {
    const specificQuery = type === 'activity' ? query + ' 2024 比赛活动' : query
    const results = await bingSearch(specificQuery)
    if (!results || results.length === 0) {
      throw new Error('未检索到结果')
    }

    let details
    let summaryRes

    if (isSort) {
      const filterRes = await getAIResponse(results, query, 'filter')
      details = await fetchAndParseUrls(filterRes, results)
      summaryRes = await getAIResponse(details, simpleQuery, type)
    } else {
      const filter = [
        { "序号": 0 },
        { "序号": 1 },
        { "序号": 2 }
      ]

      details = await fetchAndParseUrls(filter, results)
      summaryRes = await getAIResponse(details, simpleQuery, type)
      summaryRes = parseJsonSafely(summaryRes)
      console.log(summaryRes)
      // 为summaryRes中的每个项添加对应的url
      if (type == 'activity') {
        summaryRes = summaryRes.map((item, index) => ({
          ...item,
          url: results[index]?.href
        }))
      }else{
        summaryRes = {
          content: summaryRes,
          url: results.reduce((acc, cur) => acc + cur.href + '\n', '')
        }
      }
    }
    return parseJsonSafely(summaryRes)
  } catch (error) {
    console.error('发生错误:', error)
    throw error // 继续向上抛出错误以便于进一步处理
  }
}

module.exports = {
  searchQuery
}
