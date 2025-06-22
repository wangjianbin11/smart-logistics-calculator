// 增强版弹窗主控制器 - 支持智能比价和完整备注显示
class PopupController {
    constructor() {
        this.database = null;
        this.calculator = null;
        this.currentComparison = null;
        this.exchangeRate = 7; // 默认汇率
        this.init();
    }

    init() {
        // 等待数据库加载
        this.waitForDatabase().then(() => {
            this.setupEventListeners();
            this.loadInterface();
            this.loadSavedSettings();
        });
    }

    async waitForDatabase() {
        return new Promise((resolve) => {
            const checkDatabase = () => {
                if (typeof logisticsDB !== 'undefined' && typeof LogisticsCalculator !== 'undefined') {
                    this.database = logisticsDB;
                    this.calculator = new LogisticsCalculator(this.database);
                    this.calculator.setExchangeRate(this.exchangeRate);
                    resolve();
                } else {
                    setTimeout(checkDatabase, 100);
                }
            };
            checkDatabase();
        });
    }

    setupEventListeners() {
        // 基本计算按钮
        document.getElementById('calculateBtn')?.addEventListener('click', () => this.calculateSingle());
        
        // 智能比价按钮
        document.getElementById('compareBtn')?.addEventListener('click', () => this.performComparison());
        
        // 查看历史按钮
        document.getElementById('historyBtn')?.addEventListener('click', () => this.showHistory());
        
        // 清除历史按钮
        document.getElementById('clearHistoryBtn')?.addEventListener('click', () => this.clearHistory());
        
        // 导出历史按钮
        document.getElementById('exportHistoryBtn')?.addEventListener('click', () => this.exportHistory());
        
        // 汇率设置
        document.getElementById('exchangeRate')?.addEventListener('change', (e) => this.updateExchangeRate(e.target.value));
        
        // 动态加载国家和分区
        document.getElementById('country')?.addEventListener('change', () => this.updateZoneOptions());
        
        // 重量输入变化时的实时提示
        document.getElementById('weight')?.addEventListener('input', () => this.showWeightTips());
        
        // 产品类型变化
        document.getElementById('productType')?.addEventListener('change', () => this.updateProductTypeRecommendations());
    }

    loadInterface() {
        this.loadCompanyOptions();
        this.loadCountryOptions();
        this.loadProductTypeOptions();
        this.updateZoneOptions();
        this.setupExchangeRateDisplay();
    }

    loadCompanyOptions() {
        const companies = this.database.getCompanies();
        const companySelect = document.getElementById('company');
        
        if (companySelect) {
            companySelect.innerHTML = '<option value="">选择物流公司</option>';
            companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company;
                option.textContent = company;
                companySelect.appendChild(option);
            });
            
            // 监听公司变化，更新服务选项
            companySelect.addEventListener('change', () => this.updateServiceOptions());
        }
    }

    updateServiceOptions() {
        const company = document.getElementById('company')?.value;
        const serviceSelect = document.getElementById('service');
        
        if (serviceSelect && company) {
            const services = this.database.getServices(company);
            serviceSelect.innerHTML = '<option value="">选择服务类型</option>';
            
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                serviceSelect.appendChild(option);
            });
        }
    }

    loadCountryOptions() {
        const countries = this.database.getAllCountries();
        const countrySelect = document.getElementById('country');
        
        if (countrySelect) {
            countrySelect.innerHTML = '<option value="">选择目的地国家</option>';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countrySelect.appendChild(option);
            });
        }
    }

    loadProductTypeOptions() {
        const productTypes = ['服装', '化妆品', '电子产品', '普货'];
        const productSelect = document.getElementById('productType');
        
        if (productSelect) {
            productSelect.innerHTML = '<option value="">选择产品类型（可选）</option>';
            productTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                productSelect.appendChild(option);
            });
        }
    }

    updateZoneOptions() {
        const country = document.getElementById('country')?.value;
        const zoneSelect = document.getElementById('zone');
        
        if (zoneSelect && country) {
            const needsZone = this.database.needsZone(country);
            
            if (needsZone) {
                const zones = this.database.getCountryZones(country);
                zoneSelect.innerHTML = '<option value="">选择分区</option>';
                zones.forEach(zone => {
                    const option = document.createElement('option');
                    option.value = zone;
                    option.textContent = zone;
                    zoneSelect.appendChild(option);
                });
                zoneSelect.style.display = 'block';
                zoneSelect.previousElementSibling.style.display = 'block';
            } else {
                zoneSelect.style.display = 'none';
                zoneSelect.previousElementSibling.style.display = 'none';
            }
        }
    }

    setupExchangeRateDisplay() {
        const exchangeRateInput = document.getElementById('exchangeRate');
        if (exchangeRateInput) {
            exchangeRateInput.value = this.exchangeRate;
        }
        
        // 显示当前汇率
        const rateDisplay = document.getElementById('currentRate');
        if (rateDisplay) {
            rateDisplay.textContent = `当前汇率: 1 USD = ${this.exchangeRate} RMB`;
        }
    }

    updateExchangeRate(rate) {
        const newRate = parseFloat(rate);
        if (newRate > 0) {
            this.exchangeRate = newRate;
            this.calculator.setExchangeRate(newRate);
            this.setupExchangeRateDisplay();
            this.saveSettings();
        }
    }

    updateProductTypeRecommendations() {
        const productType = document.getElementById('productType')?.value;
        const country = document.getElementById('country')?.value;
        const weight = parseFloat(document.getElementById('weight')?.value);
        
        if (productType && country && weight) {
            this.showSmartRecommendation(country, weight, productType);
        }
    }

    showWeightTips() {
        const weight = parseFloat(document.getElementById('weight')?.value);
        const country = document.getElementById('country')?.value;
        const productType = document.getElementById('productType')?.value;
        const tipsDiv = document.getElementById('weightTips');
        
        if (tipsDiv && weight && country) {
            let tips = '';
            
            if (weight < 0.05) {
                tips += '💡 大部分物流公司最小计费重量为50g\n';
            }
            
            if (weight > 10) {
                tips += '⚠️ 重量较大，请确认物流公司的重量限制\n';
            }
            
            // 获取智能推荐
            this.showSmartRecommendation(country, weight, productType);
            
            tipsDiv.textContent = tips;
            tipsDiv.style.display = tips ? 'block' : 'none';
        }
    }

    showSmartRecommendation(country, weight, productType) {
        const recommendation = this.calculator.getSmartRecommendation(country, weight, productType);
        const recommendDiv = document.getElementById('smartRecommendation');
        
        if (recommendDiv && recommendation) {
            recommendDiv.innerHTML = `
                <div class="recommendation-card">
                    <h4>🎯 智能推荐</h4>
                    <p><strong>${recommendation.company}</strong> - ${recommendation.service}</p>
                    <p>预估费用: <strong>${recommendation.cost.toFixed(2)}元</strong></p>
                    <p class="reason">${recommendation.reason}</p>
                </div>
            `;
            recommendDiv.style.display = 'block';
        } else if (recommendDiv) {
            recommendDiv.style.display = 'none';
        }
    }

    calculateSingle() {
        const company = document.getElementById('company')?.value;
        const service = document.getElementById('service')?.value;
        const country = document.getElementById('country')?.value;
        const weight = parseFloat(document.getElementById('weight')?.value);
        const zone = document.getElementById('zone')?.value || null;
        const productType = document.getElementById('productType')?.value || null;

        if (!company || !service || !country || !weight) {
            this.showError('请填写完整的计算信息');
            return;
        }

        this.showLoading('正在计算运费...');

        try {
            const result = this.calculator.calculateSingleQuote(company, service, country, weight, zone);
            this.displaySingleResult(result, productType);
        } catch (error) {
            this.showError(error.message);
        }
    }

    displaySingleResult(result, productType) {
        const resultDiv = document.getElementById('result');
        if (!resultDiv) return;

        // 生成详细的备注信息
        const remarksList = result.remark.map(remark => `<li>${remark}</li>`).join('');
        
        resultDiv.innerHTML = `
            <div class="result-card single-result">
                <div class="result-header">
                    <h3>${result.company} - ${result.service}</h3>
                    <div class="price-badge">
                        <span class="rmb-price">${result.totalCost.toFixed(2)}元</span>
                        <span class="usd-price">($${result.usdCost})</span>
                    </div>
                </div>
                
                <div class="result-details">
                    <div class="calculation-info">
                        <h4>💰 费用明细</h4>
                        <p class="calculation">${result.calculation}</p>
                    </div>
                    
                    <div class="service-info">
                        <h4>📋 服务信息</h4>
                        <ul class="remarks-list">
                            ${remarksList}
                        </ul>
                    </div>
                    
                    ${result.code ? `<p><strong>产品代码:</strong> ${result.code}</p>` : ''}
                </div>
                
                <div class="result-actions">
                    <button onclick="popupController.performComparison()">🔍 查看其他报价</button>
                    <button onclick="popupController.exportCurrentResult()">📊 导出结果</button>
                </div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
    }

    performComparison() {
        const country = document.getElementById('country')?.value;
        const weight = parseFloat(document.getElementById('weight')?.value);
        const productType = document.getElementById('productType')?.value || null;
        const zone = document.getElementById('zone')?.value || null;

        if (!country || !weight) {
            this.showError('请选择国家和重量进行比价');
            return;
        }

        this.showLoading('正在进行智能比价...');

        try {
            const comparison = this.calculator.compareAllQuotes(country, weight, productType, zone);
            this.currentComparison = comparison;
            this.displayComparisonResults(comparison);
        } catch (error) {
            this.showError(error.message);
        }
    }

    displayComparisonResults(comparisonData) {
        const resultDiv = document.getElementById('result');
        if (!resultDiv) return;

        const { summary, results, bestOption, totalOptions, savings, savingsPercent } = comparisonData;
        
        // 生成比价结果表格
        const resultsTable = results.map((result, index) => {
            const isRecommended = index === 0;
            const remarksList = result.remark.map(remark => `<li>${remark}</li>`).join('');
            
            return `
                <div class="comparison-item ${isRecommended ? 'recommended' : ''}">
                    <div class="rank">${index + 1}</div>
                    <div class="company-info">
                        <h4>${result.company} - ${result.service}</h4>
                        ${isRecommended ? '<span class="recommended-badge">推荐</span>' : ''}
                        ${result.zone ? `<span class="zone-badge">${result.zone}</span>` : ''}
                    </div>
                    <div class="price-info">
                        <div class="main-price">${result.totalCost.toFixed(2)}元</div>
                        <div class="usd-price">$${result.usdCost}</div>
                        <div class="calculation">${result.calculation}</div>
                    </div>
                    <div class="details-toggle" onclick="toggleDetails(${index})">
                        <span>详细信息</span> ⬇
                    </div>
                    <div class="details-content" id="details-${index}" style="display: none;">
                        <ul class="remarks-list">
                            ${remarksList}
                        </ul>
                    </div>
                </div>
            `;
        }).join('');

        resultDiv.innerHTML = `
            <div class="comparison-results">
                <div class="comparison-summary">
                    <h3>🔍 智能比价结果</h3>
                    <div class="summary-stats">
                        <div class="stat">
                            <span class="stat-number">${totalOptions}</span>
                            <span class="stat-label">个方案</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${savings.toFixed(2)}元</span>
                            <span class="stat-label">最大节省</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${savingsPercent}%</span>
                            <span class="stat-label">节省比例</span>
                        </div>
                    </div>
                    <p class="summary-text">${summary.message}</p>
                    <p class="summary-recommendation">${summary.recommendation}</p>
                    <p class="summary-savings">${summary.savings}</p>
                </div>
                
                <div class="comparison-list">
                    ${resultsTable}
                </div>
                
                <div class="comparison-actions">
                    <button onclick="popupController.exportComparison()" class="export-btn">📊 导出比价报告</button>
                    <button onclick="popupController.showHistory()" class="history-btn">📋 查看历史</button>
                    <button onclick="popupController.showPriceTrend()" class="trend-btn">📈 价格趋势</button>
                </div>
            </div>
        `;

        resultDiv.style.display = 'block';

        // 添加详细信息切换功能
        window.toggleDetails = (index) => {
            const detailsDiv = document.getElementById(`details-${index}`);
            const toggle = detailsDiv.previousElementSibling;
            
            if (detailsDiv.style.display === 'none') {
                detailsDiv.style.display = 'block';
                toggle.innerHTML = '<span>详细信息</span> ⬆';
            } else {
                detailsDiv.style.display = 'none';
                toggle.innerHTML = '<span>详细信息</span> ⬇';
            }
        };
    }

    showHistory() {
        const history = this.calculator.getHistory();
        const statistics = this.calculator.getStatistics();
        
        const historyDiv = document.getElementById('result');
        if (!historyDiv) return;

        const recentCalculations = history.calculations.slice(0, 10);
        const recentComparisons = history.comparisons.slice(0, 5);

        const calculationsHtml = recentCalculations.map(calc => `
            <div class="history-item">
                <div class="history-info">
                    <strong>${calc.company} - ${calc.service}</strong>
                    <span class="history-destination">${calc.country} ${calc.zone || ''}</span>
                    <span class="history-weight">${calc.weight}kg</span>
                </div>
                <div class="history-price">${calc.totalCost.toFixed(2)}元</div>
                <div class="history-time">${new Date(calc.timestamp).toLocaleString()}</div>
            </div>
        `).join('');

        const comparisonsHtml = recentComparisons.map(comp => `
            <div class="history-item">
                <div class="history-info">
                    <strong>比价: ${comp.country}</strong>
                    <span class="history-weight">${comp.weight}kg</span>
                    <span class="history-options">${comp.totalOptions}个方案</span>
                </div>
                <div class="history-savings">节省${comp.savings.toFixed(2)}元</div>
                <div class="history-time">${new Date(comp.timestamp).toLocaleString()}</div>
            </div>
        `).join('');

        historyDiv.innerHTML = `
            <div class="history-view">
                <h3>📋 使用历史</h3>
                
                <div class="statistics">
                    <h4>📊 统计信息</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">${statistics.totalCalculations}</span>
                            <span class="stat-label">总计算次数</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${statistics.totalComparisons}</span>
                            <span class="stat-label">比价次数</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${statistics.avgCost}元</span>
                            <span class="stat-label">平均费用</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${statistics.totalSavings}元</span>
                            <span class="stat-label">累计节省</span>
                        </div>
                    </div>
                    ${statistics.mostUsedCompany ? `<p>最常用物流公司: <strong>${statistics.mostUsedCompany}</strong></p>` : ''}
                    ${statistics.mostUsedCountry ? `<p>最常用目的地: <strong>${statistics.mostUsedCountry}</strong></p>` : ''}
                </div>

                <div class="history-section">
                    <h4>🧮 最近计算</h4>
                    <div class="history-list">
                        ${calculationsHtml || '<p>暂无计算记录</p>'}
                    </div>
                </div>

                <div class="history-section">
                    <h4>🔍 最近比价</h4>
                    <div class="history-list">
                        ${comparisonsHtml || '<p>暂无比价记录</p>'}
                    </div>
                </div>

                <div class="history-actions">
                    <button onclick="popupController.exportHistory()" class="export-btn">📊 导出历史</button>
                    <button onclick="popupController.clearHistory()" class="clear-btn">🗑️ 清除历史</button>
                    <button onclick="location.reload()" class="back-btn">← 返回计算</button>
                </div>
            </div>
        `;

        historyDiv.style.display = 'block';
    }

    exportComparison() {
        if (!this.currentComparison) {
            this.showError('没有可导出的比价数据');
            return;
        }

        const csvData = this.generateComparisonCSV(this.currentComparison);
        this.downloadCSV(csvData, `比价报告_${this.currentComparison.country}_${this.currentComparison.weight}kg_${new Date().toISOString().split('T')[0]}.csv`);
    }

    exportHistory() {
        const historyData = this.calculator.exportHistory();
        const blob = new Blob([historyData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `物流计算历史_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    generateComparisonCSV(comparison) {
        let csv = '排名,物流公司,服务类型,分区,重量(kg),总费用(元),美元费用,时效,产品代码,备注\n';
        
        comparison.results.forEach((result, index) => {
            const remarks = result.remark.join('; ').replace(/,/g, '；');
            csv += `${index + 1},"${result.company}","${result.service}","${result.zone || ''}",${result.weight},${result.totalCost.toFixed(2)},${result.usdCost},"${result.timeframe}","${result.code || ''}","${remarks}"\n`;
        });
        
        return csv;
    }

    downloadCSV(csvData, filename) {
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    clearHistory() {
        if (confirm('确定要清除所有历史记录吗？此操作不可恢复。')) {
            this.calculator.clearHistory();
            this.showHistory(); // 刷新历史显示
        }
    }

    showLoading(message) {
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
            resultDiv.style.display = 'block';
        }
    }

    showError(message) {
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="error">
                    <h3>❌ 错误</h3>
                    <p>${message}</p>
                </div>
            `;
            resultDiv.style.display = 'block';
        }
    }

    loadSavedSettings() {
        try {
            const saved = localStorage.getItem('logistics_popup_settings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.exchangeRate = settings.exchangeRate || 7;
                this.setupExchangeRateDisplay();
            }
        } catch (error) {
            console.warn('加载设置失败:', error);
        }
    }

    saveSettings() {
        try {
            const settings = {
                exchangeRate: this.exchangeRate
            };
            localStorage.setItem('logistics_popup_settings', JSON.stringify(settings));
        } catch (error) {
            console.warn('保存设置失败:', error);
        }
    }
}

// 初始化控制器
let popupController;
document.addEventListener('DOMContentLoaded', () => {
    popupController = new PopupController();
});

// 导出为全局变量
window.popupController = popupController;