const { OpenAI } = require('openai')
const data = require('./data.json')
const { activitySummery } = require('./prompt')


const insightSummeryPrompt = data.insightSummeryPrompt
let activitySummeryPrompt = activitySummery
const client = new OpenAI({
  apiKey: data.OPENAI_API_KEY,
  baseURL: data.OPENAI_API_URL,
})
/**
 * 
 * @param {string} content 
 * @param {string} query 
 * @param {string} type 
 * @returns 
 */
async function getAIResponse (content, query, type) {
  let prompt
  switch (type) {
    case 'insight':
      prompt = insightSummeryPrompt
      break
    case 'activity':
      prompt = activitySummeryPrompt
      break
    default:
      prompt = ''
      break
  }
  const completionParams = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": prompt
      },
      {
        "role": "user",
        "content": `query 是${query},content是 ${content}`
      }
    ],
    temperature: 1,
    max_tokens: 2048,
  }

  try {
    const { data } = await client.chat.completions.create(completionParams).withResponse()

    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content
    } else {
      console.log('Response data does not have the expected structure.')
      return ''
    }
  } catch (error) {
    console.error('AI Service Error:', error)
    throw new Error('Unable to get response from AI service')
  }
}
const content = `{
  '最有价值的搜索结果1': '',
  '最有价值的搜索结果2': '竞争情报已经成为企业资本、技术、人才之后的第四核心竞争力，市场对竞争情报的需求日益增多。随着高质量发展，科技自立自强，短板产业补链、新兴产业建链等打造现代化产业体系等一系列国家战略的实施，对竞争情报的需求尤为凸显和强烈。竞争情报系统是对企业整体竞争环境与竞争对手活动信息的一个全面监测过程。它通过合法手段收集和分析商业竞争中有关商业行为的各类信息，整合企业内部信息资源，为企业的决策部门和管理者提供多种途径、方便快捷的情报信息服务，为企业战略决策提供依据。一个优秀的竞争情报分析人员不仅要有扎实的专业知识，而且需要具备多学科知识和拥有综合能力的复合型人才。伴随着经济数字化转型与人工智能的驱动，情报人员不仅需要熟悉大数据时代和智能环境下的情报方法体系和情报工作新工具，而且需要掌握和提高信息搜索采集和大数据情报分析的技能水平。为此，中国科学技术情报学会竞争情报分会定于2024年3月中下旬在重庆举办“大数据情报分析方法技能与竞争情报体系建设”研修班。分会将同期举办2024“春之声”竞争情报沙龙，现将有关事项通知如下。一、主办单位中国科学技术情报学会竞争情报分会，北方科技信息研究所二、时间和地点培训时间：3月27-30日（27下午沙龙，28-30研修班，31疏散）培训地点：重庆融创永乐半山酒店（重庆领创汇润酒店管理有限公司融创锦逸酒店）报到时间：3月27日全天，参加沙龙的代表请上午报到。三、研修对象 科技信息服务人员、企事业情报搜集人员、企业战略规划部、研发中心/中央研究院、市场（营销）部、各级情报所各行业科研院所、大专院校、图书馆等机构及相关部门从事信息采集、情报研究、竞争情报、信息咨询、市场研究、经济分析工作的人员以及企业中高层管理人员，CEO/CIO，信息中心/计算中心主任，企业管理和信息化的规划人员、项目经理等。四、课程内容（一）情报转化理论与方法体系1.情报人员能力、情报服务类型2.情报转化理论模型与应用实践3.大数据时代下的情报方法体系（二）信息搜索与采集技术4.精准搜索技巧5.竞争对手信息搜集与跟踪方法6.python网络爬虫（三）python数据分析7. pandas等数据分析包8.信息计量分析应用实践9.信息可视化分析（四）大数据技术与文本挖掘10.中文分词技术11.机器学习方法12.python机器学习实践（五）企业竞争情报体系的搭建13.企业竞争情报的定位14.建立合理有效的情报组织15.确定企业情报活动的内容16.情报活动与企业部门之间的关系17.怎样设计企业需要的情报产品18.企业情报人员的配置及要求（六）企业竞争情报工作案例详解19.企业情报研究活动的方式（比如：跟踪竞争对手、监控竞争环境等）20.情报研究团队之间的关系（比如：情报研究和情报资源管理的关系等）21.实际运用中的情报工作框架（企业情报活动框架）22.情报研究成果展示及解读23.企业定标比超实际运用24.企业情报管理工作思路及运作（七）科技文献内容挖掘技术及应用25.科技文献内容挖掘与大数据情报分析26.当前国际科技文献内容挖掘技术的新进展27.基于科技文献挖掘智能引擎SciAiEngine细粒度语义内容提取28.基于科技文献垂直大模型的智能情报应用五、讲课专家和研修形式邀请著名大学、中国科学院、企业集团情报部门领导等资深研究人员授课，辅之实际案例分析和实战操作。上课要求：因涉及实践操作，请学员自带笔记本电脑。六、研修证书研修结束后，发放中国科学技术情报学会竞争情报分会培训证书。七、收费标准培训费3500元/人，3人以上（含3人）3200元/人。分会会员3200元/人。八、报名及缴费1. 提交报名表（第4页）至分会电子邮箱，以收到确认回复为准。报名表还可在分会公众号的该通知页面底部微附件中下载，或者分会网站通知链接http://www.scic.org.cn/node/1189页面底端的附件中下载。同时可下载文件版通知（带红章）。2. 缴纳培训费请参加培训的学员于3月20日前（以到账日为准）将培训费行汇至以下账户。培训费缴纳暂不支持微信及支付宝对公账号。会场缴纳可支付现金或扫个人微信收款码。户 名：北方科技信息研究所开户银行：中国建设银行北京白石桥支行账 号：1100 1028 6000 5602 59593. 报名截止日期为3月20日。3月20日（以到账日为准）以后汇款者请发送汇款凭证至分会邮箱。4. 食宿统一安排，费用自理。住宿费标准370和480元/人/间，请在报名表中填写住宿信息。住宿费请于报到当日在酒店前台办理入住时缴纳。住宿费可在前台刷卡缴纳。5. 会务组将于会议开始前15日统一邮发《报到及参会事项》，敬请报名学员关注邮箱。6. 参加研修班的学员可免费参加沙龙，有关沙龙详情可参见《2024“春之声”竞争情报沙龙通知》。九、培训咨询咨询电话...',
  '最有价值的搜索结果3': '1月11-14日，由北京大学大数据分析与应用技术国家工程实验室联合北京大学重庆大数据研究院共同举办的数字化转型公益研修沙龙在北京大学成功举行。重庆市科技局、重庆高新区管委会等相关单位三十余人参加了此次研修。学员们通过名师授课、讲座研讨、实地参访，深入学习交流数字化转型、数字政府、数字经济、数字金融等方面的核心知识，以先进和前沿理论武装头脑，为数字重庆建设储备力量。名师云集，专家荟萃。本次研修沙龙由北京大学数学科学学院党委书记、北京大学重庆大数据研究院院长胡俊主持沙龙，点亮智库理事长、中关村信息技术和实体经济融合发展联盟副理事长兼秘书长周剑，北京大学政府管理学院副院长、教授黄璜，北京大学工学院党委书记、长聘教授宋洁，北京大学国家发展研究院长聘副教授黄卓等国内顶尖专家学者现场授课，呈现了多场精彩纷呈的知识盛宴。数字化转型研修沙龙（第1期）合影开幕仪式胡俊致辞北京大学重庆大数据研究院院长胡俊对此次研修沙龙寄予厚望，他在开幕仪式的致辞中表示，希望大家能在此次沙龙学习中颇有收获，并灵活运用到工作实践，为推动数字中国、数字重庆的建设贡献力量。实验室产品工程部副部长、重庆研究院数字化转型促进中心副主任黄晶介绍了本次沙龙安排，再次热烈欢迎研修团到访北京大学。北京大学校园参观合影学员们游览了雪中北大校园、参观了北大校史馆，感受了百年学府深厚的底蕴，满怀信心和热情开启本次研修沙龙。数字化转型的方法策略周剑周剑理事长结合数字化转型背景与现状，详细介绍了数字化转型架构与方法，帮助学员深入了解数字化转型成熟度模型和数字化转型蓝图。数字政府建设的演进和发展趋势 黄璜黄璜教授从数字政府发展背景切入，介绍了数字政府从“1.0版本：政府信息化”到“2.0版本：电子政务”再到“3.0版本：数字政府”的演变路径，帮助学员深入了解数字政府建设的整体发展情况、现状、挑战和未来趋势，为数字政府相关工作提供理论指导和实践参考。数字经济与数据要素 宋洁宋洁教授主要围绕数字经济与数据要素的核心概念，从数据的信息、权属、价值、安全、交易、产业数字化和数字产业化、数据要素流动等方面展开，深入浅出地讲解数字要素的内涵和外延，全面展示数字经济的发展及未来。宏观经济形势与数字金融创新 黄卓黄卓副教授对中国当前经济形势进行了深入地分析与解读，介绍了我国数字金融创新的发展前沿，强调数字金融创新对调整监管政策、推动金融改革、促进数字经济健康发展的重要意义。数字化转型企业实地参访首期学员们还参观了科大讯飞北京总部，实地了解数字化产品及应用场景，学习转型变革之道，汲取相关经验。学员在科大讯飞参观学习北京大学重庆大数据研究院数字化转型研修沙龙活动（第1期）在各方的努力下成功举办。学员们对课程内容和讲师的专业水平给予了高度评价，纷纷反馈此次研修课程设计合理、内容丰富、形式多样，通过研修活动开阔了眼界，提升了认识，启发了工作思路，希望能够继续参加类似的研修活动，不断提升自己的数字化能力。未来，实验室将联合重庆研究院持续举办系列研修活动，通过加强与行业内专家和企业的合作，不断丰富课程内容，提供更具针对性的实践案例和经验分享，为我国数字化转型及数字经济高质量发展点亮星星之火。更多信息北京大学大数据分析与应用技术国家工程实验室经国家发改委批复建设，成立于2017年。实验室立足于国家战略，依托北京大学建立研究环境与核心团队，瞄准大数据分析技术需求，建立研究开发和试验平台，开展针对大数据的预处理和质量控制、大数据的计算数学理论与算法、大数据的统计方法及理论、大规模机器学习方法、面向异构多源大数据的挖掘和分析、大数据的可视化，以及知识计算和决策支持等方面的研究，承担国家和行业重大科研项目，服务社会发展与国家战略。点亮智库（DL, DigitaLization Think Tank）是由社会组织、研究院所、企业等组成的智库联合体，设立由中关村信息技术和实体经济融合发展联盟（简称中信联）、北京国信数字化转型技术研究院（简称国信院）等组成的联合秘书处，致力于与相关各方共创共享数字化转型理论体系、方法工具、解决方案和实践案例等，以体系方法让创新变得简单，以创新驱动高质量发展。中关村信息技术和实体经济融合发展联盟（简称中信联）是一家活动范围覆盖全国的AAAA级社团组织，其性质为非营利性社会团体。中信联是工信部、国务院国资委、国家发改委数字化转型工作支撑单位，是全国两化融合管理体系贯标工作的总体公共服务机构，是中央和地方国有企业数字化转型工作推进单位，是国家数字化转型伙伴行动首批联合倡议单位，长期从事数字化转型、两化融合、工业互联网等领域研究与产业实践。文章来源：北京大学重庆大数据研究院转载本网文章请注明出处相关站点地址：北京市海淀区颐和园路5号北京大学静园六院邮编：100871电话：010-62767117邮箱：gdsjs...'
}`
getAIResponse(content, '产品经理', 'activity').then(console.log).catch(console.error)
module.exports = {
  getAIResponse
}