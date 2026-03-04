---
layout: page
title: Newsletter
icon: fas fa-envelope-open-text
order: 2
permalink: /newsletter/
---

这里是 newsletter 归档页，偏每周/双周节奏，强调信息密度和可执行清单。

## 你会看到什么

- 独立开发与 AI 产品的实战复盘
- 增长系统、转化优化、内容分发方法
- 真实上线节奏，而不是空泛趋势

## 关注方式

- RSS: [feed.xml]({{ '/feed.xml' | relative_url }})
- Blog: [ai-yuni.com/blog](https://ai-yuni.com/blog)
- Twitter(中文): [@AigcYuni](https://x.com/AigcYuni)

---

{% assign nl_posts = site.posts | where_exp: "post", "post.categories contains 'newsletter'" %}
{% if nl_posts.size > 0 %}

{% for post in nl_posts %}
### [{{ post.title }}]({{ post.url | relative_url }})

- 发布：`{{ post.date | date: "%Y-%m-%d" }}`
- 分类：`newsletter`
- 摘要：{{ post.excerpt | strip_html | truncate: 140 }}

{% endfor %}

{% else %}

还没有 newsletter 归档内容，先去 [Blog]({{ '/blog/' | relative_url }}) 看看。

{% endif %}
