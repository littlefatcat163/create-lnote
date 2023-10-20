---
title: 一、启动服务
excerpt: 开始编辑文章之前的环境准备
categories:
  - [使用说明]
tags:
  - 使用说明
index_img: /img/book1.jpg
# banner_img: /img/book1.jpg
date: 2023-09-29 12:49:17
---

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)

## 启动

执行一下命令，启动服务，解析渲染md文件。

```sh
npm run server
```

如下图所示:

{% gi %}
![](/img/howToUse/run/1-open-temp.jpg)
![](/img/howToUse/run/2-run-cmd.jpg)
![](/img/howToUse/run/3-host.jpg)
{% endgi %}

## 打开浏览器

打开浏览器，输入 [http://localhost:9394/note](http://localhost:9394/note) 就可以看到文章效果了。


## 其他命令

### 创建文章

> [点击查看更多创建文章内容](/note/2023/09/29/howToUse/create)

```sh
npm run new post
```

### 解析成静态资源，需要发布的时候才用到

```sh
npm run build
```

{% note warning %}
执行完毕后，将生成 public 目录，该目录下的资源可用于发布网页。
{% endnote %}

![build](/img/howToUse/run/build.jpg)

### 发布资源

```sh
npm run deploy
```

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)