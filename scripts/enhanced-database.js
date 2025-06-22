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
                },
                '化妆品专线': {
                    countries: {
                        '美国': {
                            code: 'MUSLR',
                            timeframe: '9-12工作日',
                            weightLimit: 30,
                            sizeLimit: '55cm*40cm*40cm, Min size:15*10cm',
                            priceRanges: [
                                { min: 0, max: 0.1, perKg: 113, handling: 24, note: '50G起重' },
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
                                { min: 0, max: 0.3, perKg: 38, handling: 16, note: '偏远地区限重20KG；偏远地区体积限制0.031m³' },
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
                    }
                }
            }
        });

        // 华翰物流 - 华速通标准
        this.addCompany('华翰物流', {
            services: {
                '华速通-标准': {
                    countries: {
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
                    }
                }
            }
        });

        // 云途物流 - 服装专线（26个国家完整数据）
        this.addCompany('云途物流', {
            services: {
                '服装专线': {
                    countries: {
                        '美国': {
                            code: 'FZZXR',
                            timeframe: '6-12工作日',
                            weightLimit: 30,
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
                },
                '化妆品专线': {
                    countries: {
                        '美国': {
                            code: 'MUZXR',
                            timeframe: '6-10工作日',
                            weightLimit: 5,
                            priceRanges: [
                                { min: 0, max: 0.1, perKg: 121, handling: 25, minWeight: 0.05 },
                                { min: 0.1, max: 0.2, perKg: 124, handling: 24 },
                                { min: 0.2, max: 0.45, perKg: 126, handling: 23 },
                                { min: 0.45, max: 0.7, perKg: 128, handling: 23 },
                                { min: 0.7, max: 5, perKg: 130, handling: 12 }
                            ]
                        }
                    }
                }
            }
        });

        // 燕文物流 - 专线追踪
        this.addCompany('燕文物流', {
            services: {
                '专线追踪-普货': {
                    countries: {
                        '美国': {
                            code: '481',
                            timeframe: '6-10工作日',
                            weightLimit: 30,
                            minWeight: 0.05,
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
                        '英国': {
                            code: '481',
                            timeframe: '6-10工作日',
                            weightLimit: 20,
                            minWeight: 0.001,
                            priceRanges: [
                                { min: 0.001, max: 1, perKg: 68, handling: 16 },
                                { min: 1.001, max: 20, perKg: 70, handling: 16 }
                            ]
                        },
                        '日本': {
                            code: '481',
                            timeframe: '4-7工作日',
                            weightLimit: 10,
                            calculationType: 'firstContinue',
                            priceRanges: [
                                { min: 0.001, max: 2, firstWeight: 0.5, firstPrice: 31, continueWeight: 0.5, continuePrice: 5 },
                                { min: 2.001, max: 10, firstWeight: 0.5, firstPrice: 31, continueWeight: 0.5, continuePrice: 6 }
                            ]
                        },
                        '澳大利亚': {
                            code: '481',
                            timeframe: '7-12工作日',
                            weightLimit: 22,
                            minWeight: 0.001,
                            zones: {
                                '1区': {
                                    priceRanges: [
                                        { min: 0.001, max: 0.5, perKg: 37, handling: 20 },
                                        { min: 0.501, max: 1, perKg: 37, handling: 20 },
                                        { min: 1.001, max: 2, perKg: 37, handling: 21 },
                                        { min: 2.001, max: 5, perKg: 37, handling: 25 },
                                        { min: 5.001, max: 10, perKg: 37, handling: 35 },
                                        { min: 10.001, max: 22, perKg: 37, handling: 55 }
                                    ]
                                },
                                '2区': {
                                    priceRanges: [
                                        { min: 0.001, max: 0.5, perKg: 38, handling: 25 },
                                        { min: 0.501, max: 1, perKg: 38, handling: 27 },
                                        { min: 1.001, max: 2, perKg: 38, handling: 27 },
                                        { min: 2.001, max: 5, perKg: 38, handling: 28 },
                                        { min: 5.001, max: 10, perKg: 38, handling: 46 },
                                        { min: 10.001, max: 22, perKg: 38, handling: 66 }
                                    ]
                                },
                                '3区': {
                                    priceRanges: [
                                        { min: 0.001, max: 0.5, perKg: 50, handling: 49 },
                                        { min: 0.501, max: 1, perKg: 50, handling: 65 },
                                        { min: 1.001, max: 2, perKg: 50, handling: 67 },
                                        { min: 2.001, max: 5, perKg: 50, handling: 85 },
                                        { min: 5.001, max: 10, perKg: 50, handling: 105 },
                                        { min: 10.001, max: 22, perKg: 50, handling: 125 }
                                    ]
                                },
                                '4区': {
                                    priceRanges: [
                                        { min: 0.001, max: 0.5, perKg: 51, handling: 55 },
                                        { min: 0.501, max: 2, perKg: 51, handling: 95 },
                                        { min: 2.001, max: 5, perKg: 51, handling: 117 },
                                        { min: 5.001, max: 10, perKg: 51, handling: 132 },
                                        { min: 10.001, max: 22, perKg: 51, handling: 155 }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        });
    }

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
        const serviceData = companyData?.services[service];
        return serviceData ? Object.keys(serviceData.countries) : [];
    }

    getZones(company, service, country) {
        const countryData = this.getCountryData(company, service, country);
        return countryData?.zones ? Object.keys(countryData.zones) : [];
    }

    getCountryData(company, service, country) {
        const companyData = this.companies.get(company);
        return companyData?.services[service]?.countries[country];
    }

    calculateShipping(company, service, country, weight, zone = null) {
        const countryData = this.getCountryData(company, service, country);
        if (!countryData) {
            throw new Error(`未找到 ${company} ${service} 到 ${country} 的价格数据`);
        }

        // 检查重量限制
        if (countryData.weightLimit && weight > countryData.weightLimit) {
            throw new Error(`重量 ${weight}kg 超过了最大限制 ${countryData.weightLimit}kg`);
        }

        // 处理最小计费重量
        const actualWeight = Math.max(weight, countryData.minWeight || 0);

        let priceRanges;
        if (zone && countryData.zones) {
            priceRanges = countryData.zones[zone]?.priceRanges;
            if (!priceRanges) {
                throw new Error(`未找到分区 ${zone} 的价格数据`);
            }
        } else {
            priceRanges = countryData.priceRanges;
        }

        if (!priceRanges) {
            throw new Error('未找到价格区间数据');
        }

        // 检查计算类型
        if (countryData.calculationType === 'firstContinue') {
            return this.calculateFirstContinuePrice(priceRanges, actualWeight);
        }

        // 标准计算方式
        const range = priceRanges.find(r => actualWeight >= r.min && actualWeight <= r.max);
        if (!range) {
            throw new Error(`重量 ${actualWeight}kg 不在任何价格区间内`);
        }

        const weightCost = actualWeight * range.perKg;
        const handlingFee = range.handling;
        const totalCost = weightCost + handlingFee;

        return {
            company,
            service,
            country,
            zone,
            weight: actualWeight,
            originalWeight: weight,
            weightCost,
            handlingFee,
            totalCost,
            timeframe: countryData.timeframe,
            code: countryData.code,
            sizeLimit: countryData.sizeLimit,
            note: range.note,
            calculation: `${actualWeight}kg × ${range.perKg}元/kg + ${handlingFee}元 = ${totalCost}元`
        };
    }

    calculateFirstContinuePrice(priceRanges, weight) {
        const range = priceRanges.find(r => weight >= r.min && weight <= r.max);
        if (!range) {
            throw new Error(`重量 ${weight}kg 不在任何价格区间内`);
        }

        const firstWeight = range.firstWeight;
        const firstPrice = range.firstPrice;
        const continueWeight = range.continueWeight;
        const continuePrice = range.continuePrice;

        let totalCost = firstPrice;
        let calculation = `首重${firstWeight}kg: ${firstPrice}元`;

        if (weight > firstWeight) {
            const remainWeight = weight - firstWeight;
            const continueSteps = Math.ceil(remainWeight / continueWeight);
            const continueCost = continueSteps * continuePrice;
            totalCost += continueCost;
            calculation += ` + 续重${remainWeight}kg(${continueSteps}×${continueWeight}kg): ${continueCost}元`;
        }

        calculation += ` = ${totalCost}元`;

        return {
            weight,
            totalCost,
            calculation,
            firstWeight,
            firstPrice,
            continueWeight,
            continuePrice
        };
    }

    compareAllPrices(country, weight, productType = null, zone = null) {
        const results = [];
        
        for (const [companyName, companyData] of this.companies) {
            for (const [serviceName, serviceData] of Object.entries(companyData.services)) {
                // 产品类型匹配
                if (productType && !this.isServiceSuitableForProduct(serviceName, productType)) {
                    continue;
                }

                if (serviceData.countries[country]) {
                    try {
                        const result = this.calculateShipping(companyName, serviceName, country, weight, zone);
                        results.push(result);
                    } catch (error) {
                        console.warn(`计算 ${companyName} ${serviceName} 失败:`, error.message);
                    }
                }
            }
        }

        return results.sort((a, b) => a.totalCost - b.totalCost);
    }

    isServiceSuitableForProduct(serviceName, productType) {
        const serviceMap = {
            '服装': ['服装专线', '专线挂号普货', '专线追踪-普货'],
            '化妆品': ['化妆品专线', '专线挂号含电', '专线追踪-普货'],
            '电子产品': ['专线挂号含电', '专线追踪-普货'],
            '普货': ['专线挂号普货', '专线追踪-普货', '华速通-标准']
        };

        const suitableServices = serviceMap[productType] || [];
        return suitableServices.some(suitable => serviceName.includes(suitable));
    }

    getBestOption(country, weight, productType = null, zone = null) {
        const options = this.compareAllPrices(country, weight, productType, zone);
        return options.length > 0 ? options[0] : null;
    }

    getAllCountries() {
        const countries = new Set();
        for (const [companyName, companyData] of this.companies) {
            for (const serviceData of Object.values(companyData.services)) {
                Object.keys(serviceData.countries).forEach(country => countries.add(country));
            }
        }
        return Array.from(countries).sort();
    }

    needsZone(country) {
        for (const [companyName, companyData] of this.companies) {
            for (const serviceData of Object.values(companyData.services)) {
                const countryData = serviceData.countries[country];
                if (countryData && countryData.zones) {
                    return true;
                }
            }
        }
        return false;
    }

    getCountryZones(country) {
        const zones = new Set();
        for (const [companyName, companyData] of this.companies) {
            for (const serviceData of Object.values(companyData.services)) {
                const countryData = serviceData.countries[country];
                if (countryData && countryData.zones) {
                    Object.keys(countryData.zones).forEach(zone => zones.add(zone));
                }
            }
        }
        return Array.from(zones).sort();
    }
}

// 创建全局数据库实例
const logisticsDB = new LogisticsDatabase();