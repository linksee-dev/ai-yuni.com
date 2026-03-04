# Yuni Notes (Jekyll + Chirpy)

这是一个基于 **Jekyll + Chirpy** 的 `newsletter + blog` 聚合站。

核心目标：

- 所有内容只维护一份：`_posts/*.md`
- Blog 与 Newsletter 只是同一内容源的两种分类视图
- GitHub Pages 自动构建部署，GitHub 上写文章后站点自动同步

## 目录结构

- `_posts/`：唯一内容源（文章与 newsletter 都在这里）
- `_tabs/blog.md`：Blog 聚合页（筛选 `categories: [blog]`）
- `_tabs/newsletter.md`：Newsletter 聚合页（筛选 `categories: [newsletter]`）
- `_tabs/resources.md`：资源页
- `_tabs/about.md`：关于页
- `.github/workflows/pages.yml`：GitHub Pages 自动部署

## 写作规范

新建文章文件：

```text
_posts/YYYY-MM-DD-your-slug.md
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

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

访问：`http://127.0.0.1:4000`

## GitHub Pages 发布

1. 推送到 `main`（或 `master`）分支。
2. GitHub Actions 自动执行 `.github/workflows/pages.yml`。
3. 在仓库 `Settings -> Pages` 中选择 `GitHub Actions` 作为部署方式。

## 重要配置

请按你的实际地址修改 `_config.yml`：

- `url`
- `baseurl`

如果你使用自定义域名（例如 `ai-yuni.com`），通常需要把 `baseurl` 改为空字符串，并在仓库中添加 `CNAME`。
