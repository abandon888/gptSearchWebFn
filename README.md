# 基于 ChatGPT API 的联网检索云函数

## 整体项目 collegeAi 背景
简要介绍：CollegeAi 是一个创新的生涯规划辅助平台，旨在通过 GPT 技术整合网络信息，提供个性化生涯规划指导，帮助用户明确职业方向和专业认知。
亮点有：

- 采用 Next.js 框架优化 SEO 和提升开发效率，并接入 Antd 组件库进行快速开发
- 使用 Node.js 的 Nest.js 框架和 MySQL 数据库搭建稳定且可扩展的后端服务，确保了项目的稳定性和扩展性。
- 整合 AI 服务，采用阿里云 Serverless 云函数开发 AI 搜索功能，加速开发调试并方便部署。
- 对关键功能AI聊天调优，自主开发 gpt-search 联网搜索功能，使用 puppeteer 无头浏览器构建准确且高效的 AI 搜索中间件。
- 对 AI 大模型进行 prompt 优化，使用高级 fine-tuning 及 function-calling 等微调减少 token 使用并优化响应效果。

项目分为[前端部分](https://github.com/Collage-Ai/CollegeAi-fe)，[后端部分](https://github.com/Collage-Ai/CollegeAi-be)，[AI中间件](https://github.com/abandon888/gptSearchWebFn)这三个仓库。本项目为 AI 中间件仓库。

## 本项目简介

本项目是一个高效的云函数，基于 ChatGPT API 构建，专为实现高级联网检索功能而设计。项目采用 JavaScript 编写，支持在阿里云的云函数平台上无缝部署，提供了一种简便且高效的方式来利用 OpenAI 的先进功能，包括函数调用和模型微调等。

主要特色包括：

- **集成 OpenAI 官方模块**：允许用户轻松实现 ChatGPT API 的高级功能，如函数调用和细粒度的模型微调，拓展了云函数的应用场景。
- **一键部署**：设计简洁，可通过几个简单步骤在阿里云函数计算控制台进行一键部署，无需复杂配置。
- **定制化检索优化**：用户可通过调整关键词和检索排序参数，精细控制检索结果，以满足特定需求。
- **灵活的 Prompt 配置**：提供灵活的 Prompt 配置选项，用户可便捷地自定义检索云函数的行为，适应不同的应用场景。
- **简化 API 配置**：项目内置无头浏览器进行联网检索，用户仅需配置 AI 相关的 API 参数即可，省去了寻找和接入搜索引擎 API 的繁琐过程。
- **优化的 Prompt 设计**：通过精心设计和调试的 Prompt，项目能够返回格式化的数据，极大地方便了前端数据的展示和处理。

> 该项目适合希望在云环境中实现强大且灵活的联网检索功能，特别是对于希望快速集成和利用 ChatGPT 强大能力的场景。

## 项目背景

由于业务要求，需要实现一个 gpt 联网搜索的功能，看了看号称最强 gpt 搜索插件的 WebPilot，太贵；又看了看 openai 官方实现的联网搜索，还行但是不开放接口，没办法，只能自己去做，于是就实现了这个项目。
具体项目架构等可查看我的知乎文章：[如何快速实现一个gpt搜索功能](https://zhuanlan.zhihu.com/p/688948381)

## 项目部署及运行

### 部署

1. fork 本项目到自己的仓库
2. git clone 项目到本地,并进入项目目录
3. 确保本地有 nodejs 环境，安装依赖，并根据需要自行修改相关配置参数

```bash
npm install
```

4. 进入阿里云函数计算控制台（函数计算 FC），选择创建函数，选择事件函数
   ![alt text](./assets/image.png)
5. 上传全部项目文件，并创建函数
   ![alt text](./assets/image1.png)
6. 进入函数详情，可以看到函数的配置信息，点击触发器，添加触发器，选择 HTTP 触发器，即可调用测试
   ![alt text](./assets/image3.png)

## 配置参数说明

data.json 文件中的配置参数说明如下：

- `OPENAI_API_KEY`：gpt 搜索的 api key
- `OPENAI_API_URL`：gpt 搜索时的代理 url
- `activitySummeryPrompt`：type 为 activity 的 prompt(为调试便利未使用，使用 prompt.js 中的配置)
- `insightSummeryPrompt`：type 为 insight 的 prompt
- `sortPrompt`：对搜索引擎检索结果排序的 prompt
- `generalQueryPrompt`：通用的搜索优化 prompt（未使用）
- `insightQueryPrompt`：type 为 insight 时搜索优化 prompt
- `activityQueryPrompt`：type 为 activity 时搜索优化 prompt
- `testUser`：测试用户的信息数据（测试使用）

prompt.js 中的配置参数说明如下：

- `activitySummery：type 为 activity 的 prompt

> 如果我的项目对你有帮助，欢迎 star，fork，也欢迎提 issue，pr，谢谢！
