# ai-yuni.com

当前结构是“双层站点”：

- 根目录 `/`：保留原来的视觉首页（Cloudflare 上的主站）
- 子目录 `/blog/`：Jekyll + Chirpy 的 Blog/Newsletter 内容系统

## 目录结构

- `index.html` / `style.css` / `app.js`：主站首页（保留旧版设计）
- `blog.html`：跳转到 `/blog/`
- `newsletter.html`：跳转到 `/blog/newsletter/`
- `blog-site/`：Jekyll 博客源代码
  - `blog-site/_posts/`：唯一内容源
  - `blog-site/_tabs/`：Blog / Newsletter / Resources / About

## 写作方式

在 GitHub 直接新增文章到：

```text
blog-site/_posts/YYYY-MM-DD-your-slug.md
```

Front Matter 示例：

```yaml
---
title: Your Title
date: 2026-03-04 09:00:00 +0800
categories: [blog] # 或 [newsletter]
tags: [ai, product]
excerpt: 一句话摘要
---
```

## 部署

### Cloudflare Pages（生产）

- 工作流：`.github/workflows/cloudflare-pages.yml`
- 行为：
  1. 构建 `blog-site` 到临时目录
  2. 组装发布目录：根目录保留主站，博客输出放在 `/blog/`
  3. 发布到 Cloudflare Pages 项目 `ai-yuni`

### GitHub Pages（镜像）

- 工作流：`.github/workflows/pages.yml`
- 行为：把博客镜像发布到 `https://linksee-dev.github.io/ai-yuni.com/blog/`

## 本地预览（仅博客）

```bash
cd blog-site
bundle install
bundle exec jekyll serve --baseurl /blog
```

访问：`http://127.0.0.1:4000/blog/`
