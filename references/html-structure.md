# 学术论文译文 HTML 骨架说明

## 文件用途

- `assets/paper-template.html`：完整单页论文模板。
- `assets/ui.js`：目录显示、隐藏及移动端自动收起逻辑。

模板中的 `{{PLACEHOLDER}}` 是待替换内容，不是最终页面文案。

## 推荐输出结构

```text
<output-directory>/
├── <paper-name>-<language>.html
└── assets/
    ├── ui.js
    ├── figure-01.png
    ├── figure-02.png
    └── ...
```

执行时：

1. 将 `paper-template.html` 复制为最终 HTML 文件。
2. 将 `ui.js` 复制到最终输出目录的 `assets/`。
3. 将论文原图放入同一 `assets/` 目录。
4. 替换模板占位符，并按原论文结构扩展目录与正文。

## 占位符分类

### 文档元数据

- `{{DOCUMENT_DESCRIPTION}}`
- `{{TRANSLATED_TITLE}}`
- `{{ORIGINAL_TITLE}}`
- `{{SHORT_TITLE}}`
- `{{TARGET_LANGUAGE}}`
- `{{SOURCE_URL}}`
- `{{SOURCE_VERSION}}`
- `{{AUTHORS_AND_AFFILIATIONS}}`
- `{{VENUE_OR_IDENTIFIER}}`
- `{{PUBLICATION_DATE}}`
- `{{TRANSLATION_NOTICE}}`

### 摘要与章节

- `{{TRANSLATED_ABSTRACT}}`
- `{{TRANSLATED_KEYWORDS}}`
- `{{SECTION_1_TITLE}}`
- `{{SECTION_1_1_TITLE}}`
- `{{TRANSLATED_PARAGRAPH}}`
- `{{TRANSLATED_PARAGRAPH_WITH_INLINE_CITATION}}`

模板只展示一个章节和一个小节。实际生成时必须按原文复制并扩展，不得把整章内容塞进单个示例段落。

### 公式、图和表

- `{{EQUATION_CONTENT}}`
- `{{EQUATION_NUMBER}}`
- `{{EQUATION_DESCRIPTION}}`
- `{{FIGURE_PATH}}`
- `{{FIGURE_NUMBER}}`
- `{{FIGURE_ALT_TEXT}}`
- `{{TRANSLATED_FIGURE_CAPTION}}`
- `{{TABLE_NUMBER}}`
- `{{TRANSLATED_TABLE_CAPTION}}`
- `{{HEADER_*}}`
- `{{CELL_*}}`
- `{{TRANSLATED_TABLE_NOTE}}`

表格应逐行逐列生成。大型表格保留在 `.table-wrap` 中，以获得横向和纵向滚动。

### 参考文献

- `{{REFERENCE_NOTE}}`
- `{{REFERENCE_1}}`、`{{REFERENCE_2}}` 等

完整参考文献使用：

```html
<ol class="paper-bibliography">
  <li id="reference-1">...</li>
  <li id="reference-2">...</li>
</ol>
```

正文引用放在对应论述之后：

```html
某项结论得到实验支持<a class="paper-cite" href="#reference-12">[12]</a>。
```

并列或区间引用可显示为 `[12, 15]` 或 `[12–15]`。若一个显示标签对应多个本地条目，应分别提供可访问链接，或链接到该组的首项并确保编号文本准确。

## 章节与目录

目录锚点必须与正文 `id` 完全一致：

```html
<a class="toc-sub" href="#method-evaluation">3.2 评估</a>
...
<h3 id="method-evaluation">3.2 评估</h3>
```

ID 使用稳定、简短的 ASCII kebab-case，不使用标题全文或随机编号。建议格式：

- 一级章节：`introduction`、`methods`、`experiments`
- 二级章节：`methods-data`、`methods-training`
- 特殊章节：`abstract`、`acknowledgments`、`appendix-a`、`references`

## 翻译说明

全文翻译的推荐说明：

```html
<div class="notice">
  <strong>译文说明：</strong>
  本页面依据论文原文逐段完整翻译与编校。译文保留原章节层级、公式编号、
  图表、表格和文献编号，并将引用置于原论述对应位置。正式引用请以原文为准。
</div>
```

不要写入未经验证的“完整”“无遗漏”声明。只有完成结构和数量核验后才能使用上述措辞。

## 样式调整边界

可以调整：

- 主题颜色
- 正文字体栈
- 文章最大宽度
- 目录宽度
- 移动端断点

应保持：

- 长文阅读所需的正文行高
- 目录与正文的清晰层级
- 表格滚动能力
- 图片自适应宽度
- 打印样式
- 键盘可访问的目录按钮

不要加入与论文内容无关的营销式首屏、装饰图、渐变背景或嵌套卡片。

## 生成后校验

至少检查：

1. 页面可被 HTML 解析器读取。
2. 所有目录 `href` 均有对应 `id`。
3. 页面中没有重复 `id`。
4. 所有本地图片和脚本路径存在。
5. 图号、表号和公式编号与原文一致。
6. 参考文献条目数量与原文一致。
7. 行内引用保留在对应论述位置。
8. 页面不再包含未替换的 `{{PLACEHOLDER}}`。
9. `ui.js` 通过 JavaScript 语法检查。
10. 桌面与移动端均无明显文字溢出或内容遮挡。

## 可选自动检查

可使用 HTML 解析器收集目录链接和所有 `id`，比较差集；使用文件系统检查 `<img src>` 与 `<script src>`；使用正则搜索残留占位符：

```bash
rg -n '\{\{[A-Z0-9_]+\}\}' <output.html>
node --check <output-directory>/assets/ui.js
```
