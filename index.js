'use strict'

const { getUserQueryOptimization } = require('./queryGpt')
const { searchQuery } = require('./searchQuery')
const { parseJsonSafely } = require('./utils')

exports.initializer = (context, callback) => {
  console.log('initializing')
  callback(null, '')
}

/**
 * @description: 获取搜索结果的详细信息
 * @param {*} event { queryParameters: { query，isDetails，type} } type可选insight,activity
 * @param {*} context 
 * @param {*} callback 回传结果
 * @returns 
 */
exports.handler = async (event, context, callback) => {
  try {
    const eventObj = JSON.parse(event.toString())
    const parsedBody = parseJsonSafely(eventObj.body)
    const { query: simpleQuery, isSort: isSortStr, type, userInfo = '', field = '' } = parsedBody
    const isSort = isSortStr === 'true'

    if (!simpleQuery || !type) {
      throw new Error('缺少必要的 query 或 type 参数')
    }

    const query = await getUserQueryOptimization(simpleQuery, type, userInfo, field)

    if (type === 'activity') {
      const queryObj = parseJsonSafely(query)
      const queries = Object.values(queryObj)
      const resultsContent = await Promise.all(queries.map(val => searchQuery(val, isSort, simpleQuery, type)))
      const results = queries.map((name, index) => ({ name, content: resultsContent[index] }))
      callback(null, results)
    } else {
      const result = await searchQuery(query, isSort, simpleQuery, type)
      callback(null, result)
    }
  } catch (error) {
    // 更详细的错误处理
    console.error('处理过程中发生错误：', error)
    callback(error)
  }
}