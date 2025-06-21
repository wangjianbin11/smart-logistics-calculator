// 增强版弹窗主控制器 - 支持智能比价和汇率显示
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
    }

    loadInterface() {
        this.loadCompanyOptions();
        this.loadCountryOptions();
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

    showWeightTips() {
        const weight = parseFloat(document.getElementById('weight')?.value);
        const country = document.getElementById('country')?.value;
        const tipsDiv = document.getElementById('weightTips');
        
        if (tipsDiv && weight && country) {
            // 显示重量相关的提示信息
            let tips = '';
            
            if (weight < 0.05) {
                tips += '💡 大部分物流公司最小计费重量为50g\n';
            }
            
            if (weight > 10) {
                tips += '⚠️ 重量较大，请确认物流公司的重量限制\n';
            }
            
            // 获取智能推荐
            const recommendation = this.calculator.getSmartRecommendation(country, weight);
            if (recommendation) {
                tips += `🎯 根据历史数据推荐: ${recommendation.company} ${recommendation.service}`;
            }
            
            tipsDiv.textContent = tips;
            tipsDiv.style.display = tips ? 'block' : 'none';
        }
    }

    calculateSingle() {
        const company = document.getElementById('company')?.value;
        const service = document.getElementById('service')?.value;
        const country = document.getElementById('country')?.value;
        const weight = parseFloat(document.getElementById('weight')?.value);
        const zone = document.getElementById('zone')?.value || null;

        if (!company || !service || !country || !weight || weight <= 0) {
            this.showError('请填写完整的计算信息');
            return;
        }

        const result = this.calculator.calculateSingleQuote(company, service, country, weight, zone);
        this.displaySingleResult(result);
    }

    displaySingleResult(result) {
        const resultsDiv = document.getElementById('results');
        
        if (!resultsDiv) return;

        if (result.error) {
            resultsDiv.innerHTML = `
                <div class="error-message">
                    ❌ ${result.error}
                </div>
            `;
            return;
        }

        resultsDiv.innerHTML = `
            <div class="single-result">
                <h3>📦 ${result.company} - ${result.service}</h3>
                <div class="destination-info">
                    <strong>目的地:</strong> ${result.country}${result.zone ? ` (${result.zone})` : ''}
                </div>
                
                <div class="weight-info">
                    <strong>重量:</strong> ${result.weight}kg 
                    ${result.originalWeight !== result.weight ? `<small>(原重${result.originalWeight}kg)</small>` : ''}
                </div>
                
                <div class="price-details">
                    <div class="price-row">
                        <span>运费:</span>
                        <span>¥${result.shippingCost} <small>($${result.shippingCostUSD})</small></span>
                    </div>
                    <div class="price-row">
                        <span>操作费:</span>
                        <span>¥${result.handlingFee} <small>($${result.handlingFeeUSD})</small></span>
                    </div>
                    <div class="price-row total">
                        <span><strong>总费用:</strong></span>
                        <span><strong>¥${result.totalCost} <span class="usd-price">($${result.totalCostUSD})</span></strong></span>
                    </div>
                </div>
                
                <div class="service-details">
                    <p><strong>时效:</strong> ${result.timeframe}</p>
                    <p><strong>重量限制:</strong> ${result.weightLimit}kg</p>
                    <p><strong>尺寸限制:</strong> ${result.sizeLimit}</p>
                    ${result.note ? `<p><strong>备注:</strong> ${result.note}</p>` : ''}
                </div>
                
                <div class="rate-info">
                    <small>💱 汇率: 1 USD = ${result.exchangeRate} RMB</small>
                </div>
            </div>
        `;
    }

    performComparison() {
        const country = document.getElementById('country')?.value;
        const weight = parseFloat(document.getElementById('weight')?.value);
        const zone = document.getElementById('zone')?.value || null;

        if (!country || !weight || weight <= 0) {
            this.showError('请选择国家并输入有效重量');
            return;
        }

        // 显示加载状态
        this.showLoading('正在比较所有物流方案...');

        // 执行比价
        setTimeout(() => {
            const comparisonData = this.calculator.compareAllQuotes(country, weight, zone);
            this.currentComparison = comparisonData;
            
            if (comparisonData.results.length === 0) {
                this.showError(`暂无${country}的可用物流方案`);
                return;
            }

            // 保存到历史记录
            this.calculator.saveComparisonToHistory(comparisonData);
            
            // 显示比价结果
            this.displayComparisonResults(comparisonData);
        }, 500);
    }

    displayComparisonResults(comparisonData) {
        const report = this.calculator.generateComparisonReport(comparisonData);
        const resultsDiv = document.getElementById('results');
        
        if (resultsDiv) {
            resultsDiv.innerHTML = report.html;
        }

        // 显示操作按钮
        this.showComparisonActions();
    }

    showComparisonActions() {
        const actionsDiv = document.getElementById('comparisonActions');
        if (actionsDiv) {
            actionsDiv.innerHTML = `
                <div class="action-buttons">
                    <button onclick="popupController.showHistory()" class="btn btn-secondary">
                        📊 查看历史
                    </button>
                    <button onclick="popupController.exportCurrentComparison()" class="btn btn-primary">
                        📤 导出结果
                    </button>
                </div>
            `;
            actionsDiv.style.display = 'block';
        }
    }

    showHistory() {
        const history = this.calculator.getComparisonHistory();
        const historyDiv = document.getElementById('historyResults');
        
        if (!historyDiv) return;

        if (history.length === 0) {
            historyDiv.innerHTML = '<div class="no-history">📝 暂无历史记录</div>';
            return;
        }

        let html = `
            <div class="history-header">
                <h3>📊 比价历史记录 (${history.length}条)</h3>
                <div class="history-actions">
                    <button onclick="popupController.exportHistory()" class="btn btn-sm">导出CSV</button>
                    <button onclick="popupController.clearHistory()" class="btn btn-sm btn-danger">清空记录</button>
                </div>
            </div>
            <div class="history-list">
        `;

        history.slice(0, 10).forEach(record => {
            html += `
                <div class="history-item">
                    <div class="history-main">
                        <strong>${record.country}${record.zone ? ` (${record.zone})` : ''}</strong>
                        <span class="weight">${record.weight}kg</span>
                    </div>
                    <div class="history-details">
                        <span class="company">${record.bestOption?.company} ${record.bestOption?.service}</span>
                        <span class="price">¥${record.bestOption?.totalCost} ($${record.bestOption?.totalCostUSD})</span>
                    </div>
                    <div class="history-time">${record.timestamp}</div>
                </div>
            `;
        });

        html += '</div>';
        historyDiv.innerHTML = html;
    }

    clearHistory() {
        if (confirm('确定要清空所有历史记录吗？')) {
            this.calculator.clearComparisonHistory();
            this.showHistory();
        }
    }

    exportHistory() {
        this.calculator.downloadHistoryCSV();
    }

    exportCurrentComparison() {
        if (!this.currentComparison) {
            this.showError('没有当前比价结果可以导出');
            return;
        }

        const data = this.currentComparison;
        const csv = this.generateComparisonCSV(data);
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `比价结果_${data.country}_${data.weight}kg_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    generateComparisonCSV(data) {
        let csv = '排名,物流公司,服务类型,总费用(RMB),总费用(USD),运费(RMB),操作费(RMB),时效,重量限制,尺寸限制,节省金额(RMB),节省金额(USD)\n';
        
        data.results.forEach(result => {
            csv += `${result.rank},${result.company},${result.service},${result.totalCost},${result.totalCostUSD},`;
            csv += `${result.shippingCost},${result.handlingFee},${result.timeframe},${result.weightLimit}kg,`;
            csv += `"${result.sizeLimit}",${result.savings},${result.savingsUSD}\n`;
        });

        return csv;
    }

    showLoading(message) {
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="loading-message">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    showError(message) {
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="error-message">
                    ❌ ${message}
                </div>
            `;
        }
    }

    loadSavedSettings() {
        const saved = localStorage.getItem('logisticsSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                if (settings.exchangeRate) {
                    this.updateExchangeRate(settings.exchangeRate);
                }
            } catch (e) {
                console.warn('加载设置失败:', e);
            }
        }
    }

    saveSettings() {
        const settings = {
            exchangeRate: this.exchangeRate
        };
        localStorage.setItem('logisticsSettings', JSON.stringify(settings));
    }
}

// 初始化控制器
let popupController;
document.addEventListener('DOMContentLoaded', () => {
    popupController = new PopupController();
});

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.PopupController = PopupController;
}