// 万邦物流数据导入器
class WanboDataImporter {
    constructor() {
        this.rawData = null;
        this.processedData = null;
    }

    // 解析重量段字符串，例如 "0-0.1" -> {min: 0, max: 0.1}
    parseWeightRange(weightRange) {
        const parts = weightRange.split('-');
        return {
            min: parseFloat(parts[0]),
            max: parseFloat(parts[1])
        };
    }

    // 处理CSV数据（从Excel转换而来）
    async processCSVData(csvContent) {
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');
        
        // 验证必需的列
        const requiredColumns = ['国家', '产品名称', '产品代码', '参考时效', '重量段', '公斤重RMB', '操作费RMB'];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
            throw new Error(`缺少必需的列: ${missingColumns.join(', ')}`);
        }

        const processedRates = {};
        
        // 处理每一行数据
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length < headers.length) continue;
            
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header.trim()] = row[index] ? row[index].trim().replace(/"/g, '') : '';
            });
            
            // 跳过空行
            if (!rowData['国家'] || !rowData['产品代码']) continue;
            
            const country = this.getCountryCode(rowData['国家']);
            const serviceCode = rowData['产品代码'];
            const weightRange = this.parseWeightRange(rowData['重量段']);
            
            // 初始化国家数据结构
            if (!processedRates[country]) {
                processedRates[country] = {
                    name: rowData['国家'],
                    services: {}
                };
            }
            
            // 初始化服务数据结构
            if (!processedRates[country].services[serviceCode]) {
                processedRates[country].services[serviceCode] = {
                    name: rowData['产品名称'],
                    deliveryTime: rowData['参考时效'],
                    weightLimit: rowData['重量限制KG'],
                    sizeLimit: rowData['尺寸限制'],
                    weightTiers: []
                };
            }
            
            // 添加重量段
            processedRates[country].services[serviceCode].weightTiers.push({
                minWeight: weightRange.min,
                maxWeight: weightRange.max,
                pricePerKg: parseFloat(rowData['公斤重RMB']),
                operationFee: parseFloat(rowData['操作费RMB']),
                notes: rowData['备注'] || ''
            });
        }
        
        // 对重量段进行排序
        Object.keys(processedRates).forEach(country => {
            Object.keys(processedRates[country].services).forEach(service => {
                processedRates[country].services[service].weightTiers.sort((a, b) => a.minWeight - b.minWeight);
            });
        });
        
        this.processedData = processedRates;
        return processedRates;
    }

    // 国家名称到代码的映射
    getCountryCode(countryName) {
        const countryMap = {
            '美国': 'US',
            '英国': 'GB', 
            '德国': 'DE',
            '法国': 'FR',
            '意大利': 'IT',
            '西班牙': 'ES',
            '荷兰': 'NL',
            '比利时': 'BE',
            '奥地利': 'AT',
            '瑞士': 'CH',
            '加拿大': 'CA',
            '澳大利亚': 'AU',
            '日本': 'JP',
            '韩国': 'KR',
            '新加坡': 'SG',
            '马来西亚': 'MY'
        };
        return countryMap[countryName] || countryName.toUpperCase();
    }

    // 将处理后的数据保存到Chrome存储
    async saveToStorage() {
        if (!this.processedData) {
            throw new Error('没有可保存的数据，请先处理数据');
        }

        try {
            // 保存物流费率数据
            await chrome.storage.local.set({
                'logistics_rates': this.processedData,
                'last_import_time': new Date().toISOString(),
                'data_source': 'wanbo_logistics'
            });
            
            console.log('万邦物流数据已成功保存到存储');
            return true;
        } catch (error) {
            console.error('保存数据失败:', error);
            throw error;
        }
    }

    // 验证数据完整性
    validateData(data) {
        const issues = [];
        
        Object.keys(data).forEach(country => {
            const countryData = data[country];
            
            if (!countryData.services || Object.keys(countryData.services).length === 0) {
                issues.push(`${country}: 没有服务数据`);
                return;
            }
            
            Object.keys(countryData.services).forEach(serviceCode => {
                const service = countryData.services[serviceCode];
                
                if (!service.weightTiers || service.weightTiers.length === 0) {
                    issues.push(`${country} ${serviceCode}: 没有重量段数据`);
                    return;
                }
                
                // 检查重量段是否连续
                service.weightTiers.forEach((tier, index) => {
                    if (tier.minWeight >= tier.maxWeight) {
                        issues.push(`${country} ${serviceCode}: 重量段 ${tier.minWeight}-${tier.maxWeight} 无效`);
                    }
                    
                    if (index > 0 && tier.minWeight !== service.weightTiers[index - 1].maxWeight) {
                        // 允许小的间隔（如 0.3 到 0.301）
                        const gap = tier.minWeight - service.weightTiers[index - 1].maxWeight;
                        if (gap > 0.001) {
                            issues.push(`${country} ${serviceCode}: 重量段之间存在间隔`);
                        }
                    }
                });
            });
        });
        
        return issues;
    }

    // 生成数据统计报告
    generateReport() {
        if (!this.processedData) {
            return null;
        }
        
        const report = {
            totalCountries: Object.keys(this.processedData).length,
            totalServices: 0,
            totalWeightTiers: 0,
            countries: {}
        };
        
        Object.keys(this.processedData).forEach(country => {
            const countryData = this.processedData[country];
            const serviceCount = Object.keys(countryData.services).length;
            let weightTierCount = 0;
            
            Object.keys(countryData.services).forEach(service => {
                weightTierCount += countryData.services[service].weightTiers.length;
            });
            
            report.countries[country] = {
                name: countryData.name,
                services: serviceCount,
                weightTiers: weightTierCount
            };
            
            report.totalServices += serviceCount;
            report.totalWeightTiers += weightTierCount;
        });
        
        return report;
    }

    // 预设万邦物流数据
    getWanboPresetData() {
        return {
            US: {
                name: '美国',
                services: {
                    USPHFZ: {
                        name: '万邦服装专线普货',
                        deliveryTime: '9-12',
                        weightLimit: '0-30',
                        sizeLimit: '55cm*40cm*40cm',
                        weightTiers: [
                            { minWeight: 0, maxWeight: 0.1, pricePerKg: 102, operationFee: 24, notes: '50G起重' },
                            { minWeight: 0.101, maxWeight: 0.2, pricePerKg: 100, operationFee: 22, notes: '' },
                            { minWeight: 0.201, maxWeight: 0.3, pricePerKg: 92, operationFee: 20, notes: '' },
                            { minWeight: 0.301, maxWeight: 0.45, pricePerKg: 91, operationFee: 20, notes: '' },
                            { minWeight: 0.451, maxWeight: 0.7, pricePerKg: 86, operationFee: 20, notes: '' },
                            { minWeight: 0.701, maxWeight: 3, pricePerKg: 86, operationFee: 13, notes: '' },
                            { minWeight: 3.001, maxWeight: 30, pricePerKg: 82, operationFee: 13, notes: '' }
                        ]
                    }
                }
            },
            GB: {
                name: '英国',
                services: {
                    WBPHFZ: {
                        name: '万邦服装专线普货',
                        deliveryTime: '7-10',
                        weightLimit: '0-20',
                        sizeLimit: '60*40*40cm',
                        weightTiers: [
                            { minWeight: 0, maxWeight: 0.3, pricePerKg: 33, operationFee: 16, notes: '偏远地区限重20KG；偏远地区体积限制0.031m³' },
                            { minWeight: 0.301, maxWeight: 2, pricePerKg: 36, operationFee: 16, notes: '' },
                            { minWeight: 2.001, maxWeight: 20, pricePerKg: 40, operationFee: 16, notes: '' }
                        ]
                    }
                }
            },
            DE: {
                name: '德国',
                services: {
                    WBPHFZ: {
                        name: '万邦服装专线普货',
                        deliveryTime: '8-12',
                        weightLimit: '0-30',
                        sizeLimit: '60*40*40cm Min size:15*11*1cm',
                        weightTiers: [
                            { minWeight: 0, maxWeight: 0.3, pricePerKg: 42, operationFee: 19, notes: '' },
                            { minWeight: 0.301, maxWeight: 1, pricePerKg: 39, operationFee: 22, notes: '' },
                            { minWeight: 1.001, maxWeight: 30, pricePerKg: 41, operationFee: 22, notes: '' }
                        ]
                    }
                }
            },
            FR: {
                name: '法国',
                services: {
                    WBPHFZ: {
                        name: '万邦服装专线普货',
                        deliveryTime: '8-12',
                        weightLimit: '0-30',
                        sizeLimit: '60*40*40cm Min size:15*11*1cm',
                        weightTiers: [
                            { minWeight: 0, maxWeight: 0.3, pricePerKg: 54, operationFee: 20, notes: '' },
                            { minWeight: 0.301, maxWeight: 2, pricePerKg: 50, operationFee: 21, notes: '' },
                            { minWeight: 2.001, maxWeight: 30, pricePerKg: 50, operationFee: 21, notes: '' }
                        ]
                    }
                }
            },
            IT: {
                name: '意大利',
                services: {
                    WBPHFZ: {
                        name: '万邦服装专线普货',
                        deliveryTime: '8-12',
                        weightLimit: '0-5',
                        sizeLimit: '60*40*40cm',
                        weightTiers: [
                            { minWeight: 0, maxWeight: 0.5, pricePerKg: 45, operationFee: 25, notes: '' },
                            { minWeight: 0.501, maxWeight: 2, pricePerKg: 47, operationFee: 24, notes: '' },
                            { minWeight: 2.001, maxWeight: 5, pricePerKg: 49, operationFee: 24, notes: '' }
                        ]
                    }
                }
            },
            ES: {
                name: '西班牙',
                services: {
                    WBPHFZ: {
                        name: '万邦服装专线普货',
                        deliveryTime: '8-12',
                        weightLimit: '0-30',
                        sizeLimit: '60*40*40cm',
                        weightTiers: [
                            { minWeight: 0, maxWeight: 0.25, pricePerKg: 48, operationFee: 18, notes: '' },
                            { minWeight: 0.251, maxWeight: 2, pricePerKg: 48, operationFee: 18, notes: '' },
                            { minWeight: 2.001, maxWeight: 5, pricePerKg: 48, operationFee: 18, notes: '' },
                            { minWeight: 5.001, maxWeight: 30, pricePerKg: 48, operationFee: 18, notes: '' }
                        ]
                    }
                }
            }
        };
    }

    // 快速导入万邦预设数据
    async importWanboPresetData() {
        const presetData = this.getWanboPresetData();
        this.processedData = presetData;
        
        await this.saveToStorage();
        return this.generateReport();
    }
}

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WanboDataImporter;
} else {
    window.WanboDataImporter = WanboDataImporter;
} 