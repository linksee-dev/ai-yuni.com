---
title: Indie Dev Tech Stack in 2026: What I Actually Use
date: 2026-02-20 09:30:00 +0800
categories: [blog]
tags: [full-stack, tools, workflow]
excerpt: 一套不花哨但能持续交付的独立开发技术栈。
---

技术栈不需要“最先进”，需要“最可维护”。

我的选择标准很简单：

- 招不到人也能自己长期维护。
- 失败后回滚成本低。
- 能快速验证商业假设。

## 当前默认组合

- 前端：Next.js + Tailwind
- 后端：Node.js / Serverless Functions
- 数据：Postgres + Prisma
- 部署：Vercel + GitHub Actions
- 内容：Jekyll + Markdown（就是你现在看的这一套）

## 为什么不用更复杂的方案

复杂系统在早期很酷，但会透支迭代速度。
独立开发的护城河，很多时候不是技术领先，而是发布频率领先。
