// 增强版物流报价计算器 - 支持智能比价和汇率换算
class LogisticsCalculator {
    constructor(database) {
        this.database = database;
        this.exchangeRate = 7; // 人民币对美金汇率 (RMB ÷ 7 = USD)
    }

    // 设置汇率
    setExchangeRate(rate) {
        this.exchangeRate = rate;
    }

    // 人民币转美金
    convertToUSD(rmb) {
        return parseFloat((rmb / this.exchangeRate).toFixed(2));
    }

    // 单个报价计算
    calculateSingleQuote(company, service, country, weight, zone = null) {
        const result = this.database.calculateShipping(company, service, country, weight, zone);
        
        if (!result.error) {
            // 添加美金价格
            result.shippingCostUSD = this.convertToUSD(result.shippingCost);
            result.handlingFeeUSD = this.convertToUSD(result.handlingFee);
            result.totalCostUSD = this.convertToUSD(result.totalCost);
            result.exchangeRate = this.exchangeRate;
        }
        
        return result;
    }

    // 智能比价 - 比较所有可用方案
    compareAllQuotes(country, weight, zone = null) {
        const results = [];
        
        // 获取所有物流公司和服务
        const companies = this.database.getCompanies();
        
        for (const company of companies) {
            const services = this.database.getServices(company);
            
            for (const service of services) {
                const countries = this.database.getCountries(company, service);
                
                if (countries.includes(country)) {
                    const result = this.calculateSingleQuote(company, service, country, weight, zone);
                    
                    if (!result.error) {
                        results.push(result);
                    }
                }
            }
        }

        // 按总费用排序（人民币）
        results.sort((a, b) => a.totalCost - b.totalCost);

        // 添加排名和节省信息
        results.forEach((result, index) => {
            result.rank = index + 1;
            result.isBest = index === 0;
            
            if (index === 0) {
                result.savings = 0;
                result.savingsUSD = 0;
                result.savingsText = '🏆 最便宜方案';
                result.badgeClass = 'best-option';
            } else {
                result.savings = parseFloat((result.totalCost - results[0].totalCost).toFixed(2));
                result.savingsUSD = parseFloat((result.totalCostUSD - results[0].totalCostUSD).toFixed(2));
                result.savingsText = `比最便宜贵 ¥${result.savings} ($${result.savingsUSD})`;
                result.badgeClass = 'alternative-option';
            }
        });

        return {
            results,
            totalOptions: results.length,
            bestOption: results[0] || null,
            country,
            weight,
            zone,
            timestamp: new Date().toLocaleString('zh-CN')
        };
    }

    // 生成比价报告
    generateComparisonReport(comparisonData) {
        if (!comparisonData.results || comparisonData.results.length === 0) {
            return {
                html: '<div class="no-results">❌ 暂无可用的物流方案</div>',
                summary: '无可用方案'
            };
        }

        const { results, bestOption, country, weight, zone } = comparisonData;

        let html = `
            <div class="comparison-header">
                <h3>📊 ${country}${zone ? ` (${zone})` : ''} - ${weight}kg 智能比价结果</h3>
                <p class="comparison-info">
                    找到 <strong>${results.length}</strong> 个可用方案 | 
                    最低价格: <strong>¥${bestOption.totalCost} ($${bestOption.totalCostUSD})</strong> | 
                    汇率: 1 USD = ${this.exchangeRate} RMB
                </p>
            </div>
            <div class="comparison-results">
        `;

        results.forEach((result, index) => {
            html += `
                <div class="quote-card ${result.badgeClass}">
                    <div class="quote-header">
                        <span class="rank-badge">#${result.rank}</span>
                        <strong>${result.company}</strong>
                        <small class="service-name">${result.service}</small>
                        ${result.isBest ? '<span class="best-badge">🏆 最优</span>' : ''}
                    </div>
                    
                    <div class="quote-details">
                        <div class="price-row">
                            <span>计费重量:</span>
                            <span>${result.weight}kg ${result.originalWeight !== result.weight ? `(原重${result.originalWeight}kg)` : ''}</span>
                        </div>
                        
                        <div class="price-row">
                            <span>运费:</span>
                            <span>¥${result.shippingCost} ($${result.shippingCostUSD})</span>
                        </div>
                        
                        <div class="price-row">
                            <span>操作费:</span>
                            <span>¥${result.handlingFee} ($${result.handlingFeeUSD})</span>
                        </div>
                        
                        <div class="price-row total-price">
                            <span><strong>总费用:</strong></span>
                            <span><strong>¥${result.totalCost} ($${result.totalCostUSD})</strong></span>
                        </div>
                        
                        <div class="price-row savings">
                            <span>价格对比:</span>
                            <span class="${result.isBest ? 'best-text' : 'diff-text'}">${result.savingsText}</span>
                        </div>
                        
                        <div class="service-info">
                            <small>
                                ⏱️ ${result.timeframe} | 
                                📦 ${result.weightLimit}kg限重 |
                                📏 ${result.sizeLimit}
                                ${result.note ? ` | ℹ️ ${result.note}` : ''}
                            </small>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // 生成简要总结
        const summary = `${country} ${weight}kg: 最低¥${bestOption.totalCost}($${bestOption.totalCostUSD}) - ${bestOption.company}`;

        return {
            html,
            summary,
            bestOption,
            totalOptions: results.length
        };
    }

    // 获取历史比价记录
    getComparisonHistory() {
        const history = localStorage.getItem('priceComparisonHistory');
        return history ? JSON.parse(history) : [];
    }

    // 保存比价记录
    saveComparisonToHistory(comparisonData) {
        const history = this.getComparisonHistory();
        const record = {
            id: Date.now(),
            timestamp: comparisonData.timestamp,
            country: comparisonData.country,
            weight: comparisonData.weight,
            zone: comparisonData.zone,
            bestOption: comparisonData.bestOption,
            totalOptions: comparisonData.totalOptions,
            summary: `${comparisonData.country} ${comparisonData.weight}kg: ¥${comparisonData.bestOption?.totalCost} ($${comparisonData.bestOption?.totalCostUSD})`
        };
        
        history.unshift(record);
        
        // 只保留最近50条记录
        if (history.length > 50) {
            history.splice(50);
        }
        
        localStorage.setItem('priceComparisonHistory', JSON.stringify(history));
        return record;
    }

    // 清除历史记录
    clearComparisonHistory() {
        localStorage.removeItem('priceComparisonHistory');
    }

    // 导出历史记录为CSV
    exportHistoryToCSV() {
        const history = this.getComparisonHistory();
        if (history.length === 0) return null;

        let csv = '时间,国家,重量(kg),分区,最优方案,物流公司,服务类型,总费用(RMB),总费用(USD),时效,可选方案数\n';
        
        history.forEach(record => {
            const option = record.bestOption;
            csv += `${record.timestamp},${record.country},${record.weight},${record.zone || ''},`;
            csv += `${option?.company || ''} ${option?.service || ''},${option?.company || ''},${option?.service || ''},`;
            csv += `${option?.totalCost || ''},${option?.totalCostUSD || ''},${option?.timeframe || ''},${record.totalOptions}\n`;
        });

        return csv;
    }

    // 下载CSV文件
    downloadHistoryCSV() {
        const csv = this.exportHistoryToCSV();
        if (!csv) {
            alert('没有历史记录可以导出');
            return;
        }

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `物流比价历史_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 智能推荐 - 基于历史记录推荐最优物流
    getSmartRecommendation(country, weight, zone = null) {
        const history = this.getComparisonHistory();
        
        // 过滤相似的历史记录（相同国家，重量差异在±20%内）
        const similarRecords = history.filter(record => {
            const weightDiff = Math.abs(record.weight - weight) / weight;
            return record.country === country && 
                   record.zone === zone && 
                   weightDiff <= 0.2; // 20% 重量差异内
        });

        if (similarRecords.length === 0) {
            return null;
        }

        // 统计最常选择的物流公司和服务
        const recommendations = {};
        similarRecords.forEach(record => {
            const key = `${record.bestOption?.company}-${record.bestOption?.service}`;
            if (!recommendations[key]) {
                recommendations[key] = {
                    company: record.bestOption?.company,
                    service: record.bestOption?.service,
                    count: 0,
                    avgCost: 0,
                    totalCost: 0
                };
            }
            recommendations[key].count++;
            recommendations[key].totalCost += record.bestOption?.totalCost || 0;
        });

        // 计算平均费用并排序
        const sortedRecommendations = Object.values(recommendations)
            .map(rec => ({
                ...rec,
                avgCost: rec.totalCost / rec.count,
                confidence: rec.count / similarRecords.length
            }))
            .sort((a, b) => b.confidence - a.confidence || a.avgCost - b.avgCost);

        return sortedRecommendations[0];
    }
}

// 导出计算器类
if (typeof window !== 'undefined') {
    window.LogisticsCalculator = LogisticsCalculator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogisticsCalculator;
} 