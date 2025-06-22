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
    getWanbaoClothingData() { 
        return {
            '美国': {
                code: 'USPHFZ',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 102, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 100, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 92, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 91, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 86, handling: 20 },
                    { min: 0.7, max: 3, perKg: 86, handling: 13 },
                    { min: 3, max: 30, perKg: 82, handling: 13 }
                ]
            },
            '英国': {
                code: 'WBPHFZ',
                timeframe: '7-10工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                note: '偏远地区限重20KG；偏远地区体积限制0.031m³',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 33, handling: 16 },
                    { min: 0.3, max: 2, perKg: 36, handling: 16 },
                    { min: 2, max: 20, perKg: 40, handling: 16 }
                ]
            },
            '德国': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 42, handling: 19 },
                    { min: 0.3, max: 1, perKg: 39, handling: 22 },
                    { min: 1, max: 30, perKg: 41, handling: 22 }
                ]
            },
            '法国': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 54, handling: 20 },
                    { min: 0.3, max: 2, perKg: 50, handling: 21 },
                    { min: 2, max: 30, perKg: 50, handling: 21 }
                ]
            },
            '意大利': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 45, handling: 25 },
                    { min: 0.5, max: 2, perKg: 47, handling: 24 },
                    { min: 2, max: 5, perKg: 49, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 48, handling: 18 },
                    { min: 0.25, max: 2, perKg: 48, handling: 18 },
                    { min: 2, max: 5, perKg: 48, handling: 18 },
                    { min: 5, max: 30, perKg: 48, handling: 18 }
                ]
            }
        };
    }
    
    getWanbaoCosmeticData() { 
        return {
            '美国': {
                code: 'MUSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm，Min size:15*10',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 113, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 111, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 105, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 103, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 97, handling: 20 },
                    { min: 0.7, max: 2, perKg: 91, handling: 13 },
                    { min: 2, max: 30, perKg: 89, handling: 13 }
                ]
            },
            '英国': {
                code: 'MUSLR',
                timeframe: '6-8工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                note: '偏远地区限重20KG；偏远地区体积限制0.031m³',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 38, handling: 16 },
                    { min: 0.3, max: 2, perKg: 43, handling: 16 },
                    { min: 2, max: 20, perKg: 47, handling: 16 }
                ]
            },
            '德国': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，MIN SIZE: 15cm*11cm*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 56, handling: 19 },
                    { min: 0.3, max: 2, perKg: 53, handling: 22 },
                    { min: 2, max: 30, perKg: 53, handling: 22 }
                ]
            },
            '法国': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，MIN SIZE: 16cm*11cm*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 59, handling: 21 },
                    { min: 0.3, max: 2, perKg: 57, handling: 21 },
                    { min: 2, max: 30, perKg: 57, handling: 21 }
                ]
            },
            '意大利': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 52, handling: 25 },
                    { min: 0.5, max: 2, perKg: 54, handling: 24 },
                    { min: 2, max: 5, perKg: 56, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 58, handling: 21 },
                    { min: 0.25, max: 0.5, perKg: 58, handling: 18 },
                    { min: 0.5, max: 2, perKg: 58, handling: 18 },
                    { min: 2, max: 30, perKg: 58, handling: 18 }
                ]
            }
        };
    }
    
    getWanbaoGeneralData() { return this.getWanbaoGeneralCompleteData(); }
    getWanbaoElectricData() { return this.getWanbaoElectricCompleteData(); }

    getWanbaoGeneralCompleteData() {
        return {
            '美国': {
                code: 'USPHSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 104, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 102, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 94, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 93, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 88, handling: 20 },
                    { min: 0.7, max: 3, perKg: 88, handling: 13 },
                    { min: 3, max: 30, perKg: 84, handling: 13 }
                ]
            },
            '英国': {
                code: 'EUSLPHR',
                timeframe: '7-10工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                note: '偏远地区限重20KG；偏远地区体积限制0.031m³',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 34, handling: 16 },
                    { min: 0.3, max: 2, perKg: 37, handling: 16 },
                    { min: 2, max: 20, perKg: 41, handling: 16 }
                ]
            },
            '德国': {
                code: 'EUSLPHR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 43, handling: 19 },
                    { min: 0.3, max: 1, perKg: 40, handling: 22 },
                    { min: 1, max: 30, perKg: 42, handling: 22 }
                ]
            },
            '法国': {
                code: 'EUSLPHR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 56, handling: 20 },
                    { min: 0.3, max: 2, perKg: 52, handling: 21 },
                    { min: 2, max: 30, perKg: 52, handling: 21 }
                ]
            },
            '意大利': {
                code: 'EUSLPHR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 46, handling: 25 },
                    { min: 0.5, max: 2, perKg: 48, handling: 24 },
                    { min: 2, max: 5, perKg: 50, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'EUSLPHR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 49, handling: 18 },
                    { min: 0.25, max: 2, perKg: 49, handling: 18 },
                    { min: 2, max: 5, perKg: 49, handling: 18 },
                    { min: 5, max: 30, perKg: 49, handling: 18 }
                ]
            },
            '加拿大': {
                code: 'EUSLPHR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 55, handling: 23 },
                    { min: 0.1, max: 0.5, perKg: 55, handling: 24 },
                    { min: 0.5, max: 0.75, perKg: 55, handling: 25 },
                    { min: 0.75, max: 1, perKg: 55, handling: 27 },
                    { min: 1, max: 1.5, perKg: 63, handling: 27 },
                    { min: 1.5, max: 2, perKg: 63, handling: 27 },
                    { min: 2, max: 30, perKg: 64, handling: 27 }
                ]
            },
            '波兰': {
                code: 'EUSLPHR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 69, handling: 11 },
                    { min: 0.2, max: 2, perKg: 55, handling: 15 },
                    { min: 2, max: 30, perKg: 55, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'EUSLPHR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: 'L<60cm，L+W+H<=90cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 48, handling: 20 },
                    { min: 0.5, max: 2, perKg: 46, handling: 20 },
                    { min: 2, max: 30, perKg: 46, handling: 20 }
                ]
            },
            '比利时': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 79, handling: 23 },
                    { min: 0.4, max: 2, perKg: 65, handling: 21 },
                    { min: 2, max: 30, perKg: 65, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 15,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 60, handling: 26 },
                    { min: 0.3, max: 2, perKg: 50, handling: 21 },
                    { min: 2, max: 15, perKg: 47, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 69, handling: 23 },
                    { min: 0.5, max: 30, perKg: 54, handling: 23 }
                ]
            },
            '捷克': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 54, handling: 22 },
                    { min: 0.5, max: 30, perKg: 54, handling: 22 }
                ]
            },
            '斯洛伐克': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 49, handling: 21 },
                    { min: 0.5, max: 30, perKg: 49, handling: 21 }
                ]
            },
            '匈牙利': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 44, handling: 21 },
                    { min: 0.5, max: 30, perKg: 49, handling: 21 }
                ]
            },
            '芬兰': {
                code: 'EUSLPHR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 92, handling: 32 },
                    { min: 0.5, max: 10, perKg: 82, handling: 32 }
                ]
            },
            '澳大利亚': {
                code: 'EUSLPHR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤ 60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重',
                hasZones: true,
                zones: {
                    '1区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 29, handling: 24 },
                        { min: 0.25, max: 0.5, perKg: 29, handling: 24 },
                        { min: 0.5, max: 1, perKg: 29, handling: 26 },
                        { min: 1, max: 2, perKg: 29, handling: 20 },
                        { min: 2, max: 20, perKg: 29, handling: 20 }
                    ]},
                    '2区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 38, handling: 29 },
                        { min: 0.25, max: 0.5, perKg: 38, handling: 29 },
                        { min: 0.5, max: 1, perKg: 38, handling: 29 },
                        { min: 1, max: 2, perKg: 38, handling: 27 },
                        { min: 2, max: 20, perKg: 38, handling: 27 }
                    ]},
                    '3区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 53, handling: 50 },
                        { min: 0.25, max: 0.5, perKg: 53, handling: 50 },
                        { min: 0.5, max: 1, perKg: 53, handling: 60 },
                        { min: 1, max: 2, perKg: 48, handling: 60 },
                        { min: 2, max: 20, perKg: 48, handling: 60 }
                    ]},
                    '4区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 59, handling: 60 },
                        { min: 0.25, max: 0.5, perKg: 59, handling: 60 },
                        { min: 0.5, max: 1, perKg: 70, handling: 85 },
                        { min: 1, max: 2, perKg: 70, handling: 85 },
                        { min: 2, max: 20, perKg: 70, handling: 85 }
                    ]}
                }
            },
            '巴西': {
                code: 'EUSLPHR',
                timeframe: '15-25工作日',
                weightLimit: 20,
                sizeLimit: 'L<=60cm，L+W+H<=90cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 94, handling: 35 },
                    { min: 0.2, max: 0.5, perKg: 94, handling: 38 },
                    { min: 0.5, max: 2, perKg: 97, handling: 40 },
                    { min: 2, max: 20, perKg: 97, handling: 45 }
                ]
            },
            '新西兰': {
                code: 'EUSLPHR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 72, handling: 17 },
                    { min: 0.5, max: 2, perKg: 72, handling: 17 },
                    { min: 2, max: 30, perKg: 72, handling: 17 }
                ]
            },
            '日本': {
                code: 'EUSLPHR',
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                note: '重量按0.5KG进位，长*宽*高/6000',
                isFirstContinue: true,
                priceRanges: [
                    { min: 0, max: 2, firstWeight: 31, continueWeight: 8 },
                    { min: 2, max: 10, firstWeight: 31, continueWeight: 11 }
                ]
            }
        };
    }

    getWanbaoElectricCompleteData() {
        return {
            '美国': {
                code: 'USECSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 110, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 108, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 102, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 100, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 94, handling: 20 },
                    { min: 0.7, max: 2, perKg: 88, handling: 13 },
                    { min: 2, max: 30, perKg: 86, handling: 13 }
                ]
            },
            '英国': {
                code: 'EUSLR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                note: '偏远地区限重20KG；偏远地区体积限制0.031m³',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 38, handling: 16 },
                    { min: 0.3, max: 2, perKg: 43, handling: 16 },
                    { min: 2, max: 20, perKg: 47, handling: 16 }
                ]
            },
            '德国': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 54, handling: 19 },
                    { min: 0.3, max: 2, perKg: 51, handling: 22 },
                    { min: 2, max: 30, perKg: 51, handling: 22 }
                ]
            },
            '法国': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 57, handling: 21 },
                    { min: 0.3, max: 2, perKg: 55, handling: 21 },
                    { min: 2, max: 30, perKg: 55, handling: 21 }
                ]
            },
            '意大利': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 50, handling: 25 },
                    { min: 0.5, max: 2, perKg: 52, handling: 24 },
                    { min: 2, max: 5, perKg: 54, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 56, handling: 21 },
                    { min: 0.25, max: 0.5, perKg: 56, handling: 18 },
                    { min: 0.5, max: 2, perKg: 56, handling: 18 },
                    { min: 2, max: 30, perKg: 56, handling: 18 }
                ]
            },
            '加拿大': {
                code: 'EUSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 65, handling: 23 },
                    { min: 0.1, max: 0.5, perKg: 66, handling: 24 },
                    { min: 0.5, max: 0.75, perKg: 70, handling: 25 },
                    { min: 0.75, max: 1, perKg: 70, handling: 27 },
                    { min: 1, max: 1.5, perKg: 70, handling: 27 },
                    { min: 1.5, max: 2, perKg: 70, handling: 27 },
                    { min: 2, max: 30, perKg: 70, handling: 27 }
                ]
            },
            '波兰': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 69, handling: 11 },
                    { min: 0.2, max: 2, perKg: 60, handling: 15 },
                    { min: 2, max: 30, perKg: 55, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 58, handling: 20 },
                    { min: 0.5, max: 2, perKg: 56, handling: 20 },
                    { min: 2, max: 30, perKg: 56, handling: 20 }
                ]
            },
            '比利时': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 88, handling: 23 },
                    { min: 0.4, max: 2, perKg: 71, handling: 21 },
                    { min: 2, max: 30, perKg: 71, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 15,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 73, handling: 26 },
                    { min: 0.3, max: 2, perKg: 63, handling: 21 },
                    { min: 2, max: 15, perKg: 63, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 80, handling: 23 },
                    { min: 0.5, max: 30, perKg: 54, handling: 23 }
                ]
            },
            '澳大利亚': {
                code: 'EUSLR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤ 60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重',
                hasZones: true,
                zones: {
                    '1区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 48, handling: 24 },
                        { min: 0.25, max: 0.5, perKg: 48, handling: 24 },
                        { min: 0.5, max: 1, perKg: 48, handling: 26 },
                        { min: 1, max: 2, perKg: 50, handling: 20 },
                        { min: 2, max: 20, perKg: 50, handling: 20 }
                    ]},
                    '2区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 57, handling: 29 },
                        { min: 0.25, max: 0.5, perKg: 57, handling: 29 },
                        { min: 0.5, max: 1, perKg: 57, handling: 29 },
                        { min: 1, max: 2, perKg: 57, handling: 27 },
                        { min: 2, max: 20, perKg: 57, handling: 27 }
                    ]},
                    '3区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 66, handling: 50 },
                        { min: 0.25, max: 0.5, perKg: 66, handling: 50 },
                        { min: 0.5, max: 1, perKg: 66, handling: 60 },
                        { min: 1, max: 2, perKg: 66, handling: 60 },
                        { min: 2, max: 20, perKg: 66, handling: 60 }
                    ]},
                    '4区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.25, perKg: 76, handling: 60 },
                        { min: 0.25, max: 0.5, perKg: 76, handling: 60 },
                        { min: 0.5, max: 1, perKg: 84, handling: 85 },
                        { min: 1, max: 2, perKg: 82, handling: 85 },
                        { min: 2, max: 20, perKg: 82, handling: 85 }
                    ]}
                }
            },
            '墨西哥': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: 'L≤60CM，L+W+H≤120CM',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 84, handling: 20 },
                    { min: 0.5, max: 10, perKg: 84, handling: 20 }
                ]
            },
            '巴西': {
                code: 'EUSLR',
                timeframe: '15-25工作日',
                weightLimit: 20,
                sizeLimit: 'L<=60cm，L+W+H<=90cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 96, handling: 35 },
                    { min: 0.2, max: 0.5, perKg: 96, handling: 38 },
                    { min: 0.5, max: 2, perKg: 99, handling: 40 },
                    { min: 2, max: 20, perKg: 98, handling: 45 }
                ]
            },
            '新西兰': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 86, handling: 17 },
                    { min: 0.5, max: 2, perKg: 86, handling: 17 },
                    { min: 2, max: 30, perKg: 86, handling: 17 }
                ]
            },
            '日本': {
                code: 'EUSLR',
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm，Min size:15*11*1cm',
                note: '重量按0.5KG进位，长*宽*高/6000',
                isFirstContinue: true,
                priceRanges: [
                    { min: 0, max: 2, firstWeight: 33, continueWeight: 11 },
                    { min: 2, max: 10, firstWeight: 33, continueWeight: 14 }
                ]
            }
        };
    }

    getBasicWanbaoData(code) {
        const baseData = {
            '美国': {
                code: code,
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: code === 'USPHFZ' ? 102 : (code === 'MUSLR' ? 113 : (code === 'USPHSLR' ? 104 : 110)), handling: 24 },
                    { min: 0.101, max: 0.2, perKg: code === 'USPHFZ' ? 100 : (code === 'MUSLR' ? 111 : (code === 'USPHSLR' ? 102 : 108)), handling: 22 },
                    { min: 0.201, max: 0.3, perKg: code === 'USPHFZ' ? 92 : (code === 'MUSLR' ? 105 : (code === 'USPHSLR' ? 94 : 102)), handling: 20 },
                    { min: 0.301, max: 0.45, perKg: code === 'USPHFZ' ? 91 : (code === 'MUSLR' ? 103 : (code === 'USPHSLR' ? 93 : 100)), handling: 20 },
                    { min: 0.451, max: 0.7, perKg: code === 'USPHFZ' ? 86 : (code === 'MUSLR' ? 97 : (code === 'USPHSLR' ? 88 : 94)), handling: 20 },
                    { min: 0.701, max: 3, perKg: code === 'USPHFZ' ? 86 : (code === 'MUSLR' ? 91 : (code === 'USPHSLR' ? 88 : 88)), handling: 13 },
                    { min: 3.001, max: 30, perKg: code === 'USPHFZ' ? 82 : (code === 'MUSLR' ? 89 : (code === 'USPHSLR' ? 84 : 86)), handling: 13 }
                ]
            },
            '英国': {
                code: code,
                timeframe: code === 'MUSLR' ? '6-8工作日' : '7-10工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                note: '偏远地区限重20KG；偏远地区体积限制0.031m³',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: code === 'MUSLR' ? 38 : (code === 'USECSLR' ? 38 : 34), handling: 16 },
                    { min: 0.301, max: 2, perKg: code === 'MUSLR' ? 43 : (code === 'USECSLR' ? 43 : 37), handling: 16 },
                    { min: 2.001, max: 20, perKg: code === 'MUSLR' ? 47 : (code === 'USECSLR' ? 47 : 41), handling: 16 }
                ]
            },
            '德国': {
                code: code,
                timeframe: code === 'MUSLR' ? '7-9工作日' : '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: 'Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: code === 'MUSLR' ? 56 : (code === 'USECSLR' ? 54 : 43), handling: 19 },
                    { min: 0.301, max: 1, perKg: code === 'MUSLR' ? 53 : (code === 'USECSLR' ? 51 : 40), handling: 22 },
                    { min: 1.001, max: 30, perKg: code === 'MUSLR' ? 53 : (code === 'USECSLR' ? 51 : 42), handling: 22 }
                ]
            },
            '法国': {
                code: code,
                timeframe: code === 'MUSLR' ? '7-9工作日' : '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: 'Min size:16*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: code === 'MUSLR' ? 59 : (code === 'USECSLR' ? 57 : 56), handling: code === 'MUSLR' ? 21 : 20 },
                    { min: 0.301, max: 2, perKg: code === 'MUSLR' ? 57 : (code === 'USECSLR' ? 55 : 52), handling: 21 },
                    { min: 2.001, max: 30, perKg: code === 'MUSLR' ? 57 : (code === 'USECSLR' ? 55 : 52), handling: 21 }
                ]
            },
            '意大利': {
                code: code,
                timeframe: code === 'MUSLR' ? '7-9工作日' : '8-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: code === 'MUSLR' ? 52 : (code === 'USECSLR' ? 50 : 46), handling: 25 },
                    { min: 0.501, max: 2, perKg: code === 'MUSLR' ? 54 : (code === 'USECSLR' ? 52 : 48), handling: 24 },
                    { min: 2.001, max: 5, perKg: code === 'MUSLR' ? 56 : (code === 'USECSLR' ? 54 : 50), handling: 24 }
                ]
            },
            '西班牙': {
                code: code,
                timeframe: code === 'MUSLR' ? '7-9工作日' : '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: code === 'MUSLR' ? 58 : (code === 'USECSLR' ? 56 : 49), handling: code === 'MUSLR' ? 21 : 18 },
                    { min: 0.251, max: 2, perKg: code === 'MUSLR' ? 58 : (code === 'USECSLR' ? 56 : 49), handling: 18 },
                    { min: 2.001, max: 30, perKg: code === 'MUSLR' ? 58 : (code === 'USECSLR' ? 56 : 49), handling: 18 }
                ]
            }
        };

        // 为所有产品代码添加共同的国家数据
        if (code === 'USPHSLR' || code === 'USECSLR') {
            // 专线挂号普货和带电特有的其他国家
            baseData['加拿大'] = {
                code: code,
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: code === 'USECSLR' ? 65 : 55, handling: 23 },
                    { min: 0.101, max: 0.5, perKg: code === 'USECSLR' ? 66 : 55, handling: 24 },
                    { min: 0.501, max: 0.75, perKg: code === 'USECSLR' ? 70 : 55, handling: 25 },
                    { min: 0.751, max: 1, perKg: code === 'USECSLR' ? 70 : 55, handling: 27 },
                    { min: 1.001, max: 1.5, perKg: code === 'USECSLR' ? 70 : 63, handling: 27 },
                    { min: 1.501, max: 2, perKg: code === 'USECSLR' ? 70 : 63, handling: 27 },
                    { min: 2.001, max: 30, perKg: code === 'USECSLR' ? 70 : 64, handling: 27 }
                ]
            };

            baseData['波兰'] = {
                code: code,
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 69, handling: 11 },
                    { min: 0.201, max: 2, perKg: code === 'USECSLR' ? 60 : 55, handling: 15 },
                    { min: 2.001, max: 30, perKg: 55, handling: 15 }
                ]
            };

            baseData['澳大利亚'] = {
                code: code,
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重，分区计费',
                zones: {
                    '1区': [
                        { min: 0, max: 0.25, perKg: code === 'USECSLR' ? 48 : 29, handling: 24 },
                        { min: 0.251, max: 0.5, perKg: code === 'USECSLR' ? 48 : 29, handling: 24 },
                        { min: 0.501, max: 1, perKg: code === 'USECSLR' ? 48 : 29, handling: 26 },
                        { min: 1.001, max: 2, perKg: code === 'USECSLR' ? 50 : 29, handling: 20 },
                        { min: 2.001, max: 20, perKg: code === 'USECSLR' ? 50 : 29, handling: 20 }
                    ],
                    '2区': [
                        { min: 0, max: 0.25, perKg: code === 'USECSLR' ? 57 : 38, handling: 29 },
                        { min: 0.251, max: 0.5, perKg: code === 'USECSLR' ? 57 : 38, handling: 29 },
                        { min: 0.501, max: 1, perKg: code === 'USECSLR' ? 57 : 38, handling: 29 },
                        { min: 1.001, max: 2, perKg: code === 'USECSLR' ? 57 : 38, handling: 27 },
                        { min: 2.001, max: 20, perKg: code === 'USECSLR' ? 57 : 38, handling: 27 }
                    ],
                    '3区': [
                        { min: 0, max: 0.25, perKg: code === 'USECSLR' ? 66 : 53, handling: 50 },
                        { min: 0.251, max: 0.5, perKg: code === 'USECSLR' ? 66 : 53, handling: 50 },
                        { min: 0.501, max: 1, perKg: code === 'USECSLR' ? 66 : 53, handling: 60 },
                        { min: 1.001, max: 2, perKg: code === 'USECSLR' ? 66 : 48, handling: 60 },
                        { min: 2.001, max: 20, perKg: code === 'USECSLR' ? 66 : 48, handling: 60 }
                    ],
                    '4区': [
                        { min: 0, max: 0.25, perKg: code === 'USECSLR' ? 76 : 59, handling: 60 },
                        { min: 0.251, max: 0.5, perKg: code === 'USECSLR' ? 76 : 59, handling: 60 },
                        { min: 0.501, max: 1, perKg: code === 'USECSLR' ? 84 : 70, handling: 85 },
                        { min: 1.001, max: 2, perKg: code === 'USECSLR' ? 82 : 70, handling: 85 },
                        { min: 2.001, max: 20, perKg: code === 'USECSLR' ? 82 : 70, handling: 85 }
                    ]
                }
            };

            baseData['日本'] = {
                code: code,
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                note: '首重续重计费，重量按0.5KG进位，长*宽*高/6000',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: code === 'USECSLR' ? 33 : 31,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: code === 'USECSLR' ? 11 : 8 },
                    { min: 2.001, max: 10, continuePrice: code === 'USECSLR' ? 14 : 11 }
                ]
            };
        }

        return baseData;
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
    getYuntuStandardElectricCompleteData() { 
        return {
            '英国': {
                code: 'BKZXR',
                timeframe: '3-5工作日',
                weightLimit: 3,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 56, handling: 18 },
                    { min: 0.3, max: 0.5, perKg: 58, handling: 18 },
                    { min: 0.5, max: 1, perKg: 58, handling: 18 },
                    { min: 1, max: 3, perKg: 62, handling: 18 }
                ]
            },
            '德国': {
                code: 'BKZXR',
                timeframe: '5-8工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 2, perKg: 79, handling: 23 },
                    { min: 2, max: 5, perKg: 79, handling: 23 }
                ]
            },
            '法国': {
                code: 'BKZXR',
                timeframe: '3-5工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 85, handling: 27 },
                    { min: 0.4, max: 5, perKg: 85, handling: 27 }
                ]
            },
            '意大利': {
                code: 'BKZXR',
                timeframe: '5-8工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 2, perKg: 72, handling: 27 },
                    { min: 2, max: 5, perKg: 72, handling: 27 }
                ]
            },
            '美国': {
                code: 'BKZXR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 117, handling: 28 },
                    { min: 0.1, max: 0.2, perKg: 115, handling: 29 },
                    { min: 0.2, max: 0.3, perKg: 113, handling: 31 },
                    { min: 0.3, max: 0.45, perKg: 111, handling: 31 },
                    { min: 0.45, max: 2, perKg: 109, handling: 42 },
                    { min: 2, max: 3, perKg: 107, handling: 42 },
                    { min: 3, max: 30, perKg: 105, handling: 42 }
                ]
            },
            '西班牙': {
                code: 'BKZXR',
                timeframe: '5-8工作日',
                weightLimit: 3,
                priceRanges: [
                    { min: 0, max: 2, perKg: 75, handling: 21 },
                    { min: 2, max: 3, perKg: 83, handling: 21 }
                ]
            },
            '波兰': {
                code: 'BKZXR',
                timeframe: '6-8工作日',
                weightLimit: 3,
                priceRanges: [
                    { min: 0, max: 3, perKg: 100, handling: 15 }
                ]
            },
            '奥地利': {
                code: 'BKZXR',
                timeframe: '6-8工作日',
                weightLimit: 3,
                priceRanges: [
                    { min: 0, max: 3, perKg: 98, handling: 23 }
                ]
            },
            '荷兰': {
                code: 'BKZXR',
                timeframe: '3-6工作日',
                weightLimit: 3,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 100, handling: 23 },
                    { min: 0.2, max: 3, perKg: 90, handling: 25 }
                ]
            },
            '加拿大': {
                code: 'BKZXR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.15, perKg: 100, handling: 25 },
                    { min: 0.15, max: 0.3, perKg: 101, handling: 25 },
                    { min: 0.3, max: 0.45, perKg: 104, handling: 25 },
                    { min: 0.45, max: 0.75, perKg: 108, handling: 25 },
                    { min: 0.75, max: 1, perKg: 113, handling: 25 },
                    { min: 1, max: 1.5, perKg: 113, handling: 27 },
                    { min: 1.5, max: 2, perKg: 116, handling: 30 },
                    { min: 2, max: 30, perKg: 120, handling: 30 }
                ]
            },
            '瑞典': {
                code: 'BKZXR',
                timeframe: '5-7工作日',
                weightLimit: 2,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 84, handling: 21 },
                    { min: 0.3, max: 2, perKg: 79, handling: 21 }
                ]
            },
            '丹麦': {
                code: 'BKZXR',
                timeframe: '5-7工作日',
                weightLimit: 2,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 99, handling: 27 },
                    { min: 0.3, max: 2, perKg: 84, handling: 27 }
                ]
            },
            '澳大利亚': {
                code: 'BKZXR',
                timeframe: '4-7工作日（偏远除外）',
                weightLimit: 20,
                zones: {
                    '1区': [
                        { min: 0, max: 0.3, perKg: 46, handling: 39 },
                        { min: 0.3, max: 0.5, perKg: 46, handling: 39 },
                        { min: 0.5, max: 1, perKg: 46, handling: 44 },
                        { min: 1, max: 3, perKg: 46, handling: 51 },
                        { min: 3, max: 20, perKg: 46, handling: 63 }
                    ],
                    '2区': [
                        { min: 0, max: 0.3, perKg: 46, handling: 48 },
                        { min: 0.3, max: 0.5, perKg: 46, handling: 48 },
                        { min: 0.5, max: 1, perKg: 46, handling: 55 },
                        { min: 1, max: 3, perKg: 46, handling: 62 },
                        { min: 3, max: 20, perKg: 46, handling: 128 }
                    ],
                    '3区': [
                        { min: 0, max: 0.3, perKg: 46, handling: 75 },
                        { min: 0.3, max: 0.5, perKg: 46, handling: 77 },
                        { min: 0.5, max: 1, perKg: 46, handling: 118 },
                        { min: 1, max: 3, perKg: 69, handling: 118 },
                        { min: 3, max: 20, perKg: 69, handling: 128 }
                    ]
                }
            }
        };
    }
    getYuntuEconomyElectricCompleteData() { 
        return {
            '美国': {
                code: 'THZXR',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最低计费重0.03KG',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 111, handling: 24 },
                    { min: 0.1, max: 0.2, perKg: 104, handling: 22 },
                    { min: 0.2, max: 0.3, perKg: 105, handling: 20 },
                    { min: 0.3, max: 0.45, perKg: 104, handling: 20 },
                    { min: 0.45, max: 0.7, perKg: 101, handling: 20 },
                    { min: 0.7, max: 2, perKg: 100, handling: 13 },
                    { min: 2, max: 30, perKg: 100, handling: 13 }
                ]
            },
            '英国': {
                code: 'THZXR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 51, handling: 16 },
                    { min: 0.3, max: 0.5, perKg: 53, handling: 16 },
                    { min: 0.5, max: 1, perKg: 53, handling: 16 },
                    { min: 1, max: 20, perKg: 55, handling: 16 }
                ]
            },
            '法国': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 74, handling: 19 },
                    { min: 0.4, max: 2, perKg: 72, handling: 23 },
                    { min: 2, max: 30, perKg: 72, handling: 23 }
                ]
            },
            '德国': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 62, handling: 19 },
                    { min: 0.3, max: 30, perKg: 62, handling: 22 }
                ]
            },
            '意大利': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 60, handling: 25 },
                    { min: 2, max: 30, perKg: 62, handling: 25 }
                ]
            },
            '西班牙': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 64, handling: 18 },
                    { min: 2, max: 30, perKg: 67, handling: 18 }
                ]
            },
            '荷兰': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 84, handling: 21 },
                    { min: 0.1, max: 0.2, perKg: 77, handling: 23 },
                    { min: 0.2, max: 2, perKg: 74, handling: 23 },
                    { min: 2, max: 20, perKg: 66, handling: 23 }
                ]
            },
            '比利时': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 76, handling: 23 },
                    { min: 0.2, max: 2, perKg: 76, handling: 21 },
                    { min: 2, max: 20, perKg: 65, handling: 21 }
                ]
            },
            '加拿大': {
                code: 'THZXR',
                timeframe: '8-15工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.15, perKg: 68, handling: 21 },
                    { min: 0.15, max: 0.3, perKg: 69, handling: 21 },
                    { min: 0.3, max: 0.45, perKg: 69, handling: 21 },
                    { min: 0.45, max: 0.75, perKg: 71, handling: 22 },
                    { min: 0.75, max: 1, perKg: 71, handling: 22 },
                    { min: 1, max: 1.5, perKg: 71, handling: 23 },
                    { min: 1.5, max: 2, perKg: 76, handling: 23 },
                    { min: 2, max: 30, perKg: 78, handling: 23 }
                ]
            },
            '澳大利亚': {
                code: 'THZXR',
                timeframe: '5-10工作日',
                weightLimit: 20,
                zones: {
                    '1区': [
                        { min: 0, max: 0.3, perKg: 34, handling: 21 },
                        { min: 0.3, max: 0.5, perKg: 34, handling: 24 },
                        { min: 0.5, max: 1, perKg: 34, handling: 25 },
                        { min: 1, max: 3, perKg: 34, handling: 27 },
                        { min: 3, max: 20, perKg: 34, handling: 42 }
                    ],
                    '2区': [
                        { min: 0, max: 0.3, perKg: 34, handling: 29 },
                        { min: 0.3, max: 0.5, perKg: 34, handling: 30 },
                        { min: 0.5, max: 1, perKg: 34, handling: 34 },
                        { min: 1, max: 3, perKg: 34, handling: 36 },
                        { min: 3, max: 20, perKg: 34, handling: 53 }
                    ],
                    '3区': [
                        { min: 0, max: 0.3, perKg: 34, handling: 50 },
                        { min: 0.3, max: 0.5, perKg: 34, handling: 51 },
                        { min: 0.5, max: 1, perKg: 34, handling: 74 },
                        { min: 1, max: 3, perKg: 34, handling: 76 },
                        { min: 3, max: 20, perKg: 34, handling: 115 }
                    ],
                    '4区': [
                        { min: 0, max: 0.3, perKg: 45, handling: 52 },
                        { min: 0.3, max: 0.5, perKg: 45, handling: 52 },
                        { min: 0.5, max: 1, perKg: 45, handling: 95 },
                        { min: 1, max: 3, perKg: 45, handling: 120 },
                        { min: 3, max: 20, perKg: 45, handling: 150 }
                    ]
                }
            }
        };
    }
    getYuntuBulkCompleteData() { 
        return {
            '美国': {
                code: 'DHZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 10, perKg: 157, handling: 64 },
                    { min: 10, max: 30, perKg: 162, handling: 74 }
                ]
            },
            '荷兰': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 114, handling: 60 }
                ]
            },
            '比利时': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 117, handling: 75 }
                ]
            },
            '法国': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 89, handling: 68 }
                ]
            },
            '丹麦': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 124, handling: 84 }
                ]
            },
            '意大利': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 111, handling: 54 }
                ]
            },
            '瑞典': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 131, handling: 94 }
                ]
            },
            '卢森堡': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 119, handling: 73 }
                ]
            },
            '德国': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 115, handling: 30 }
                ]
            },
            '西班牙': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 5, perKg: 93, handling: 62 },
                    { min: 5, max: 30, perKg: 95, handling: 75 }
                ]
            },
            '波兰': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 133, handling: 73 }
                ]
            },
            '希腊': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 128, handling: 102 }
                ]
            },
            '捷克': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 127, handling: 75 }
                ]
            },
            '爱尔兰': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 122, handling: 83 }
                ]
            },
            '奥地利': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 137, handling: 78 }
                ]
            },
            '葡萄牙': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 112, handling: 77 }
                ]
            },
            '匈牙利': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 130, handling: 60 }
                ]
            },
            '芬兰': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 140, handling: 116 }
                ]
            },
            '斯洛文尼亚': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 160, handling: 66 }
                ]
            },
            '斯洛伐克': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 130, handling: 85 }
                ]
            },
            '拉脱维亚': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 128, handling: 78 }
                ]
            },
            '爱沙尼亚': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 117, handling: 83 }
                ]
            },
            '克罗地亚': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 160, handling: 93 }
                ]
            },
            '保加利亚': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 127, handling: 97 }
                ]
            },
            '罗马尼亚': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 122, handling: 104 }
                ]
            },
            '立陶宛': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 128, handling: 75 }
                ]
            },
            '英国': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 105, handling: 49 }
                ]
            },
            '挪威': {
                code: 'DHZXR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 5, perKg: 142, handling: 56 },
                    { min: 5, max: 10, perKg: 140, handling: 56 },
                    { min: 10, max: 15, perKg: 140, handling: 76 },
                    { min: 15, max: 20, perKg: 138, handling: 86 },
                    { min: 20, max: 25, perKg: 138, handling: 210 },
                    { min: 25, max: 30, perKg: 138, handling: 210 }
                ]
            }
        };
    }
    getHuahanStandardData() { 
        return {
            '美国': {
                code: 'PK0377',
                timeframe: '12-18工作日',
                weightLimit: 2,
                note: '包税，最长边+2*(宽+高)≤120cm，单边长≤55cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 0.1, perKg: 112, handling: 28 },
                    { min: 0.1, max: 0.2, perKg: 112, handling: 28 },
                    { min: 0.2, max: 0.3, perKg: 112, handling: 28 },
                    { min: 0.3, max: 0.453, perKg: 129, handling: 23 },
                    { min: 0.453, max: 0.7, perKg: 129, handling: 23 },
                    { min: 0.7, max: 1, perKg: 126, handling: 14 },
                    { min: 1, max: 2, perKg: 126, handling: 14 }
                ]
            },
            '加拿大': {
                code: 'PK0377',
                timeframe: '9-15工作日',
                weightLimit: 10,
                note: '最长边≤60cm，长+宽+高≤90cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 0.3, perKg: 117, handling: 40 },
                    { min: 0.3, max: 0.75, perKg: 101, handling: 40 },
                    { min: 0.75, max: 1, perKg: 101, handling: 46 },
                    { min: 1, max: 1.5, perKg: 100, handling: 52 },
                    { min: 1.5, max: 2, perKg: 100, handling: 57 },
                    { min: 2, max: 10, perKg: 100, handling: 55 }
                ]
            },
            '英国': {
                code: 'PK0377',
                timeframe: '6-9工作日',
                weightLimit: 5,
                note: '最大尺寸≤60x40x40cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 5, perKg: 82, handling: 19 }
                ]
            },
            '德国': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 72, handling: 32 }
                ]
            },
            '奥地利': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 79, handling: 38 }
                ]
            },
            '荷兰': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 76, handling: 32 }
                ]
            },
            '西班牙': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 88, handling: 26 }
                ]
            },
            '葡萄牙': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 88, handling: 26 }
                ]
            },
            '比利时': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 109, handling: 29 }
                ]
            },
            '捷克': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 107, handling: 26 }
                ]
            },
            '法国': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 83, handling: 34 }
                ]
            },
            '希腊': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 85, handling: 24 }
                ]
            },
            '意大利': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 93, handling: 41 }
                ]
            },
            '立陶宛': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 108, handling: 25 }
                ]
            },
            '卢森堡': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 78, handling: 35 }
                ]
            },
            '波兰': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 114, handling: 27 }
                ]
            },
            '罗马尼亚': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 96, handling: 23 }
                ]
            },
            '瑞典': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 83, handling: 26 }
                ]
            },
            '斯洛伐克': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 80, handling: 27 }
                ]
            },
            '丹麦': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                note: '最大尺寸≤45*45*35cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 77, handling: 43 }
                ]
            },
            '澳大利亚': {
                code: 'PK0377',
                timeframe: '7-9工作日',
                weightLimit: 5,
                note: '最大尺寸≤60x40x40cm，最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 5, perKg: 92, handling: 42 }
                ]
            }
        };
    }
    getYanwenTrackingData() {
        return {
            '美国': {
                code: '481',
                timeframe: '7-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.1, perKg: 120, handling: 20 },
                    { min: 0.101, max: 0.2, perKg: 114, handling: 18 },
                    { min: 0.201, max: 0.45, perKg: 110, handling: 16 },
                    { min: 0.451, max: 0.7, perKg: 103, handling: 16 },
                    { min: 0.701, max: 1.5, perKg: 103, handling: 9 },
                    { min: 1.501, max: 2, perKg: 103, handling: 9 },
                    { min: 2.001, max: 30, perKg: 96, handling: 9 }
                ]
            },
            '加拿大': {
                code: '481',
                timeframe: '7-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.15, perKg: 78, handling: 21 },
                    { min: 0.151, max: 0.45, perKg: 79, handling: 22 },
                    { min: 0.451, max: 0.75, perKg: 82, handling: 23 },
                    { min: 0.751, max: 1, perKg: 83, handling: 23 },
                    { min: 1.001, max: 30, perKg: 83, handling: 23 }
                ]
            },
            '墨西哥': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 5,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.5, perKg: 84, handling: 18 },
                    { min: 0.501, max: 1, perKg: 84, handling: 19 },
                    { min: 1.001, max: 5, perKg: 90, handling: 20 }
                ]
            },
            '英国': {
                code: '481',
                timeframe: '7-12工作日',
                weightLimit: 20,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 1, perKg: 68, handling: 16 },
                    { min: 1.001, max: 20, perKg: 70, handling: 16 }
                ]
            },
            '法国': {
                code: '481',
                timeframe: '7-12工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 0.2, perKg: 84, handling: 18 },
                    { min: 0.201, max: 0.5, perKg: 82, handling: 19 },
                    { min: 0.501, max: 30, perKg: 78, handling: 23 }
                ]
            },
            '德国': {
                code: '481',
                timeframe: '7-12工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 0.3, perKg: 70, handling: 19 },
                    { min: 0.301, max: 30, perKg: 65, handling: 22 }
                ]
            },
            '意大利': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 68, handling: 25 }
                ]
            },
            '西班牙': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 74, handling: 18 }
                ]
            },
            '荷兰': {
                code: '481',
                timeframe: '7-12工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 0.3, perKg: 85, handling: 21 },
                    { min: 0.301, max: 0.5, perKg: 85, handling: 21 },
                    { min: 0.501, max: 2, perKg: 83, handling: 21 },
                    { min: 2.001, max: 30, perKg: 82, handling: 21 }
                ]
            },
            '奥地利': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 0.2, perKg: 72, handling: 23 },
                    { min: 0.201, max: 0.5, perKg: 72, handling: 23 },
                    { min: 0.501, max: 30, perKg: 72, handling: 23 }
                ]
            },
            '比利时': {
                code: '481',
                timeframe: '7-12工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.2, perKg: 88, handling: 23 },
                    { min: 0.201, max: 2, perKg: 88, handling: 21 },
                    { min: 2.001, max: 30, perKg: 77, handling: 21 }
                ]
            },
            '保加利亚': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 70, handling: 17 }
                ]
            },
            '瑞士': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.2, perKg: 85, handling: 22 },
                    { min: 0.201, max: 0.5, perKg: 100, handling: 24 },
                    { min: 0.501, max: 1, perKg: 104, handling: 24 },
                    { min: 1.001, max: 2, perKg: 104, handling: 24 },
                    { min: 2.001, max: 30, perKg: 112, handling: 34 }
                ]
            },
            '塞浦路斯': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 20,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 0.2, perKg: 90, handling: 29 },
                    { min: 0.201, max: 20, perKg: 132, handling: 29 }
                ]
            },
            '捷克': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 2,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 52, handling: 20 }
                ]
            },
            '丹麦': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 2,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.3, perKg: 91, handling: 24 },
                    { min: 0.301, max: 2, perKg: 75, handling: 24 }
                ]
            },
            '爱沙尼亚': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 77, handling: 20 },
                    { min: 2.001, max: 30, perKg: 77, handling: 20 }
                ]
            },
            '芬兰': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 20,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 20, perKg: 74, handling: 26 }
                ]
            },
            '希腊': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 90, handling: 18 }
                ]
            },
            '克罗地亚': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 85, handling: 23 }
                ]
            },
            '匈牙利': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 75, handling: 21 }
                ]
            },
            '爱尔兰': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 20,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 20, perKg: 90, handling: 23 }
                ]
            },
            '立陶宛': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 69, handling: 20 },
                    { min: 2.001, max: 30, perKg: 69, handling: 20 }
                ]
            },
            '卢森堡': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 110, handling: 26 },
                    { min: 2.001, max: 30, perKg: 115, handling: 26 }
                ]
            },
            '拉脱维亚': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 77, handling: 20 },
                    { min: 2.001, max: 30, perKg: 77, handling: 20 }
                ]
            },
            '马耳他': {
                code: '481',
                timeframe: '12-20工作日',
                weightLimit: 20,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 20, perKg: 120, handling: 31 }
                ]
            },
            '挪威': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 5,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.1, perKg: 80, handling: 20 },
                    { min: 0.101, max: 0.3, perKg: 66, handling: 20 },
                    { min: 0.301, max: 5, perKg: 58, handling: 20 }
                ]
            },
            '波兰': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 20,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 0.2, perKg: 69, handling: 11 },
                    { min: 0.201, max: 20, perKg: 64, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 89, handling: 20 }
                ]
            },
            '罗马尼亚': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 70, handling: 18 }
                ]
            },
            '瑞典': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 20,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.3, perKg: 72, handling: 16 },
                    { min: 0.301, max: 2, perKg: 62, handling: 21 },
                    { min: 2.001, max: 20, perKg: 65, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 85, handling: 24 }
                ]
            },
            '斯洛伐克': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 78, handling: 20 }
                ]
            },
            '巴西': {
                code: '481',
                timeframe: '15-25工作日',
                weightLimit: 5,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.5, perKg: 84, handling: 38 },
                    { min: 0.501, max: 1, perKg: 84, handling: 40 },
                    { min: 1.001, max: 1.5, perKg: 84, handling: 45 },
                    { min: 1.501, max: 2, perKg: 84, handling: 49 },
                    { min: 2.001, max: 3, perKg: 84, handling: 65 },
                    { min: 3.001, max: 5, perKg: 84, handling: 75 }
                ]
            },
            '智利': {
                code: '481',
                timeframe: '15-25工作日',
                weightLimit: 5,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.5, perKg: 95, handling: 23 },
                    { min: 0.501, max: 1, perKg: 100, handling: 27 },
                    { min: 1.001, max: 5, perKg: 100, handling: 32 }
                ]
            },
            '哥伦比亚': {
                code: '481',
                timeframe: '15-25工作日',
                weightLimit: 3,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 134, handling: 26 },
                    { min: 2.001, max: 3, perKg: 134, handling: 26 }
                ]
            },
            '秘鲁': {
                code: '481',
                timeframe: '15-25工作日',
                weightLimit: 2,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 185, handling: 21 }
                ]
            },
            '新西兰': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 25,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 25, perKg: 83, handling: 17 }
                ]
            },
            '日本': {
                code: '481',
                timeframe: '4-8工作日',
                weightLimit: 10,
                note: '首重续重计费，重量按0.5KG进位',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 31,
                priceRanges: [
                    { min: 0.001, max: 2, continuePrice: 5 },
                    { min: 2.001, max: 10, continuePrice: 6 }
                ]
            },
            '澳大利亚': {
                code: '481',
                timeframe: '6-12工作日',
                weightLimit: 22,
                note: '分区计费，最小计费重量0.001KG',
                zones: {
                    '1区': [
                        { min: 0.001, max: 0.5, perKg: 37, handling: 20 },
                        { min: 0.501, max: 1, perKg: 37, handling: 20 },
                        { min: 1.001, max: 2, perKg: 37, handling: 21 },
                        { min: 2.001, max: 5, perKg: 37, handling: 25 },
                        { min: 5.001, max: 10, perKg: 37, handling: 35 },
                        { min: 10.001, max: 22, perKg: 37, handling: 55 }
                    ],
                    '2区': [
                        { min: 0.001, max: 0.5, perKg: 38, handling: 25 },
                        { min: 0.501, max: 1, perKg: 38, handling: 27 },
                        { min: 1.001, max: 2, perKg: 38, handling: 27 },
                        { min: 2.001, max: 5, perKg: 38, handling: 28 },
                        { min: 5.001, max: 10, perKg: 38, handling: 46 },
                        { min: 10.001, max: 22, perKg: 38, handling: 66 }
                    ],
                    '3区': [
                        { min: 0.001, max: 0.5, perKg: 50, handling: 49 },
                        { min: 0.501, max: 1, perKg: 50, handling: 65 },
                        { min: 1.001, max: 2, perKg: 50, handling: 67 },
                        { min: 2.001, max: 5, perKg: 50, handling: 85 },
                        { min: 5.001, max: 10, perKg: 50, handling: 105 },
                        { min: 10.001, max: 22, perKg: 50, handling: 125 }
                    ],
                    '4区': [
                        { min: 0.001, max: 0.5, perKg: 51, handling: 55 },
                        { min: 0.501, max: 2, perKg: 51, handling: 95 },
                        { min: 2.001, max: 5, perKg: 51, handling: 117 },
                        { min: 5.001, max: 10, perKg: 51, handling: 132 },
                        { min: 10.001, max: 22, perKg: 51, handling: 155 }
                    ]
                }
            },
            '韩国': {
                code: '481',
                timeframe: '4-8工作日',
                weightLimit: 20,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 2, perKg: 6, handling: 17 },
                    { min: 2.001, max: 20, perKg: 8, handling: 17 }
                ]
            },
            '马来西亚': {
                code: '481',
                timeframe: '5-10工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0, max: 1, perKg: 30.5, handling: 21 },
                    { min: 1.001, max: 30, perKg: 33.5, handling: 16 }
                ]
            },
            '菲律宾': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 90, handling: 12 },
                    { min: 0.501, max: 10, perKg: 86, handling: 12 },
                    { min: 10.001, max: 30, perKg: 86, handling: 11 }
                ]
            },
            '新加坡': {
                code: '481',
                timeframe: '5-10工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 46, handling: 20 }
                ]
            },
            '泰国': {
                code: '481',
                timeframe: '5-10工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 28, handling: 11 }
                ]
            },
            '阿联酋': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.5, perKg: 45, handling: 22 },
                    { min: 0.501, max: 2, perKg: 45, handling: 22 },
                    { min: 2.001, max: 5, perKg: 45, handling: 22 },
                    { min: 5.001, max: 30, perKg: 45, handling: 24 }
                ]
            },
            '以色列': {
                code: '481',
                timeframe: '10-15工作日',
                weightLimit: 5,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0.001, max: 0.5, perKg: 95, handling: 21 },
                    { min: 0.501, max: 5, perKg: 95, handling: 23 }
                ]
            },
            '土耳其': {
                code: '481',
                timeframe: '8-15工作日',
                weightLimit: 10,
                note: '最小计费重量0.05KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 83, handling: 27 },
                    { min: 0.201, max: 0.5, perKg: 80, handling: 22 },
                    { min: 0.501, max: 10, perKg: 86, handling: 18 }
                ]
            },
            '越南': {
                code: '481',
                timeframe: '5-10工作日',
                weightLimit: 30,
                note: '最小计费重量0.001KG',
                priceRanges: [
                    { min: 0.001, max: 30, perKg: 29, handling: 10 }
                ]
            }
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

    calculateShipping(company, service, country, weight, zone = null, dimensions = null) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData) return null;

        try {
            // 计算最终重量（实际重量 vs 体积重量）
            let finalWeight = weight;
            let volumetricWeight = 0;
            let weightType = '实际重量';
            
            if (dimensions && dimensions.length && dimensions.width && dimensions.height && dimensions.divisor) {
                // 计算体积重量
                volumetricWeight = (dimensions.length * dimensions.width * dimensions.height) / dimensions.divisor;
                
                // 取较大值
                if (volumetricWeight > weight) {
                    finalWeight = volumetricWeight;
                    weightType = '体积重量';
                }
            }

            let result;
            if (countryData.zones && zone) {
                const zoneData = countryData.zones[zone];
                if (!zoneData) return null;
                result = this.calculatePrice(zoneData, finalWeight, countryData, company, service, country, zone);
            } else if (countryData.calculationType === 'firstContinue') {
                result = this.calculateFirstContinuePrice(countryData, finalWeight, company, service, country);
            } else {
                result = this.calculatePrice(countryData.priceRanges, finalWeight, countryData, company, service, country);
            }

            if (result) {
                // 添加重量信息到结果中
                result.actualWeight = weight;
                result.volumetricWeight = volumetricWeight;
                result.finalWeight = finalWeight;
                result.weightType = weightType;
            }

            return result;
        } catch (error) {
            console.error('计算错误:', error);
            return null;
        }
    }

    // 获取渠道的体积重量除数
    getVolumeDivisor(company, service) {
        if (company === '云途物流' && service === '云途大货18000专线') {
            return 18000;
        }
        return 8000; // 其他渠道默认8000
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