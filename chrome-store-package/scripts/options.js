// 设置页面主要逻辑
document.addEventListener('DOMContentLoaded', async function() {
    await initializeDatabase();
    initializeTabs();
    await initializeLogistics();
    await initializeDestinations();
    await initializeProfitSettings();
    await initializeHistory();
    bindEventListeners();
});

// 初始化数据库
async function initializeDatabase() {
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
}

// 初始化选项卡
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 激活目标选项卡
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 初始化物流渠道管理
async function initializeLogistics() {
    await loadLogisticsTable();
}

// 加载物流渠道表格
async function loadLogisticsTable() {
    const logistics = await window.database.getLogisticsChannels();
    const tbody = document.querySelector('#logisticsTable tbody');
    
    tbody.innerHTML = '';
    
    logistics.forEach(channel => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${channel.name}</td>
            <td>¥${channel.cost_per_kg.toFixed(2)}</td>
            <td>¥${channel.min_cost.toFixed(2)}</td>
            <td>${channel.delivery_days}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editLogistics('${channel.id}')">编辑</button>
                    <button class="delete-btn" onclick="deleteLogistics('${channel.id}')">删除</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 初始化目的地管理
async function initializeDestinations() {
    await loadDestinationsTable();
}

// 加载目的地表格
async function loadDestinationsTable() {
    const destinations = await window.database.getDestinations();
    const tbody = document.querySelector('#destinationsTable tbody');
    
    tbody.innerHTML = '';
    
    destinations.forEach(dest => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dest.name}</td>
            <td>${(dest.tariff_rate * 100).toFixed(1)}%</td>
            <td>${dest.currency}</td>
            <td>${dest.exchange_rate.toFixed(4)}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editDestination('${dest.id}')">编辑</button>
                    <button class="delete-btn" onclick="deleteDestination('${dest.id}')">删除</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 初始化利润设置
async function initializeProfitSettings() {
    const settings = await window.database.getProfitSettings();
    
    document.getElementById('profitRate').value = (settings.profit_rate * 100).toFixed(1);
    document.getElementById('markupRate').value = (settings.markup_rate * 100).toFixed(1);
    document.getElementById('minProfit').value = settings.min_profit.toFixed(0);
}

// 初始化历史记录
async function initializeHistory() {
    await loadHistory();
}

// 加载历史记录
async function loadHistory() {
    const history = await window.database.getData('quote_history') || [];
    const historyList = document.getElementById('historyList');
    const searchTerm = document.getElementById('searchHistory').value.toLowerCase();
    const filterPeriod = document.getElementById('filterPeriod').value;
    
    // 过滤历史记录
    let filteredHistory = history;
    
    // 搜索过滤
    if (searchTerm) {
        filteredHistory = filteredHistory.filter(item => 
            item.productName.toLowerCase().includes(searchTerm)
        );
    }
    
    // 时间过滤
    if (filterPeriod !== 'all') {
        const daysAgo = parseInt(filterPeriod);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
        
        filteredHistory = filteredHistory.filter(item => 
            new Date(item.timestamp) >= cutoffDate
        );
    }
    
    historyList.innerHTML = '';
    
    if (filteredHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 40px;">没有找到历史记录</p>';
        return;
    }
    
    filteredHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-header">
                <div class="history-product">${item.productName}</div>
                <div class="history-date">${formatDate(item.timestamp)}</div>
            </div>
            <div class="history-details">
                <div>重量: ${item.weight}kg</div>
                <div>单价: ¥${item.unitPrice}/kg</div>
                <div>物流: ${item.logistics}</div>
                <div>目的地: ${item.destination}</div>
            </div>
            <div class="history-price">最终报价: ¥${item.finalPrice.toFixed(2)}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// 绑定事件监听器
function bindEventListeners() {
    // 保存利润设置
    document.getElementById('saveProfitBtn').addEventListener('click', saveProfitSettings);
    
    // 历史记录控制
    document.getElementById('searchHistory').addEventListener('input', loadHistory);
    document.getElementById('filterPeriod').addEventListener('change', loadHistory);
    document.getElementById('exportHistoryBtn').addEventListener('click', exportHistory);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    
    // 数据导入功能
    document.getElementById('importWanboBtn').addEventListener('click', importWanboData);
    document.getElementById('importExcelBtn').addEventListener('click', importExcelData);
    document.getElementById('excelFileInput').addEventListener('change', handleFileUpload);
    
    // 页面加载时检查是否有现有数据并显示统计
    checkExistingData();
}

// 保存利润设置
async function saveProfitSettings() {
    const profitRate = parseFloat(document.getElementById('profitRate').value) / 100;
    const markupRate = parseFloat(document.getElementById('markupRate').value) / 100;
    const minProfit = parseFloat(document.getElementById('minProfit').value);
    
    const settings = {
        profit_rate: profitRate,
        markup_rate: markupRate,
        min_profit: minProfit
    };
    
    try {
        await window.database.updateProfitSettings(settings);
        showSuccess('利润设置已保存');
    } catch (error) {
        showError('保存失败: ' + error.message);
    }
}

// 导出历史记录
async function exportHistory() {
    const history = await window.database.getData('quote_history') || [];
    
    if (history.length === 0) {
        showError('没有历史记录可导出');
        return;
    }
    
    // 生成CSV内容
    const headers = ['时间', '产品名称', '重量(kg)', '单价(¥/kg)', '物流渠道', '目的地', '最终报价(¥)'];
    const csvContent = [
        headers.join(','),
        ...history.map(item => [
            formatDate(item.timestamp),
            item.productName,
            item.weight,
            item.unitPrice,
            item.logistics,
            item.destination,
            item.finalPrice.toFixed(2)
        ].join(','))
    ].join('\n');
    
    // 下载文件
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `报价历史_${formatDate(new Date()).replace(/[\/\s:]/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccess('历史记录已导出');
}

// 清除历史记录
async function clearHistory() {
    if (confirm('确定要清除所有历史记录吗？此操作不可撤销。')) {
        try {
            await window.database.setData('quote_history', []);
            await loadHistory();
            showSuccess('历史记录已清除');
        } catch (error) {
            showError('清除失败: ' + error.message);
        }
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN');
}

// 显示成功消息
function showSuccess(message) {
    showMessage(message, 'success');
}

// 显示错误消息
function showError(message) {
    showMessage(message, 'error');
}

// 显示消息
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    }
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// ============ 数据导入功能 ============

// 检查现有数据并显示统计
async function checkExistingData() {
    try {
        const data = await chrome.storage.local.get(['logistics_rates', 'last_import_time']);
        if (data.logistics_rates) {
            const importer = new WanboDataImporter();
            importer.processedData = data.logistics_rates;
            const report = importer.generateReport();
            showDataStats(report, data.last_import_time);
        }
    } catch (error) {
        console.log('暂无导入数据:', error.message);
    }
}

// 显示数据统计
function showDataStats(report, lastUpdate) {
    const statsDiv = document.getElementById('dataStats');
    document.getElementById('countryCount').textContent = report.totalCountries;
    document.getElementById('serviceCount').textContent = report.totalServices;
    document.getElementById('tierCount').textContent = report.totalWeightTiers;
    document.getElementById('lastUpdate').textContent = lastUpdate ? 
        formatDate(lastUpdate) : '--';
    statsDiv.classList.remove('hidden');
}

// 导入万邦预设数据
async function importWanboData() {
    const statusDiv = document.getElementById('importStatus');
    const statusText = statusDiv.querySelector('.status-text');
    const statusIcon = statusDiv.querySelector('.status-icon');
    
    try {
        // 显示导入状态
        statusDiv.classList.remove('hidden', 'success', 'error');
        statusIcon.textContent = '⏳';
        statusText.textContent = '正在导入万邦物流数据...';
        
        // 创建导入器并导入数据
        const importer = new WanboDataImporter();
        const report = await importer.importWanboPresetData();
        
        // 显示成功状态
        statusDiv.classList.add('success');
        statusIcon.textContent = '✅';
        statusText.textContent = '万邦物流数据导入成功！';
        
        // 显示数据统计
        showDataStats(report, new Date().toISOString());
        
        // 3秒后隐藏状态
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 3000);
        
        showSuccess(`成功导入 ${report.totalCountries} 个国家的物流数据`);
        
    } catch (error) {
        // 显示错误状态
        statusDiv.classList.add('error');
        statusIcon.textContent = '❌';
        statusText.textContent = '导入失败: ' + error.message;
        
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 5000);
        
        showError('导入失败: ' + error.message);
    }
}

// 触发Excel文件选择
function importExcelData() {
    document.getElementById('excelFileInput').click();
}

// 处理文件上传
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const statusDiv = document.getElementById('importStatus');
    const statusText = statusDiv.querySelector('.status-text');
    const statusIcon = statusDiv.querySelector('.status-icon');
    
    try {
        // 检查文件类型
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.csv') && !fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
            throw new Error('请选择CSV或Excel文件');
        }
        
        // 显示导入状态
        statusDiv.classList.remove('hidden', 'success', 'error');
        statusIcon.textContent = '⏳';
        statusText.textContent = '正在读取文件...';
        
        let csvContent;
        
        if (fileName.endsWith('.csv')) {
            // 直接读取CSV文件
            csvContent = await readFileAsText(file);
        } else {
            // Excel文件需要转换为CSV（简化处理）
            showError('Excel文件导入功能开发中，请先将Excel转换为CSV格式再导入');
            statusDiv.classList.add('hidden');
            return;
        }
        
        // 更新状态
        statusText.textContent = '正在处理数据...';
        
        // 处理CSV数据
        const importer = new WanboDataImporter();
        const processedData = await importer.processCSVData(csvContent);
        
        // 验证数据
        const issues = importer.validateData(processedData);
        if (issues.length > 0) {
            console.warn('数据验证警告:', issues);
        }
        
        // 保存数据
        await importer.saveToStorage();
        const report = importer.generateReport();
        
        // 显示成功状态
        statusDiv.classList.add('success');
        statusIcon.textContent = '✅';
        statusText.textContent = 'Excel数据导入成功！';
        
        // 显示数据统计
        showDataStats(report, new Date().toISOString());
        
        // 3秒后隐藏状态
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 3000);
        
        showSuccess(`成功导入 ${report.totalCountries} 个国家的数据，包含 ${report.totalWeightTiers} 个重量段`);
        
    } catch (error) {
        // 显示错误状态
        statusDiv.classList.add('error');
        statusIcon.textContent = '❌';
        statusText.textContent = '导入失败: ' + error.message;
        
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 5000);
        
        showError('Excel导入失败: ' + error.message);
    } finally {
        // 清空文件输入
        event.target.value = '';
    }
}

// 读取文件为文本
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('文件读取失败'));
        reader.readAsText(file, 'UTF-8');
    });
}

// 全局函数，供HTML调用
window.editLogistics = function(channelId) { console.log('Edit logistics:', channelId); };
window.deleteLogistics = function(channelId) { console.log('Delete logistics:', channelId); };
window.editDestination = function(destId) { console.log('Edit destination:', destId); };
window.deleteDestination = function(destId) { console.log('Delete destination:', destId); }; 