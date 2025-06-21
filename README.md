# 🚀 智能物流报价机器人

> 一站式物流报价解决方案，支持Chrome插件和网页版，智能比价，汇率换算

[![Version](https://img.shields.io/badge/version-v2.0.0-blue.svg)](https://github.com/yourusername/smart-logistics-calculator)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Chrome-lightgrey.svg)](#)

## 📋 项目简介

智能物流报价机器人是一个专业的物流成本计算工具，帮助跨境电商和物流从业者快速获取准确的运费报价。支持多家物流公司的实时比价，提供最优物流方案推荐。

### 🎯 核心功能

- **🔍 精准报价**：支持万邦、云途、华翰、燕文等主流物流公司
- **🎯 智能比价**：一键比较所有可用方案，自动推荐最优选择
- **💱 汇率换算**：实时显示人民币和美金双币价格
- **📊 历史管理**：保存查询历史，支持数据导出分析
- **📱 多端支持**：Chrome插件 + 响应式网页版
- **🌍 全球覆盖**：支持32个国家和地区，特别优化澳大利亚分区

## 🚀 快速开始

### 网页版使用
1. 访问在线版本：[智能物流报价机器人](https://your-domain.com)
2. 选择目的地国家和重量
3. 点击"智能比价"获取最优方案

### Chrome插件安装
1. 下载最新版本：[智能物流报价机器人-v2.0.0.zip](releases/latest)
2. 解压到本地文件夹
3. Chrome浏览器打开 `chrome://extensions/`
4. 开启"开发者模式"
5. 点击"加载已解压的扩展程序"，选择解压后的文件夹

## 📊 支持的物流公司

| 物流公司 | 服务类型 | 覆盖国家 | 特色服务 |
|---------|---------|---------|---------|
| 万邦物流 | 服装专线 | 6个国家 | 欧美专线，时效稳定 |
| 云途物流 | 多种专线 | 26个国家 | 全球覆盖，澳洲分区 |
| 华翰物流 | 华速通标准 | 主要国家 | 包税服务 |
| 燕文物流 | 专线追踪 | 主要国家 | 经济实惠 |

## 🛠️ 技术特性

### 前端技术
- **原生JavaScript**：无框架依赖，加载速度快
- **响应式设计**：完美适配桌面和移动设备
- **PWA支持**：可添加到主屏幕，离线使用

### 数据管理
- **本地存储**：所有计算在本地完成，保护隐私
- **JSON数据库**：结构化存储物流公司数据
- **实时同步**：支持数据更新和版本管理

### 计算引擎
- **智能算法**：自动处理重量进位、最低计费等复杂规则
- **精确计算**：支持小数点后两位精度
- **汇率换算**：实时显示多币种价格

## 📁 项目结构

```
报价机器人/
├── 📄 index.html                 # 网页版主页
├── 📁 scripts/                   # 核心脚本
│   ├── enhanced-database.js      # 数据库引擎
│   ├── enhanced-calculator.js    # 计算器核心
│   ├── enhanced-popup.js         # 弹窗控制器
│   └── web-app.js               # 网页版应用
├── 📁 chrome-store-package/      # Chrome插件包
│   ├── manifest.json            # 插件配置
│   ├── popup.html               # 插件界面
│   ├── 📁 scripts/              # 插件脚本
│   └── 📁 styles/               # 插件样式
├── 📁 assets/                   # 网页版资源
│   ├── 📁 css/                  # 样式文件
│   └── 📁 images/               # 图片资源
└── 📁 api/                      # 数据文件
    └── database.json            # JSON数据库
```

## 🎨 界面预览

### Chrome插件界面
- 紧凑的弹窗设计
- 一键切换单查询和比价模式
- 实时显示汇率和价格对比

### 网页版界面
- 现代化Material Design风格
- 响应式布局，移动端友好
- 数据可视化图表展示

## 🔧 本地开发

### 环境要求
- 现代浏览器（Chrome 88+, Firefox 85+, Safari 14+）
- 本地HTTP服务器（推荐Python或Node.js）

### 开发步骤
```bash
# 1. 克隆项目
git clone https://github.com/yourusername/smart-logistics-calculator.git
cd smart-logistics-calculator

# 2. 启动本地服务器
python3 -m http.server 8000
# 或者
npx http-server -p 8000

# 3. 访问应用
open http://localhost:8000
```

### 修改数据
编辑 `scripts/enhanced-database.js` 文件，添加或修改物流公司数据：

```javascript
// 添加新的物流公司
const newCompanyData = {
    "新物流公司": {
        "服装专线": {
            "美国": {
                // 价格数据
            }
        }
    }
};
```

## 📈 使用统计

- **查询次数**：支持历史记录统计
- **最受欢迎路线**：美国、英国、德国
- **平均节省成本**：通过智能比价平均节省15-30%运费

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 贡献方式
1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

### 开发规范
- 使用ES6+语法
- 遵循现有代码风格
- 添加必要的注释
- 确保向后兼容

## 📄 更新日志

### v2.0.0 (2025-06-21)
- ✨ 新增智能比价功能
- 💱 添加汇率换算显示
- 📊 完善历史记录管理
- 🐛 修复澳大利亚分区计算问题
- 🎨 优化界面设计和用户体验

### v1.0.0 (2025-06-20)
- 🎉 初始版本发布
- 📦 支持基本报价计算
- 🌍 覆盖主要物流公司和国家

## 📞 技术支持

- **问题反馈**：[GitHub Issues](https://github.com/yourusername/smart-logistics-calculator/issues)
- **功能建议**：[GitHub Discussions](https://github.com/yourusername/smart-logistics-calculator/discussions)
- **使用教程**：查看项目Wiki

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢各大物流公司提供的价格数据
- 感谢开源社区的技术支持
- 感谢所有用户的反馈和建议

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给个Star支持一下！**

[🌐 在线体验](https://your-domain.com) • [📱 下载插件](releases/latest) • [📖 使用文档](wiki)

</div> 