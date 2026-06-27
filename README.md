# 🌐 项目名称：基于原生 JS & Claude API 的智能 Web 交互应用

## 📌 项目简介 (Introduction)
本项目是一个轻量级、无后端的纯前端智能化 Web 应用程序。
系统抛弃了繁重的后端框架，采用原生 Web 技术栈（Vanilla JS），直接在浏览器端与 **Claude API** 进行轻量化数据交互，实现了 [写上你的核心功能，比如：极速文本分析 / 自动化问答]。
这种架构展现了现代 Web 技术的敏捷性，极大地降低了部署成本，适合 [某类人群/场景] 的快速日常使用。


## ✨ 核心功能模块 (Key Features)
- **⚡ 极速响应前端**：使用原生 JavaScript (ES6+) 构建，无需搭建复杂的后端环境，即开即用。
- **🤖 浏览器端 AI 引擎**：通过 `fetch` API 直接在前端发起异步网络请求，无缝对接 Claude 大模型。
- **🎨 纯净的 UI 设计**：通过 CSS3 实现了响应式布局，界面简洁流畅，兼容各主流浏览器。

## 🛠️ 技术栈 (Tech Stack)
- **前端结构**：HTML5 (`index.html`)
- **样式美化**：CSS3 (`styles.css`)
- **逻辑交互**：JavaScript / ES6 (`app.js`)
- **AI 接口**：Claude API 
- **开发协同**：Claude Code

## ⚙️ 如何在本地运行体验 (How to Run)

本项目为纯前端架构，体验极其简单，无需安装任何环境：
1. 下载本项目所有文件到本地文件夹。
2. 用代码编辑器（如 VS Code）打开 `app.js`，将里面预留的 `YOUR_API_KEY_HERE` 替换为你自己的 Claude API 密钥。
3. 双击打开 `index.html`，即可在浏览器中直接体验完整功能。
*(推荐使用 VS Code 的 Live Server 插件运行，以获得最佳的网络请求体验)*

## 🤖 AI-Human 协同开发实践 (Co-creation)
本项目由本人与 Claude Code 深度协作完成：
- **人类视角**：主导了界面的 UI 布局规划，设计了针对目标场景的 Prompt（提示词）工程逻辑，并把控项目的整体运行流程。
- **AI 视角**：利用 Claude Code 快速生成了规范的 CSS 样式表和健壮的 JS 异步请求代码（Promise/Async 逻辑），展现了零基础利用 AI 工具实现“从创意到产品”的极客精神。