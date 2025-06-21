// 数据库管理模块
class Database {
    constructor() {
        this.initializeDefaultData();
    }

    // 初始化默认数据
    async initializeDefaultData() {
        const existingData = await this.getData('logistics_channels');
        if (!existingData) {
            await this.initDefaults();
        }
    }

    // 设置默认数据
    async initDefaults() {
        // 物流渠道数据
        const logisticsChannels = [
            {
                id: 'air_express',
                name: '航空快递',
                cost_per_kg: 25.00,
                min_cost: 80.00,
                delivery_days: '3-7'
            },
            {
                id: 'sea_freight',
                name: '海运',
                cost_per_kg: 8.50,
                min_cost: 200.00,
                delivery_days: '15-30'
            },
            {
                id: 'land_transport',
                name: '陆运',
                cost_per_kg: 12.00,
                min_cost: 150.00,
                delivery_days: '5-15'
            },
            {
                id: 'dhl_express',
                name: 'DHL快递',
                cost_per_kg: 35.00,
                min_cost: 120.00,
                delivery_days: '2-5'
            }
        ];

        // 目的地和关税数据
        const destinations = [
            {
                id: 'usa',
                name: '美国',
                tariff_rate: 0.08,
                currency: 'USD',
                exchange_rate: 7.2
            },
            {
                id: 'europe',
                name: '欧盟',
                tariff_rate: 0.12,
                currency: 'EUR',
                exchange_rate: 7.8
            },
            {
                id: 'japan',
                name: '日本',
                tariff_rate: 0.05,
                currency: 'JPY',
                exchange_rate: 0.048
            },
            {
                id: 'korea',
                name: '韩国',
                tariff_rate: 0.06,
                currency: 'KRW',
                exchange_rate: 0.0054
            },
            {
                id: 'singapore',
                name: '新加坡',
                tariff_rate: 0.03,
                currency: 'SGD',
                exchange_rate: 5.3
            }
        ];

        // 利润设置
        const profitSettings = {
            profit_rate: 0.25, // 25% 利润率
            markup_rate: 0.15, // 15% 加价率
            min_profit: 50.00  // 最小利润额
        };

        // 产品分类和特殊费率
        const productCategories = [
            {
                id: 'electronics',
                name: '电子产品',
                additional_tariff: 0.02,
                special_handling: 15.00
            },
            {
                id: 'textiles',
                name: '纺织品',
                additional_tariff: 0.01,
                special_handling: 0.00
            },
            {
                id: 'food',
                name: '食品',
                additional_tariff: 0.05,
                special_handling: 25.00
            },
            {
                id: 'machinery',
                name: '机械设备',
                additional_tariff: 0.03,
                special_handling: 50.00
            }
        ];

        // 保存到存储
        await this.setData('logistics_channels', logisticsChannels);
        await this.setData('destinations', destinations);
        await this.setData('profit_settings', profitSettings);
        await this.setData('product_categories', productCategories);
    }

    // 获取数据
    async getData(key) {
        return new Promise((resolve) => {
            chrome.storage.local.get([key], (result) => {
                resolve(result[key] || null);
            });
        });
    }

    // 设置数据
    async setData(key, value) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: value }, resolve);
        });
    }

    // 获取物流渠道
    async getLogisticsChannels() {
        return await this.getData('logistics_channels');
    }

    // 获取目的地
    async getDestinations() {
        return await this.getData('destinations');
    }

    // 获取利润设置
    async getProfitSettings() {
        return await this.getData('profit_settings');
    }

    // 获取产品分类
    async getProductCategories() {
        return await this.getData('product_categories');
    }

    // 更新物流渠道
    async updateLogisticsChannel(channelId, updatedData) {
        const channels = await this.getLogisticsChannels();
        const index = channels.findIndex(c => c.id === channelId);
        if (index !== -1) {
            channels[index] = { ...channels[index], ...updatedData };
            await this.setData('logistics_channels', channels);
        }
    }

    // 更新目的地信息
    async updateDestination(destId, updatedData) {
        const destinations = await this.getDestinations();
        const index = destinations.findIndex(d => d.id === destId);
        if (index !== -1) {
            destinations[index] = { ...destinations[index], ...updatedData };
            await this.setData('destinations', destinations);
        }
    }

    // 更新利润设置
    async updateProfitSettings(newSettings) {
        const currentSettings = await this.getProfitSettings();
        const updatedSettings = { ...currentSettings, ...newSettings };
        await this.setData('profit_settings', updatedSettings);
    }

    // 添加新的物流渠道
    async addLogisticsChannel(channelData) {
        const channels = await this.getLogisticsChannels();
        channels.push(channelData);
        await this.setData('logistics_channels', channels);
    }

    // 删除物流渠道
    async deleteLogisticsChannel(channelId) {
        const channels = await this.getLogisticsChannels();
        const filtered = channels.filter(c => c.id !== channelId);
        await this.setData('logistics_channels', filtered);
    }

    // 根据产品名称智能匹配产品分类
    async getProductCategory(productName) {
        const categories = await this.getProductCategories();
        const keywords = {
            'electronics': ['手机', '电脑', '电子', '数码', '芯片', '显示器'],
            'textiles': ['衣服', '布料', '纺织', '服装', '面料', '棉花'],
            'food': ['食品', '食物', '茶叶', '咖啡', '零食', '调料'],
            'machinery': ['机器', '设备', '工具', '机械', '仪器', '装置']
        };

        for (const [categoryId, keywordList] of Object.entries(keywords)) {
            if (keywordList.some(keyword => productName.includes(keyword))) {
                return categories.find(c => c.id === categoryId);
            }
        }

        return null; // 如果没有匹配到分类，返回null
    }
}

// 导出数据库实例
window.database = new Database(); 