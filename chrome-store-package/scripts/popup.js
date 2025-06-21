// 主要的popup逻辑
document.addEventListener('DOMContentLoaded', async function() {
    // 初始化数据库和计算器
    await initializeApp();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 加载下拉菜单数据
    await loadSelectOptions();
});

// 初始化应用
async function initializeApp() {
    // 等待数据库初始化完成
    await new Promise(resolve => {
        const checkDatabase = () => {
            if (window.database) {
                resolve();
            } else {
                setTimeout(checkDatabase, 100);
            }
        };
        checkDatabase();
    });
    
    // 初始化计算器
    window.calculator = new PriceCalculator(window.database);
}

// 绑定事件监听器
function bindEventListeners() {
    const calculateBtn = document.getElementById('calculateBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    
    calculateBtn.addEventListener('click', handleCalculateClick);
    settingsBtn.addEventListener('click', handleSettingsClick);
    
    // 实时输入验证
    const inputs = ['productName', 'weight', 'unitPrice'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', validateInputs);
    });
    
    // 下拉菜单变化事件
    const selects = ['logistics', 'destination'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        select.addEventListener('change', validateInputs);
    });
}

// 加载下拉菜单选项
async function loadSelectOptions() {
    try {
        // 加载物流渠道
        const logistics = await window.database.getLogisticsChannels();
        const logisticsSelect = document.getElementById('logistics');
        
        logistics.forEach(channel => {
            const option = document.createElement('option');
            option.value = channel.id;
            option.textContent = `${channel.name} (¥${channel.cost_per_kg}/kg, ${channel.delivery_days}天)`;
            logisticsSelect.appendChild(option);
        });
        
        // 加载目的地
        const destinations = await window.database.getDestinations();
        const destinationSelect = document.getElementById('destination');
        
        destinations.forEach(dest => {
            const option = document.createElement('option');
            option.value = dest.id;
            option.textContent = `${dest.name} (关税率: ${(dest.tariff_rate * 100).toFixed(1)}%)`;
            destinationSelect.appendChild(option);
        });
        
    } catch (error) {
        showError('加载数据失败: ' + error.message);
    }
}

// 处理计算按钮点击
async function handleCalculateClick() {
    try {
        // 显示加载状态
        showLoading(true);
        
        // 获取输入值
        const productName = document.getElementById('productName').value.trim();
        const weight = parseFloat(document.getElementById('weight').value);
        const unitPrice = parseFloat(document.getElementById('unitPrice').value);
        const logistics = document.getElementById('logistics').value;
        const destination = document.getElementById('destination').value;
        
        // 验证输入
        if (!validateForm(productName, weight, unitPrice, logistics, destination)) {
            return;
        }
        
        // 计算报价
        const quote = await window.calculator.calculateQuote(
            productName, weight, unitPrice, logistics, destination
        );
        
        // 显示结果
        displayResults(quote);
        
    } catch (error) {
        showError('计算失败: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// 验证表单
function validateForm(productName, weight, unitPrice, logistics, destination) {
    if (!productName) {
        showError('请输入产品名称');
        return false;
    }
    
    if (isNaN(weight) || weight <= 0) {
        showError('请输入有效的重量');
        return false;
    }
    
    if (isNaN(unitPrice) || unitPrice <= 0) {
        showError('请输入有效的单价');
        return false;
    }
    
    if (!logistics) {
        showError('请选择物流渠道');
        return false;
    }
    
    if (!destination) {
        showError('请选择目的地');
        return false;
    }
    
    return true;
}

// 实时输入验证
function validateInputs() {
    const productName = document.getElementById('productName').value.trim();
    const weight = document.getElementById('weight').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const logistics = document.getElementById('logistics').value;
    const destination = document.getElementById('destination').value;
    
    const calculateBtn = document.getElementById('calculateBtn');
    const isValid = productName && weight && unitPrice && logistics && destination;
    
    calculateBtn.disabled = !isValid;
    calculateBtn.style.opacity = isValid ? '1' : '0.6';
}

// 显示计算结果
function displayResults(quote) {
    // 更新各项费用
    document.getElementById('productCost').textContent = `¥${quote.productCost.toFixed(2)}`;
    document.getElementById('logisticsCost').textContent = `¥${quote.logisticsCost.toFixed(2)}`;
    document.getElementById('tariffCost').textContent = `¥${quote.tariffCost.toFixed(2)}`;
    document.getElementById('profitAmount').textContent = `¥${quote.profitAmount.toFixed(2)}`;
    document.getElementById('finalPrice').textContent = `¥${quote.finalPrice.toFixed(2)}`;
    
    // 显示结果区域
    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'block';
    
    // 平滑滚动到结果
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // 保存历史记录
    saveQuoteHistory(quote);
}

// 保存报价历史
async function saveQuoteHistory(quote) {
    try {
        const history = await window.database.getData('quote_history') || [];
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            productName: quote.calculations.productName || '未知产品',
            weight: quote.calculations.weight,
            unitPrice: quote.calculations.unitPrice,
            logistics: quote.logistics.name,
            destination: quote.destination.name,
            finalPrice: quote.finalPrice,
            details: quote
        };
        
        history.unshift(historyItem);
        
        // 只保留最近50条记录
        if (history.length > 50) {
            history.splice(50);
        }
        
        await window.database.setData('quote_history', history);
    } catch (error) {
        console.error('保存历史记录失败:', error);
    }
}

// 处理设置按钮点击
function handleSettingsClick() {
    chrome.runtime.openOptionsPage();
}

// 显示加载状态
function showLoading(isLoading) {
    const container = document.querySelector('.container');
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (isLoading) {
        container.classList.add('loading');
        calculateBtn.textContent = '计算中...';
        calculateBtn.disabled = true;
    } else {
        container.classList.remove('loading');
        calculateBtn.textContent = '计算报价';
        calculateBtn.disabled = false;
    }
}

// 显示错误信息
function showError(message) {
    // 移除现有错误信息
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
    
    // 创建错误元素
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    // 插入到主内容区域
    const main = document.querySelector('main');
    main.appendChild(errorDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 3000);
}

// 格式化货币显示
function formatCurrency(amount, currency = 'CNY') {
    const symbols = {
        'CNY': '¥',
        'USD': '$',
        'EUR': '€',
        'JPY': '¥',
        'KRW': '₩',
        'SGD': 'S$'
    };
    
    return `${symbols[currency] || ''}${amount.toFixed(2)}`;
}

// 复制报价到剪贴板
async function copyQuoteToClipboard(quote) {
    const report = window.calculator.generateQuoteReport(quote);
    let text = `${report.summary}\n\n`;
    text += report.breakdown.join('\n') + '\n\n';
    text += report.total + '\n';
    text += report.deliveryTime + '\n';
    text += report.profitMargin;
    
    if (report.foreignCurrency) {
        text += '\n' + report.foreignCurrency;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showSuccess('报价已复制到剪贴板');
    } catch (error) {
        console.error('复制失败:', error);
        showError('复制失败，请手动复制');
    }
}

// 显示成功信息
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.style.cssText = `
        background: #f0f9ff;
        border: 1px solid #0ea5e9;
        color: #0369a1;
        padding: 12px;
        border-radius: 8px;
        margin-top: 16px;
        font-size: 14px;
    `;
    successDiv.textContent = message;
    
    const main = document.querySelector('main');
    main.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 2000);
} 