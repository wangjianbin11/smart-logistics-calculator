// 云途物流完整数据 - 基于真实数据表
// 包含7个渠道: 服装专线、化妆品专线、专线挂号标快普货、专线挂号标快带电、专线挂号特惠普货、专线挂号特惠带电、云途大货18000专线

class YuntuCompleteData {
    // 1. 服装专线 (FZZXR) - 支持30个国家
    static getClothingData() {
        return {
            '美国': {
                code: 'FZZXR',
                timeframe: '6-12工作日',
                weightLimit: 30,
                note: '30G起重',
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
                note: '进位制0.1KG，最低计费重0.1KG',
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
                note: '进位制0.1KG',
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
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 48, handling: 75 }
                ]
            },
            '卡塔尔': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 53, handling: 47 }
                ]
            },
            '巴林': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 30,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 30, perKg: 59, handling: 61 }
                ]
            },
            '约旦': {
                code: 'FZZXR',
                timeframe: '10-14工作日',
                weightLimit: 15,
                note: '进位制0.01KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 15, perKg: 99, handling: 30 }
                ]
            },
            '黎巴嫩': {
                code: 'FZZXR',
                timeframe: '8-12工作日',
                weightLimit: 10,
                note: '进位制0.01KG，暂停收货',
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
                note: '50G起重',
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
                note: '50G起重',
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
                hasZones: true,
                zones: {
                    '1区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 15, handling: 21 },
                        { min: 0.3, max: 0.5, perKg: 15, handling: 24 },
                        { min: 0.5, max: 1, perKg: 15, handling: 25 },
                        { min: 1, max: 3, perKg: 15, handling: 27 },
                        { min: 3, max: 20, perKg: 15, handling: 42 }
                    ]},
                    '2区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 15, handling: 29 },
                        { min: 0.3, max: 0.5, perKg: 15, handling: 30 },
                        { min: 0.5, max: 1, perKg: 15, handling: 34 },
                        { min: 1, max: 3, perKg: 15, handling: 36 },
                        { min: 3, max: 20, perKg: 15, handling: 53 }
                    ]},
                    '3区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 20, handling: 50 },
                        { min: 0.3, max: 0.5, perKg: 20, handling: 51 },
                        { min: 0.5, max: 1, perKg: 20, handling: 74 },
                        { min: 1, max: 3, perKg: 20, handling: 76 },
                        { min: 3, max: 20, perKg: 20, handling: 115 }
                    ]},
                    '4区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 27, handling: 52 },
                        { min: 0.3, max: 0.5, perKg: 27, handling: 52 },
                        { min: 0.5, max: 1, perKg: 27, handling: 95 },
                        { min: 1, max: 3, perKg: 35, handling: 120 },
                        { min: 3, max: 20, perKg: 35, handling: 150 }
                    ]}
                }
            }
        };
    }

    // 2. 化妆品专线 (MUZXR)  
    static getCosmeticData() {
        return {
            '美国': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                note: '50G起重',
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
            },
            '德国': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 64, handling: 19 },
                    { min: 0.3, max: 5, perKg: 64, handling: 22 }
                ]
            },
            '意大利': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 62, handling: 25 }
                ]
            },
            '西班牙': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 77, handling: 18 }
                ]
            },
            '荷兰': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 85, handling: 24 }
                ]
            },
            '比利时': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 2, perKg: 100, handling: 22 },
                    { min: 2, max: 5, perKg: 100, handling: 22 }
                ]
            },
            '卢森堡': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 2,
                priceRanges: [
                    { min: 0, max: 2, perKg: 112, handling: 26 }
                ]
            },
            '爱尔兰': {
                code: 'MUZXR',
                timeframe: '2-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 94, handling: 23 }
                ]
            },
            '保加利亚': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 94, handling: 18 }
                ]
            },
            '克罗地亚': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 121, handling: 26 }
                ]
            },
            '捷克': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 74, handling: 21 }
                ]
            },
            '爱沙尼亚': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 77, handling: 20 }
                ]
            },
            '芬兰': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 80, handling: 26 }
                ]
            },
            '匈牙利': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 90, handling: 21 }
                ]
            },
            '拉脱维亚': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 79, handling: 20 }
                ]
            },
            '立陶宛': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 74, handling: 20 }
                ]
            },
            '波兰': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 76, handling: 15 }
                ]
            },
            '葡萄牙': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 82, handling: 20 }
                ]
            },
            '罗马尼亚': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 118, handling: 20 }
                ]
            },
            '斯洛伐克': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 97, handling: 21 }
                ]
            },
            '斯洛文尼亚': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 121, handling: 26 }
                ]
            },
            '瑞典': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 2,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 68, handling: 16 },
                    { min: 0.3, max: 2, perKg: 70, handling: 21 }
                ]
            },
            '奥地利': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 73, handling: 23 }
                ]
            },
            '丹麦': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 2,
                priceRanges: [
                    { min: 0, max: 0.3, perKg: 108, handling: 24 },
                    { min: 0.3, max: 2, perKg: 92, handling: 24 }
                ]
            },
            '希腊': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 119, handling: 18 }
                ]
            },
            '挪威': {
                code: 'MUZXR',
                timeframe: '8-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.1, perKg: 87, handling: 22 },
                    { min: 0.1, max: 0.3, perKg: 72, handling: 21 },
                    { min: 0.3, max: 5, perKg: 67, handling: 21 }
                ]
            },
            '以色列': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 80, handling: 26 }
                ]
            },
            '新西兰': {
                code: 'MUZXR',
                timeframe: '6-10工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 106, handling: 17 }
                ]
            },
            '阿拉伯联合酋长国': {
                code: 'MUZXR',
                timeframe: '6-9工作日',
                weightLimit: 5,
                note: '进位制0.01KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 5, perKg: 43, handling: 22 }
                ]
            },
            '泰国': {
                code: 'MUZXR',
                timeframe: '5-8工作日',
                weightLimit: 25,
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 25, perKg: 28, handling: 8 }
                ]
            },
            '日本': {
                code: 'MUZXR',
                timeframe: '4-5工作日（北海道冲绳5-8工作日）',
                weightLimit: 5,
                note: '最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 5, perKg: 17, handling: 31 }
                ]
            },
            '瑞士': {
                code: 'MUZXR',
                timeframe: '5-8工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 0.2, perKg: 132, handling: 26 },
                    { min: 0.2, max: 0.5, perKg: 107, handling: 24 },
                    { min: 0.5, max: 5, perKg: 82, handling: 24 }
                ]
            },
            '墨西哥': {
                code: 'MUZXR',
                timeframe: '10-15工作日',
                weightLimit: 30,
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 100, handling: 20 },
                    { min: 0.5, max: 1, perKg: 105, handling: 20 },
                    { min: 1, max: 3, perKg: 115, handling: 20 },
                    { min: 3, max: 30, perKg: 115, handling: 20 }
                ]
            },
            '沙特阿拉伯': {
                code: 'MUZXR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                note: '进位制0.1KG，最低计费重0.1KG',
                priceRanges: [
                    { min: 0, max: 0.5, perKg: 50, handling: 40 },
                    { min: 0.5, max: 2, perKg: 50, handling: 40 },
                    { min: 2, max: 5, perKg: 55, handling: 40 }
                ]
            },
            '科威特': {
                code: 'MUZXR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 5, perKg: 54, handling: 75 }
                ]
            },
            '卡塔尔': {
                code: 'MUZXR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 5, perKg: 59, handling: 45 }
                ]
            },
            '巴林': {
                code: 'MUZXR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                note: '进位制0.1KG',
                priceRanges: [
                    { min: 0, max: 5, perKg: 65, handling: 61 }
                ]
            },
            '新加坡': {
                code: 'MUZXR',
                timeframe: '5-6工作日',
                weightLimit: 5,
                priceRanges: [
                    { min: 0, max: 5, perKg: 42, handling: 16 }
                ]
            },
            '加拿大': {
                code: 'MUZXR',
                timeframe: '8-12工作日',
                weightLimit: 5,
                note: '50G起重',
                priceRanges: [
                    { min: 0, max: 0.15, perKg: 81, handling: 24 },
                    { min: 0.15, max: 0.3, perKg: 81, handling: 24 },
                    { min: 0.3, max: 0.45, perKg: 81, handling: 24 },
                    { min: 0.45, max: 0.75, perKg: 81, handling: 24 },
                    { min: 0.75, max: 1, perKg: 81, handling: 24 },
                    { min: 1, max: 1.5, perKg: 81, handling: 24 },
                    { min: 1.5, max: 5, perKg: 81, handling: 24 }
                ]
            },
            '南非': {
                code: 'MUZXR',
                timeframe: '10-14工作日',
                weightLimit: 10,
                note: '进位制0.01KG',
                priceRanges: [
                    { min: 0, max: 2, perKg: 161, handling: 36 },
                    { min: 2, max: 10, perKg: 161, handling: 36 }
                ]
            },
            '澳大利亚': {
                code: 'MUZXR',
                timeframe: '5-10工作日',
                weightLimit: 20,
                hasZones: true,
                zones: {
                    '1区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 40, handling: 21 },
                        { min: 0.3, max: 0.5, perKg: 40, handling: 24 },
                        { min: 0.5, max: 1, perKg: 40, handling: 25 },
                        { min: 1, max: 3, perKg: 40, handling: 27 },
                        { min: 3, max: 20, perKg: 40, handling: 42 }
                    ]},
                    '2区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 40, handling: 29 },
                        { min: 0.3, max: 0.5, perKg: 40, handling: 30 },
                        { min: 0.5, max: 1, perKg: 40, handling: 34 },
                        { min: 1, max: 3, perKg: 40, handling: 36 },
                        { min: 3, max: 20, perKg: 40, handling: 53 }
                    ]},
                    '3区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 40, handling: 50 },
                        { min: 0.3, max: 0.5, perKg: 40, handling: 51 },
                        { min: 0.5, max: 1, perKg: 40, handling: 74 },
                        { min: 1, max: 3, perKg: 40, handling: 76 },
                        { min: 3, max: 20, perKg: 40, handling: 115 }
                    ]},
                    '4区': { min: 0, max: 20, priceRanges: [
                        { min: 0, max: 0.3, perKg: 51, handling: 52 },
                        { min: 0.3, max: 0.5, perKg: 51, handling: 52 },
                        { min: 0.5, max: 1, perKg: 51, handling: 95 },
                        { min: 1, max: 3, perKg: 51, handling: 120 },
                        { min: 3, max: 20, perKg: 51, handling: 150 }
                    ]}
                }
            }
        };
    }
}

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YuntuCompleteData;
} 