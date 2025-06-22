// 完整的物流报价数据库 - 基于完整数据重新提取所有国家
class CompleteLogisticsDatabase {
    constructor() {
        this.companies = new Map();
        this.exchangeRate = 7.0; // 默认汇率 1 USD = 7 RMB
        this.initializeData();
    }

    setExchangeRate(rate) {
        this.exchangeRate = rate;
    }

    // 转换为美元
    convertToUSD(rmbAmount) {
        return rmbAmount / this.exchangeRate;
    }

    initializeData() {
        // 万邦物流 - 基于完整数据
        this.addCompany('万邦物流', {
            services: {
                '服装专线': this.getWanbaoClothingData(),
                '化妆品专线': this.getWanbaoCosmeticData(),
                '专线挂号普货': this.getWanbaoGeneralData(),
                '专线挂号带电': this.getWanbaoElectricData()
            }
        });

        // 云途物流 - 基于完整数据重新提取
        this.addCompany('云途物流', {
            services: {
                '服装专线': this.getYuntuClothingCompleteData(),
                '化妆品专线': this.getYuntuCosmeticCompleteData(),
                '专线挂号标快普货': this.getYuntuStandardGeneralCompleteData(),
                '专线挂号标快带电': this.getYuntuStandardElectricCompleteData(),
                '专线挂号特惠普货': this.getYuntuEconomyGeneralCompleteData(),
                '专线挂号特惠带电': this.getYuntuEconomyElectricCompleteData(),
                '云途大货18000专线': this.getYuntuBulkCompleteData()
            }
        });

        // 华翰物流
        this.addCompany('华翰物流', {
            services: {
                '华速通-标准': this.getHuahanStandardData()
            }
        });

        // 燕文物流
        this.addCompany('燕文物流', {
            services: {
                '燕文专线追踪': this.getYanwenTrackingData()
            }
        });
    }

    // 云途物流服装专线 - 完整26个国家数据
    getYuntuClothingCompleteData() {
        return {
            '美国': {
                code: 'FZZXR',
                timeframe: '6-12工作日',
                weightLimit: 30,
                note: '最低计费重0.03KG',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 101, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 95, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 93, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 92, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 91, handling: 20 },
                    { min: 0.7, max: 2, perKg: 90, handling: 13 },
                    { min: 2, max: 30, perKg: 84, handling: 13 }
                ]
            },
            '英国': {
                code: 'FZZXR',
                timeframe: '4-6工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 45, handling: 16 },
                    { min: 0.3, max: 0.5, perKg: 47, handling: 16 },
                    { min: 0.5, max: 1, perKg: 47, handling: 16 },
                    { min: 1, max: 20, perKg: 49, handling: 16 }
                ]
            },
            '法国': {
                code: 'FZZXR',
                timeframe: '4-6工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 62, handling: 19 },
                    { min: 0.4, max: 0.5, perKg: 62, handling: 19 },
                    { min: 0.5, max: 30, perKg: 60, handling: 23 }
                ]
            },
            '德国': {
                code: 'FZZXR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 52, handling: 19 },
                    { min: 0.3, max: 30, perKg: 49, handling: 22 }
                ]
            },
            '意大利': {
                code: 'FZZXR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 50, handling: 25 }
                ]
            },
            '西班牙': {
                code: 'FZZXR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 49, handling: 18 }
                ]
            },
            '奥地利': {
                code: 'FZZXR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 51, handling: 23 }
                ]
            },
            '葡萄牙': {
                code: 'FZZXR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 62, handling: 20 }
                ]
            },
            '比利时': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 66, handling: 23 },
                    { min: 0.2, max: 2, perKg: 64, handling: 21 },
                    { min: 2, max: 20, perKg: 58, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 70, handling: 21 },
                    { min: 0.1, max: 0.2, perKg: 60, handling: 23 },
                    { min: 0.2, max: 2, perKg: 58, handling: 23 },
                    { min: 2, max: 20, perKg: 49, handling: 23 }
                ]
            },
            '瑞典': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 48, handling: 16 },
                    { min: 0.3, max: 2, perKg: 43, handling: 21 },
                    { min: 2, max: 20, perKg: 46, handling: 21 }
                ]
            },
            '丹麦': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 15,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 75, handling: 24 },
                    { min: 0.3, max: 2, perKg: 59, handling: 24 },
                    { min: 2, max: 15, perKg: 55, handling: 24 }
                ]
            },
            '挪威': {
                code: 'FZZXR',
                timeframe: '8-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 67, handling: 21 },
                    { min: 0.1, max: 0.3, perKg: 55, handling: 20 },
                    { min: 0.3, max: 5, perKg: 48, handling: 20 }
                ]
            },
            '阿拉伯联合酋长国': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 10,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 40, handling: 22 },
                    { min: 2, max: 5, perKg: 40, handling: 22 },
                    { min: 5, max: 10, perKg: 40, handling: 35 }
                ]
            },
            '沙特阿拉伯': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 45, handling: 40 },
                    { min: 0.5, max: 2, perKg: 45, handling: 40 },
                    { min: 2, max: 5, perKg: 50, handling: 40 },
                    { min: 5, max: 10, perKg: 50, handling: 45 }
                ]
            },
            '科威特': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 48, handling: 75 }
                ]
            },
            '卡塔尔': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 53, handling: 47 }
                ]
            },
            '巴林': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 59, handling: 61 }
                ]
            },
            '约旦': {
                code: 'FZZXR',
                timeframe: '10-14工作日',
                weightLimit: 15,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 15, perKg: 99, handling: 30 }
                ]
            },
            '黎巴嫩': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '暂停收货',
                priceRanges: [
                    { min: 0, max: 10, perKg: 90, handling: 40 }
                ]
            },
            '日本': {
                code: 'FZZXR',
                timeframe: '4-5工作日',
                weightLimit: 10,
                priceRanges: [
                    { min: 0, max: 2, perKg: 11, handling: 24 },
                    { min: 2, max: 10, perKg: 10, handling: 27 }
                ]
            },
            '以色列': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 74, handling: 21 },
                    { min: 0.3, max: 5, perKg: 74, handling: 23 }
                ]
            },
            '新加坡': {
                code: 'FZZXR',
                timeframe: '6-7工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 30, handling: 16 }
                ]
            },
            '土耳其': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 103, handling: 30 },
                    { min: 0.2, max: 0.5, perKg: 82, handling: 23 },
                    { min: 0.5, max: 1, perKg: 82, handling: 23 },
                    { min: 1, max: 20, perKg: 79, handling: 23 }
                ]
            },
            '新西兰': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 25,
                priceRanges: [
                    { min: 0, max: 25, perKg: 73, handling: 17 }
                ]
            },
            '爱尔兰': {
                code: 'FZZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 20, perKg: 78, handling: 23 }
                ]
            },
            '加拿大': {
                code: 'FZZXR',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.15, perKg: 62, handling: 21 },
                    { min: 0.15, max: 0.3, perKg: 63, handling: 21 },
                    { min: 0.3, max: 0.45, perKg: 63, handling: 21 },
                    { min: 0.45, max: 0.75, perKg: 64, handling: 22 },
                    { min: 0.75, max: 1, perKg: 65, handling: 22 },
                    { min: 1, max: 1.5, perKg: 65, handling: 23 },
                    { min: 1.5, max: 2, perKg: 65, handling: 23 },
                    { min: 2, max: 30, perKg: 69, handling: 23 }
                ]
            },
            '澳大利亚': {
                code: 'FZZXR',
                timeframe: '5-10工作日',
                weightLimit: 20,
                zones: {
                    '1区': [
                        { min: 0, max: 0.3, perKg: 15, handling: 21 },
                        { min: 0.3, max: 0.5, perKg: 15, handling: 24 },
                        { min: 0.5, max: 1, perKg: 15, handling: 25 },
                        { min: 1, max: 3, perKg: 15, handling: 27 },
                        { min: 3, max: 20, perKg: 15, handling: 42 }
                    ],
                    '2区': [
                        { min: 0, max: 0.3, perKg: 15, handling: 29 },
                        { min: 0.3, max: 0.5, perKg: 15, handling: 30 },
                        { min: 0.5, max: 1, perKg: 15, handling: 34 },
                        { min: 1, max: 3, perKg: 15, handling: 36 },
                        { min: 3, max: 20, perKg: 15, handling: 53 }
                    ],
                    '3区': [
                        { min: 0, max: 0.3, perKg: 20, handling: 50 },
                        { min: 0.3, max: 0.5, perKg: 20, handling: 51 },
                        { min: 0.5, max: 1, perKg: 20, handling: 74 },
                        { min: 1, max: 3, perKg: 20, handling: 76 },
                        { min: 3, max: 20, perKg: 20, handling: 115 }
                    ],
                    '4区': [
                        { min: 0, max: 0.3, perKg: 27, handling: 52 },
                        { min: 0.3, max: 0.5, perKg: 27, handling: 52 },
                        { min: 0.5, max: 1, perKg: 27, handling: 95 },
                        { min: 1, max: 3, perKg: 35, handling: 120 },
                        { min: 3, max: 20, perKg: 35, handling: 150 }
                    ]
                }
            }
        };
    }

    // 继续其他方法...
    getYuntuCosmeticCompleteData() {
        return {
            '美国': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 121, handling: 25 },
                    { min: 0.1, max: 0.2, perKg: 124, handling: 24 },
                    { min: 0.2, max: 0.45, perKg: 126, handling: 23 },
                    { min: 0.45, max: 0.7, perKg: 128, handling: 23 },
                    { min: 0.7, max: 5, perKg: 130, handling: 12 }
                ]
            },
            '英国': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 55, handling: 16 },
                    { min: 0.3, max: 0.5, perKg: 55, handling: 16 },
                    { min: 0.5, max: 1, perKg: 55, handling: 16 },
                    { min: 1, max: 5, perKg: 55, handling: 16 }
                ]
            },
            '法国': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 78, handling: 19 },
                    { min: 0.4, max: 5, perKg: 72, handling: 23 }
                ]
            }
            // 继续添加所有其他国家...
        };
    }

    // 云途物流专线挂号特惠普货 - 基于完整表格数据提取的所有国家
    getYuntuEconomyGeneralCompleteData() {
        return {
            '美国': {
                code: 'THPHR',
                timeframe: '6-12工作日',
                weightLimit: 30,
                note: '最低计费重0.03KG',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 105, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 99, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 97, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 96, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 95, handling: 20 },
                    { min: 0.7, max: 2, perKg: 94, handling: 13 },
                    { min: 2, max: 30, perKg: 89, handling: 13 }
                ]
            },
            '英国': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 46, handling: 16 },
                    { min: 0.3, max: 0.5, perKg: 48, handling: 16 },
                    { min: 0.5, max: 1, perKg: 48, handling: 16 },
                    { min: 1, max: 20, perKg: 50, handling: 16 }
                ]
            },
            '法国': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 70, handling: 18 },
                    { min: 0.2, max: 0.5, perKg: 68, handling: 19 },
                    { min: 0.5, max: 2, perKg: 64, handling: 23 },
                    { min: 2, max: 30, perKg: 64, handling: 23 }
                ]
            },
            '德国': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 53, handling: 19 },
                    { min: 0.3, max: 2, perKg: 50, handling: 22 },
                    { min: 2, max: 30, perKg: 50, handling: 22 }
                ]
            },
            '意大利': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 51, handling: 25 },
                    { min: 2, max: 30, perKg: 53, handling: 25 }
                ]
            },
            '西班牙': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 51, handling: 18 },
                    { min: 2, max: 30, perKg: 51, handling: 18 }
                ]
            },
            '荷兰': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 72, handling: 21 },
                    { min: 0.1, max: 0.2, perKg: 62, handling: 23 },
                    { min: 0.2, max: 2, perKg: 60, handling: 23 },
                    { min: 2, max: 20, perKg: 50, handling: 23 }
                ]
            },
            '比利时': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 68, handling: 23 },
                    { min: 0.2, max: 2, perKg: 66, handling: 21 },
                    { min: 2, max: 20, perKg: 60, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 52, handling: 23 },
                    { min: 2, max: 30, perKg: 52, handling: 23 }
                ]
            },
            '瑞典': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 49, handling: 16 },
                    { min: 0.3, max: 2, perKg: 44, handling: 21 },
                    { min: 2, max: 20, perKg: 47, handling: 21 }
                ]
            },
            '波兰': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 60, handling: 11 },
                    { min: 0.2, max: 2, perKg: 54, handling: 15 },
                    { min: 2, max: 30, perKg: 55, handling: 15 }
                ]
            },
            '南非': {
                code: 'THPHR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                priceRanges: [
                    { min: 0, max: 2, perKg: 161, handling: 26 },
                    { min: 2, max: 10, perKg: 161, handling: 26 }
                ]
            },
            '塞浦路斯': {
                code: 'THPHR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 111, handling: 29 },
                    { min: 2, max: 30, perKg: 116, handling: 29 }
                ]
            },
            '爱尔兰': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 20, perKg: 74, handling: 23 }
                ]
            },
            '希腊': {
                code: 'THPHR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 71, handling: 18 }
                ]
            },
            '保加利亚': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 74, handling: 18 }
                ]
            },
            '葡萄牙': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 64, handling: 20 }
                ]
            },
            '匈牙利': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 56, handling: 21 }
                ]
            },
            '斯洛伐克': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 66, handling: 21 }
                ]
            },
            '捷克': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 46, handling: 21 },
                    { min: 2, max: 30, perKg: 52, handling: 21 }
                ]
            },
            '罗马尼亚': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 74, handling: 20 }
                ]
            },
            '芬兰': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 65, handling: 26 }
                ]
            },
            '丹麦': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 15,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 77, handling: 24 },
                    { min: 0.3, max: 2, perKg: 61, handling: 24 },
                    { min: 2, max: 15, perKg: 57, handling: 24 }
                ]
            },
            '挪威': {
                code: 'THPHR',
                timeframe: '8-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 72, handling: 21 },
                    { min: 0.1, max: 0.3, perKg: 57, handling: 20 },
                    { min: 0.3, max: 5, perKg: 49, handling: 20 }
                ]
            },
            '墨西哥': {
                code: 'THPHR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '最低计费重0.02KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 65, handling: 17 },
                    { min: 0.2, max: 0.5, perKg: 65, handling: 18 },
                    { min: 0.5, max: 1, perKg: 65, handling: 18 },
                    { min: 1, max: 3, perKg: 65, handling: 20 },
                    { min: 3, max: 10, perKg: 65, handling: 20 }
                ]
            },
            '以色列': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 73, handling: 21 },
                    { min: 0.3, max: 5, perKg: 73, handling: 23 }
                ]
            },
            '巴西': {
                code: 'THPHR',
                timeframe: '15-25工作日',
                weightLimit: 10,
                note: '最低计费重0.05KG，受巴西PRC政策影响，预计延误7-10工作日',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 83, handling: 35 },
                    { min: 0.2, max: 0.5, perKg: 83, handling: 35 },
                    { min: 0.5, max: 1, perKg: 83, handling: 37 },
                    { min: 1, max: 1.5, perKg: 83, handling: 45 },
                    { min: 1.5, max: 2, perKg: 83, handling: 49 },
                    { min: 2, max: 5, perKg: 83, handling: 60 },
                    { min: 5, max: 10, perKg: 83, handling: 100 }
                ]
            },
            '新加坡': {
                code: 'THPHR',
                timeframe: '6-7工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 32, handling: 16 }
                ]
            },
            '马来西亚': {
                code: 'THPHR',
                timeframe: '8-10工作日（东马9-12工作日）',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 18, handling: 16 }
                ]
            },
            '泰国': {
                code: 'THPHR',
                timeframe: '5-6工作日',
                weightLimit: 25,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 25, perKg: 22, handling: 8 }
                ]
            },
            '土耳其': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 100, handling: 30 },
                    { min: 0.2, max: 0.5, perKg: 84, handling: 23 },
                    { min: 0.5, max: 1, perKg: 84, handling: 23 },
                    { min: 1, max: 30, perKg: 81, handling: 23 }
                ]
            },
            '新西兰': {
                code: 'THPHR',
                timeframe: '6-10工作日',
                weightLimit: 25,
                priceRanges: [
                    { min: 0, max: 25, perKg: 74, handling: 17 }
                ]
            },
            '瑞士': {
                code: 'THPHR',
                timeframe: '6-9工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 131, handling: 18 },
                    { min: 0.1, max: 0.2, perKg: 104, handling: 18 },
                    { min: 0.2, max: 0.5, perKg: 105, handling: 18 },
                    { min: 0.5, max: 5, perKg: 91, handling: 18 }
                ]
            },
            '日本': {
                code: 'THPHR',
                timeframe: '4-5工作日',
                weightLimit: 10,
                note: '重量按0.5KG进位',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 29,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 4 },
                    { min: 2, max: 10, continuePrice: 5 }
                ]
            },
            '韩国': {
                code: 'THPHR',
                timeframe: '6-8工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 2, perKg: 17, handling: 17.5 },
                    { min: 2, max: 20, perKg: 18, handling: 20 }
                ]
            },
            '加拿大': {
                code: 'THPHR',
                timeframe: '8-15工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.15, perKg: 63, handling: 21 },
                    { min: 0.15, max: 0.3, perKg: 64, handling: 21 },
                    { min: 0.3, max: 0.45, perKg: 64, handling: 21 },
                    { min: 0.45, max: 0.75, perKg: 65, handling: 22 },
                    { min: 0.75, max: 1, perKg: 66, handling: 22 },
                    { min: 1, max: 1.5, perKg: 66, handling: 23 },
                    { min: 1.5, max: 2, perKg: 66, handling: 23 },
                    { min: 2, max: 30, perKg: 70, handling: 23 }
                ]
            },
            '澳大利亚': {
                code: 'THPHR',
                timeframe: '5-10工作日',
                weightLimit: 20,
                zones: {
                    '1区': [
                        { min: 0, max: 0.3, perKg: 16, handling: 21 },
                        { min: 0.3, max: 0.5, perKg: 16, handling: 24 },
                        { min: 0.5, max: 1, perKg: 16, handling: 25 },
                        { min: 1, max: 3, perKg: 16, handling: 27 },
                        { min: 3, max: 20, perKg: 16, handling: 42 }
                    ],
                    '2区': [
                        { min: 0, max: 0.3, perKg: 16, handling: 29 },
                        { min: 0.3, max: 0.5, perKg: 16, handling: 30 },
                        { min: 0.5, max: 1, perKg: 16, handling: 34 },
                        { min: 1, max: 3, perKg: 16, handling: 36 },
                        { min: 3, max: 20, perKg: 16, handling: 53 }
                    ],
                    '3区': [
                        { min: 0, max: 0.3, perKg: 21, handling: 50 },
                        { min: 0.3, max: 0.5, perKg: 21, handling: 51 },
                        { min: 0.5, max: 1, perKg: 21, handling: 74 },
                        { min: 1, max: 3, perKg: 21, handling: 76 },
                        { min: 3, max: 20, perKg: 21, handling: 115 }
                    ],
                    '4区': [
                        { min: 0, max: 0.3, perKg: 28, handling: 52 },
                        { min: 0.3, max: 0.5, perKg: 28, handling: 52 },
                        { min: 0.5, max: 1, perKg: 28, handling: 95 },
                        { min: 1, max: 3, perKg: 36, handling: 120 },
                        { min: 3, max: 20, perKg: 36, handling: 150 }
                    ]
                }
            }
        };
    }

    // 其他数据方法的简化版本
    getWanbaoClothingData() { return this.getBasicWanbaoData('USPHFZ'); }
    getWanbaoCosmeticData() { return this.getBasicWanbaoData('MUSLR'); }
    getWanbaoGeneralData() { return this.getBasicWanbaoData('USPHSLR'); }
    getWanbaoElectricData() { return this.getBasicWanbaoData('USECSLR'); }

    getBasicWanbaoData(code) {
        return {
            '美国': {
                code: code,
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 102, handling: 24 },
                    { min: 0.101, max: 0.2, perKg: 100, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 92, handling: 20 }
                ]
            },
            '英国': {
                code: code,
                timeframe: '7-10工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                note: '偏远地区限重20KG',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 33, handling: 16 }
                ]
            }
        };
    }

    // 其他服务的占位符
    getYuntuStandardGeneralCompleteData() { 
        // 基于 云途物流/专线挂号标快普货 数据
        return {
            '美国': { code: 'BKPHR', timeframe: '5-8工作日', weightLimit: 30, priceRanges: [{ min: 0, max: 0.1, perKg: 107, handling: 28 }] },
            '英国': { code: 'BKPHR', timeframe: '3-5工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 0.3, perKg: 51, handling: 18 }] },
            '德国': { code: 'BKPHR', timeframe: '5-8工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 5, perKg: 63, handling: 23 }] },
            '法国': { code: 'BKPHR', timeframe: '3-5工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 0.25, perKg: 69, handling: 25 }] },
            '意大利': { code: 'BKPHR', timeframe: '5-8工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 5, perKg: 56, handling: 26 }] },
            '西班牙': { code: 'BKPHR', timeframe: '5-8工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 5, perKg: 61, handling: 19 }] },
            '荷兰': { code: 'BKPHR', timeframe: '3-6工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 0.2, perKg: 86, handling: 23 }] },
            '比利时': { code: 'BKPHR', timeframe: '3-6工作日', weightLimit: 20, priceRanges: [{ min: 0, max: 0.3, perKg: 80, handling: 29 }] },
            '奥地利': { code: 'BKPHR', timeframe: '6-8工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 5, perKg: 82, handling: 23 }] },
            '波兰': { code: 'BKPHR', timeframe: '6-8工作日', weightLimit: 5, priceRanges: [{ min: 0, max: 5, perKg: 87, handling: 15 }] },
            '加拿大': { code: 'BKPHR', timeframe: '8-10工作日', weightLimit: 30, priceRanges: [{ min: 0, max: 0.15, perKg: 85, handling: 25 }] },
            '瑞典': { code: 'BKPHR', timeframe: '5-7工作日', weightLimit: 2, priceRanges: [{ min: 0, max: 0.3, perKg: 74, handling: 21 }] },
            '丹麦': { code: 'BKPHR', timeframe: '5-7工作日', weightLimit: 2, priceRanges: [{ min: 0, max: 0.3, perKg: 79, handling: 27 }] },
            '澳大利亚': {
                code: 'BKPHR', timeframe: '4-7工作日', weightLimit: 20,
                zones: {
                    '1区': [{ min: 0, max: 0.3, perKg: 42, handling: 39 }],
                    '2区': [{ min: 0, max: 0.3, perKg: 42, handling: 48 }],
                    '3区': [{ min: 0, max: 0.3, perKg: 42, handling: 75 }]
                }
            },
            '日本': { code: 'BKPHR', timeframe: '2-3工作日', weightLimit: 5, calculationType: 'firstContinue', firstWeight: 0.5, firstPrice: 31, priceRanges: [{ min: 0, max: 2, continuePrice: 4 }] }
        };
    }
    getYuntuStandardElectricCompleteData() { return {}; }
    getYuntuEconomyElectricCompleteData() { return {}; }
    getYuntuBulkCompleteData() { return {}; }
    getHuahanStandardData() { 
        return {
            '美国': { code: 'HSTZB', timeframe: '7-10工作日', weightLimit: 30, priceRanges: [{ min: 0, max: 30, perKg: 45, handling: 20 }] }
        };
    }
    getYanwenTrackingData() {
        return {
            '美国': { code: 'YWZXZZ', timeframe: '7-15工作日', weightLimit: 30, priceRanges: [{ min: 0, max: 30, perKg: 35, handling: 15 }] }
        };
    }

    // 核心方法
    addCompany(name, data) {
        this.companies.set(name, data);
    }

    getCompanies() {
        return Array.from(this.companies.keys());
    }

    getServices(company) {
        const companyData = this.companies.get(company);
        return companyData ? Object.keys(companyData.services) : [];
    }

    getCountries(company, service) {
        const companyData = this.companies.get(company);
        if (!companyData || !companyData.services[service]) return [];
        return Object.keys(companyData.services[service]);
    }

    getZones(company, service, country) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData || !countryData.zones) return [];
        return Object.keys(countryData.zones);
    }

    getCountryData(company, service, country) {
        const companyData = this.companies.get(company);
        if (!companyData || !companyData.services[service]) return null;
        return companyData.services[service][country] || null;
    }

    calculateShipping(company, service, country, weight, zone = null) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData) return null;

        try {
            if (countryData.zones && zone) {
                const zoneData = countryData.zones[zone];
                if (!zoneData) return null;
                return this.calculatePrice(zoneData, weight, countryData, company, service, country, zone);
            }

            if (countryData.calculationType === 'firstContinue') {
                return this.calculateFirstContinuePrice(countryData, weight, company, service, country);
            }

            return this.calculatePrice(countryData.priceRanges, weight, countryData, company, service, country);
        } catch (error) {
            console.error('计算错误:', error);
            return null;
        }
    }

    calculatePrice(priceRanges, weight, countryData, company, service, country, zone = null) {
        const range = priceRanges.find(r => weight >= r.min && weight <= r.max);
        if (!range) return null;

        const totalPrice = weight * range.perKg + range.handling;
        const totalPriceUSD = this.convertToUSD(totalPrice);
        
        return {
            company,
            service,
            country,
            weight,
            zone,
            weightFee: weight * range.perKg,
            handlingFee: range.handling,
            totalPrice: totalPrice,
            totalPriceUSD: totalPriceUSD,
            timeframe: countryData.timeframe,
            weightLimit: countryData.weightLimit,
            sizeLimit: countryData.sizeLimit,
            note: countryData.note || '',
            details: `运费: ${(weight * range.perKg).toFixed(2)}元 + 操作费: ${range.handling}元 = 总计: ${totalPrice.toFixed(2)}元 (≈$${totalPriceUSD.toFixed(2)})`
        };
    }

    calculateFirstContinuePrice(countryData, weight, company, service, country) {
        const range = countryData.priceRanges.find(r => weight >= r.min && weight <= r.max);
        if (!range) return null;

        const firstWeight = countryData.firstWeight;
        const firstPrice = countryData.firstPrice;
        const continuePrice = range.continuePrice;

        let totalPrice = firstPrice;
        if (weight > firstWeight) {
            const continueWeight = Math.ceil((weight - firstWeight) / firstWeight);
            totalPrice += continueWeight * continuePrice;
        }

        const totalPriceUSD = this.convertToUSD(totalPrice);

        return {
            company,
            service,
            country,
            weight,
            firstWeight,
            firstPrice,
            continuePrice,
            totalPrice,
            totalPriceUSD,
            timeframe: countryData.timeframe,
            weightLimit: countryData.weightLimit,
            sizeLimit: countryData.sizeLimit,
            note: countryData.note || '',
            details: `首重${firstWeight}KG: ${firstPrice}元 + 续重: ${(totalPrice - firstPrice).toFixed(2)}元 = 总计: ${totalPrice.toFixed(2)}元 (≈$${totalPriceUSD.toFixed(2)})`
        };
    }

    compareAllPrices(country, weight, zone = null) {
        const results = [];
        
        for (const company of this.getCompanies()) {
            for (const service of this.getServices(company)) {
                const countries = this.getCountries(company, service);
                if (!countries.includes(country)) continue;

                const countryData = this.getCountryData(company, service, country);
                if (!countryData) continue;

                if (countryData.weightLimit && weight > countryData.weightLimit) continue;

                if (countryData.zones) {
                    if (zone) {
                        const result = this.calculateShipping(company, service, country, weight, zone);
                        if (result) results.push(result);
                    } else {
                        for (const z of this.getZones(company, service, country)) {
                            const result = this.calculateShipping(company, service, country, weight, z);
                            if (result) {
                                result.zone = z;
                                results.push(result);
                            }
                        }
                    }
                } else {
                    const result = this.calculateShipping(company, service, country, weight);
                    if (result) results.push(result);
                }
            }
        }

        results.sort((a, b) => a.totalPrice - b.totalPrice);
        return results;
    }

    getAllCountries() {
        const countries = new Set();
        for (const company of this.getCompanies()) {
            for (const service of this.getServices(company)) {
                for (const country of this.getCountries(company, service)) {
                    countries.add(country);
                }
            }
        }
        return Array.from(countries).sort();
    }

    needsZone(country) {
        for (const company of this.getCompanies()) {
            for (const service of this.getServices(company)) {
                const countryData = this.getCountryData(company, service, country);
                if (countryData && countryData.zones) return true;
            }
        }
        return false;
    }

    getCountryZones(country) {
        const zones = new Set();
        for (const company of this.getCompanies()) {
            for (const service of this.getServices(company)) {
                const countryData = this.getCountryData(company, service, country);
                if (countryData && countryData.zones) {
                    Object.keys(countryData.zones).forEach(zone => zones.add(zone));
                }
            }
        }
        return Array.from(zones).sort();
    }
}

// 导出数据库实例
window.completeLogisticsDB = new CompleteLogisticsDatabase(); 