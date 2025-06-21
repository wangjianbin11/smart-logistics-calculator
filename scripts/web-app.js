// 智能物流报价机器人 - 网页版主应用
class LogisticsWebApp {
    constructor() {
        this.database = window.logisticsDatabase;
        this.calculator = window.logisticsCalculator;
        this.currentTab = 'single';
        this.exchangeRate = 7;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCompanyOptions();
        this.loadCountryOptions();
        this.setupExchangeRate();
        this.showTab('single'); // 默认显示单个查询
    }

    setupEventListeners() {
        // 标签页切换
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.showTab(e.target.dataset.tab);
            });
        });

        // 单个查询事件
        const singleForm = document.getElementById('single-quote-form');
        if (singleForm) {
            singleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateSingleQuote();
            });
        }

        // 智能比价事件
        const compareBtn = document.getElementById('compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performComparison();
            });
        }

        // 物流公司选择变化
        const companySelect = document.getElementById('company');
        if (companySelect) {
            companySelect.addEventListener('change', () => {
                this.loadServiceOptions();
                this.loadCountryOptionsForService();
            });
        }

        // 服务类型选择变化
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', () => {
                this.loadCountryOptionsForService();
            });
        }

        // 国家选择变化（用于地区选择）
        const countrySelects = ['country', 'compare-country'];
        countrySelects.forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                select.addEventListener('change', () => {
                    this.loadRegionOptions(id);
                });
            }
        });

        // 汇率设置
        const exchangeRateInput = document.getElementById('exchange-rate');
        if (exchangeRateInput) {
            exchangeRateInput.addEventListener('change', (e) => {
                this.updateExchangeRate(parseFloat(e.target.value));
            });
        }

        // 历史记录管理
        const viewHistoryBtn = document.getElementById('view-history');
        if (viewHistoryBtn) {
            viewHistoryBtn.addEventListener('click', () => {
                this.showComparisonHistory();
            });
        }

        const clearHistoryBtn = document.getElementById('clear-history');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                this.clearHistory();
            });
        }
    }

    showTab(tabName) {
        // 隐藏所有标签页内容
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // 移除所有标签按钮的活动状态
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // 显示选中的标签页
        const targetContent = document.getElementById(`${tabName}-tab`);
        const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetContent) targetContent.classList.add('active');
        if (targetButton) targetButton.classList.add('active');
        
        this.currentTab = tabName;
    }

    loadCompanyOptions() {
        const companySelect = document.getElementById('company');
        if (!companySelect) return;

        const companies = this.database.getLogisticsCompanies();
        companySelect.innerHTML = '<option value="">选择物流公司</option>';
        
        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            companySelect.appendChild(option);
        });
    }

    loadServiceOptions() {
        const companySelect = document.getElementById('company');
        const serviceSelect = document.getElementById('service');
        
        if (!companySelect || !serviceSelect) return;

        const selectedCompany = companySelect.value;
        serviceSelect.innerHTML = '<option value="">选择服务类型</option>';

        if (selectedCompany) {
            const services = this.database.getServices(selectedCompany);
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                serviceSelect.appendChild(option);
            });
        }
    }

    loadCountryOptions() {
        const countrySelects = ['compare-country'];
        const allCountries = this.database.getAllCountries();

        countrySelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">选择目的地国家</option>';
                allCountries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    select.appendChild(option);
                });
            }
        });
    }

    loadCountryOptionsForService() {
        const companySelect = document.getElementById('company');
        const serviceSelect = document.getElementById('service');
        const countrySelect = document.getElementById('country');

        if (!companySelect || !serviceSelect || !countrySelect) return;

        const selectedCompany = companySelect.value;
        const selectedService = serviceSelect.value;
        
        countrySelect.innerHTML = '<option value="">选择目的地国家</option>';

        if (selectedCompany && selectedService) {
            const countries = this.database.getCountries(selectedCompany, selectedService);
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countrySelect.appendChild(option);
            });
        }
    }

    loadRegionOptions(countrySelectId) {
        const countrySelect = document.getElementById(countrySelectId);
        const regionSelectId = countrySelectId.replace('country', 'region');
        const regionSelect = document.getElementById(regionSelectId);

        if (!countrySelect || !regionSelect) return;

        const selectedCountry = countrySelect.value;
        regionSelect.innerHTML = '<option value="">选择地区（如适用）</option>';

        if (selectedCountry) {
            // 检查所有物流公司的服务是否有该国家的地区选项
            const companies = this.database.getLogisticsCompanies();
            const allRegions = new Set();

            companies.forEach(company => {
                const services = this.database.getServices(company);
                services.forEach(service => {
                    const regions = this.database.getRegions(selectedCountry, company, service);
                    regions.forEach(region => allRegions.add(region));
                });
            });

            Array.from(allRegions).forEach(region => {
                const option = document.createElement('option');
                option.value = region;
                option.textContent = region;
                regionSelect.appendChild(option);
            });

            regionSelect.style.display = allRegions.size > 0 ? 'block' : 'none';
        } else {
            regionSelect.style.display = 'none';
        }
    }

    calculateSingleQuote() {
        const company = document.getElementById('company')?.value;
        const service = document.getElementById('service')?.value;
        const country = document.getElementById('country')?.value;
        const weight = parseFloat(document.getElementById('weight')?.value);
        const region = document.getElementById('region')?.value || null;

        if (!company || !service || !country || !weight) {
            this.showError('请填写所有必需字段');
            return;
        }

        const result = this.calculator.calculateSingleQuote(company, service, country, weight, region);
        
        if (result) {
            this.displaySingleResult(result);
        } else {
            this.showError('无法计算该组合的运费，请检查重量是否在允许范围内');
        }
    }

    displaySingleResult(result) {
        const resultDiv = document.getElementById('single-result');
        if (!resultDiv) return;

        resultDiv.innerHTML = `
            <div class="quote-result">
                <div class="result-header">
                    <h3>📦 运费报价</h3>
                    <div class="result-meta">
                        ${result.company} - ${result.service} 
                        ${result.region ? `(${result.region})` : ''}
                    </div>
                </div>
                
                <div class="price-display">
                    <div class="main-price">
                        <span class="rmb-price">¥${result.totalFee}</span>
                        <span class="usd-price">$${result.totalFeeUSD}</span>
                    </div>
                    <div class="price-breakdown">
                        <div class="breakdown-item">
                            <span>运费 (${result.weight}kg):</span>
                            <span>¥${result.shippingFee}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>操作费:</span>
                            <span>¥${result.handlingFee}</span>
                        </div>
                    </div>
                </div>
                
                <div class="service-details">
                    <div class="detail-item">
                        <span class="detail-label">⏱️ 时效:</span>
                        <span>${result.timeRange} 工作日</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📏 重量限制:</span>
                        <span>最大 ${result.weightLimit}kg</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📦 尺寸限制:</span>
                        <span>${result.sizeLimit}</span>
                    </div>
                </div>
                
                <div class="result-footer">
                    <small>汇率: 1 USD = ${this.exchangeRate} RMB | ${new Date().toLocaleString()}</small>
                </div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
    }

    performComparison() {
        const country = document.getElementById('compare-country')?.value;
        const weight = parseFloat(document.getElementById('compare-weight')?.value);
        const region = document.getElementById('compare-region')?.value || null;

        if (!country || !weight) {
            this.showError('请选择国家并输入重量');
            return;
        }

        this.showLoading('compare-result', '正在比较所有可用方案...');

        // 使用setTimeout模拟异步操作，提升用户体验
        setTimeout(() => {
            const comparisonResult = this.calculator.compareAllQuotes(country, weight, region);
            this.displayComparisonResult(comparisonResult);
        }, 500);
    }

    displayComparisonResult(comparisonResult) {
        const resultDiv = document.getElementById('compare-result');
        if (!resultDiv) return;

        const reportHtml = this.calculator.generateComparisonReport(comparisonResult);
        resultDiv.innerHTML = reportHtml;
        resultDiv.style.display = 'block';
    }

    showComparisonHistory() {
        const history = this.calculator.getComparisonHistory();
        const historyDiv = document.getElementById('history-list');
        
        if (!historyDiv) return;

        if (history.length === 0) {
            historyDiv.innerHTML = '<div class="no-history">暂无比价历史记录</div>';
            return;
        }

        let html = '<div class="history-items">';
        history.forEach((record, index) => {
            html += `
                <div class="history-item">
                    <div class="history-header">
                        <span class="history-title">
                            ${record.country}${record.region ? ` (${record.region})` : ''} - ${record.weight}kg
                        </span>
                        <span class="history-date">
                            ${new Date(record.timestamp).toLocaleString()}
                        </span>
                    </div>
                    <div class="history-summary">
                        找到 ${record.results.length} 个方案，最低价格: ¥${record.results[0]?.totalFee || 'N/A'}
                    </div>
                </div>
            `;
        });
        html += '</div>';

        historyDiv.innerHTML = html;
    }

    clearHistory() {
        if (confirm('确定要清除所有历史记录吗？')) {
            this.calculator.clearHistory();
            this.showComparisonHistory();
            this.showSuccess('历史记录已清除');
        }
    }

    setupExchangeRate() {
        const exchangeRateInput = document.getElementById('exchange-rate');
        if (exchangeRateInput) {
            exchangeRateInput.value = this.exchangeRate;
        }
    }

    updateExchangeRate(rate) {
        if (rate > 0) {
            this.exchangeRate = rate;
            this.calculator.setExchangeRate(rate);
            this.showSuccess(`汇率已更新: 1 USD = ${rate} RMB`);
        }
    }

    showLoading(elementId, message = '加载中...') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="loading">${message}</div>`;
            element.style.display = 'block';
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 确保数据库已加载
    if (window.logisticsDatabase && window.logisticsCalculator) {
        window.logisticsApp = new LogisticsWebApp();
    } else {
        console.error('数据库或计算器未正确加载');
    }
});