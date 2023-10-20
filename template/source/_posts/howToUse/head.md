---
title: 三、文章头部信息
excerpt: 文章标题、概述、创建日期时间、最新修改日期时间
categories:
  - [使用说明]
tags:
  - 使用说明
index_img: /img/book1.jpg
# banner_img: /img/book1.jpg
date: 2023-09-29 20:02:19
---

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)

## title

![title](/img/howToUse/head/title.jpg)

文章标题，等于你写作文的题目。

## excerpt

文章概要内容

## index_img

![index](/img/howToUse/head/index.jpg)
概要图片，默认 [/img/book1.jpg](/img/book1.jpg)

### 图片路径
{% note warning %}
所有图片资源路径都在 [/img/]() 目录下，需要哪张图片，写入对应的地址即可！
{% endnote %}

![图片路径](/img/howToUse/head/path.jpg)

如下案例：
- 我要用 <font class=text-warning>img下的book1.jpg</font>，那么图片路径就是 {% label warning @/img/book1.jpg %}

- 我要用 <font class=text-warning>img / howToUse 下的 a.jpg</font>， 那么图片路径就是 {% label warning @/img/howToUse/a.jpg %}

## banner_img

文章顶部背景图，不写默认使用首页背景图。

![banner](/img/howToUse/head/banner.jpg)

## date
- 文章创建日期，文章文件是什么时候创建的就是什么时间点
- 文章最近一次修改日期
![date](/img/howToUse/head/date.jpg)

## tag

标签，类似 快捷方式，可以直接引导过去，例如当前文章是的标签是 {% label info @使用说明 %}，这一标签下就有能查询到相关文章，快速定位文章。

![tag](/img/howToUse/head/tag.jpg)

### 多个标签，怎么写？

```
tags:
  - 标签1
  - 标签2
```

## categories {% label warning @分类 %}

{% note warning %}
区别于 标签，将文章进行分类处理，标签只是一个快捷方式而已！
{% endnote %}

![categories](/img/howToUse/head/categories.jpg)

### 多个分类，怎么写？

```
categories:
  - [分类一]
  - [分类二]
```

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)