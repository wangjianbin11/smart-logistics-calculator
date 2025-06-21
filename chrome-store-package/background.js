// 背景脚本 - 处理插件的后台逻辑
chrome.runtime.onInstalled.addListener(() => {
    console.log('智能报价机器人插件已安装');
    
    // 设置默认配置
    initializeExtension();
});

// 初始化插件
async function initializeExtension() {
    try {
        // 检查是否是首次安装
        const result = await chrome.storage.local.get(['isFirstRun']);
        
        if (!result.isFirstRun) {
            // 标记为已运行
            await chrome.storage.local.set({ isFirstRun: true });
            
            // 显示欢迎通知
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: '智能报价机器人',
                message: '插件安装成功！点击工具栏图标开始使用。'
            });
        }
    } catch (error) {
        console.error('初始化插件失败:', error);
    }
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSystemInfo') {
        // 返回系统信息
        sendResponse({
            version: chrome.runtime.getManifest().version,
            timestamp: new Date().toISOString()
        });
    }
    
    if (request.action === 'exportData') {
        // 处理数据导出
        handleDataExport(request.data, sendResponse);
        return true; // 保持消息通道开放
    }
    
    if (request.action === 'importData') {
        // 处理数据导入
        handleDataImport(request.data, sendResponse);
        return true;
    }
});

// 处理数据导出
async function handleDataExport(data, sendResponse) {
    try {
        // 获取所有数据
        const allData = await chrome.storage.local.get(null);
        
        // 过滤出业务数据
        const exportData = {
            logistics_channels: allData.logistics_channels || [],
            destinations: allData.destinations || [],
            profit_settings: allData.profit_settings || {},
            product_categories: allData.product_categories || [],
            quote_history: allData.quote_history || [],
            exportDate: new Date().toISOString(),
            version: chrome.runtime.getManifest().version
        };
        
        sendResponse({ success: true, data: exportData });
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }
}

// 处理数据导入
async function handleDataImport(importData, sendResponse) {
    try {
        // 验证数据格式
        if (!importData || typeof importData !== 'object') {
            throw new Error('无效的导入数据格式');
        }
        
        // 备份当前数据
        const backup = await chrome.storage.local.get(null);
        await chrome.storage.local.set({
            backup_data: backup,
            backup_timestamp: new Date().toISOString()
        });
        
        // 导入新数据
        const dataToImport = {
            logistics_channels: importData.logistics_channels || [],
            destinations: importData.destinations || [],
            profit_settings: importData.profit_settings || {},
            product_categories: importData.product_categories || [],
            quote_history: importData.quote_history || []
        };
        
        await chrome.storage.local.set(dataToImport);
        
        sendResponse({ success: true, message: '数据导入成功' });
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }
}

// 定期清理数据（可选）
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'cleanupData') {
        cleanupOldData();
    }
});

// 设置定期清理（每周执行一次）
chrome.runtime.onStartup.addListener(() => {
    chrome.alarms.create('cleanupData', {
        delayInMinutes: 1,
        periodInMinutes: 7 * 24 * 60 // 一周
    });
});

// 清理旧数据
async function cleanupOldData() {
    try {
        const result = await chrome.storage.local.get(['quote_history']);
        const history = result.quote_history || [];
        
        // 只保留最近3个月的历史记录
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        
        const filteredHistory = history.filter(item => 
            new Date(item.timestamp) >= threeMonthsAgo
        );
        
        if (filteredHistory.length !== history.length) {
            await chrome.storage.local.set({ quote_history: filteredHistory });
            console.log(`清理了 ${history.length - filteredHistory.length} 条过期记录`);
        }
    } catch (error) {
        console.error('清理数据失败:', error);
    }
}

// 处理上下文菜单（可选扩展功能）
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'quickQuote') {
        // 快速报价功能
        chrome.action.openPopup();
    }
});

// 在安装时创建上下文菜单
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'quickQuote',
        title: '快速报价',
        contexts: ['selection'],
        documentUrlPatterns: ['*://*/*']
    });
}); 