---
layout: page
title: Newsletter
icon: fas fa-envelope-open-text
order: 2
permalink: /newsletter/
---

这里是 newsletter 归档，偏每周/双周节奏，强调信息密度和可执行清单。

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
