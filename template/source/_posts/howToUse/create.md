---
title: 二、怎么创建文章
excerpt: 创建文章两种方式，跟创建文件夹、文件一样
categories:
  - [使用说明]
tags:
  - 使用说明
index_img: /img/book1.jpg
# banner_img: /img/book1.jpg
date: 2023-09-29 19:20:24
---

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)

{% note warning %}
提示：所有文章都在 [source/_post 目录下]()
{% endnote %}

## 方式一、通过命令创建文章 {% label success @强烈建议 %}

<font class=text-success>自动写上文件配置信息，文件创建日期自动生成，需要手动把下面的内容放到新建的文件开头</font>

```sh
npm run new 你的文件夹/你的文件名
```

执行上面命令后，将在 <font class=text-warning>source/_post</font> 目录下创建相关文件夹和文件名，比如上面命令执行后，<font class=text-warning>source/_post</font>下将会新建 <font class=text-warning>你的文件夹/你的文件名</font>

### 如下流程图

{% gi %}
![](/img/howToUse/create/1copy-cmd.jpg)
![](/img/howToUse/create/2open-temp.jpg)
![](/img/howToUse/create/3parse-cmd.jpg)
{% endgi %}

## 问题

### 1. 我只想在 _post 下面创建文件，怎么办？
命令后面直接加 <font class=text-warning>你的文件名</font> 就行，如下所示：

```sh
npm run new 你的文件名
```

![你的文件名](/img/howToUse/create/file.jpg)

### 2. 我想创建多个目录，该怎么办？

命令后面直接加 <font class=text-warning>你的文件夹1/你的文件夹2/你的文件夹3/文件</font> 如下所示：

{% note warning %}
不难看出，规则就是 文件夹后面是跟着符号 `/`, 需要多少个目录就写多少个！
{% endnote %}

```sh
npm run new 你的文件夹1/你的文件夹2/你的文件夹3/文件
```

![你的文件名](/img/howToUse/create/moreF.jpg)

### 3. 重复问题2，我已经创建了多个目录，再次执行多个目录，行不行？

{% note warning %}
当然行，创建目录会自动去检查目录是否已经存在，如果是，直接会进入该目录，不会重复创建，也不会覆盖原来的文件。
{% endnote %}

## 方式二、手动创建文件夹和文件 {% label warning @不推荐 %}

<font class=text-danger>不会自动写上文件配置信息，也不会有文件创建日期自动生成，需要手动把下面的内容放到新建的文件开头</font>

```TEXT
---
title: 文章标题
excerpt: 文章概述
categories:
  - [分类]
tags:
  - 标签
index_img: /img/book1.jpg
banner_img: /img/book1.jpg
date: 2023-09-29 12:49:17
---
```


> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)