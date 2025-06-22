# 🚀 智能物流报价机器人 - v3.1.0

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://wangjianbin11.github.io/smart-logistics-calculator/)
[![Version](https://img.shields.io/badge/Version-v3.1.0-blue)](https://github.com/wangjianbin11/smart-logistics-calculator/releases)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

一个功能强大的智能物流报价计算系统，支持多家物流公司、体积重量计算、智能比价和可选服务费等高级功能。

## 🌟 在线演示

**立即体验：** [https://wangjianbin11.github.io/smart-logistics-calculator/](https://wangjianbin11.github.io/smart-logistics-calculator/)

## ✨ 核心功能

### 💼 服务费功能 (v3.1.0 新增)
- **固定服务费**: 1.2美金可选服务费
- **智能推荐**: 默认建议选择，提升服务价值
- **透明计费**: 详细费用明细，中英文双币种显示
- **灵活选择**: 用户可自由决定是否包含

### 📦 体积重量计算 (v3.0.0)
- **精确计算**: 长×宽×高÷除数的体积重量
- **智能除数**: 云途大货18000专线使用18000，其他默认8000
- **重量对比**: 自动取实际重量和体积重量的较大值
- **实时显示**: 即时显示计费重量和计费类型

### 🔍 智能比价系统
- **全渠道对比**: 一键比较所有物流公司价格
- **最优推荐**: 自动标识最佳性价比方案
- **详细信息**: 时效、重量限制、尺寸限制完整展示
- **价格排序**: 按价格从低到高智能排序

### 🌍 多物流公司支持
- **云途物流**: 7个专线渠道，覆盖70+国家
- **万邦物流**: 专线挂号服务，带电普货全覆盖
- **华翰物流**: 华速通标准服务
- **燕文物流**: 燕文专线追踪服务

## 🎯 使用场景

- **跨境电商**: 快速获取国际物流报价
- **物流代理**: 多渠道价格对比选择
- **企业采购**: 批量货物运输成本核算
- **个人用户**: 包裹邮寄费用预估

## 🛠️ 技术特性

### 前端技术
- **原生JavaScript**: 无依赖，加载速度快
- **响应式设计**: 完美适配PC和移动设备
- **现代UI**: 渐变背景，圆角卡片，优雅交互
- **实时计算**: 输入即算，所见即所得

### 数据管理
- **完整数据库**: 3000+行真实物流数据
- **智能缓存**: 快速响应，流畅体验
- **准确计费**: 基于真实渠道价格表
- **动态汇率**: 支持美元人民币实时转换

### 功能模块
- **单独计算**: 指定物流公司精确报价
- **智能比价**: 全渠道自动对比分析
- **体积重量**: 三维尺寸自动计算
- **服务费用**: 增值服务透明计费

## 📱 快速开始

### 在线使用
直接访问：[https://wangjianbin11.github.io/smart-logistics-calculator/](https://wangjianbin11.github.io/smart-logistics-calculator/)

### 本地部署
```bash
# 克隆项目
git clone https://github.com/wangjianbin11/smart-logistics-calculator.git

# 进入目录
cd smart-logistics-calculator

# 启动本地服务器
python3 -m http.server 8000

# 访问应用
open http://localhost:8000
```

## 🧪 测试页面

项目包含多个专业测试页面：

- **主功能测试**: [index.html](https://wangjianbin11.github.io/smart-logistics-calculator/index.html)
- **体积重量测试**: [test-volumetric-weight.html](https://wangjianbin11.github.io/smart-logistics-calculator/test-volumetric-weight.html)
- **服务费测试**: [test-service-fee.html](https://wangjianbin11.github.io/smart-logistics-calculator/test-service-fee.html)
- **智能比价测试**: [test-comparison-feature.html](https://wangjianbin11.github.io/smart-logistics-calculator/test-comparison-feature.html)

## 📊 数据覆盖

### 支持国家/地区
- **美洲**: 美国、加拿大、墨西哥、巴西等
- **欧洲**: 英国、德国、法国、意大利、西班牙等30+国家
- **亚洲**: 日本、韩国、新加坡、泰国、印度等
- **大洋洲**: 澳大利亚4区、新西兰
- **其他**: 中东、非洲部分国家

### 价格范围
- **运费**: 24-310元/公斤
- **操作费**: 8-210元固定费用
- **服务费**: 1.2美金(约8.64元人民币)
- **总价**: 根据重量和目的地动态计算

## 🔄 版本历史

### v3.1.0 (2025-06-22) - 服务费功能
- ✨ 新增1.2美金可选服务费
- 🎨 优化费用明细显示
- 📊 完善测试验证工具
- 💼 提升商业价值体现

### v3.0.0 (2025-06-21) - 体积重量功能
- 📦 新增体积重量计算
- 🔧 云途物流7个渠道数据完整集成
- 🧮 智能除数自动设置
- 📏 三维尺寸输入界面

### v2.1.0 - 智能比价功能
- 🔍 全渠道智能比价
- 🏆 最优方案自动推荐
- 📈 价格差异分析
- 💯 完整测试覆盖

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- **项目地址**: [GitHub Repository](https://github.com/wangjianbin11/smart-logistics-calculator)
- **在线演示**: [Live Demo](https://wangjianbin11.github.io/smart-logistics-calculator/)
- **问题反馈**: [Issues](https://github.com/wangjianbin11/smart-logistics-calculator/issues)

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！

*智能物流报价，让跨境贸易更简单！* 