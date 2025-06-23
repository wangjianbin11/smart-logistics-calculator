// 完全重构的物流报价数据库 - 基于完整数据整理
class LogisticsDatabase {
    constructor() {
        this.companies = new Map();
        this.initializeData();
    }

    initializeData() {
        // 万邦物流 - 4个服务
        this.addCompany('万邦物流', {
            services: {
                '服装专线': this.getWanbaoClothingData(),
                '化妆品专线': this.getWanbaoCosmeticData(),
                '专线挂号普货': this.getWanbaoGeneralData(),
                '专线挂号带电': this.getWanbaoElectricData()
            }
        });

        // 云途物流 - 7个服务
        this.addCompany('云途物流', {
            services: {
                '服装专线': this.getYuntuClothingData(),
                '化妆品专线': this.getYuntuCosmeticData(),
                '专线挂号标快普货': this.getYuntuStandardGeneralData(),
                '专线挂号标快带电': this.getYuntuStandardElectricData(),
                '专线挂号特惠普货': this.getYuntuEconomyGeneralData(),
                '专线挂号特惠带电': this.getYuntuEconomyElectricData(),
                '云途大货18000专线': this.getYuntuBulkData()
            }
        });

        // 华翰物流 - 1个服务
        this.addCompany('华翰物流', {
            services: {
                '华速通-标准': this.getHuahanStandardData()
            }
        });

        // 燕文物流 - 1个服务
        this.addCompany('燕文物流', {
            services: {
                '燕文专线追踪': this.getYanwenTrackingData()
            }
        });
    }

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
                    { min: 0.101, max: 0.2, perKg: 100, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 92, handling: 20 },
                    { min: 0.301, max: 0.45, perKg: 91, handling: 20 },
                    { min: 0.451, max: 0.7, perKg: 86, handling: 20 },
                    { min: 0.701, max: 3, perKg: 86, handling: 13 },
                    { min: 3.001, max: 30, perKg: 82, handling: 13 }
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
                    { min: 0.301, max: 2, perKg: 36, handling: 16 },
                    { min: 2.001, max: 20, perKg: 40, handling: 16 }
                ]
            },
            '德国': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 42, handling: 19 },
                    { min: 0.301, max: 1, perKg: 39, handling: 22 },
                    { min: 1.001, max: 30, perKg: 41, handling: 22 }
                ]
            },
            '法国': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 54, handling: 20 },
                    { min: 0.301, max: 2, perKg: 50, handling: 21 },
                    { min: 2.001, max: 30, perKg: 50, handling: 21 }
                ]
            },
            '意大利': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 45, handling: 25 },
                    { min: 0.501, max: 2, perKg: 47, handling: 24 },
                    { min: 2.001, max: 5, perKg: 49, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 48, handling: 18 },
                    { min: 0.251, max: 2, perKg: 48, handling: 18 },
                    { min: 2.001, max: 5, perKg: 48, handling: 18 },
                    { min: 5.001, max: 30, perKg: 48, handling: 18 }
                ]
            },
            '加拿大': {
                code: 'WBPHFZ',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 53, handling: 23 },
                    { min: 0.101, max: 0.5, perKg: 53, handling: 24 },
                    { min: 0.501, max: 0.75, perKg: 53, handling: 25 },
                    { min: 0.751, max: 1, perKg: 53, handling: 27 },
                    { min: 1.001, max: 1.5, perKg: 61, handling: 27 },
                    { min: 1.501, max: 2, perKg: 61, handling: 27 },
                    { min: 2.001, max: 30, perKg: 62, handling: 27 }
                ]
            },
            '波兰': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 67, handling: 11 },
                    { min: 0.201, max: 2, perKg: 53, handling: 15 },
                    { min: 2.001, max: 30, perKg: 53, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: 'L<60cm, L+W+H<=90cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 46, handling: 20 },
                    { min: 0.501, max: 2, perKg: 44, handling: 20 },
                    { min: 2.001, max: 30, perKg: 44, handling: 20 }
                ]
            },
            '比利时': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 77, handling: 23 },
                    { min: 0.401, max: 2, perKg: 63, handling: 21 },
                    { min: 2.001, max: 30, perKg: 63, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 15,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 58, handling: 26 },
                    { min: 0.301, max: 2, perKg: 48, handling: 21 },
                    { min: 2.001, max: 15, perKg: 45, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 67, handling: 23 },
                    { min: 0.501, max: 30, perKg: 52, handling: 23 }
                ]
            },
            '捷克': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 52, handling: 22 },
                    { min: 0.501, max: 30, perKg: 52, handling: 22 }
                ]
            },
            '斯洛伐克': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 47, handling: 21 },
                    { min: 0.501, max: 30, perKg: 47, handling: 21 }
                ]
            },
            '匈牙利': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 42, handling: 21 },
                    { min: 0.501, max: 30, perKg: 47, handling: 21 }
                ]
            },
            '芬兰': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 90, handling: 32 },
                    { min: 0.501, max: 10, perKg: 80, handling: 32 }
                ]
            },
            '克罗地亚': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 62, handling: 26 },
                    { min: 0.501, max: 2, perKg: 62, handling: 26 }
                ]
            },
            '立陶宛': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: 'L≤60cm, W≤58cm, H≤36cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 74, handling: 21 },
                    { min: 0.501, max: 10, perKg: 67, handling: 21 }
                ]
            },
            '卢森堡': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 72, handling: 30 },
                    { min: 0.301, max: 2, perKg: 67, handling: 28 }
                ]
            },
            '拉脱维亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 70, handling: 21 },
                    { min: 0.501, max: 10, perKg: 68, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 52, handling: 26 },
                    { min: 0.501, max: 2, perKg: 62, handling: 26 }
                ]
            },
            '保加利亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 75, handling: 18 },
                    { min: 0.501, max: 30, perKg: 57, handling: 18 }
                ]
            },
            '罗马尼亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 47, handling: 20 },
                    { min: 0.501, max: 30, perKg: 47, handling: 20 }
                ]
            },
            '丹麦': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 67, handling: 36 },
                    { min: 0.301, max: 1, perKg: 65, handling: 36 },
                    { min: 1.001, max: 20, perKg: 60, handling: 30 }
                ]
            },
            '瑞典': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 54, handling: 21 },
                    { min: 0.501, max: 1, perKg: 58, handling: 21 },
                    { min: 1.001, max: 2, perKg: 60, handling: 21 }
                ]
            },
            '爱尔兰': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 25,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 53, handling: 23 },
                    { min: 0.501, max: 25, perKg: 48, handling: 23 }
                ]
            },
            '希腊': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 60, handling: 18 },
                    { min: 0.501, max: 10, perKg: 60, handling: 18 }
                ]
            },
            '瑞士': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 144, handling: 18 },
                    { min: 0.501, max: 1, perKg: 92, handling: 18 },
                    { min: 1.001, max: 5, perKg: 77, handling: 18 }
                ]
            },
            '挪威': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 102, handling: 32 },
                    { min: 0.501, max: 2, perKg: 97, handling: 32 }
                ]
            },
            '爱沙尼亚': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 64, handling: 21 },
                    { min: 0.501, max: 10, perKg: 68, handling: 21 }
                ]
            },
            '马耳他': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 112, handling: 30 },
                    { min: 0.501, max: 2, perKg: 102, handling: 30 }
                ]
            },
            '塞浦路斯': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 102, handling: 24 },
                    { min: 0.501, max: 2, perKg: 102, handling: 24 }
                ]
            },
            '冰岛': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 132, handling: 35 },
                    { min: 0.501, max: 2, perKg: 132, handling: 35 }
                ]
            },
            '澳大利亚': {
                code: 'WBPHFZ',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重',
                zones: {
                    '1区': [
                        { min: 0, max: 0.25, perKg: 27, handling: 24 },
                        { min: 0.251, max: 0.5, perKg: 27, handling: 24 },
                        { min: 0.501, max: 1, perKg: 27, handling: 26 },
                        { min: 1.001, max: 2, perKg: 27, handling: 20 },
                        { min: 2.001, max: 20, perKg: 27, handling: 20 }
                    ],
                    '2区': [
                        { min: 0, max: 0.25, perKg: 36, handling: 29 },
                        { min: 0.251, max: 0.5, perKg: 36, handling: 29 },
                        { min: 0.501, max: 1, perKg: 36, handling: 29 },
                        { min: 1.001, max: 2, perKg: 36, handling: 27 },
                        { min: 2.001, max: 20, perKg: 36, handling: 27 }
                    ],
                    '3区': [
                        { min: 0, max: 0.25, perKg: 51, handling: 50 },
                        { min: 0.251, max: 0.5, perKg: 51, handling: 50 },
                        { min: 0.501, max: 1, perKg: 51, handling: 60 },
                        { min: 1.001, max: 2, perKg: 46, handling: 60 },
                        { min: 2.001, max: 20, perKg: 46, handling: 60 }
                    ],
                    '4区': [
                        { min: 0, max: 0.25, perKg: 57, handling: 60 },
                        { min: 0.251, max: 0.5, perKg: 57, handling: 60 },
                        { min: 0.501, max: 1, perKg: 68, handling: 85 },
                        { min: 1.001, max: 2, perKg: 68, handling: 85 },
                        { min: 2.001, max: 20, perKg: 68, handling: 85 }
                    ]
                }
            },
            '巴西': {
                code: 'WBPHFZ',
                timeframe: '15-25工作日',
                weightLimit: 20,
                sizeLimit: 'L<=60cm, L+W+H<=90cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 92, handling: 35 },
                    { min: 0.201, max: 0.5, perKg: 92, handling: 38 },
                    { min: 0.501, max: 2, perKg: 95, handling: 40 },
                    { min: 2.001, max: 20, perKg: 95, handling: 45 }
                ]
            },
            '新西兰': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 72, handling: 17 },
                    { min: 0.501, max: 2, perKg: 72, handling: 17 },
                    { min: 2.001, max: 30, perKg: 72, handling: 17 }
                ]
            },
            '日本': {
                code: 'EUSLPHR',
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                note: '重量按0.5KG进位，长*宽*高/6000',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 31,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 8 },
                    { min: 2.001, max: 10, continuePrice: 11 }
                ]
            }
        };
    }

    getWanbaoElectricData() {
        // 基于万邦专线挂号带电完整数据
        return {
            '美国': {
                code: 'USECSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 110, handling: 24 },
                    { min: 0.101, max: 0.2, perKg: 108, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 102, handling: 20 },
                    { min: 0.301, max: 0.45, perKg: 100, handling: 20 },
                    { min: 0.451, max: 0.7, perKg: 94, handling: 20 },
                    { min: 0.701, max: 2, perKg: 88, handling: 13 },
                    { min: 2.001, max: 30, perKg: 86, handling: 13 }
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
                    { min: 0.301, max: 2, perKg: 43, handling: 16 },
                    { min: 2.001, max: 20, perKg: 47, handling: 16 }
                ]
            },
            '德国': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 54, handling: 19 },
                    { min: 0.301, max: 2, perKg: 51, handling: 22 },
                    { min: 2.001, max: 30, perKg: 51, handling: 22 }
                ]
            },
            '法国': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 57, handling: 21 },
                    { min: 0.301, max: 2, perKg: 55, handling: 21 },
                    { min: 2.001, max: 30, perKg: 55, handling: 21 }
                ]
            },
            '意大利': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 50, handling: 25 },
                    { min: 0.501, max: 2, perKg: 52, handling: 24 },
                    { min: 2.001, max: 5, perKg: 54, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'EUSLR',
                timeframe: '6-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 56, handling: 21 },
                    { min: 0.251, max: 0.5, perKg: 56, handling: 18 },
                    { min: 0.501, max: 2, perKg: 56, handling: 18 },
                    { min: 2.001, max: 30, perKg: 56, handling: 18 }
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
                    { min: 0.101, max: 0.5, perKg: 66, handling: 24 },
                    { min: 0.501, max: 0.75, perKg: 70, handling: 25 },
                    { min: 0.751, max: 1, perKg: 70, handling: 27 },
                    { min: 1.001, max: 1.5, perKg: 70, handling: 27 },
                    { min: 1.501, max: 2, perKg: 70, handling: 27 },
                    { min: 2.001, max: 30, perKg: 70, handling: 27 }
                ]
            },
            '波兰': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 69, handling: 11 },
                    { min: 0.201, max: 2, perKg: 60, handling: 15 },
                    { min: 2.001, max: 30, perKg: 55, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 58, handling: 20 },
                    { min: 0.501, max: 2, perKg: 56, handling: 20 },
                    { min: 2.001, max: 30, perKg: 56, handling: 20 }
                ]
            },
            '比利时': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 88, handling: 23 },
                    { min: 0.401, max: 2, perKg: 71, handling: 21 },
                    { min: 2.001, max: 30, perKg: 71, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 15,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 73, handling: 26 },
                    { min: 0.301, max: 2, perKg: 63, handling: 21 },
                    { min: 2.001, max: 15, perKg: 63, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 80, handling: 23 },
                    { min: 0.501, max: 30, perKg: 54, handling: 23 }
                ]
            },
            '捷克': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 54, handling: 22 },
                    { min: 0.501, max: 30, perKg: 54, handling: 22 }
                ]
            },
            '斯洛伐克': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 49, handling: 21 },
                    { min: 0.501, max: 30, perKg: 49, handling: 21 }
                ]
            },
            '匈牙利': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 44, handling: 21 },
                    { min: 0.501, max: 30, perKg: 49, handling: 21 }
                ]
            },
            '芬兰': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 92, handling: 32 },
                    { min: 0.501, max: 10, perKg: 82, handling: 32 }
                ]
            },
            '克罗地亚': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 64, handling: 26 },
                    { min: 0.501, max: 2, perKg: 64, handling: 26 }
                ]
            },
            '立陶宛': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: 'L≤60cm, W≤58cm, H≤36cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 76, handling: 21 },
                    { min: 0.501, max: 10, perKg: 69, handling: 21 }
                ]
            },
            '卢森堡': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 74, handling: 30 },
                    { min: 0.301, max: 2, perKg: 69, handling: 28 }
                ]
            },
            '拉脱维亚': {
                code: 'EUSLR',
                timeframe: '10-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 72, handling: 21 },
                    { min: 0.501, max: 10, perKg: 70, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: 'EUSLR',
                timeframe: '10-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 54, handling: 26 },
                    { min: 0.501, max: 2, perKg: 64, handling: 26 }
                ]
            },
            '保加利亚': {
                code: 'EUSLR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 77, handling: 18 },
                    { min: 0.501, max: 30, perKg: 59, handling: 18 }
                ]
            },
            '罗马尼亚': {
                code: 'EUSLR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 49, handling: 20 },
                    { min: 0.501, max: 30, perKg: 49, handling: 20 }
                ]
            },
            '丹麦': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 69, handling: 36 },
                    { min: 0.301, max: 1, perKg: 67, handling: 36 },
                    { min: 1.001, max: 20, perKg: 62, handling: 30 }
                ]
            },
            '瑞典': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 56, handling: 21 },
                    { min: 0.501, max: 1, perKg: 60, handling: 21 },
                    { min: 1.001, max: 2, perKg: 62, handling: 21 }
                ]
            },
            '爱尔兰': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 25,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 57, handling: 23 },
                    { min: 0.501, max: 25, perKg: 52, handling: 23 }
                ]
            },
            '希腊': {
                code: 'EUSLR',
                timeframe: '12-15工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 62, handling: 18 },
                    { min: 0.501, max: 10, perKg: 62, handling: 18 }
                ]
            },
            '瑞士': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 146, handling: 18 },
                    { min: 0.501, max: 1, perKg: 94, handling: 18 },
                    { min: 1.001, max: 5, perKg: 79, handling: 18 }
                ]
            },
            '挪威': {
                code: 'EUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 104, handling: 32 },
                    { min: 0.501, max: 2, perKg: 99, handling: 32 }
                ]
            },
            '爱沙尼亚': {
                code: 'EUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 66, handling: 21 },
                    { min: 0.501, max: 10, perKg: 70, handling: 21 }
                ]
            },
            '马耳他': {
                code: 'EUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 114, handling: 30 },
                    { min: 0.501, max: 2, perKg: 104, handling: 30 }
                ]
            },
            '塞浦路斯': {
                code: 'EUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 104, handling: 24 },
                    { min: 0.501, max: 2, perKg: 104, handling: 24 }
                ]
            },
            '冰岛': {
                code: 'EUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 134, handling: 35 },
                    { min: 0.501, max: 2, perKg: 134, handling: 35 }
                ]
            },
            '澳大利亚': {
                code: 'EUSLR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重',
                zones: {
                    '1区': [
                        { min: 0, max: 0.25, perKg: 48, handling: 24 },
                        { min: 0.251, max: 0.5, perKg: 48, handling: 24 },
                        { min: 0.501, max: 1, perKg: 48, handling: 26 },
                        { min: 1.001, max: 2, perKg: 50, handling: 20 },
                        { min: 2.001, max: 20, perKg: 50, handling: 20 }
                    ],
                    '2区': [
                        { min: 0, max: 0.25, perKg: 57, handling: 29 },
                        { min: 0.251, max: 0.5, perKg: 57, handling: 29 },
                        { min: 0.501, max: 1, perKg: 57, handling: 29 },
                        { min: 1.001, max: 2, perKg: 57, handling: 27 },
                        { min: 2.001, max: 20, perKg: 57, handling: 27 }
                    ],
                    '3区': [
                        { min: 0, max: 0.25, perKg: 66, handling: 50 },
                        { min: 0.251, max: 0.5, perKg: 66, handling: 50 },
                        { min: 0.501, max: 1, perKg: 66, handling: 60 },
                        { min: 1.001, max: 2, perKg: 66, handling: 60 },
                        { min: 2.001, max: 20, perKg: 66, handling: 60 }
                    ],
                    '4区': [
                        { min: 0, max: 0.25, perKg: 76, handling: 60 },
                        { min: 0.251, max: 0.5, perKg: 76, handling: 60 },
                        { min: 0.501, max: 1, perKg: 84, handling: 85 },
                        { min: 1.001, max: 2, perKg: 82, handling: 85 },
                        { min: 2.001, max: 20, perKg: 82, handling: 85 }
                    ]
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
                    { min: 0.501, max: 10, perKg: 84, handling: 20 }
                ]
            },
            '巴西': {
                code: 'EUSLR',
                timeframe: '15-25工作日',
                weightLimit: 20,
                sizeLimit: 'L<=60cm, L+W+H<=90cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 96, handling: 35 },
                    { min: 0.201, max: 0.5, perKg: 96, handling: 38 },
                    { min: 0.501, max: 2, perKg: 99, handling: 40 },
                    { min: 2.001, max: 20, perKg: 98, handling: 45 }
                ]
            },
            '新西兰': {
                code: 'EUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 86, handling: 17 },
                    { min: 0.501, max: 2, perKg: 86, handling: 17 },
                    { min: 2.001, max: 30, perKg: 86, handling: 17 }
                ]
            },
            '日本': {
                code: 'EUSLR',
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                note: '重量按0.5KG进位，长*宽*高/6000',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 33,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 11 },
                    { min: 2.001, max: 10, continuePrice: 14 }
                ]
            }
        };
    }

    // 云途物流数据...
    getYuntuClothingData() {
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

    // 继续添加其他公司数据...
    getYanwenTrackingData() {
        return {
            '美国': {
                code: '481',
                timeframe: '工作日',
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
            '日本': {
                code: '481',
                timeframe: '工作日',
                weightLimit: 10,
                note: '重量按0.5KG进位',
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
                timeframe: '工作日',
                weightLimit: 22,
                note: '最小计费重量0.001KG',
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
            }
        };
    }

    // 华翰物流数据
    getHuahanStandardData() {
        return {
            '美国（包税）': {
                code: 'PK0377',
                timeframe: '12-18工作日',
                weightLimit: 2,
                sizeLimit: '最长边+2*(宽+高)≤120cm, 单边长≤55cm, 最小尺寸≥15x10x1cm',
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
                sizeLimit: '最长边≤60cm；长+宽+高≤90cm, 最小尺寸≥15x10x1cm',
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
                sizeLimit: '最大尺寸≤60x40x40cm, 最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 5, perKg: 82, handling: 19 }
                ]
            },
            '德国': {
                code: 'PK0377',
                timeframe: '10-16工作日',
                weightLimit: 2,
                sizeLimit: '最大尺寸≤45*45*35cm, 最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 2, perKg: 72, handling: 32 }
                ]
            },
            '澳大利亚': {
                code: 'PK0377',
                timeframe: '7-9工作日',
                weightLimit: 5,
                sizeLimit: '最大尺寸≤60x40x40cm, 最小尺寸≥15x10x1cm',
                priceRanges: [
                    { min: 0.05, max: 5, perKg: 92, handling: 42 }
                ]
            }
        };
    }

    // 云途化妆品专线数据
    getYuntuCosmeticData() {
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
            '澳大利亚': {
                code: 'MUZXR',
                timeframe: '5-10工作日',
                weightLimit: 20,
                zones: {
                    '1区': [
                        { min: 0, max: 0.3, perKg: 40, handling: 21 },
                        { min: 0.3, max: 0.5, perKg: 40, handling: 24 },
                        { min: 0.5, max: 1, perKg: 40, handling: 25 },
                        { min: 1, max: 3, perKg: 40, handling: 27 },
                        { min: 3, max: 20, perKg: 40, handling: 42 }
                    ],
                    '2区': [
                        { min: 0, max: 0.3, perKg: 40, handling: 29 },
                        { min: 0.3, max: 0.5, perKg: 40, handling: 30 },
                        { min: 0.5, max: 1, perKg: 40, handling: 34 },
                        { min: 1, max: 3, perKg: 40, handling: 36 },
                        { min: 3, max: 20, perKg: 40, handling: 53 }
                    ],
                    '3区': [
                        { min: 0, max: 0.3, perKg: 40, handling: 50 },
                        { min: 0.3, max: 0.5, perKg: 40, handling: 51 },
                        { min: 0.5, max: 1, perKg: 40, handling: 74 },
                        { min: 1, max: 3, perKg: 40, handling: 76 },
                        { min: 3, max: 20, perKg: 40, handling: 115 }
                    ],
                    '4区': [
                        { min: 0, max: 0.3, perKg: 51, handling: 52 },
                        { min: 0.3, max: 0.5, perKg: 51, handling: 52 },
                        { min: 0.5, max: 1, perKg: 51, handling: 95 },
                        { min: 1, max: 3, perKg: 51, handling: 120 },
                        { min: 3, max: 20, perKg: 51, handling: 150 }
                    ]
                }
            }
        };
    }

    getYuntuStandardGeneralData() {
        return {
            '美国': {
                code: 'BKPHR',
                timeframe: '5-8工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 107, handling: 28 },
                    { min: 0.1, max: 0.2, perKg: 105, handling: 29 },
                    { min: 0.2, max: 0.3, perKg: 103, handling: 31 },
                    { min: 0.3, max: 0.45, perKg: 101, handling: 32 },
                    { min: 0.45, max: 0.9, perKg: 99, handling: 42 },
                    { min: 0.9, max: 1.35, perKg: 97, handling: 42 },
                    { min: 1.35, max: 2, perKg: 95, handling: 42 },
                    { min: 2, max: 30, perKg: 93, handling: 42 }
                ]
            },
            '英国': {
                code: 'BKPHR',
                timeframe: '3-5工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 51, handling: 18 },
                    { min: 0.3, max: 0.5, perKg: 53, handling: 18 },
                    { min: 0.5, max: 1, perKg: 53, handling: 18 },
                    { min: 1, max: 5, perKg: 55, handling: 18 }
                ]
            },
            '日本': {
                code: 'BKPHR',
                timeframe: '2-3工作日',
                weightLimit: 5,
                note: '重量按0.5KG进位',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 31,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 4 },
                    { min: 2, max: 5, continuePrice: 5 }
                ]
            }
        };
    }

    getYuntuStandardElectricData() {
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
            }
        };
    }

    getYuntuEconomyGeneralData() {
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
            }
        };
    }

    getYuntuEconomyElectricData() {
        return {
            '美国': {
                code: 'THZXR',
                timeframe: '8-15工作日',
                weightLimit: 30,
                note: '最低计费重0.03KG',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 111, handling: 24 },
                    { min: 0.101, max: 0.2, perKg: 104, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 105, handling: 20 },
                    { min: 0.301, max: 0.45, perKg: 104, handling: 20 },
                    { min: 0.451, max: 0.7, perKg: 101, handling: 20 },
                    { min: 0.701, max: 2, perKg: 100, handling: 13 },
                    { min: 2.001, max: 30, perKg: 100, handling: 13 }
                ]
            },
            '英国': {
                code: 'THZXR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 51, handling: 16 },
                    { min: 0.301, max: 0.5, perKg: 53, handling: 16 },
                    { min: 0.501, max: 1, perKg: 53, handling: 16 },
                    { min: 1.001, max: 20, perKg: 55, handling: 16 }
                ]
            },
            '法国': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 74, handling: 19 },
                    { min: 0.401, max: 2, perKg: 72, handling: 23 },
                    { min: 2.001, max: 30, perKg: 72, handling: 23 }
                ]
            },
            '德国': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 62, handling: 19 },
                    { min: 0.301, max: 30, perKg: 62, handling: 22 }
                ]
            },
            '意大利': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 60, handling: 25 },
                    { min: 2.001, max: 30, perKg: 62, handling: 25 }
                ]
            },
            '西班牙': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 64, handling: 18 },
                    { min: 2.001, max: 30, perKg: 67, handling: 18 }
                ]
            },
            '荷兰': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 84, handling: 21 },
                    { min: 0.101, max: 0.2, perKg: 77, handling: 23 },
                    { min: 0.201, max: 2, perKg: 74, handling: 23 },
                    { min: 2.001, max: 20, perKg: 66, handling: 23 }
                ]
            },
            '比利时': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 76, handling: 23 },
                    { min: 0.201, max: 2, perKg: 76, handling: 21 },
                    { min: 2.001, max: 20, perKg: 65, handling: 21 }
                ]
            },
            '卢森堡': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 100, handling: 27 },
                    { min: 0.201, max: 2, perKg: 97, handling: 26 },
                    { min: 2.001, max: 20, perKg: 95, handling: 26 }
                ]
            },
            '爱尔兰': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 2, perKg: 83, handling: 23 },
                    { min: 2.001, max: 20, perKg: 83, handling: 23 }
                ]
            },
            '保加利亚': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 86, handling: 18 },
                    { min: 2.001, max: 30, perKg: 86, handling: 18 }
                ]
            },
            '克罗地亚': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 88, handling: 26 },
                    { min: 2.001, max: 30, perKg: 88, handling: 26 }
                ]
            },
            '捷克': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 60, handling: 21 },
                    { min: 2.001, max: 30, perKg: 66, handling: 21 }
                ]
            },
            '爱沙尼亚': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 72, handling: 20 },
                    { min: 2.001, max: 30, perKg: 76, handling: 20 }
                ]
            },
            '芬兰': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 78, handling: 26 },
                    { min: 2.001, max: 30, perKg: 76, handling: 26 }
                ]
            },
            '匈牙利': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 69, handling: 21 },
                    { min: 2.001, max: 30, perKg: 75, handling: 21 }
                ]
            },
            '拉脱维亚': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 77, handling: 20 },
                    { min: 2.001, max: 30, perKg: 78, handling: 20 }
                ]
            },
            '立陶宛': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 73, handling: 20 },
                    { min: 2.001, max: 30, perKg: 76, handling: 20 }
                ]
            },
            '马耳他': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 143, handling: 30 },
                    { min: 2.001, max: 30, perKg: 143, handling: 30 }
                ]
            },
            '波兰': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 69, handling: 13 },
                    { min: 0.201, max: 2, perKg: 66, handling: 15 },
                    { min: 2.001, max: 30, perKg: 66, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 75, handling: 20 },
                    { min: 2.001, max: 30, perKg: 78, handling: 20 }
                ]
            },
            '罗马尼亚': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 87, handling: 20 },
                    { min: 2.001, max: 30, perKg: 86, handling: 20 }
                ]
            },
            '斯洛伐克': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 83, handling: 21 },
                    { min: 2.001, max: 30, perKg: 86, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 84, handling: 26 },
                    { min: 2.001, max: 30, perKg: 84, handling: 26 }
                ]
            },
            '瑞典': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 63, handling: 16 },
                    { min: 0.301, max: 2, perKg: 65, handling: 21 },
                    { min: 2.001, max: 20, perKg: 65, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 2, perKg: 66, handling: 23 },
                    { min: 2.001, max: 30, perKg: 66, handling: 23 }
                ]
            },
            '丹麦': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 15,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 92, handling: 24 },
                    { min: 0.301, max: 2, perKg: 76, handling: 24 },
                    { min: 2.001, max: 15, perKg: 67, handling: 24 }
                ]
            },
            '南非': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '进位制0.01',
                priceRanges: [
                    { min: 0, max: 2, perKg: 161, handling: 28 },
                    { min: 2.001, max: 10, perKg: 161, handling: 28 }
                ]
            },
            '巴西': {
                code: 'THZXR',
                timeframe: '15-25工作日（受巴西PRC政策影响，预计延误7-10工作日）',
                weightLimit: 10,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 93, handling: 35 },
                    { min: 0.201, max: 0.5, perKg: 93, handling: 35 },
                    { min: 0.501, max: 1, perKg: 93, handling: 37 },
                    { min: 1.001, max: 1.5, perKg: 93, handling: 45 },
                    { min: 1.501, max: 2, perKg: 93, handling: 49 },
                    { min: 2.001, max: 5, perKg: 93, handling: 60 },
                    { min: 5.001, max: 10, perKg: 93, handling: 100 }
                ]
            },
            '希腊': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 92, handling: 18 }
                ]
            },
            '瑞士': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 150, handling: 18 },
                    { min: 0.101, max: 0.2, perKg: 113, handling: 18 },
                    { min: 0.201, max: 0.5, perKg: 112, handling: 18 },
                    { min: 0.501, max: 5, perKg: 98, handling: 18 }
                ]
            },
            '挪威': {
                code: 'THZXR',
                timeframe: '8-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 84, handling: 21 },
                    { min: 0.101, max: 0.3, perKg: 69, handling: 20 },
                    { min: 0.301, max: 5, perKg: 64, handling: 20 }
                ]
            },
            '墨西哥': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '最低计费重0.02KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 70, handling: 17 },
                    { min: 0.201, max: 0.5, perKg: 70, handling: 18 },
                    { min: 0.501, max: 1, perKg: 70, handling: 18 },
                    { min: 1.001, max: 3, perKg: 70, handling: 20 },
                    { min: 3.001, max: 10, perKg: 70, handling: 20 }
                ]
            },
            '新加坡': {
                code: 'THZXR',
                timeframe: '5-6工作日',
                weightLimit: 30,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 40, handling: 16 }
                ]
            },
            '马来西亚': {
                code: 'THZXR',
                timeframe: '8-10工作日（东马9-12工作日）',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 27, handling: 16 }
                ]
            },
            '泰国': {
                code: 'THZXR',
                timeframe: '5-8工作日',
                weightLimit: 25,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 25, perKg: 24, handling: 8 }
                ]
            },
            '越南': {
                code: 'THZXR',
                timeframe: '5-6工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 26, handling: 11 }
                ]
            },
            '菲律宾': {
                code: 'THZXR',
                timeframe: '8-10工作日',
                weightLimit: 10,
                note: '进位制0.1KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 1, perKg: 51, handling: 15 },
                    { min: 1.001, max: 10, perKg: 48, handling: 50 }
                ]
            },
            '智利': {
                code: 'THZXR',
                timeframe: '19-21工作日',
                weightLimit: 20,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 95, handling: 23 },
                    { min: 0.501, max: 20, perKg: 110, handling: 25 }
                ]
            },
            '哥伦比亚': {
                code: 'THZXR',
                timeframe: '19-21工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 20, perKg: 134, handling: 27 }
                ]
            },
            '以色列': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 78, handling: 26 }
                ]
            },
            '塞浦路斯': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 132, handling: 29 }
                ]
            },
            '土耳其': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 30,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 108, handling: 30 },
                    { min: 0.201, max: 0.5, perKg: 101, handling: 23 },
                    { min: 0.501, max: 1, perKg: 101, handling: 23 },
                    { min: 1.001, max: 30, perKg: 101, handling: 23 }
                ]
            },
            '韩国': {
                code: 'THZXR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 2, perKg: 44, handling: 17.5 },
                    { min: 2.001, max: 20, perKg: 44, handling: 20 }
                ]
            },
            '新西兰': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 25,
                priceRanges: [
                    { min: 0, max: 25, perKg: 89, handling: 17 }
                ]
            },
            '巴基斯坦': {
                code: 'THZXR',
                timeframe: '11-13工作日',
                weightLimit: 5,
                note: '进位制0.01-0.5KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 100, handling: 8 },
                    { min: 2.001, max: 5, perKg: 99, handling: 8 }
                ]
            },
            '尼日利亚': {
                code: 'THZXR',
                timeframe: '13-16工作日',
                weightLimit: 30,
                note: '进位制0.01-1KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 115, handling: 22 },
                    { min: 2.001, max: 10, perKg: 114, handling: 22 },
                    { min: 10.001, max: 30, perKg: 113, handling: 22 }
                ]
            },
            '加纳': {
                code: 'THZXR',
                timeframe: '13-16工作日',
                weightLimit: 30,
                note: '进位制0.01-1KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 143, handling: 22 },
                    { min: 2.001, max: 10, perKg: 142, handling: 22 },
                    { min: 10.001, max: 30, perKg: 141, handling: 22 }
                ]
            },
            '乌干达': {
                code: 'THZXR',
                timeframe: '13-16工作日',
                weightLimit: 30,
                note: '进位制0.01-1KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 143, handling: 22 },
                    { min: 2.001, max: 10, perKg: 142, handling: 22 },
                    { min: 10.001, max: 30, perKg: 141, handling: 22 }
                ]
            },
            '肯尼亚': {
                code: 'THZXR',
                timeframe: '13-16工作日',
                weightLimit: 30,
                note: '进位制0.01-1KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 110, handling: 22 },
                    { min: 2.001, max: 10, perKg: 109, handling: 22 },
                    { min: 10.001, max: 30, perKg: 108, handling: 22 }
                ]
            },
            '坦桑尼亚': {
                code: 'THZXR',
                timeframe: '11-13工作日',
                weightLimit: 2,
                note: '进位制0.01KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 111, handling: 18 }
                ]
            },
            '卢旺达': {
                code: 'THZXR',
                timeframe: '9-13工作日',
                weightLimit: 2,
                note: '进位制0.01KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 105, handling: 18 }
                ]
            },
            '安哥拉': {
                code: 'THZXR',
                timeframe: '11-13工作日',
                weightLimit: 2,
                note: '进位制0.01KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 126, handling: 24 }
                ]
            },
            '埃及': {
                code: 'THZXR',
                timeframe: '13-16工作日',
                weightLimit: 2,
                note: '进位制0.01KG，暂停收货',
                priceRanges: [
                    { min: 0, max: 2, perKg: 310, handling: 28 }
                ]
            },
            '摩洛哥': {
                code: 'THZXR',
                timeframe: '10-15工作日',
                weightLimit: 5,
                note: '进位制0.01-0.5KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 105, handling: 46 },
                    { min: 2.001, max: 5, perKg: 104, handling: 46 }
                ]
            },
            '阿拉伯联合酋长国': {
                code: 'THZXR',
                timeframe: '6-10工作日',
                weightLimit: 10,
                note: '进位制0.1KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 38, handling: 22 },
                    { min: 2.001, max: 5, perKg: 38, handling: 22 },
                    { min: 5.001, max: 10, perKg: 38, handling: 35 }
                ]
            },
            '沙特阿拉伯': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 47, handling: 40 },
                    { min: 0.501, max: 2, perKg: 47, handling: 40 },
                    { min: 2.001, max: 5, perKg: 52, handling: 40 },
                    { min: 5.001, max: 10, perKg: 52, handling: 45 }
                ]
            },
            '科威特': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 49, handling: 75 }
                ]
            },
            '卡塔尔': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 54, handling: 45 }
                ]
            },
            '巴林': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 60, handling: 61 }
                ]
            },
            '约旦': {
                code: 'THZXR',
                timeframe: '10-14工作日',
                weightLimit: 15,
                note: '进位制0.01KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 15, perKg: 100, handling: 30 }
                ]
            },
            '黎巴嫩': {
                code: 'THZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '进位制0.01KG，暂停收货',
                priceRanges: [
                    { min: 0, max: 10, perKg: 91, handling: 40 }
                ]
            },
            '秘鲁': {
                code: 'THZXR',
                timeframe: '15-23工作日',
                weightLimit: 20,
                priceRanges: [
                    { min: 0, max: 5, perKg: 110, handling: 25 },
                    { min: 5.001, max: 20, perKg: 100, handling: 45 }
                ]
            },
            '加拿大': {
                code: 'THZXR',
                timeframe: '8-15工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.15, perKg: 68, handling: 21 },
                    { min: 0.151, max: 0.3, perKg: 69, handling: 21 },
                    { min: 0.301, max: 0.45, perKg: 69, handling: 21 },
                    { min: 0.451, max: 0.75, perKg: 71, handling: 22 },
                    { min: 0.751, max: 1, perKg: 71, handling: 22 },
                    { min: 1.001, max: 1.5, perKg: 71, handling: 23 },
                    { min: 1.501, max: 2, perKg: 76, handling: 23 },
                    { min: 2.001, max: 30, perKg: 78, handling: 23 }
                ]
            },
            '厄瓜多尔': {
                code: 'THZXR',
                timeframe: '10-15工作日',
                weightLimit: 3.9,
                priceRanges: [
                    { min: 0, max: 3.9, perKg: 170, handling: 32 }
                ]
            },
            '萨尔瓦多': {
                code: 'THZXR',
                timeframe: '15-20工作日',
                weightLimit: 10,
                note: '最低计费重0.05KG',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 115, handling: 31 },
                    { min: 0.501, max: 2, perKg: 115, handling: 34 },
                    { min: 2.001, max: 10, perKg: 115, handling: 36 }
                ]
            },
            '哥斯达黎加': {
                code: 'THZXR',
                timeframe: '15-20工作日',
                weightLimit: 10,
                priceRanges: [
                    { min: 0, max: 10, perKg: 115, handling: 35 }
                ]
            },
            '印度尼西亚': {
                code: 'THZXR',
                timeframe: '8-14工作日',
                weightLimit: 10,
                note: '进位制0.1-0.5KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 1, perKg: 125, handling: 20 },
                    { min: 1.001, max: 10, perKg: 135, handling: 50 }
                ]
            },
            '澳大利亚': {
                code: 'THZXR',
                timeframe: '5-10工作日',
                weightLimit: 20,
                zones: {
                    '1区': [
                        { min: 0, max: 0.3, perKg: 34, handling: 21 },
                        { min: 0.301, max: 0.5, perKg: 34, handling: 24 },
                        { min: 0.501, max: 1, perKg: 34, handling: 25 },
                        { min: 1.001, max: 3, perKg: 34, handling: 27 },
                        { min: 3.001, max: 20, perKg: 34, handling: 42 }
                    ],
                    '2区': [
                        { min: 0, max: 0.3, perKg: 34, handling: 29 },
                        { min: 0.301, max: 0.5, perKg: 34, handling: 30 },
                        { min: 0.501, max: 1, perKg: 34, handling: 34 },
                        { min: 1.001, max: 3, perKg: 34, handling: 36 },
                        { min: 3.001, max: 20, perKg: 34, handling: 53 }
                    ],
                    '3区': [
                        { min: 0, max: 0.3, perKg: 34, handling: 50 },
                        { min: 0.301, max: 0.5, perKg: 34, handling: 51 },
                        { min: 0.501, max: 1, perKg: 34, handling: 74 },
                        { min: 1.001, max: 3, perKg: 34, handling: 76 },
                        { min: 3.001, max: 20, perKg: 34, handling: 115 }
                    ],
                    '4区': [
                        { min: 0, max: 0.3, perKg: 45, handling: 52 },
                        { min: 0.301, max: 0.5, perKg: 45, handling: 52 },
                        { min: 0.501, max: 1, perKg: 45, handling: 95 },
                        { min: 1.001, max: 3, perKg: 45, handling: 120 },
                        { min: 3.001, max: 20, perKg: 45, handling: 150 }
                    ]
                }
            },
            '阿根廷': {
                code: 'THZXR',
                timeframe: '15-20工作日',
                weightLimit: 2,
                note: '最低计费重0.05KG',
                zones: {
                    '1区': [
                        { min: 0, max: 0.25, perKg: 130, handling: 75 },
                        { min: 0.251, max: 0.5, perKg: 130, handling: 80 },
                        { min: 0.501, max: 0.75, perKg: 130, handling: 85 },
                        { min: 0.751, max: 1, perKg: 130, handling: 90 },
                        { min: 1.001, max: 1.25, perKg: 130, handling: 95 },
                        { min: 1.251, max: 1.5, perKg: 130, handling: 100 },
                        { min: 1.501, max: 1.75, perKg: 130, handling: 105 },
                        { min: 1.751, max: 2, perKg: 130, handling: 110 }
                    ],
                    '2区': [
                        { min: 0, max: 0.25, perKg: 130, handling: 85 },
                        { min: 0.251, max: 0.5, perKg: 130, handling: 90 },
                        { min: 0.501, max: 0.75, perKg: 130, handling: 95 },
                        { min: 0.751, max: 1, perKg: 130, handling: 100 },
                        { min: 1.001, max: 1.25, perKg: 130, handling: 105 },
                        { min: 1.251, max: 1.5, perKg: 130, handling: 110 },
                        { min: 1.501, max: 1.75, perKg: 130, handling: 115 },
                        { min: 1.751, max: 2, perKg: 130, handling: 120 }
                    ],
                    '3区': [
                        { min: 0, max: 0.25, perKg: 130, handling: 100 },
                        { min: 0.251, max: 0.5, perKg: 130, handling: 105 },
                        { min: 0.501, max: 0.75, perKg: 130, handling: 110 },
                        { min: 0.751, max: 1, perKg: 130, handling: 115 },
                        { min: 1.001, max: 1.25, perKg: 130, handling: 120 },
                        { min: 1.251, max: 1.5, perKg: 130, handling: 125 },
                        { min: 1.501, max: 1.75, perKg: 130, handling: 130 },
                        { min: 1.751, max: 2, perKg: 130, handling: 135 }
                    ],
                    '4区': [
                        { min: 0, max: 0.25, perKg: 130, handling: 150 },
                        { min: 0.251, max: 0.5, perKg: 130, handling: 155 },
                        { min: 0.501, max: 0.75, perKg: 130, handling: 160 },
                        { min: 0.751, max: 1, perKg: 130, handling: 165 },
                        { min: 1.001, max: 1.25, perKg: 130, handling: 170 },
                        { min: 1.251, max: 1.5, perKg: 130, handling: 175 },
                        { min: 1.501, max: 1.75, perKg: 130, handling: 180 },
                        { min: 1.751, max: 2, perKg: 130, handling: 185 }
                    ]
                }
            },
            '日本': {
                code: 'THZXR',
                timeframe: '4-5工作日',
                weightLimit: 10,
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 32,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 7 },
                    { min: 2.001, max: 10, continuePrice: 8 }
                ]
            }
        };
    }

    getYuntuBulkData() {
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
            '英国': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 105, handling: 49 }
                ]
            },
            '德国': {
                code: 'DHZXR',
                timeframe: '7-14工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 30, perKg: 115, handling: 30 }
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

    calculateShipping(company, service, country, weight, zone = null) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData) return null;

        try {
            // 处理分区计算
            if (countryData.zones && zone) {
                const zoneData = countryData.zones[zone];
                if (!zoneData) return null;
                return this.calculatePrice(zoneData, weight, countryData);
            }

            // 处理首重续重计算
            if (countryData.calculationType === 'firstContinue') {
                return this.calculateFirstContinuePrice(countryData, weight);
            }

            // 处理标准重量段计算
            return this.calculatePrice(countryData.priceRanges, weight, countryData);
        } catch (error) {
            console.error('计算错误:', error);
            return null;
        }
    }

    calculatePrice(priceRanges, weight, countryData) {
        const range = priceRanges.find(r => weight >= r.min && weight <= r.max);
        if (!range) return null;

        const totalPrice = weight * range.perKg + range.handling;
        
        return {
            company: this.getCurrentCompany(),
            service: this.getCurrentService(),
            country: this.getCurrentCountry(),
            weight: weight,
            zone: this.getCurrentZone(),
            weightFee: weight * range.perKg,
            handlingFee: range.handling,
            totalPrice: totalPrice,
            timeframe: countryData.timeframe,
            weightLimit: countryData.weightLimit,
            sizeLimit: countryData.sizeLimit,
            note: countryData.note || '',
            details: `运费: ${(weight * range.perKg).toFixed(2)}元 + 操作费: ${range.handling}元 = 总计: ${totalPrice.toFixed(2)}元`
        };
    }

    calculateFirstContinuePrice(countryData, weight) {
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

        return {
            company: this.getCurrentCompany(),
            service: this.getCurrentService(),
            country: this.getCurrentCountry(),
            weight: weight,
            firstWeight: firstWeight,
            firstPrice: firstPrice,
            continuePrice: continuePrice,
            totalPrice: totalPrice,
            timeframe: countryData.timeframe,
            weightLimit: countryData.weightLimit,
            sizeLimit: countryData.sizeLimit,
            note: countryData.note || '',
            details: `首重${firstWeight}KG: ${firstPrice}元 + 续重: ${(totalPrice - firstPrice).toFixed(2)}元 = 总计: ${totalPrice.toFixed(2)}元`
        };
    }

    compareAllPrices(country, weight, zone = null) {
        const results = [];
        
        for (const company of this.getCompanies()) {
            for (const service of this.getServices(company)) {
                const countries = this.getCountries(company, service);
                if (!countries.includes(country)) continue;

                this.setCurrentContext(company, service, country, zone);
                
                const countryData = this.getCountryData(company, service, country);
                if (!countryData) continue;

                // 检查重量限制
                if (countryData.weightLimit && weight > countryData.weightLimit) continue;

                if (countryData.zones) {
                    // 有分区的情况
                    if (zone) {
                        const result = this.calculateShipping(company, service, country, weight, zone);
                        if (result) results.push(result);
                    } else {
                        // 计算所有分区
                        for (const z of this.getZones(company, service, country)) {
                            const result = this.calculateShipping(company, service, country, weight, z);
                            if (result) {
                                result.zone = z;
                                results.push(result);
                            }
                        }
                    }
                } else {
                    // 无分区的情况
                    const result = this.calculateShipping(company, service, country, weight);
                    if (result) results.push(result);
                }
            }
        }

        // 按价格排序
        results.sort((a, b) => a.totalPrice - b.totalPrice);
        
        return results;
    }

    setCurrentContext(company, service, country, zone) {
        this.currentCompany = company;
        this.currentService = service;
        this.currentCountry = country;
        this.currentZone = zone;
    }

    getCurrentCompany() { return this.currentCompany || ''; }
    getCurrentService() { return this.currentService || ''; }
    getCurrentCountry() { return this.currentCountry || ''; }
    getCurrentZone() { return this.currentZone || null; }

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

    getWanbaoCosmeticData() {
        return {
            '美国': {
                code: 'MUSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm, Min size:15*10cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 113, handling: 24 },
                    { min: 0.101, max: 0.2, perKg: 111, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 105, handling: 20 },
                    { min: 0.301, max: 0.45, perKg: 103, handling: 20 },
                    { min: 0.451, max: 0.7, perKg: 97, handling: 20 },
                    { min: 0.701, max: 2, perKg: 91, handling: 13 },
                    { min: 2.001, max: 30, perKg: 89, handling: 13 }
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
                    { min: 0.301, max: 2, perKg: 43, handling: 16 },
                    { min: 2.001, max: 20, perKg: 47, handling: 16 }
                ]
            },
            '德国': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, MIN SIZE: 15cm*11cm*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 56, handling: 19 },
                    { min: 0.301, max: 2, perKg: 53, handling: 22 },
                    { min: 2.001, max: 30, perKg: 53, handling: 22 }
                ]
            },
            '法国': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, MIN SIZE: 16cm*11cm*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 59, handling: 21 },
                    { min: 0.301, max: 2, perKg: 57, handling: 21 },
                    { min: 2.001, max: 30, perKg: 57, handling: 21 }
                ]
            },
            '意大利': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 52, handling: 25 },
                    { min: 0.501, max: 2, perKg: 54, handling: 24 },
                    { min: 2.001, max: 5, perKg: 56, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'MUSLR',
                timeframe: '7-9工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 58, handling: 21 },
                    { min: 0.251, max: 0.5, perKg: 58, handling: 18 },
                    { min: 0.501, max: 2, perKg: 58, handling: 18 },
                    { min: 2.001, max: 30, perKg: 58, handling: 18 }
                ]
            },
            '加拿大': {
                code: 'MUSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 64, handling: 23 },
                    { min: 0.101, max: 0.5, perKg: 64, handling: 24 },
                    { min: 0.501, max: 0.75, perKg: 64, handling: 25 },
                    { min: 0.751, max: 1, perKg: 64, handling: 27 },
                    { min: 1.001, max: 1.5, perKg: 72, handling: 27 },
                    { min: 1.501, max: 2, perKg: 72, handling: 27 },
                    { min: 2.001, max: 30, perKg: 73, handling: 27 }
                ]
            },
            '波兰': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 80, handling: 11 },
                    { min: 0.201, max: 2, perKg: 64, handling: 15 },
                    { min: 2.001, max: 30, perKg: 64, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: 'L<60cm, L+W+H<=90cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 57, handling: 20 },
                    { min: 0.501, max: 2, perKg: 55, handling: 20 },
                    { min: 2.001, max: 30, perKg: 55, handling: 20 }
                ]
            },
            '比利时': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 90, handling: 23 },
                    { min: 0.401, max: 2, perKg: 74, handling: 21 },
                    { min: 2.001, max: 30, perKg: 74, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 15,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 71, handling: 26 },
                    { min: 0.301, max: 2, perKg: 59, handling: 21 },
                    { min: 2.001, max: 15, perKg: 56, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 82, handling: 23 },
                    { min: 0.501, max: 30, perKg: 56, handling: 23 }
                ]
            },
            '捷克': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 56, handling: 22 },
                    { min: 0.501, max: 30, perKg: 56, handling: 22 }
                ]
            },
            '斯洛伐克': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 51, handling: 21 },
                    { min: 0.501, max: 30, perKg: 51, handling: 21 }
                ]
            },
            '匈牙利': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 46, handling: 21 },
                    { min: 0.501, max: 30, perKg: 51, handling: 21 }
                ]
            },
            '芬兰': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 103, handling: 32 },
                    { min: 0.501, max: 10, perKg: 93, handling: 32 }
                ]
            },
            '克罗地亚': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 66, handling: 26 },
                    { min: 0.501, max: 2, perKg: 66, handling: 26 }
                ]
            },
            '立陶宛': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: 'L≤60cm, W≤58cm, H≤36cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 78, handling: 21 },
                    { min: 0.501, max: 10, perKg: 71, handling: 21 }
                ]
            },
            '卢森堡': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 76, handling: 30 },
                    { min: 0.301, max: 2, perKg: 71, handling: 28 }
                ]
            },
            '拉脱维亚': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 74, handling: 21 },
                    { min: 0.501, max: 10, perKg: 72, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 56, handling: 26 },
                    { min: 0.501, max: 2, perKg: 66, handling: 26 }
                ]
            },
            '保加利亚': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 79, handling: 18 },
                    { min: 0.501, max: 30, perKg: 61, handling: 18 }
                ]
            },
            '罗马尼亚': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 51, handling: 20 },
                    { min: 0.501, max: 30, perKg: 51, handling: 20 }
                ]
            },
            '丹麦': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 71, handling: 36 },
                    { min: 0.301, max: 1, perKg: 69, handling: 36 },
                    { min: 1.001, max: 20, perKg: 64, handling: 30 }
                ]
            },
            '瑞典': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 58, handling: 21 },
                    { min: 0.501, max: 1, perKg: 62, handling: 21 },
                    { min: 1.001, max: 2, perKg: 64, handling: 21 }
                ]
            },
            '爱尔兰': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 25,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 57, handling: 23 },
                    { min: 0.501, max: 25, perKg: 52, handling: 23 }
                ]
            },
            '希腊': {
                code: 'MUSLR',
                timeframe: '12-15工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 64, handling: 18 },
                    { min: 0.501, max: 10, perKg: 64, handling: 18 }
                ]
            },
            '瑞士': {
                code: 'MUSLR',
                timeframe: '10-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 148, handling: 18 },
                    { min: 0.501, max: 1, perKg: 96, handling: 18 },
                    { min: 1.001, max: 5, perKg: 81, handling: 18 }
                ]
            },
            '挪威': {
                code: 'MUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 106, handling: 32 },
                    { min: 0.501, max: 2, perKg: 101, handling: 32 }
                ]
            },
            '爱沙尼亚': {
                code: 'MUSLR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 68, handling: 21 },
                    { min: 0.501, max: 10, perKg: 72, handling: 21 }
                ]
            },
            '马耳他': {
                code: 'MUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 116, handling: 30 },
                    { min: 0.501, max: 2, perKg: 106, handling: 30 }
                ]
            },
            '塞浦路斯': {
                code: 'MUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 106, handling: 24 },
                    { min: 0.501, max: 2, perKg: 106, handling: 24 }
                ]
            },
            '冰岛': {
                code: 'MUSLR',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 136, handling: 35 },
                    { min: 0.501, max: 2, perKg: 136, handling: 35 }
                ]
            },
            '澳大利亚': {
                code: 'MUSLR',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重',
                zones: {
                    '1区': [
                        { min: 0, max: 0.25, perKg: 31, handling: 24 },
                        { min: 0.251, max: 0.5, perKg: 31, handling: 24 },
                        { min: 0.501, max: 1, perKg: 31, handling: 26 },
                        { min: 1.001, max: 2, perKg: 31, handling: 20 },
                        { min: 2.001, max: 20, perKg: 31, handling: 20 }
                    ],
                    '2区': [
                        { min: 0, max: 0.25, perKg: 40, handling: 29 },
                        { min: 0.251, max: 0.5, perKg: 40, handling: 29 },
                        { min: 0.501, max: 1, perKg: 40, handling: 29 },
                        { min: 1.001, max: 2, perKg: 40, handling: 27 },
                        { min: 2.001, max: 20, perKg: 40, handling: 27 }
                    ],
                    '3区': [
                        { min: 0, max: 0.25, perKg: 55, handling: 50 },
                        { min: 0.251, max: 0.5, perKg: 55, handling: 50 },
                        { min: 0.501, max: 1, perKg: 55, handling: 60 },
                        { min: 1.001, max: 2, perKg: 50, handling: 60 },
                        { min: 2.001, max: 20, perKg: 50, handling: 60 }
                    ],
                    '4区': [
                        { min: 0, max: 0.25, perKg: 61, handling: 60 },
                        { min: 0.251, max: 0.5, perKg: 61, handling: 60 },
                        { min: 0.501, max: 1, perKg: 72, handling: 85 },
                        { min: 1.001, max: 2, perKg: 72, handling: 85 },
                        { min: 2.001, max: 20, perKg: 72, handling: 85 }
                    ]
                }
            },
            '巴西': {
                code: 'MUSLR',
                timeframe: '15-25工作日',
                weightLimit: 20,
                sizeLimit: 'L<=60cm, L+W+H<=90cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 96, handling: 35 },
                    { min: 0.201, max: 0.5, perKg: 96, handling: 38 },
                    { min: 0.501, max: 2, perKg: 99, handling: 40 },
                    { min: 2.001, max: 20, perKg: 99, handling: 45 }
                ]
            },
            '新西兰': {
                code: 'MUSLR',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 74, handling: 17 },
                    { min: 0.501, max: 2, perKg: 74, handling: 17 },
                    { min: 2.001, max: 30, perKg: 74, handling: 17 }
                ]
            },
            '日本': {
                code: 'MUSLR',
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                note: '重量按0.5KG进位，长*宽*高/6000',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 33,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 8 },
                    { min: 2.001, max: 10, continuePrice: 11 }
                ]
            }
        };
    }

    // 其他数据方法...
    getWanbaoGeneralData() {
        return {
            '美国': {
                code: 'USPHFZ',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 102, handling: 24 },
                    { min: 0.101, max: 0.2, perKg: 100, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 92, handling: 20 },
                    { min: 0.301, max: 0.45, perKg: 91, handling: 20 },
                    { min: 0.451, max: 0.7, perKg: 86, handling: 20 },
                    { min: 0.701, max: 3, perKg: 86, handling: 13 },
                    { min: 3.001, max: 30, perKg: 82, handling: 13 }
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
                    { min: 0.301, max: 2, perKg: 36, handling: 16 },
                    { min: 2.001, max: 20, perKg: 40, handling: 16 }
                ]
            },
            '德国': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 42, handling: 19 },
                    { min: 0.301, max: 1, perKg: 39, handling: 22 },
                    { min: 1.001, max: 30, perKg: 41, handling: 22 }
                ]
            },
            '法国': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 54, handling: 20 },
                    { min: 0.301, max: 2, perKg: 50, handling: 21 },
                    { min: 2.001, max: 30, perKg: 50, handling: 21 }
                ]
            },
            '意大利': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 45, handling: 25 },
                    { min: 0.501, max: 2, perKg: 47, handling: 24 },
                    { min: 2.001, max: 5, perKg: 49, handling: 24 }
                ]
            },
            '西班牙': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.25, perKg: 48, handling: 18 },
                    { min: 0.251, max: 2, perKg: 48, handling: 18 },
                    { min: 2.001, max: 5, perKg: 48, handling: 18 },
                    { min: 5.001, max: 30, perKg: 48, handling: 18 }
                ]
            },
            '加拿大': {
                code: 'WBPHFZ',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 53, handling: 23 },
                    { min: 0.101, max: 0.5, perKg: 53, handling: 24 },
                    { min: 0.501, max: 0.75, perKg: 53, handling: 25 },
                    { min: 0.751, max: 1, perKg: 53, handling: 27 },
                    { min: 1.001, max: 1.5, perKg: 61, handling: 27 },
                    { min: 1.501, max: 2, perKg: 61, handling: 27 },
                    { min: 2.001, max: 30, perKg: 62, handling: 27 }
                ]
            },
            '波兰': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 67, handling: 11 },
                    { min: 0.201, max: 2, perKg: 53, handling: 15 },
                    { min: 2.001, max: 30, perKg: 53, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: 'L<60cm, L+W+H<=90cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 46, handling: 20 },
                    { min: 0.501, max: 2, perKg: 44, handling: 20 },
                    { min: 2.001, max: 30, perKg: 44, handling: 20 }
                ]
            },
            '比利时': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.4, perKg: 77, handling: 23 },
                    { min: 0.401, max: 2, perKg: 63, handling: 21 },
                    { min: 2.001, max: 30, perKg: 63, handling: 21 }
                ]
            },
            '荷兰': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 15,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 58, handling: 26 },
                    { min: 0.301, max: 2, perKg: 48, handling: 21 },
                    { min: 2.001, max: 15, perKg: 45, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 67, handling: 23 },
                    { min: 0.501, max: 30, perKg: 52, handling: 23 }
                ]
            },
            '捷克': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 52, handling: 22 },
                    { min: 0.501, max: 30, perKg: 52, handling: 22 }
                ]
            },
            '斯洛伐克': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 47, handling: 21 },
                    { min: 0.501, max: 30, perKg: 47, handling: 21 }
                ]
            },
            '匈牙利': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 42, handling: 21 },
                    { min: 0.501, max: 30, perKg: 47, handling: 21 }
                ]
            },
            '芬兰': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 90, handling: 32 },
                    { min: 0.501, max: 10, perKg: 80, handling: 32 }
                ]
            },
            '克罗地亚': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 62, handling: 26 },
                    { min: 0.501, max: 2, perKg: 62, handling: 26 }
                ]
            },
            '立陶宛': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: 'L≤60cm, W≤58cm, H≤36cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 74, handling: 21 },
                    { min: 0.501, max: 10, perKg: 67, handling: 21 }
                ]
            },
            '卢森堡': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 72, handling: 30 },
                    { min: 0.301, max: 2, perKg: 67, handling: 28 }
                ]
            },
            '拉脱维亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 70, handling: 21 },
                    { min: 0.501, max: 10, perKg: 68, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 52, handling: 26 },
                    { min: 0.501, max: 2, perKg: 62, handling: 26 }
                ]
            },
            '保加利亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 75, handling: 18 },
                    { min: 0.501, max: 30, perKg: 57, handling: 18 }
                ]
            },
            '罗马尼亚': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 47, handling: 20 },
                    { min: 0.501, max: 30, perKg: 47, handling: 20 }
                ]
            },
            '丹麦': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 20,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 67, handling: 36 },
                    { min: 0.301, max: 1, perKg: 65, handling: 36 },
                    { min: 1.001, max: 20, perKg: 60, handling: 30 }
                ]
            },
            '瑞典': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 54, handling: 21 },
                    { min: 0.501, max: 1, perKg: 58, handling: 21 },
                    { min: 1.001, max: 2, perKg: 60, handling: 21 }
                ]
            },
            '爱尔兰': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 25,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 53, handling: 23 },
                    { min: 0.501, max: 25, perKg: 48, handling: 23 }
                ]
            },
            '希腊': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 60, handling: 18 },
                    { min: 0.501, max: 10, perKg: 60, handling: 18 }
                ]
            },
            '瑞士': {
                code: 'WBPHFZ',
                timeframe: '10-12工作日',
                weightLimit: 5,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 144, handling: 18 },
                    { min: 0.501, max: 1, perKg: 92, handling: 18 },
                    { min: 1.001, max: 5, perKg: 77, handling: 18 }
                ]
            },
            '挪威': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 102, handling: 32 },
                    { min: 0.501, max: 2, perKg: 97, handling: 32 }
                ]
            },
            '爱沙尼亚': {
                code: 'WBPHFZ',
                timeframe: '8-12工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 64, handling: 21 },
                    { min: 0.501, max: 10, perKg: 68, handling: 21 }
                ]
            },
            '马耳他': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 112, handling: 30 },
                    { min: 0.501, max: 2, perKg: 102, handling: 30 }
                ]
            },
            '塞浦路斯': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 102, handling: 24 },
                    { min: 0.501, max: 2, perKg: 102, handling: 24 }
                ]
            },
            '冰岛': {
                code: 'WBPHFZ',
                timeframe: '12-15工作日',
                weightLimit: 2,
                sizeLimit: 'L<60cm, L+W+H<=90cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 132, handling: 35 },
                    { min: 0.501, max: 2, perKg: 132, handling: 35 }
                ]
            },
            '澳大利亚': {
                code: 'WBPHFZ',
                timeframe: '5-8工作日',
                weightLimit: 20,
                sizeLimit: 'L≤60cm，长+宽+高≤140cm，L*W*H＜250000cm³',
                note: '50G起重',
                zones: {
                    '1区': [
                        { min: 0, max: 0.25, perKg: 27, handling: 24 },
                        { min: 0.251, max: 0.5, perKg: 27, handling: 24 },
                        { min: 0.501, max: 1, perKg: 27, handling: 26 },
                        { min: 1.001, max: 2, perKg: 27, handling: 20 },
                        { min: 2.001, max: 20, perKg: 27, handling: 20 }
                    ],
                    '2区': [
                        { min: 0, max: 0.25, perKg: 36, handling: 29 },
                        { min: 0.251, max: 0.5, perKg: 36, handling: 29 },
                        { min: 0.501, max: 1, perKg: 36, handling: 29 },
                        { min: 1.001, max: 2, perKg: 36, handling: 27 },
                        { min: 2.001, max: 20, perKg: 36, handling: 27 }
                    ],
                    '3区': [
                        { min: 0, max: 0.25, perKg: 51, handling: 50 },
                        { min: 0.251, max: 0.5, perKg: 51, handling: 50 },
                        { min: 0.501, max: 1, perKg: 51, handling: 60 },
                        { min: 1.001, max: 2, perKg: 46, handling: 60 },
                        { min: 2.001, max: 20, perKg: 46, handling: 60 }
                    ],
                    '4区': [
                        { min: 0, max: 0.25, perKg: 57, handling: 60 },
                        { min: 0.251, max: 0.5, perKg: 57, handling: 60 },
                        { min: 0.501, max: 1, perKg: 68, handling: 85 },
                        { min: 1.001, max: 2, perKg: 68, handling: 85 },
                        { min: 2.001, max: 20, perKg: 68, handling: 85 }
                    ]
                }
            },
            '巴西': {
                code: 'WBPHFZ',
                timeframe: '15-25工作日',
                weightLimit: 20,
                sizeLimit: 'L<=60cm, L+W+H<=90cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 92, handling: 35 },
                    { min: 0.201, max: 0.5, perKg: 92, handling: 38 },
                    { min: 0.501, max: 2, perKg: 95, handling: 40 },
                    { min: 2.001, max: 20, perKg: 95, handling: 45 }
                ]
            },
            '新西兰': {
                code: 'WBPHFZ',
                timeframe: '8-10工作日',
                weightLimit: 30,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 72, handling: 17 },
                    { min: 0.501, max: 2, perKg: 72, handling: 17 },
                    { min: 2.001, max: 30, perKg: 72, handling: 17 }
                ]
            },
            '日本': {
                code: 'EUSLPHR',
                timeframe: '4-6工作日',
                weightLimit: 10,
                sizeLimit: '60*40*40cm, Min size:15*11*1cm',
                note: '重量按0.5KG进位，长*宽*高/6000',
                calculationType: 'firstContinue',
                firstWeight: 0.5,
                firstPrice: 31,
                priceRanges: [
                    { min: 0, max: 2, continuePrice: 8 },
                    { min: 2.001, max: 10, continuePrice: 11 }
                ]
            }
        };
    }
}

// 导出数据库实例
window.logisticsDB = new LogisticsDatabase();