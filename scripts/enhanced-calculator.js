// 增强版物流报价计算器 - 支持所有计算模式和智能比价
class LogisticsCalculator {
    constructor(database) {
        this.database = database;
        this.exchangeRate = 7; // 人民币对美元汇率
        this.history = this.loadHistory();
    }

    setExchangeRate(rate) {
        this.exchangeRate = rate;
    }

    // 单独计算报价
    calculateSingleQuote(company, service, country, weight, zone = null) {
        try {
            const result = this.database.calculateShipping(company, service, country, weight, zone);
            
            // 添加增强信息
            result.usdCost = (result.totalCost / this.exchangeRate).toFixed(2);
            result.timestamp = new Date().toISOString();
            result.remark = this.generateRemark(result);
            
            // 保存到历史记录
            this.saveToHistory(result);
            
            return result;
        } catch (error) {
            throw new Error(`计算失败: ${error.message}`);
        }
    }

    // 智能比价
    compareAllQuotes(country, weight, productType = null, zone = null) {
        try {
            const results = this.database.compareAllPrices(country, weight, productType, zone);
            
            if (results.length === 0) {
                throw new Error(`未找到 ${country} 的可用报价`);
            }

            // 增强每个结果
            const enhancedResults = results.map(result => {
                result.usdCost = (result.totalCost / this.exchangeRate).toFixed(2);
                result.remark = this.generateRemark(result);
                return result;
            });

            // 生成比价报告
            const comparisonReport = this.generateComparisonReport(enhancedResults, country, weight, productType);
            
            // 保存比价记录
            this.saveComparisonToHistory(comparisonReport);
            
            return comparisonReport;
        } catch (error) {
            throw new Error(`比价失败: ${error.message}`);
        }
    }

    // 生成备注信息
    generateRemark(result) {
        const remarks = [];
        
        if (result.timeframe) {
            remarks.push(`🚚 时效: ${result.timeframe}`);
        }
        
        if (result.sizeLimit) {
            remarks.push(`📦 尺寸限制: ${result.sizeLimit}`);
        }
        
        if (result.note) {
            remarks.push(`ℹ️ 特别说明: ${result.note}`);
        }
        
        if (result.originalWeight !== result.weight) {
            remarks.push(`⚖️ 实际计费重量: ${result.weight}kg (原重量: ${result.originalWeight}kg)`);
        }
        
        // 添加性价比分析
        const efficiency = (result.weight / result.totalCost * 1000).toFixed(2);
        remarks.push(`💰 性价比: ${efficiency} (g/元)`);
        
        return remarks;
    }

    // 生成比价报告
    generateComparisonReport(results, country, weight, productType) {
        const bestOption = results[0];
        const worstOption = results[results.length - 1];
        const savings = worstOption.totalCost - bestOption.totalCost;
        const savingsPercent = ((savings / worstOption.totalCost) * 100).toFixed(1);

        return {
            timestamp: new Date().toISOString(),
            country,
            weight,
            productType,
            totalOptions: results.length,
            bestOption,
            worstOption,
            savings,
            savingsPercent,
            results,
            summary: {
                message: `找到 ${results.length} 个报价方案`,
                recommendation: `推荐 ${bestOption.company} ${bestOption.service}`,
                savings: `比最贵方案节省 ${savings.toFixed(2)}元 (${savingsPercent}%)`
            }
        };
    }

    // 获取关税率
    getTaxRate(country, productType) {
        const taxRates = {
            '美国': { '服装': 0.12, '化妆品': 0.08, '电子产品': 0.15, '普货': 0.10 },
            '英国': { '服装': 0.15, '化妆品': 0.12, '电子产品': 0.20, '普货': 0.15 },
            '德国': { '服装': 0.19, '化妆品': 0.19, '电子产品': 0.19, '普货': 0.19 },
            '法国': { '服装': 0.20, '化妆品': 0.20, '电子产品': 0.20, '普货': 0.20 }
        };

        return taxRates[country]?.[productType] || 0;
    }

    // 计算包含关税的总成本
    calculateWithTax(result, declaredValue, productType) {
        const taxRate = this.getTaxRate(result.country, productType);
        const taxAmount = declaredValue * taxRate;
        const totalWithTax = result.totalCost + taxAmount;

        return {
            ...result,
            declaredValue,
            taxRate,
            taxAmount,
            totalWithTax,
            calculation: result.calculation + ` + 关税${taxAmount.toFixed(2)}元 = ${totalWithTax.toFixed(2)}元`
        };
    }

    // 智能推荐
    getSmartRecommendation(country, weight, productType = null) {
        try {
            const bestOption = this.database.getBestOption(country, weight, productType);
            if (bestOption) {
                return {
                    company: bestOption.company,
                    service: bestOption.service,
                    cost: bestOption.totalCost,
                    reason: '基于价格和时效的最优选择'
                };
            }
        } catch (error) {
            console.warn('智能推荐失败:', error.message);
        }
        return null;
    }

    // 批量计算
    calculateBatch(items) {
        const results = [];
        const errors = [];

        items.forEach((item, index) => {
            try {
                const result = this.calculateSingleQuote(
                    item.company,
                    item.service,
                    item.country,
                    item.weight,
                    item.zone
                );
                results.push({ index, ...result });
            } catch (error) {
                errors.push({ index, error: error.message, item });
            }
        });

        return { results, errors };
    }

    // 价格趋势分析
    analyzePriceTrend(country, weights) {
        const trends = [];
        
        weights.forEach(weight => {
            try {
                const results = this.database.compareAllPrices(country, weight);
                if (results.length > 0) {
                    trends.push({
                        weight,
                        bestPrice: results[0].totalCost,
                        avgPrice: results.reduce((sum, r) => sum + r.totalCost, 0) / results.length,
                        optionCount: results.length
                    });
                }
            } catch (error) {
                console.warn(`分析 ${weight}kg 价格趋势失败:`, error.message);
            }
        });

        return trends;
    }

    // 保存到历史记录
    saveToHistory(result) {
        this.history.calculations = this.history.calculations || [];
        this.history.calculations.unshift({
            ...result,
            id: Date.now(),
            type: 'single'
        });
        
        // 只保留最近100条记录
        if (this.history.calculations.length > 100) {
            this.history.calculations = this.history.calculations.slice(0, 100);
        }
        
        this.saveHistory();
    }

    // 保存比价记录到历史
    saveComparisonToHistory(comparison) {
        this.history.comparisons = this.history.comparisons || [];
        this.history.comparisons.unshift({
            ...comparison,
            id: Date.now(),
            type: 'comparison'
        });
        
        // 只保留最近50条比价记录
        if (this.history.comparisons.length > 50) {
            this.history.comparisons = this.history.comparisons.slice(0, 50);
        }
        
        this.saveHistory();
    }

    // 获取历史记录
    getHistory() {
        return this.history;
    }

    // 清除历史记录
    clearHistory() {
        this.history = { calculations: [], comparisons: [] };
        this.saveHistory();
    }

    // 导出历史记录
    exportHistory() {
        const data = {
            exportTime: new Date().toISOString(),
            calculations: this.history.calculations || [],
            comparisons: this.history.comparisons || []
        };
        
        return JSON.stringify(data, null, 2);
    }

    // 加载历史记录
    loadHistory() {
        try {
            const saved = localStorage.getItem('logistics_calculator_history');
            return saved ? JSON.parse(saved) : { calculations: [], comparisons: [] };
        } catch (error) {
            console.warn('加载历史记录失败:', error);
            return { calculations: [], comparisons: [] };
        }
    }

    // 保存历史记录
    saveHistory() {
        try {
            localStorage.setItem('logistics_calculator_history', JSON.stringify(this.history));
        } catch (error) {
            console.warn('保存历史记录失败:', error);
        }
    }

    // 统计信息
    getStatistics() {
        const calculations = this.history.calculations || [];
        const comparisons = this.history.comparisons || [];
        
        if (calculations.length === 0) {
            return { message: '暂无计算记录' };
        }

        // 最常用的公司
        const companyCount = {};
        calculations.forEach(calc => {
            companyCount[calc.company] = (companyCount[calc.company] || 0) + 1;
        });
        const mostUsedCompany = Object.keys(companyCount).reduce((a, b) => 
            companyCount[a] > companyCount[b] ? a : b
        );

        // 最常用的国家
        const countryCount = {};
        calculations.forEach(calc => {
            countryCount[calc.country] = (countryCount[calc.country] || 0) + 1;
        });
        const mostUsedCountry = Object.keys(countryCount).reduce((a, b) => 
            countryCount[a] > countryCount[b] ? a : b
        );

        // 平均成本
        const avgCost = calculations.reduce((sum, calc) => sum + calc.totalCost, 0) / calculations.length;

        return {
            totalCalculations: calculations.length,
            totalComparisons: comparisons.length,
            mostUsedCompany,
            mostUsedCountry,
            avgCost: avgCost.toFixed(2),
            totalSavings: comparisons.reduce((sum, comp) => sum + comp.savings, 0).toFixed(2)
        };
    }
}

// 导出计算器类
window.LogisticsCalculator = LogisticsCalculator; 