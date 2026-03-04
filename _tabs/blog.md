---
layout: page
title: Blog
icon: fas fa-pen-nib
order: 1
permalink: /blog/
---

这里是偏长期沉淀的文章：方法论、案例复盘、技术深潜。

{% assign blog_posts = site.posts | where_exp: "post", "post.categories contains 'blog'" %}
{% if blog_posts.size > 0 %}

{% for post in blog_posts %}
### [{{ post.title }}]({{ post.url | relative_url }})

- 发布：`{{ post.date | date: "%Y-%m-%d" }}`
- 分类：`blog`
- 摘要：{{ post.excerpt | strip_html | truncate: 140 }}

{% endfor %}

{% else %}

暂时还没有 blog 文章，先去 [Newsletter]({{ '/newsletter/' | relative_url }}) 看看最近更新。

{% endif %}
