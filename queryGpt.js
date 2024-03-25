const { OpenAI } = require('openai');
//从data.json中获取数据
const env = require('./data.json');

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: env.OPENAI_API_URL,
});
/**
 * 
 * @param {string} query
 * @param {string} type insight or activity
 * @param {string} useInfo
 * @param {string} field
 */
async function getUserQueryOptimization(query,type,useInfo,field) {
  let prompt = '',message = ''
  switch(type){
    case 'insight':
      prompt = env.insightQueryPrompt
      message = `query 是${query}`
      break
    case 'activity':
      prompt = env.activityQueryPrompt
      message = `field是${field},useInfo 是 ${useInfo}`
      break
    default:
      prompt = ''
      break
  }
  const {data,response} = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt
      },
      {
        role: 'user',
        content: message
      }
    ],
    temperature: 0.74,
    max_tokens: 2070,
    top_p: 1,
    frequency_penalty: 0.67,
    presence_penalty: 0.73
  }).withResponse()
  console.log('response',data.choices[0].message.content)
  return data.choices[0].message.content
}

//getUserQueryOptimization('我的这个职业前景怎么样','insight','一名大三的学生，来自985大学，目前有一段运营实习，有一段产品实习，目标是产品经理，喜欢探索人性和产品，有一些技术基础。','产品经理')
module.exports = {
  getUserQueryOptimization
}