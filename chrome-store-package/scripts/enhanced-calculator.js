// 增强版物流费用计算器 - 支持智能比价和完整数据库
class EnhancedCalculator {
    constructor() {
        this.exchangeRate = 7.2; // 默认汇率 USD to RMB
        this.calculationHistory = [];
        this.loadHistoryFromStorage();
    }

    // 设置汇率
    setExchangeRate(rate) {
        this.exchangeRate = parseFloat(rate) || 7.2;
    }

    // 获取汇率
    getExchangeRate() {
        return this.exchangeRate;
    }

    // 核心计算方法：计算单个报价
    calculateSingleQuote(company, service, country, zone = '', weight, productType = 'general') {
        try {
            // 检查数据库中是否有该路线
            if (!logisticsData[company] || !logisticsData[company][service] || !logisticsData[company][service][country]) {
                return null;
            }

            const routeData = logisticsData[company][service][country];
            
            // 处理分区数据
            let priceData = null;
            if (routeData.zones) {
                if (!zone) {
                    // 如果有分区但没选择分区，返回null
                    return null;
                }
                priceData = routeData.zones[zone];
            } else {
                priceData = routeData;
            }

            if (!priceData || !priceData.priceRanges) {
                return null;
            }

            // 找到对应的重量区间
            const weightRange = this.findWeightRange(priceData.priceRanges, weight);
            if (!weightRange) {
                return null;
            }

            // 计算基础运费
            let shippingCost = weight * weightRange.price;
            
            // 添加操作费
            const operationFee = priceData.operationFee || 0;
            
            // 计算总费用（美元）
            const totalUSD = shippingCost + operationFee;
            
            // 转换为人民币
            const totalRMB = totalUSD * this.exchangeRate;

            // 生成计算过程说明
            const calculationProcess = `${weight}kg × $${weightRange.price}/kg + $${operationFee} = $${totalUSD.toFixed(2)} × ${this.exchangeRate} = ¥${totalRMB.toFixed(2)}`;

            // 构建报价对象
            const quote = {
                company: company,
                service: service,
                country: country,
                zone: zone,
                weight: weight,
                weightRange: `${weightRange.min}-${weightRange.max}kg`,
                unitPrice: weightRange.price,
                shippingCost: (shippingCost * this.exchangeRate).toFixed(2),
                operationFee: (operationFee * this.exchangeRate).toFixed(2),
                totalUSD: totalUSD.toFixed(2),
                totalPrice: totalRMB.toFixed(2),
                calculationProcess: calculationProcess,
                timeframe: priceData.timeframe || '未提供',
                sizeLimit: priceData.sizeLimit || '未提供',
                notes: priceData.notes || '',
                timestamp: new Date().toISOString()
            };

            return quote;

        } catch (error) {
            console.error(`计算报价失败 [${company}-${service}-${country}]:`, error);
            return null;
        }
    }

    // 智能比价：对比所有可用的物流方案
    async compareAllQuotes(country, zone = '', weight, productType = 'general', exchangeRate = null) {
        try {
            if (exchangeRate) {
                this.setExchangeRate(exchangeRate);
            }

            const quotes = [];
            const errors = [];

            // 遍历所有物流公司和服务
            Object.keys(logisticsData).forEach(company => {
                Object.keys(logisticsData[company]).forEach(service => {
                    try {
                        // 检查是否有该国家的数据
                        if (logisticsData[company][service][country]) {
                            const quote = this.calculateSingleQuote(company, service, country, zone, weight, productType);
                            if (quote) {
                                quotes.push(quote);
                            }
                        }
                    } catch (error) {
                        errors.push(`${company}-${service}: ${error.message}`);
                    }
                });
            });

            // 按价格排序（从低到高）
            quotes.sort((a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice));

            // 生成比价结果
            const comparison = {
                searchCriteria: {
                    country: country,
                    zone: zone,
                    weight: weight,
                    productType: productType,
                    exchangeRate: this.exchangeRate
                },
                quotes: quotes,
                quotesCount: quotes.length,
                timestamp: new Date().toISOString(),
                errors: errors
            };

            // 保存到历史记录
            this.saveToHistory(comparison);

            return comparison;

        } catch (error) {
            console.error('智能比价失败:', error);
            throw new Error(`比价计算失败: ${error.message}`);
        }
    }

    // 查找重量对应的价格区间
    findWeightRange(priceRanges, weight) {
        for (const range of priceRanges) {
            if (weight >= range.min && weight <= range.max) {
                return range;
            }
        }
        return null;
    }

    // 获取特定国家的所有可用服务
    getAvailableServices(country) {
        const services = [];
        
        Object.keys(logisticsData).forEach(company => {
            Object.keys(logisticsData[company]).forEach(service => {
                if (logisticsData[company][service][country]) {
                    services.push({
                        company: company,
                        service: service,
                        hasZones: !!logisticsData[company][service][country].zones,
                        zones: logisticsData[company][service][country].zones ? 
                               Object.keys(logisticsData[company][service][country].zones) : []
                    });
                }
            });
        });

        return services;
    }

    // 获取所有支持的国家列表
    getAllCountries() {
        const countries = new Set();
        
        Object.keys(logisticsData).forEach(company => {
            Object.keys(logisticsData[company]).forEach(service => {
                Object.keys(logisticsData[company][service]).forEach(country => {
                    countries.add(country);
                });
            });
        });

        return Array.from(countries).sort();
    }

    // 获取特定国家的分区信息
    getCountryZones(country) {
        const zones = new Set();
        
        Object.keys(logisticsData).forEach(company => {
            Object.keys(logisticsData[company]).forEach(service => {
                const countryData = logisticsData[company][service][country];
                if (countryData && countryData.zones) {
                    Object.keys(countryData.zones).forEach(zone => {
                        zones.add(zone);
                    });
                }
            });
        });

        return Array.from(zones).sort();
    }

    // 智能推荐：基于历史数据和用户偏好推荐最佳方案
    getSmartRecommendation(country, weight, preferences = {}) {
        try {
            const comparison = this.compareAllQuotes(country, '', weight);
            if (!comparison.quotes || comparison.quotes.length === 0) {
                return null;
            }

            // 默认推荐价格最低的方案
            let recommended = comparison.quotes[0];

            // 根据用户偏好调整推荐
            if (preferences.prioritizeSpeed && comparison.quotes.length > 1) {
                // 优先考虑时效（这里需要更多的时效数据支持）
                recommended = comparison.quotes.find(q => q.timeframe && q.timeframe.includes('快')) || recommended;
            }

            if (preferences.prioritizeReliability) {
                // 优先考虑可靠性（基于历史成功率等）
                // 这里可以添加基于历史数据的可靠性判断
            }

            return {
                company: recommended.company,
                service: recommended.service,
                reason: '价格最优',
                savings: comparison.quotes.length > 1 ? 
                        (parseFloat(comparison.quotes[1].totalPrice) - parseFloat(recommended.totalPrice)).toFixed(2) : 0
            };

        } catch (error) {
            console.error('获取智能推荐失败:', error);
            return null;
        }
    }

    // 批量计算：同时计算多个目的地的报价
    async batchCalculate(destinations, weight, productType = 'general') {
        const results = [];
        
        for (const destination of destinations) {
            try {
                const comparison = await this.compareAllQuotes(destination.country, destination.zone || '', weight, productType);
                results.push({
                    destination: destination,
                    comparison: comparison,
                    success: comparison.quotes.length > 0
                });
            } catch (error) {
                results.push({
                    destination: destination,
                    comparison: null,
                    success: false,
                    error: error.message
                });
            }
        }

        return results;
    }

    // 保存计算历史
    saveToHistory(comparison) {
        try {
            this.calculationHistory.unshift(comparison);
            
            // 限制历史记录数量（保留最近100条）
            if (this.calculationHistory.length > 100) {
                this.calculationHistory = this.calculationHistory.slice(0, 100);
            }

            // 保存到本地存储
            this.saveHistoryToStorage();
        } catch (error) {
            console.error('保存历史记录失败:', error);
        }
    }

    // 获取计算历史
    getHistory() {
        return this.calculationHistory;
    }

    // 清空历史记录
    clearHistory() {
        this.calculationHistory = [];
        this.saveHistoryToStorage();
    }

    // 从本地存储加载历史记录
    loadHistoryFromStorage() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                chrome.storage.local.get(['calculationHistory'], (result) => {
                    if (result.calculationHistory) {
                        this.calculationHistory = result.calculationHistory;
                    }
                });
            } else {
                // 浏览器环境使用localStorage
                const saved = localStorage.getItem('logisticsCalculationHistory');
                if (saved) {
                    this.calculationHistory = JSON.parse(saved);
                }
            }
        } catch (error) {
            console.error('加载历史记录失败:', error);
        }
    }

    // 保存历史记录到本地存储
    saveHistoryToStorage() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                chrome.storage.local.set({
                    calculationHistory: this.calculationHistory
                });
            } else {
                // 浏览器环境使用localStorage
                localStorage.setItem('logisticsCalculationHistory', JSON.stringify(this.calculationHistory));
            }
        } catch (error) {
            console.error('保存历史记录失败:', error);
        }
    }

    // 导出历史记录
    exportHistory() {
        try {
            const exportData = {
                exportTime: new Date().toISOString(),
                calculationHistory: this.calculationHistory,
                totalRecords: this.calculationHistory.length
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `物流计算历史_${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            return true;
        } catch (error) {
            console.error('导出历史记录失败:', error);
            return false;
        }
    }

    // 数据库统计信息
    getDatabaseStats() {
        try {
            const stats = {
                companies: Object.keys(logisticsData).length,
                services: 0,
                countries: new Set(),
                routes: 0,
                totalPriceRanges: 0
            };

            Object.keys(logisticsData).forEach(company => {
                const services = Object.keys(logisticsData[company]);
                stats.services += services.length;
                
                services.forEach(service => {
                    const countries = Object.keys(logisticsData[company][service]);
                    countries.forEach(country => {
                        stats.countries.add(country);
                        
                        const countryData = logisticsData[company][service][country];
                        if (countryData.zones) {
                            stats.routes += Object.keys(countryData.zones).length;
                            Object.values(countryData.zones).forEach(zone => {
                                if (zone.priceRanges) {
                                    stats.totalPriceRanges += zone.priceRanges.length;
                                }
                            });
                        } else {
                            stats.routes += 1;
                            if (countryData.priceRanges) {
                                stats.totalPriceRanges += countryData.priceRanges.length;
                            }
                        }
                    });
                });
            });

            stats.countries = stats.countries.size;
            return stats;
        } catch (error) {
            console.error('获取数据库统计失败:', error);
            return null;
        }
    }

    // 验证数据库完整性
    validateDatabase() {
        const issues = [];
        
        try {
            Object.keys(logisticsData).forEach(company => {
                Object.keys(logisticsData[company]).forEach(service => {
                    Object.keys(logisticsData[company][service]).forEach(country => {
                        const countryData = logisticsData[company][service][country];
                        
                        if (countryData.zones) {
                            Object.keys(countryData.zones).forEach(zone => {
                                const zoneData = countryData.zones[zone];
                                if (!zoneData.priceRanges || zoneData.priceRanges.length === 0) {
                                    issues.push(`${company}-${service}-${country}-${zone}: 缺少价格区间数据`);
                                }
                            });
                        } else {
                            if (!countryData.priceRanges || countryData.priceRanges.length === 0) {
                                issues.push(`${company}-${service}-${country}: 缺少价格区间数据`);
                            }
                        }
                    });
                });
            });
        } catch (error) {
            issues.push(`数据库验证错误: ${error.message}`);
        }

        return {
            isValid: issues.length === 0,
            issues: issues,
            checkTime: new Date().toISOString()
        };
    }
}

// 兼容性检查函数
function checkCalculatorDependencies() {
    const missing = [];
    
    if (typeof logisticsData === 'undefined') {
        missing.push('logisticsData (数据库)');
    }
    
    if (missing.length > 0) {
        console.error('计算器依赖检查失败，缺少:', missing);
        return false;
    }
    
    console.log('✅ 计算器依赖检查通过');
    return true;
}

// 自动执行依赖检查
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(checkCalculatorDependencies, 1000);
    });
} 