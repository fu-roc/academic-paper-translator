# Academic Paper Translator

一个面向学术论文的完整翻译技能，强调逐段忠实翻译，并保留原文的引用位置、公式、图片、表格、致谢、附录和参考文献。

## 适用场景

- 完整翻译 PDF、HTML、LaTeX、Markdown 或纯文本论文
- 生成适合长文阅读的中文或其他目标语言 HTML
- 制作双语论文版本
- 检查译文是否遗漏段落、移动引用或删减图表
- 将已有摘要式译文重新生成为完整逐段译文

## 核心约束

- 全文任务不得擅自摘要、合并段落或省略重复内容
- 引用必须保留在原论述对应位置，不能统一移动到段落末尾
- 公式、图、表及编号必须与原文一致
- 参考文献列表必须完整保留
- 未通过结构和数量校验时，不得声称译文完整
- 未经用户允许，不调用外部翻译 API 或上传论文内容

## 仓库结构

```text
academic-paper-translator/
├── README.md
├── SKILL.md
├── assets/
│   ├── paper-template.html
│   └── ui.js
└── references/
    └── html-structure.md
```

- `SKILL.md`：触发条件、翻译原则、工作流和完整性检查
- `assets/paper-template.html`：通用单页论文 HTML 骨架
- `assets/ui.js`：目录显示、隐藏及移动端交互
- `references/html-structure.md`：模板填充、目录锚点、引用和校验规则

## 安装

本仓库使用通用的项目级 Agent Skills 目录 `.agents/skills/`。在目标工作区根目录执行：

```bash
mkdir -p .agents/skills
git clone https://github.com/fu-roc/academic-paper-translator.git \
  .agents/skills/academic-paper-translator
```

更新技能：

```bash
git -C .agents/skills/academic-paper-translator pull --ff-only
```

让 Agent 扫描 `.agents/skills/` 即可发现该技能。若某个 Agent 只识别自己的专用目录，请按照该产品文档配置技能搜索路径，或从其专用目录创建指向 `.agents/skills/academic-paper-translator` 的符号链接。不要维护多份彼此独立的技能副本。

## 使用示例

- “把这篇论文完整翻译成中文，并保留引用。”
- “逐段翻译这个 PDF，公式和表格不要省略。”
- “生成一份可阅读的中文 HTML 论文。”
- “制作中英双语对照版本，参考文献保留英文。”
- “检查这份论文译文是否遗漏段落或移动了引用。”

## HTML 交付

生成 HTML 时应优先复用 `assets/paper-template.html`，并阅读
`references/html-structure.md`。模板仅提供通用结构，实际章节、目录、图表和参考文献必须依据原论文增删。

推荐的输出目录：

```text
<output-directory>/
├── <paper-name>-<language>.html
└── assets/
    ├── ui.js
    ├── figure-01.png
    └── ...
```

交付前至少检查：

1. 章节、小节、致谢和附录覆盖情况
2. 原文与译文的正文段落结构
3. 公式、图和表编号连续性
4. 图片、脚本和字体路径
5. 目录锚点和重复 HTML ID
6. 行内引用位置及参考文献数量
7. 未替换的模板占位符
8. JavaScript 语法
