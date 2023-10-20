---
title: 四、文章内容
excerpt: 标题、段落、重点、颜色
categories:
  - [使用说明]
tags:
  - 使用说明
index_img: /img/book1.jpg
date: 2023-09-29 20:40:36
---

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)

{% note danger %}
注意：为什么文章里面是直接使用二级标题，而不是一级标题？ 
那是因为文章的标题已经是配好了的，那就是一级标题了！所以不需要再配多一个一级标题。
{% endnote %}

![标题](/img/howToUse/content/title.jpg)

## markdown 语法

> [https://markdown.com.cn/basic-syntax/](https://markdown.com.cn/basic-syntax/)

## 二级标题 {% label warning @目录 %}

{% note warning %}
下面两种方式二选一
{% endnote %}

```
## 二级标题
```

```html
<h2>二级标题</h2>
```

### 三级标题 {% label warning @目录 %}

{% note warning %}
下面两种方式二选一
{% endnote %}

```
### 三级标题
```

```html
<h3>三级标题</h3>
```

## 换行
在一行的末尾添加两个或多个空格，然后按回车键,即可创建一个换行(`<br>`)

这是第一行。   
这是第二行。

```md
这是第一行。   
这是第二行。
```

```html
这是第一行。<br>
这是第二行。
```

## 粗体

我是 __粗体__.

```md
我是 __粗体__.
```

```html
我是 <strong>粗体</strong>.
```

## 列表

### 有序列表

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

```md
1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item
```

### 无序列表

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item

```md
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
```

## 跳转链接

[Markdown语法](https://markdown.com.cn/basic-syntax/links.html)

```md
[链接显示文字](https://markdown.com.cn/basic-syntax/links.html#跳转地址)
```

## 不同颜色字体 使用场景

### 1. <font class=text-primary>紫色文字</font> 主要

```
<font class=text-primary>紫色文字</font>
```

### 2. <font class=text-info>蓝色文字</font> 信息

```
<font class=text-info>蓝色文字</font>
```

### 3. <font class=text-success>绿色文字</font> 正确

```
<font class=text-success>绿色文字</font>
```

### 4. <font class=text-warning>黄色文字</font> 警告

```
<font class=text-warning>黄色文字</font>
```

### 5. <font class=text-danger>红色文字</font> 错误

```
<font class=text-danger>红色文字</font>
```

## 不同颜色标记 使用场景

### 1. {% label primary @紫色 %} 主要

{% note warning %}
下面方式二选一
{% endnote %}

```
{% label primary @紫色 %}
```

```html
<span class="label label-primary">紫色</span>
```

### 2. {% label info @蓝色 %} 信息

```
{% label info @蓝色 %}
```

```html
<span class="label label-info">蓝色</span>
```

### 3. {% label success @绿色 %} 正确

```
{% label success @绿色 %}
```

```html
<span class="label label-success">绿色</span>
```

### 4. {% label warning @黄色 %} 警告

```
{% label warning @黄色 %}
```

```html
<span class="label label-warning">黄色</span>
```

### 5. {% label danger @红色 %} 错误

```
{% label danger @红色 %}
```

```html
<span class="label label-danger">红色</span>
```


## 突出段落

### 紫色 主要
{% note primary %}
紫色段落
{% endnote %}
```
{% note primary %}
紫色段落
{% endnote %}
```

### 蓝色 信息

{% note info %}
蓝色段落
{% endnote %}
```
{% note info %}
蓝色段落
{% endnote %}
```

### 绿色 正确

{% note success %}
绿色段落
{% endnote %}
```
{% note success %}
绿色段落
{% endnote %}
```

### 黄色 警告

{% note warning %}
黄色段落
{% endnote %}
```
{% note warning %}
黄色段落
{% endnote %}
```

### 红色 错误

{% note danger %}
红色段落
{% endnote %}
```
{% note danger %}
红色段落
{% endnote %}
```

### 深灰

{% note secondary %}
深灰段落
{% endnote %}
```
{% note secondary %}
深灰段落
{% endnote %}
```

### 灰

{% note light %}
灰色段落
{% endnote %}
```
{% note light %}
灰色段落
{% endnote %}
```

## 图片

### 多图片

{% gi %}
![](/img/book1.jpg)
![](/img/book2.jpg)
![](/img/book3.jpg)
{% endgi %}

```md
{% gi %}
![](/img/xx.jpg)
![](/img/xx.jpg)
{% endgi %}
```

### 单图片
![标题](/img/book1.jpg)
```
![标题](/img/xx.jpg)
```

### 图片路径
{% note warning %}
所有图片资源路径都在 [/img/]() 目录下，需要哪张图片，写入对应的地址即可！
{% endnote %}

![图片路径](/img/howToUse/head/path.jpg)

如下案例：
- 我要用 <font class=text-warning>img下的book1.jpg</font>，那么图片路径就是 {% label warning @/img/book1.jpg %}

- 我要用 <font class=text-warning>img / howToUse 下的 a.jpg</font>， 那么图片路径就是 {% label warning @/img/howToUse/a.jpg %}


## 对话

<article class="the-dialogue">
	<header>
    <h3>
      记录对话内容，完美重现人物对话场景
    </h3>
  </header>
  <div class="sender" title="your">
    <p>
      你好吗？
    </p>
  </div>
  <div class="responder" title="me">
    <p>
      我非常地好！有啥需要帮忙的吗？
    </p>
  </div>
</article>

```html
<article class="the-dialogue">
	<header>
    <h2>
      对话主题
    </h2>
  </header>
  <div class="sender" title="your">
    <p>

    </p>
  </div>
  <div class="responder" title="me">
    <p>

    </p>
  </div>
</article>
```

> [点击查看 关于怎么联系我](/note/2023/09/04/callMe)