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
            }
        };
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
            }
        };
    }

    // 其他数据方法...
    getWanbaoGeneralData() {
        // 基于万邦专线挂号普货数据
        return {
            '美国': {
                code: 'USPHSLR',
                timeframe: '9-12工作日',
                weightLimit: 30,
                sizeLimit: '55cm*40cm*40cm',
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 104, handling: 24 },
                    { min: 0.101, max: 0.2, perKg: 102, handling: 22 },
                    { min: 0.201, max: 0.3, perKg: 94, handling: 20 },
                    { min: 0.301, max: 0.45, perKg: 93, handling: 20 },
                    { min: 0.451, max: 0.7, perKg: 88, handling: 20 },
                    { min: 0.701, max: 3, perKg: 88, handling: 13 },
                    { min: 3.001, max: 30, perKg: 84, handling: 13 }
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
                    { min: 0.301, max: 2, perKg: 37, handling: 16 },
                    { min: 2.001, max: 20, perKg: 41, handling: 16 }
                ]
            }
            // 继续添加其他国家...
        };
    }

    getWanbaoElectricData() {
        // 基于万邦专线挂号带电数据
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
}

// 导出数据库实例
window.logisticsDB = new LogisticsDatabase();