/**
 * 物流报价机器人 - 主界面脚本
 * 修复所有交互问题并完善比价功能
 */

console.log('🚀 物流报价机器人启动...');

// 全局变量
let database = null;

// 等待DOM和数据库加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM加载完成');
    
    // 延迟初始化，确保数据库类已加载
    setTimeout(initializeApp, 100);
});

function initializeApp() {
    console.log('🔧 开始初始化应用...');
    
    try {
        // 检查数据库类是否存在
        if (typeof LogisticsDatabase === 'undefined') {
            console.error('❌ LogisticsDatabase类未定义');
            showError('数据库类未加载，请刷新页面');
            return;
        }
        
        // 初始化数据库
        database = new LogisticsDatabase();
        // 同时设置全局别名
        window.logisticsDB = database;
        window.database = database;
        console.log('✅ 数据库初始化成功');
        
        // 初始化界面
        initializeInterface();
        
        // 确保设置按钮可以点击
        if (typeof window.openOptions !== 'function') {
            window.openOptions = openOptions;
        }
        
    } catch (error) {
        console.error('❌ 初始化失败:', error);
        showError('初始化失败: ' + error.message);
    }
}

function initializeInterface() {
    console.log('🎯 开始初始化界面...');
    
    // 加载物流公司列表
    loadCompanies();
    
    // 加载比价区域的国家列表
    loadCountriesForCompare();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化重量显示
    updateWeightDisplay();
    
    console.log('✅ 界面初始化完成');
}

function loadCompanies() {
    console.log('📦 加载物流公司列表...');
    
    const companySelect = document.getElementById('company');
    if (!companySelect) {
        console.error('❌ 找不到company选择器');
        return;
    }
    
    if (!database) {
        console.error('❌ 数据库未初始化');
        return;
    }
    
    try {
        // 获取公司列表
        const companies = database.getCompanies();
        console.log('📋 获取到公司列表:', companies);
        
        // 清空现有选项
        companySelect.innerHTML = '<option value="">请选择物流公司</option>';
        
        // 添加公司选项
        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            companySelect.appendChild(option);
            console.log(`➕ 添加公司: ${company}`);
        });
        
        console.log('✅ 物流公司列表加载完成');
    } catch (error) {
        console.error('❌ 加载物流公司失败:', error);
        showError('加载物流公司失败: ' + error.message);
    }
}

function loadCountriesForCompare() {
    console.log('🌍 加载比价国家列表...');
    
    const countrySelect = document.getElementById('countryForCompare');
    if (!countrySelect || !database) {
        console.error('❌ 找不到比价国家选择器或数据库未初始化');
        return;
    }
    
    try {
        // 获取所有可用国家（从所有公司服务中提取）
        const allCountries = new Set();
        const companies = database.getCompanies();
        
        companies.forEach(company => {
            const services = database.getServices(company);
            services.forEach(service => {
                const countries = database.getCountries(company, service);
                countries.forEach(country => allCountries.add(country));
            });
        });
        
        // 清空并填充国家选项
        countrySelect.innerHTML = '<option value="">选择国家进行比价</option>';
        
        Array.from(allCountries).sort().forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
        
        console.log('✅ 比价国家列表加载完成，共', allCountries.size, '个国家');
    } catch (error) {
        console.error('❌ 加载比价国家失败:', error);
    }
}

function bindEventListeners() {
    console.log('🔗 绑定事件监听器...');
    
    // 物流公司选择
    const companySelect = document.getElementById('company');
    if (companySelect) {
        companySelect.addEventListener('change', onCompanyChange);
        console.log('✅ 绑定物流公司选择事件');
    }
    
    // 产品类型选择
    const productTypeSelect = document.getElementById('productType');
    if (productTypeSelect) {
        productTypeSelect.addEventListener('change', onProductTypeChange);
        console.log('✅ 绑定产品类型选择事件');
    }
    
    // 服务类型选择
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', onServiceChange);
        console.log('✅ 绑定服务类型选择事件');
    }
    
    // 国家选择
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countrySelect.addEventListener('change', onCountryChange);
        console.log('✅ 绑定国家选择事件');
    }
    
    // 重量滑块
    const weightSlider = document.getElementById('weightSlider');
    if (weightSlider) {
        weightSlider.addEventListener('input', onWeightChange);
        weightSlider.addEventListener('change', onWeightChange);
        console.log('✅ 绑定重量滑块事件');
    }
    
    // 计算按钮
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', onCalculate);
        console.log('✅ 绑定计算按钮事件');
    }
    
    // 比价按钮
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', onCompare);
        console.log('✅ 绑定比价按钮事件');
    }
    
    // 确保设置按钮可以点击
    window.openOptions = openOptions;
    console.log('✅ 设置全局设置函数');
    
    // 确保比价按钮事件正确绑定
    console.log('🔍 检查比价按钮:', document.getElementById('compareBtn'));
    
    // 手动绑定设置按钮点击事件（作为备用）
    const settingsButtons = document.querySelectorAll('[onclick="openOptions()"]');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openOptions();
        });
    });
    console.log('✅ 设置按钮备用事件绑定完成');
}

function onCompanyChange() {
    const companySelect = document.getElementById('company');
    const serviceSelect = document.getElementById('service');
    const countrySelect = document.getElementById('country');
    
    const selectedCompany = companySelect.value;
    console.log('🏢 选择的公司:', selectedCompany);
    
    if (selectedCompany && database) {
        try {
            // 获取该公司的服务列表
            const services = database.getServices(selectedCompany);
            console.log('📋 获取到服务列表:', services);
            
            // 更新服务选择器
            serviceSelect.innerHTML = '<option value="">请选择服务类型</option>';
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                serviceSelect.appendChild(option);
            });
            
            // 显示服务选择器
            serviceSelect.style.display = 'block';
            
            // 隐藏后续选择器
            countrySelect.style.display = 'none';
            
            console.log('✅ 服务列表更新完成');
        } catch (error) {
            console.error('❌ 获取服务失败:', error);
            showError('获取服务失败: ' + error.message);
        }
    } else {
        // 隐藏后续选择器
        serviceSelect.style.display = 'none';
        countrySelect.style.display = 'none';
    }
}

function onProductTypeChange() {
    const productType = document.getElementById('productType').value;
    console.log('📦 选择的产品类型:', productType);
    
    // 如果已选择公司，重新加载匹配的服务
    const company = document.getElementById('company').value;
    if (company && productType) {
        updateServicesForProduct(company, productType);
    }
}

function updateServicesForProduct(company, productType) {
    console.log('🔄 根据产品类型更新服务:', { company, productType });
    
    try {
        const allServices = database.getServices(company);
        const serviceSelect = document.getElementById('service');
        
        // 产品类型与服务的映射关系
        const productServiceMap = {
            '普货': ['普货', '专线挂号普货', '专线挂号标快普货', '专线挂号特惠普货'],
            '服装': ['服装', '服装专线'],
            '化妆品': ['化妆品', '化妆品专线'],
            '带电产品': ['带电', '专线挂号带电', '专线挂号标快带电', '专线挂号特惠带电'],
            '仿牌': ['仿牌', '高仿专线', '普货高仿专线'],
            '高仿': ['高仿', '高仿专线', '普货高仿专线'],
            '液体': ['液体', '液体放牌']
        };
        
        // 清空并重新填充服务选项
        serviceSelect.innerHTML = '<option value="">请选择服务类型</option>';
        
        const matchingKeywords = productServiceMap[productType] || [];
        const filteredServices = allServices.filter(service => {
            return matchingKeywords.some(keyword => 
                service.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        
        // 如果没有匹配的服务，显示所有服务
        const servicesToShow = filteredServices.length > 0 ? filteredServices : allServices;
        
        servicesToShow.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            serviceSelect.appendChild(option);
        });
        
        console.log('✅ 根据产品类型筛选服务完成');
    } catch (error) {
        console.error('❌ 更新服务失败:', error);
    }
}

function onServiceChange() {
    const companySelect = document.getElementById('company');
    const serviceSelect = document.getElementById('service');
    const countrySelect = document.getElementById('country');
    
    const selectedCompany = companySelect.value;
    const selectedService = serviceSelect.value;
    
    console.log('🚛 选择的服务:', { selectedCompany, selectedService });
    
    if (selectedCompany && selectedService && database) {
        try {
            // 获取该服务的国家列表
            const countries = database.getCountries(selectedCompany, selectedService);
            console.log('📋 获取到国家列表:', countries);
            
            // 更新国家选择器
            countrySelect.innerHTML = '<option value="">请选择目的国家</option>';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countrySelect.appendChild(option);
            });
            
            // 显示国家选择器
            countrySelect.style.display = 'block';
            
            console.log('✅ 国家列表更新完成');
        } catch (error) {
            console.error('❌ 获取国家失败:', error);
            showError('获取国家失败: ' + error.message);
        }
    } else {
        countrySelect.style.display = 'none';
    }
}

function onCountryChange() {
    const country = document.getElementById('country').value;
    console.log('🌍 选择的国家:', country);
}

function onWeightChange() {
    updateWeightDisplay();
    console.log('⚖️ 重量已更改');
}

function updateWeightDisplay() {
    const weightSlider = document.getElementById('weightSlider');
    const weightDisplay = document.getElementById('weightDisplay');
    
    if (weightSlider && weightDisplay) {
        const weight = parseFloat(weightSlider.value);
        weightDisplay.textContent = weight + 'kg';
        console.log('📊 重量显示更新:', weight + 'kg');
    } else {
        console.error('❌ 找不到重量相关元素');
    }
}

function onCalculate() {
    console.log('💰 开始计算...');
    
    const company = document.getElementById('company').value;
    const service = document.getElementById('service').value;
    const country = document.getElementById('country').value;
    const weight = parseFloat(document.getElementById('weightSlider').value);
    
    console.log('🧮 计算参数:', { company, service, country, weight });
    
    if (!company || !service || !country) {
        showError('请完整选择物流公司、服务类型和目的国家');
        return;
    }
    
    if (!database) {
        showError('数据库未加载');
        return;
    }
    
    try {
        const result = database.calculateShipping(company, service, country, weight);
        console.log('📊 计算结果:', result);
        displayResult(result);
    } catch (error) {
        console.error('❌ 计算失败:', error);
        showError('计算失败: ' + error.message);
    }
}

function displayResult(result) {
    const resultsDiv = document.getElementById('results');
    
    if (!resultsDiv) {
        console.error('❌ 找不到结果显示区域');
        return;
    }
    
    if (result.success) {
        resultsDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%); padding: 20px; border-radius: 12px; margin-top: 15px; border: 1px solid #d4edda;">
                <h3 style="color: #2e7d2e; margin: 0 0 15px 0; font-size: 18px;">💰 报价结果</h3>
                
                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div><strong>物流公司:</strong> ${result.company}</div>
                        <div><strong>服务类型:</strong> ${result.service}</div>
                        <div><strong>目的国家:</strong> ${result.country}</div>
                        <div><strong>包裹重量:</strong> ${result.weight}kg</div>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <div style="margin-bottom: 8px;"><strong>公斤费:</strong> ¥${result.perKgRate}/kg</div>
                    <div style="margin-bottom: 8px;"><strong>操作费:</strong> ¥${result.handlingFee}</div>
                    <div style="font-style: italic; color: #666; font-size: 14px;">
                        计算公式: ${result.weight}kg × ¥${result.perKgRate} + ¥${result.handlingFee} = ¥${result.totalCost}
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 24px; font-weight: bold; color: #2e7d2e; background: white; padding: 15px; border-radius: 8px;">
                    总费用: ¥${result.totalCost}
                </div>
            </div>
        `;
        console.log('✅ 结果显示成功');
    } else {
        resultsDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #ffe6e6 0%, #fff5f5 100%); padding: 20px; border-radius: 12px; margin-top: 15px; border: 1px solid #f5c6cb;">
                <h3 style="color: #d63031; margin: 0 0 10px 0;">❌ 计算失败</h3>
                <p style="margin: 0; color: #721c24;">${result.error || '未找到匹配的价格信息，请检查输入参数或联系客服'}</p>
            </div>
        `;
        console.log('❌ 显示错误结果');
    }
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function onCompare() {
    console.log('📊 开始智能比价...');
    
    const country = document.getElementById('countryForCompare').value;
    const weight = parseFloat(document.getElementById('weightForCompare').value);
    const productType = document.getElementById('productTypeForCompare').value;
    
    console.log('🔍 比价参数:', { country, weight, productType });
    
    if (!country || !weight || weight <= 0) {
        showError('请选择目的国家并输入有效重量');
        return;
    }
    
    if (!database) {
        showError('数据库未加载');
        return;
    }
    
    try {
        const comparisonResults = performComparison(country, weight, productType);
        displayComparisonResults(comparisonResults, country, weight, productType);
    } catch (error) {
        console.error('❌ 比价失败:', error);
        showError('比价失败: ' + error.message);
    }
}

function performComparison(targetCountry, weight, productType = '') {
    console.log('🔍 执行比价算法...');
    
    const results = [];
    const companies = database.getCompanies();
    
    companies.forEach(company => {
        const services = database.getServices(company);
        
        services.forEach(service => {
            // 如果指定了产品类型，进行服务筛选
            if (productType && !isServiceSuitableForProduct(service, productType)) {
                return;
            }
            
            try {
                const countries = database.getCountries(company, service);
                if (countries.includes(targetCountry)) {
                    const calculation = database.calculateShipping(company, service, targetCountry, weight);
                    
                    if (calculation.success) {
                        results.push({
                            company,
                            service,
                            country: targetCountry,
                            weight,
                            totalCost: calculation.totalCost,
                            perKgRate: calculation.perKgRate,
                            handlingFee: calculation.handlingFee,
                            calculation
                        });
                    }
                }
            } catch (error) {
                console.warn('⚠️ 计算失败:', { company, service, error: error.message });
            }
        });
    });
    
    // 按价格排序（从低到高）
    results.sort((a, b) => a.totalCost - b.totalCost);
    
    console.log('✅ 比价完成，找到', results.length, '个选项');
    return results;
}

function isServiceSuitableForProduct(service, productType) {
    const lowerService = service.toLowerCase();
    const lowerProduct = productType.toLowerCase();
    
    const suitabilityMap = {
        '普货': ['普货', '挂号普货', '标快普货', '特惠普货'],
        '服装': ['服装'],
        '化妆品': ['化妆品'],
        '带电产品': ['带电', '挂号带电', '标快带电', '特惠带电'],
        '仿牌': ['仿牌', '高仿'],
        '高仿': ['高仿', '仿牌'],
        '液体': ['液体']
    };
    
    const keywords = suitabilityMap[productType] || [];
    return keywords.some(keyword => lowerService.includes(keyword));
}

function displayComparisonResults(results, country, weight, productType) {
    const resultsDiv = document.getElementById('comparisonResults');
    
    if (!resultsDiv) {
        console.error('❌ 找不到比价结果显示区域');
        return;
    }
    
    if (results.length === 0) {
        resultsDiv.innerHTML = `
            <div style="background: #fff3cd; padding: 20px; border-radius: 12px; margin-top: 15px; border: 1px solid #ffeaa7;">
                <h3 style="color: #856404; margin: 0 0 10px 0;">⚠️ 未找到匹配选项</h3>
                <p style="margin: 0;">没有找到到${country}的${productType ? productType + '类' : ''}物流服务，请尝试其他参数。</p>
            </div>
        `;
        resultsDiv.style.display = 'block';
        return;
    }
    
    let html = `
        <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%); padding: 20px; border-radius: 12px; margin-top: 15px;">
            <h3 style="color: #1565c0; margin: 0 0 15px 0; font-size: 18px;">
                📊 智能比价结果
            </h3>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 14px;">
                    <div><strong>目的国家:</strong> ${country}</div>
                    <div><strong>包裹重量:</strong> ${weight}kg</div>
                    <div><strong>产品类型:</strong> ${productType || '所有类型'}</div>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <div style="background: #e8f5e8; padding: 10px; border-radius: 6px; font-size: 14px; color: #2e7d2e;">
                    💡 共找到 <strong>${results.length}</strong> 个选项，已按价格从低到高排序
                </div>
            </div>
    `;
    
    results.forEach((result, index) => {
        const isRecommended = index === 0;
        const badgeColor = isRecommended ? '#28a745' : (index === 1 ? '#ffc107' : '#6c757d');
        const badgeText = isRecommended ? '🏆 推荐' : (index === 1 ? '🥈 次选' : `#${index + 1}`);
        
        html += `
            <div style="background: white; border: 2px solid ${isRecommended ? '#28a745' : '#dee2e6'}; border-radius: 12px; padding: 20px; margin-bottom: 15px; position: relative;">
                <div style="position: absolute; top: -8px; right: 15px; background: ${badgeColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                    ${badgeText}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${result.company}</div>
                        <div style="color: #666; font-size: 14px;">${result.service}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 24px; font-weight: bold; color: ${isRecommended ? '#28a745' : '#333'};">
                            ¥${result.totalCost}
                        </div>
                        <div style="color: #666; font-size: 12px;">总费用</div>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; font-size: 14px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div>公斤费: ¥${result.perKgRate}/kg</div>
                        <div>操作费: ¥${result.handlingFee}</div>
                    </div>
                    <div style="margin-top: 8px; font-style: italic; color: #666; font-size: 12px;">
                        ${weight}kg × ¥${result.perKgRate} + ¥${result.handlingFee} = ¥${result.totalCost}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    showSuccess(`比价完成！为您找到${results.length}个选项，最优价格¥${results[0].totalCost}`);
}

function openOptions() {
    console.log('⚙️ 打开设置页面...');
    try {
        if (chrome && chrome.tabs && chrome.runtime) {
            chrome.tabs.create({
                url: chrome.runtime.getURL('options.html')
            });
        } else {
            // 如果 chrome API 不可用，尝试直接打开
            window.open('options.html', '_blank');
        }
    } catch (error) {
        console.error('❌ 打开设置页面失败:', error);
        try {
            // 备用方案：直接打开新窗口
            window.open('options.html', '_blank');
        } catch (fallbackError) {
            showError('无法打开设置页面: ' + error.message);
        }
    }
}

function showError(message) {
    console.error('❌ 错误:', message);
    
    // 创建或更新错误提示
    let errorDiv = document.getElementById('errorToast');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'errorToast';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f8d7da;
            color: #721c24;
            padding: 15px 20px;
            border-radius: 8px;
            border: 1px solid #f5c6cb;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
            font-size: 14px;
        `;
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

function showSuccess(message) {
    console.log('✅ 成功:', message);
    
    // 类似错误提示的成功提示
    let successDiv = document.getElementById('successToast');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'successToast';
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #d4edda;
            color: #155724;
            padding: 15px 20px;
            border-radius: 8px;
            border: 1px solid #c3e6cb;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
            font-size: 14px;
        `;
        document.body.appendChild(successDiv);
    }
    
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

console.log('📦 popup-main.js 脚本加载完成');