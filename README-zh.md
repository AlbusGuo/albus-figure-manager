[English](https://github.com/RavenHogWarts/albus-figure-manager/blob/master/README.md) | 中文中文 | [English](https://github.com/RavenHogWarts/obsidian-plugin-starter/blob/master/README.md)



# Albus Figure Manager# Obsidian 示例插件

这是一个用于 Obsidian (https://obsidian.md) 的示例插件。

一个功能强大的 Obsidian 图片管理插件，帮助你组织、搜索和管理图片，支持引用检查、批量操作和 AGX 文件等高级功能。

该项目使用 Typescript 提供类型检查和文档支持。

## ✨ 功能特性此仓库依赖于最新的插件 API（obsidian.d.ts），它以 Typescript 定义格式提供，并包含描述其功能的 TSDoc 注释。



- 🖼️ **可视化网格视图** - 以精美的网格布局浏览所有图片[![GitHub stars](https://img.shields.io/github/stars/RavenHogWarts/obsidian-plugin-starter?style=flat&label=星标)](https://github.com/RavenHogWarts/obsidian-plugin-starter/stargazers)

- 🔍 **引用检查** - 查找哪些笔记引用了你的图片[![Total Downloads](https://img.shields.io/github/downloads/RavenHogWarts/obsidian-plugin-starter/total?style=flat&label=总下载量)](https://github.com/RavenHogWarts/obsidian-plugin-starter/releases)

- 🗑️ **未使用图片检测** - 轻松识别和清理未被引用的图片[![Latest Downloads](https://img.shields.io/github/downloads/RavenHogWarts/obsidian-plugin-starter/latest/total?style=flat&label=最新版下载量)](https://github.com/RavenHogWarts/obsidian-plugin-starter/releases/latest)

- 🔎 **高级搜索** - 按文件名或路径搜索[![GitHub License](https://img.shields.io/github/license/RavenHogWarts/obsidian-plugin-starter?style=flat&label=许可证)](https://github.com/RavenHogWarts/obsidian-plugin-starter/blob/master/LICENSE)

- 📁 **文件操作** - 轻松打开、重命名和删除图片[![GitHub Issues](https://img.shields.io/github/issues/RavenHogWarts/obsidian-plugin-starter?style=flat&label=问题)](https://github.com/RavenHogWarts/obsidian-plugin-starter/issues)

- 🎨 **AGX 文件支持** - 特殊处理 AGX/SVG 文件对[![GitHub Last Commit](https://img.shields.io/github/last-commit/RavenHogWarts/obsidian-plugin-starter?style=flat&label=最后提交)](https://github.com/RavenHogWarts/obsidian-plugin-starter/commits/master)

- ⚡ **性能优化** - 智能缓存实现快速操作

- 🎯 **键盘快捷键** - 通过命令面板快速访问## 安装

### 社区插件市场安装

## 📦 安装

[点击安装](obsidian://show-plugin?id=obsidian-plugin-starter)，或按以下步骤操作：

### 从社区插件市场安装

1. 打开 Obsidian 并前往 `设置 > 第三方插件`。

[点击安装](obsidian://show-plugin?id=albus-figure-manager)，或：2. 搜索 “obsidian-plugin-starter”。

3. 点击 “安装”。

1. 打开 Obsidian 并进入 `设置 > 第三方插件`

2. 搜索 "Albus Figure Manager"### 手动安装

3. 点击 "安装"

1. 下载最新版本

### 手动安装2. 将 `main.js`、`styles.css` 和 `manifest.json` 复制到你的仓库插件文件夹中：`<vault>/.obsidian/plugins/obsidian-plugin-starter/`

3. 重新加载 Obsidian

1. 下载最新版本4. 在设置 → 社区插件中启用插件

2. 将 `main.js`、`styles.css` 和 `manifest.json` 复制到你的仓库插件文件夹：`<vault>/.obsidian/plugins/albus-figure-manager/`

3. 重新加载 Obsidian### BRAT（推荐给测试用户）

4. 在设置 → 第三方插件中启用插件

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件

### BRAT 安装（推荐测试版用户）2. 在 BRAT 设置中点击“添加测试插件”

3. 输入 `RavenHogWarts/obsidian-plugin-starter`

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件4. 启用插件

2. 在 BRAT 设置中点击 "Add Beta plugin"

3. 输入 `RavenHogWarts/albus-figure-manager`## 开发指南

4. 启用插件

- 克隆此仓库

## 🚀 使用方法- 确保你的 NodeJS 版本至少为 v16 (`node --version`)

- 使用 `npm i` 或 `yarn` 安装依赖

### 快速开始- 使用 `npm run dev` 启动开发模式并进行实时编译

- 运行 `npm run build` 构建插件

1. 点击左侧边栏的图片图标 📷- 运行 `npm run build:local` 构建插件并将其复制到您的 vault 插件文件夹（需要在项目根目录创建一个 `.env` 文件并添加：`VAULT_PATH=/path/to/your/vault`）

2. 或使用命令面板 (Ctrl/Cmd + P) 搜索 "打开图片管理器"- 运行 `npm run version` 更新版本号并更新 manifest.json、version.json、package.json

- 运行 `npm run release` 构建插件并更新版本号

### 主要功能

## 支持与帮助

#### 浏览图片

- 以网格视图查看所有图片如果你遇到任何问题或有建议：

- 显示缩略图、文件名和元数据- [在 GitHub 上提交问题](https://github.com/RavenHogWarts/obsidian-plugin-starter/issues)

- 支持多种格式：PNG, JPG, JPEG, GIF, BMP, WEBP, SVG, AGX- [加入讨论](https://github.com/RavenHogWarts/obsidian-plugin-starter/discussions) 提出问题或分享想法



#### 检查引用如果你觉得这个插件对你有帮助，可以通过以下方式支持开发：

- 点击 "🔍 检查引用" 扫描所有笔记- 微信/支付宝：[二维码](https://s2.loli.net/2024/05/06/lWBj3ObszUXSV2f.png)

- 查看每张图片被引用的次数

- 点击 "🔗 仅未引用" 筛选未被使用的图片## 许可证



#### 搜索和筛选此项目基于 xxx LICENSE 许可 - 详情请参阅 [LICENSE](LICENSE) 文件。

- 在搜索框中输入关键词

- 按文件名或路径搜索## Star 历史

- 使用排序选项按时间排序

[![Star 历史图表](https://api.star-history.com/svg?repos=RavenHogWarts/obsidian-plugin-starter&type=Timeline)](https://www.star-history.com/#RavenHogWarts/obsidian-plugin-starter&Timeline)

#### 文件操作

- **打开**: 📂 使用系统默认程序打开图片# 需要修改的文件

- **重命名**: ✏️ 修改文件名

- **删除**: 🗑️ 将文件移至回收站在开发或自定义插件时，以下文件可能需要修改：



#### 预览图片- [config.yml](./.github/ISSUE_TEMPLATE/config.yml)

- 点击任意图片查看详细信息- [release.yml](./.github/workflows/release.yml)

- 查看完整尺寸预览- [manifest.json](./manifest.json)

- 查看引用该图片的所有笔记- [manifest-beta.json](./manifest-beta.json)

- 点击引用跳转到对应笔记- [package.json](./package.json)

- [CONTRIBUTING.md](./CONTRIBUTING.md)
## ⚙️ 设置

### 显示选项
- 显示文件大小
- 显示修改时间
- 自动检查引用
- 默认筛选未引用图片

### 行为选项
- 双击打开文件
- 删除前确认

### 默认文件夹
- 设置默认显示的图片文件夹

## 🏗️ 项目架构

本项目采用分层架构设计，遵循低耦合高内聚原则：

```
src/
├── types/          # 类型定义
├── models/         # 数据模型
├── services/       # 业务逻辑服务
├── components/     # UI组件
├── views/          # 视图（Modal）
├── utils/          # 工具类
└── styles/         # 样式文件
```

详细架构说明请查看 [ARCHITECTURE.md](./ARCHITECTURE.md)

## 📖 文档

- [使用指南](./USAGE.md) - 详细的使用说明和技巧
- [架构文档](./ARCHITECTURE.md) - 项目架构和设计原则
- [更新日志](./CHANGELOG.md) - 版本更新记录
- [贡献指南](./CONTRIBUTING.md) - 如何参与贡献

## 🛠️ 开发

```bash
# 克隆仓库
git clone https://github.com/RavenHogWarts/albus-figure-manager.git

# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建生产版本
npm run build

# 构建并复制到 vault
npm run build:local

# 版本发布
npm run version
```

需要 Node.js 16 或更高版本。

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与。

## 💡 使用技巧

### 清理未使用的图片
1. 打开图片管理器
2. 点击检查引用
3. 启用"仅未引用"筛选
4. 预览并删除不需要的图片

### 快速定位图片引用
1. 搜索图片名称
2. 点击预览
3. 在引用列表中点击笔记名称跳转

### AGX 文件管理
- AGX 文件和 SVG 文件会自动关联
- 操作会同步到两个文件
- 引用检查基于 SVG 文件

## 🐛 问题反馈

如果遇到问题或有建议：
- [提交 Issue](https://github.com/RavenHogWarts/albus-figure-manager/issues)
- [参与讨论](https://github.com/RavenHogWarts/albus-figure-manager/discussions)

## 💖 支持

如果这个插件对你有帮助，可以通过以下方式支持开发：
- 微信/支付宝: [二维码](https://s2.loli.net/2024/05/06/lWBj3ObszUXSV2f.png)
- 在 GitHub 上给个 ⭐

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📊 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=RavenHogWarts/albus-figure-manager&type=Timeline)](https://www.star-history.com/#RavenHogWarts/albus-figure-manager&Timeline)

## 🙏 致谢

感谢所有贡献者和用户的支持！
