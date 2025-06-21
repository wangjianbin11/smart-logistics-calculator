// 增强版物流报价数据库系统 - 基于真实完整数据结构
class LogisticsDatabase {
    constructor() {
        this.companies = new Map();
        this.initializeData();
    }

    initializeData() {
        // 万邦物流 - 服装专线数据（完整采集第10-34行数据）
        this.addCompany('万邦物流', {
            services: {
                '服装专线': {
                    countries: {
                        '美国': {
                            code: 'USPHFZ',
                            timeframe: '9-12工作日',
                            weightLimit: 30,
                            sizeLimit: '55cm*40cm*40cm',
                            priceRanges: [
                                { min: 0, max: 0.1, perKg: 102, handling: 24, note: '50G起重' },
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
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 33, handling: 16, note: '偏远地区限重20KG；偏远地区体积限制0.031m³' },
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
                    }
                }
            }
        });

        // 云途物流 - 完整26个国家服装专线数据
        this.addCompany('云途物流', {
            services: {
                '服装专线': {
                    countries: {
                        '美国': {
                            code: 'FZZXR',
                            timeframe: '6-12工作日',
                            weightLimit: 30,
                            sizeLimit: '最小尺寸:10*15cm，最大尺寸:55*40*35cm',
                            priceRanges: [
                                { min: 0, max: 0.1, perKg: 101, handling: 24, minWeight: 0.03 },
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
                            sizeLimit: '标准',
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
                            sizeLimit: '标准',
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
                            sizeLimit: '最小尺寸:10*20cm，最大尺寸:60*40*35cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 52, handling: 19 },
                                { min: 0.3, max: 30, perKg: 49, handling: 22 }
                            ]
                        },
                        '意大利': {
                            code: 'FZZXR',
                            timeframe: '5-8工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 50, handling: 25 }
                            ]
                        },
                        '西班牙': {
                            code: 'FZZXR',
                            timeframe: '5-8工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 49, handling: 18 }
                            ]
                        },
                        '奥地利': {
                            code: 'FZZXR',
                            timeframe: '5-8工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 51, handling: 23 }
                            ]
                        },
                        '葡萄牙': {
                            code: 'FZZXR',
                            timeframe: '5-8工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 62, handling: 20 }
                            ]
                        },
                        '比利时': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            sizeLimit: '最小尺寸:10*20cm，最大尺寸:60*40*35cm',
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
                            sizeLimit: '最小尺寸:10*20cm，最大尺寸:60*40*35cm',
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
                            sizeLimit: '最小尺寸:10*20cm，最大尺寸:60*40*35cm',
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
                            sizeLimit: '最小尺寸:10*20cm，最大尺寸:60*40*35cm',
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
                            sizeLimit: '最小尺寸:10*20cm，最长边≤45CM，长+宽+高≤90CM',
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
                            sizeLimit: '120CM*50CM*50CM，单边长不超过120CM',
                            increment: 0.1,
                            priceRanges: [
                                { min: 0, max: 2, perKg: 40, handling: 22, minWeight: 0.1 },
                                { min: 2, max: 5, perKg: 40, handling: 22 },
                                { min: 5, max: 10, perKg: 40, handling: 35 }
                            ]
                        },
                        '沙特阿拉伯': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 10,
                            sizeLimit: '120CM*50CM*50CM，单边长不超过120CM',
                            increment: 0.1,
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
                            sizeLimit: '120CM*80CM*80CM,单边长不超过120CM',
                            increment: 0.1,
                            priceRanges: [
                                { min: 0, max: 30, perKg: 48, handling: 75 }
                            ]
                        },
                        '卡塔尔': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '120CM*80CM*80CM,单边长不超过120CM',
                            increment: 0.1,
                            priceRanges: [
                                { min: 0, max: 30, perKg: 53, handling: 47 }
                            ]
                        },
                        '巴林': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '120CM*80CM*80CM,单边长不超过120CM',
                            increment: 0.1,
                            priceRanges: [
                                { min: 0, max: 30, perKg: 59, handling: 61 }
                            ]
                        },
                        '约旦': {
                            code: 'FZZXR',
                            timeframe: '10-14工作日',
                            weightLimit: 15,
                            sizeLimit: '三边不超过50*50*50CM',
                            increment: 0.01,
                            priceRanges: [
                                { min: 0, max: 15, perKg: 99, handling: 30, minWeight: 0.1 }
                            ]
                        },
                        '黎巴嫩': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 10,
                            sizeLimit: '三边不超过50*50*50CM',
                            increment: 0.01,
                            note: '暂停收货',
                            priceRanges: [
                                { min: 0, max: 10, perKg: 90, handling: 40 }
                            ]
                        },
                        '日本': {
                            code: 'FZZXR',
                            timeframe: '4-5工作日',
                            weightLimit: 10,
                            sizeLimit: '最大尺寸限制:59*49*39cm',
                            priceRanges: [
                                { min: 0, max: 2, perKg: 11, handling: 24 },
                                { min: 2, max: 10, perKg: 10, handling: 27 }
                            ]
                        },
                        '以色列': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 5,
                            sizeLimit: '不超45*40*40cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 74, handling: 21 },
                                { min: 0.3, max: 5, perKg: 74, handling: 23 }
                            ]
                        },
                        '新加坡': {
                            code: 'FZZXR',
                            timeframe: '6-7工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 30, handling: 16, minWeight: 0.1 }
                            ]
                        },
                        '土耳其': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            sizeLimit: '长+宽+高≤90cm，最长边≤60cm',
                            priceRanges: [
                                { min: 0, max: 0.2, perKg: 103, handling: 30, minWeight: 0.05 },
                                { min: 0.2, max: 0.5, perKg: 82, handling: 23 },
                                { min: 0.5, max: 1, perKg: 82, handling: 23 },
                                { min: 1, max: 20, perKg: 79, handling: 23 }
                            ]
                        },
                        '新西兰': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 25,
                            sizeLimit: '最大尺寸限制:60*50*40CM',
                            priceRanges: [
                                { min: 0, max: 25, perKg: 73, handling: 17 }
                            ]
                        },
                        '爱尔兰': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 20, perKg: 78, handling: 23 }
                            ]
                        },
                        '加拿大': {
                            code: 'FZZXR',
                            timeframe: '8-15工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 0.15, perKg: 62, handling: 21, minWeight: 0.05 },
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
                            sizeLimit: '最小尺寸:10*15cm，最大尺寸:59*49*39cm',
                            hasZones: true,
                            zones: {
                                '1区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 15, handling: 21 },
                                        { min: 0.3, max: 0.5, perKg: 15, handling: 24 },
                                        { min: 0.5, max: 1, perKg: 15, handling: 25 },
                                        { min: 1, max: 3, perKg: 15, handling: 27 },
                                        { min: 3, max: 20, perKg: 15, handling: 42 }
                                    ]
                                },
                                '2区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 15, handling: 29 },
                                        { min: 0.3, max: 0.5, perKg: 15, handling: 30 },
                                        { min: 0.5, max: 1, perKg: 15, handling: 34 },
                                        { min: 1, max: 3, perKg: 15, handling: 36 },
                                        { min: 3, max: 20, perKg: 15, handling: 53 }
                                    ]
                                },
                                '3区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 20, handling: 50 },
                                        { min: 0.3, max: 0.5, perKg: 20, handling: 51 },
                                        { min: 0.5, max: 1, perKg: 20, handling: 74 },
                                        { min: 1, max: 3, perKg: 20, handling: 76 },
                                        { min: 3, max: 20, perKg: 20, handling: 115 }
                                    ]
                                },
                                '4区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 27, handling: 52 },
                                        { min: 0.3, max: 0.5, perKg: 27, handling: 52 },
                                        { min: 0.5, max: 1, perKg: 27, handling: 95 },
                                        { min: 1, max: 3, perKg: 35, handling: 120 },
                                        { min: 3, max: 20, perKg: 35, handling: 150 }
                                    ]
                                }
                            }
                        },
                        '瑞典': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            sizeLimit: '标准',
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
                            sizeLimit: '标准',
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
                            sizeLimit: '标准',
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
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 2, perKg: 40, handling: 22, minWeight: 0.1 },
                                { min: 2, max: 5, perKg: 40, handling: 22 },
                                { min: 5, max: 10, perKg: 40, handling: 35 }
                            ]
                        },
                        '沙特阿拉伯': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 10,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 0.5, perKg: 45, handling: 40, minWeight: 0.1 },
                                { min: 0.5, max: 2, perKg: 45, handling: 40 },
                                { min: 2, max: 5, perKg: 50, handling: 40 },
                                { min: 5, max: 10, perKg: 50, handling: 45 }
                            ]
                        },
                        '科威特': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 48, handling: 75, minWeight: 0.1 }
                            ]
                        },
                        '卡塔尔': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 53, handling: 47, minWeight: 0.1 }
                            ]
                        },
                        '巴林': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 59, handling: 61, minWeight: 0.1 }
                            ]
                        },
                        '约旦': {
                            code: 'FZZXR',
                            timeframe: '10-14工作日',
                            weightLimit: 15,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 15, perKg: 99, handling: 30, minWeight: 0.1 }
                            ]
                        },
                        '黎巴嫩': {
                            code: 'FZZXR',
                            timeframe: '8-12工作日',
                            weightLimit: 10,
                            sizeLimit: '标准',
                            note: '暂停收货',
                            priceRanges: [
                                { min: 0, max: 10, perKg: 90, handling: 40 }
                            ]
                        },
                        '日本': {
                            code: 'FZZXR',
                            timeframe: '4-5工作日',
                            weightLimit: 10,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 2, perKg: 11, handling: 24 },
                                { min: 2, max: 10, perKg: 10, handling: 27 }
                            ]
                        },
                        '以色列': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 5,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 74, handling: 21 },
                                { min: 0.3, max: 5, perKg: 74, handling: 23 }
                            ]
                        },
                        '新加坡': {
                            code: 'FZZXR',
                            timeframe: '6-7工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 30, perKg: 30, handling: 16, minWeight: 0.1 }
                            ]
                        },
                        '土耳其': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 0.2, perKg: 103, handling: 30, minWeight: 0.05 },
                                { min: 0.2, max: 0.5, perKg: 82, handling: 23 },
                                { min: 0.5, max: 1, perKg: 82, handling: 23 },
                                { min: 1, max: 20, perKg: 79, handling: 23 }
                            ]
                        },
                        '新西兰': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 25,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 25, perKg: 73, handling: 17 }
                            ]
                        },
                        '爱尔兰': {
                            code: 'FZZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 20, perKg: 78, handling: 23 }
                            ]
                        },
                        '加拿大': {
                            code: 'FZZXR',
                            timeframe: '8-15工作日',
                            weightLimit: 30,
                            sizeLimit: '标准',
                            priceRanges: [
                                { min: 0, max: 0.15, perKg: 62, handling: 21, minWeight: 0.05 },
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
                            sizeLimit: '标准',
                            zones: {
                                '1区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 15, handling: 21 },
                                        { min: 0.3, max: 0.5, perKg: 15, handling: 24 },
                                        { min: 0.5, max: 1, perKg: 15, handling: 25 },
                                        { min: 1, max: 3, perKg: 15, handling: 27 },
                                        { min: 3, max: 20, perKg: 15, handling: 42 }
                                    ]
                                },
                                '2区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 15, handling: 29 },
                                        { min: 0.3, max: 0.5, perKg: 15, handling: 30 },
                                        { min: 0.5, max: 1, perKg: 15, handling: 34 },
                                        { min: 1, max: 3, perKg: 15, handling: 36 },
                                        { min: 3, max: 20, perKg: 15, handling: 53 }
                                    ]
                                },
                                '3区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 20, handling: 50 },
                                        { min: 0.3, max: 0.5, perKg: 20, handling: 51 },
                                        { min: 0.5, max: 1, perKg: 20, handling: 74 },
                                        { min: 1, max: 3, perKg: 20, handling: 76 },
                                        { min: 3, max: 20, perKg: 20, handling: 115 }
                                    ]
                                },
                                '4区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 27, handling: 52 },
                                        { min: 0.3, max: 0.5, perKg: 27, handling: 52 },
                                        { min: 0.5, max: 1, perKg: 27, handling: 95 },
                                        { min: 1, max: 3, perKg: 35, handling: 120 },
                                        { min: 3, max: 20, perKg: 35, handling: 150 }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        });

        // 万邦物流数据
        this.addCompany('万邦物流', {
            services: {
                '服装专线': {
                    countries: {
                        '美国': {
                            code: 'FZZX',
                            timeframe: '9-12工作日',
                            weightLimit: 30,
                            sizeLimit: '55cm*40cm*40cm',
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
                            sizeLimit: '60*40*40cm',
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
                            sizeLimit: '60*40*40cm',
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
                    }
                },
                '化妆品专线': {
                    countries: {
                        '美国': {
                            code: 'HZPZX',
                            timeframe: '9-12工作日',
                            weightLimit: 30,
                            sizeLimit: '55cm*40cm*40cm',
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
                            sizeLimit: '60*40*40cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 56, handling: 19 },
                                { min: 0.301, max: 2, perKg: 53, handling: 22 },
                                { min: 2.001, max: 30, perKg: 53, handling: 22 }
                            ]
                        }
                    }
                },
                '专线挂号带电': {
                    countries: {
                        '美国': {
                            code: 'ZXGHDD',
                            timeframe: '9-12工作日',
                            weightLimit: 30,
                            sizeLimit: '55cm*40cm*40cm',
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
                        '澳大利亚': {
                            code: 'EUSLR',
                            timeframe: '5-8工作日',
                            weightLimit: 20,
                            sizeLimit: '60cm*40cm*35cm',
                            zones: {
                                '1区': {
                                    priceRanges: [
                                        { min: 0, max: 0.25, perKg: 48, handling: 24 },
                                        { min: 0.251, max: 0.5, perKg: 48, handling: 24 },
                                        { min: 0.501, max: 1, perKg: 48, handling: 26 },
                                        { min: 1.001, max: 2, perKg: 50, handling: 20 },
                                        { min: 2.001, max: 20, perKg: 50, handling: 20 }
                                    ]
                                },
                                '2区': {
                                    priceRanges: [
                                        { min: 0, max: 0.25, perKg: 57, handling: 29 },
                                        { min: 0.251, max: 0.5, perKg: 57, handling: 29 },
                                        { min: 0.501, max: 1, perKg: 57, handling: 29 },
                                        { min: 1.001, max: 2, perKg: 57, handling: 27 },
                                        { min: 2.001, max: 20, perKg: 57, handling: 27 }
                                    ]
                                },
                                '3区': {
                                    priceRanges: [
                                        { min: 0, max: 0.25, perKg: 66, handling: 50 },
                                        { min: 0.251, max: 0.5, perKg: 66, handling: 50 },
                                        { min: 0.501, max: 1, perKg: 66, handling: 60 },
                                        { min: 1.001, max: 2, perKg: 66, handling: 60 },
                                        { min: 2.001, max: 20, perKg: 66, handling: 60 }
                                    ]
                                },
                                '4区': {
                                    priceRanges: [
                                        { min: 0, max: 0.25, perKg: 76, handling: 60 },
                                        { min: 0.251, max: 0.5, perKg: 76, handling: 60 },
                                        { min: 0.501, max: 1, perKg: 84, handling: 85 },
                                        { min: 1.001, max: 2, perKg: 82, handling: 85 },
                                        { min: 2.001, max: 20, perKg: 82, handling: 85 }
                                    ]
                                }
                            }
                        }
                    }
                },
                '专线挂号普货': {
                    countries: {
                        '美国': {
                            code: 'ZXGHPH',
                            timeframe: '9-12工作日',
                            weightLimit: 30,
                            sizeLimit: '55cm*40cm*40cm',
                            priceRanges: [
                                { min: 0, max: 0.1, perKg: 95, handling: 24 },
                                { min: 0.101, max: 0.2, perKg: 93, handling: 22 },
                                { min: 0.201, max: 0.3, perKg: 87, handling: 20 },
                                { min: 0.301, max: 0.45, perKg: 85, handling: 20 },
                                { min: 0.451, max: 0.7, perKg: 79, handling: 20 },
                                { min: 0.701, max: 2, perKg: 73, handling: 13 },
                                { min: 2.001, max: 30, perKg: 71, handling: 13 }
                            ]
                        }
                    }
                }
            }
        });

        // 燕文物流数据
        this.addCompany('燕文物流', {
            services: {
                '燕文专线追踪': {
                    countries: {
                        '美国': {
                            code: 'YWZXZZ',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 52, handling: 18 },
                                { min: 0.301, max: 1, perKg: 48, handling: 15 },
                                { min: 1.001, max: 30, perKg: 45, handling: 12 }
                            ]
                        }
                    }
                }
            }
        });

        // 云途物流数据
        this.addCompany('云途物流', {
            services: {
                '服装专线': {
                    countries: {
                        '美国': {
                            code: 'YTFZZX',
                            timeframe: '9-14工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 48, handling: 20 },
                                { min: 0.301, max: 1, perKg: 45, handling: 18 },
                                { min: 1.001, max: 30, perKg: 42, handling: 15 }
                            ]
                        }
                    }
                },
                '化妆品专线': {
                    countries: {
                        '美国': {
                            code: 'YTHZPZX',
                            timeframe: '9-14工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 58, handling: 22 },
                                { min: 0.301, max: 1, perKg: 55, handling: 20 },
                                { min: 1.001, max: 30, perKg: 52, handling: 18 }
                            ]
                        }
                    }
                },
                '云途大货18000专线': {
                    countries: {
                        '美国': {
                            code: 'YTDH18000',
                            timeframe: '12-18工作日',
                            weightLimit: 50,
                            sizeLimit: '80cm*60cm*60cm',
                            priceRanges: [
                                { min: 0, max: 1, perKg: 38, handling: 25 },
                                { min: 1.001, max: 5, perKg: 35, handling: 20 },
                                { min: 5.001, max: 50, perKg: 32, handling: 15 }
                            ]
                        }
                    }
                },
                '专线挂号标快带电': {
                    countries: {
                        '美国': {
                            code: 'ZXGHBKDD',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 65, handling: 25 },
                                { min: 0.301, max: 1, perKg: 62, handling: 22 },
                                { min: 1.001, max: 30, perKg: 58, handling: 20 }
                            ]
                        },
                        '英国': {
                            code: 'BKZXR',
                            timeframe: '3-5工作日',
                            weightLimit: 3,
                            sizeLimit: '60cm*40cm*35cm',
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
                            sizeLimit: '60cm*40cm*35cm',
                            priceRanges: [
                                { min: 0, max: 2, perKg: 79, handling: 23 },
                                { min: 2, max: 5, perKg: 79, handling: 23 }
                            ]
                        },
                        '美国': {
                            code: 'BKZXR',
                            timeframe: '5-8工作日',
                            weightLimit: 30,
                            sizeLimit: '55*40*35cm',
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
                        '加拿大': {
                            code: 'BKZXR',
                            timeframe: '8-10工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*40cm*35cm',
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
                        '澳大利亚': {
                            code: 'BKZXR',
                            timeframe: '4-7工作日',
                            weightLimit: 20,
                            sizeLimit: '59cm*49cm*39cm',
                            zones: {
                                '1区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 46, handling: 39 },
                                        { min: 0.3, max: 0.5, perKg: 46, handling: 39 },
                                        { min: 0.5, max: 1, perKg: 46, handling: 44 },
                                        { min: 1, max: 3, perKg: 46, handling: 51 },
                                        { min: 3, max: 20, perKg: 46, handling: 63 }
                                    ]
                                },
                                '2区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 46, handling: 48 },
                                        { min: 0.3, max: 0.5, perKg: 46, handling: 48 },
                                        { min: 0.5, max: 1, perKg: 46, handling: 55 },
                                        { min: 1, max: 3, perKg: 46, handling: 62 },
                                        { min: 3, max: 20, perKg: 46, handling: 128 }
                                    ]
                                },
                                '3区': {
                                    priceRanges: [
                                        { min: 0, max: 0.3, perKg: 46, handling: 75 },
                                        { min: 0.3, max: 0.5, perKg: 46, handling: 77 },
                                        { min: 0.5, max: 1, perKg: 46, handling: 118 },
                                        { min: 1, max: 3, perKg: 69, handling: 118 },
                                        { min: 3, max: 20, perKg: 69, handling: 128 }
                                    ]
                                }
                            }
                        }
                    }
                },
                '标准普货': {
                    countries: {
                        '英国': {
                            code: 'BKPH',
                            timeframe: '3-5工作日',
                            weightLimit: 3,
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 52, handling: 16 },
                                { min: 0.3, max: 0.5, perKg: 54, handling: 16 },
                                { min: 0.5, max: 1, perKg: 54, handling: 16 },
                                { min: 1, max: 3, perKg: 58, handling: 16 }
                            ]
                        },
                        '美国': {
                            code: 'BKPH',
                            timeframe: '5-8工作日',
                            weightLimit: 30,
                            priceRanges: [
                                { min: 0, max: 0.1, perKg: 113, handling: 26 },
                                { min: 0.1, max: 0.2, perKg: 111, handling: 27 },
                                { min: 0.2, max: 0.3, perKg: 109, handling: 29 },
                                { min: 0.3, max: 0.45, perKg: 107, handling: 29 },
                                { min: 0.45, max: 2, perKg: 105, handling: 40 },
                                { min: 2, max: 3, perKg: 103, handling: 40 },
                                { min: 3, max: 30, perKg: 101, handling: 40 }
                            ]
                        }
                    }
                },
                '专线挂号标快普货': {
                    countries: {
                        '美国': {
                            code: 'ZXGHBKPH',
                            timeframe: '8-12工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 55, handling: 22 },
                                { min: 0.301, max: 1, perKg: 52, handling: 20 },
                                { min: 1.001, max: 30, perKg: 48, handling: 18 }
                            ]
                        }
                    }
                },
                '专线挂号特惠带电': {
                    countries: {
                        '美国': {
                            code: 'ZXGHTHDD',
                            timeframe: '10-16工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 52, handling: 20 },
                                { min: 0.301, max: 1, perKg: 48, handling: 18 },
                                { min: 1.001, max: 30, perKg: 45, handling: 15 }
                            ]
                        }
                    }
                },
                '专线挂号特惠普货': {
                    countries: {
                        '美国': {
                            code: 'ZXGHTHPH',
                            timeframe: '10-16工作日',
                            weightLimit: 30,
                            sizeLimit: '60cm*50cm*50cm',
                            priceRanges: [
                                { min: 0, max: 0.3, perKg: 45, handling: 18 },
                                { min: 0.301, max: 1, perKg: 42, handling: 16 },
                                { min: 1.001, max: 30, perKg: 38, handling: 14 }
                            ]
                        }
                    }
                }
            }
        });
    }

    addCompany(name, data) {
        this.companies.set(name, data);
    }

    // 获取所有物流公司
    getCompanies() {
        return Array.from(this.companies.keys());
    }

    // 获取指定公司的服务列表
    getServices(company) {
        const companyData = this.companies.get(company);
        return companyData ? Object.keys(companyData.services) : [];
    }

    // 获取指定服务的国家列表
    getCountries(company, service) {
        const companyData = this.companies.get(company);
        if (!companyData || !companyData.services[service]) return [];
        return Object.keys(companyData.services[service].countries);
    }

    // 获取指定国家的分区列表（如果有）
    getZones(company, service, country) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData) return [];
        return countryData.zones ? Object.keys(countryData.zones) : [];
    }

    // 获取国家数据
    getCountryData(company, service, country) {
        const companyData = this.companies.get(company);
        if (!companyData || !companyData.services[service]) return null;
        return companyData.services[service].countries[country] || null;
    }

    // 计算运费 - 核心计算逻辑
    calculateShipping(company, service, country, weight, zone = null) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData) {
            return { error: '未找到对应的物流服务数据' };
        }

        let priceRanges;
        
        // 处理分区国家（如澳大利亚）
        if (countryData.zones && zone) {
            const zoneData = countryData.zones[zone];
            if (!zoneData) {
                return { error: '未找到指定分区的数据' };
            }
            priceRanges = zoneData.priceRanges;
        } else {
            priceRanges = countryData.priceRanges;
        }

        if (!priceRanges) {
            return { error: '未找到价格数据' };
        }

        // 查找匹配的重量区间
        const matchedRange = priceRanges.find(range => {
            return weight > range.min && weight <= range.max;
        });

        if (!matchedRange) {
            return { error: '重量超出服务范围' };
        }

        // 计算费用：总费用 = 重量 × 公斤费 + 操作费
        const shippingCost = weight * matchedRange.perKg;
        const handlingFee = matchedRange.handling;
        const totalCost = shippingCost + handlingFee;

        return {
            success: true,
            company,
            service,
            country,
            zone,
            weight,
            weightRange: `${matchedRange.min}KG < W ≤ ${matchedRange.max}KG`,
            perKgRate: matchedRange.perKg,
            shippingCost: Math.round(shippingCost * 100) / 100,
            handlingFee,
            totalCost: Math.round(totalCost * 100) / 100,
            timeframe: countryData.timeframe,
            formula: `${weight}kg × ${matchedRange.perKg}元/kg + ${handlingFee}元 = ${totalCost}元`
        };
    }

    // 比较所有物流公司的价格
    compareAllPrices(country, weight, productType = null, zone = null) {
        const results = [];

        for (const [companyName, companyData] of this.companies) {
            for (const [serviceName, serviceData] of Object.entries(companyData.services)) {
                // 根据产品类型筛选服务
                if (productType && !this.isServiceSuitableForProduct(serviceName, productType)) {
                    continue;
                }

                if (serviceData.countries[country]) {
                    const result = this.calculateShipping(companyName, serviceName, country, weight, zone);
                    if (result.success) {
                        results.push(result);
                    }
                }
            }
        }

        // 按价格排序
        results.sort((a, b) => a.totalCost - b.totalCost);
        return results;
    }

    // 判断服务是否适合产品类型
    isServiceSuitableForProduct(serviceName, productType) {
        const serviceProductMap = {
            '服装专线': ['服装', '普货'],
            '化妆品专线': ['化妆品', '液体'],
            '专线带电': ['带电产品', '普货'],
            '标准带电': ['带电产品'],
            '标准普货': ['普货'],
            '普货高仿专线': ['普货', '仿牌', '高仿'],
            '燕文专线': ['普货', '带电产品']
        };

        const suitableProducts = serviceProductMap[serviceName] || [];
        return suitableProducts.includes(productType);
    }

    // 获取推荐的最优选择
    getBestOption(country, weight, productType = null, zone = null) {
        const options = this.compareAllPrices(country, weight, productType, zone);
        return options.length > 0 ? options[0] : null;
    }
}

// 创建全局数据库实例
window.logisticsDB = new LogisticsDatabase();