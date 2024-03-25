# 基于 ChatGPT API 的联网检索云函数

## 项目简介

本项目是一个基于 ChatGPT API 的联网检索云函数，通过调用 ChatGPT API 实现联网检索功能。项目使用 JS 编写，部署云函数平台为阿里云，其主要亮点如下：

- 调用 OpenAI 官方模块，可实现 Function calling、Fine-tuning 等微调功能
- 易于部署，可直接在阿里云函数计算控制台一键部署
- 通过调节关键词，检索排序，实现对检索结果的特定优化
- 暴露 Prompt 配置参数，可快速上手配置自己的检索云函数
- 仅需配置 AI 相关 API 参数，内部使用无头浏览器实现检索，无需费力寻找搜索引擎 API
- 精心调试的 Prompt,精准优化，可返回格式化数据方便前端展示

## 项目背景

由于业务要求，需要实现一个 gpt 联网搜索的功能，看了看号称最强 gpt 搜索插件的 WebPilot，太贵；又看了看 openai 官方实现的联网搜索，还行但是不开放接口，没办法，只能自己去做，于是就实现了这个项目。

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
