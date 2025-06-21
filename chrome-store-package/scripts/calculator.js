// 报价计算引擎
class PriceCalculator {
    constructor(database) {
        this.database = database;
    }

    // 主要计算函数
    async calculateQuote(productName, weight, unitPrice, logisticsId, destinationId) {
        try {
            // 获取基础数据
            const logisticsChannels = await this.database.getLogisticsChannels();
            const destinations = await this.database.getDestinations();
            const profitSettings = await this.database.getProfitSettings();
            
            // 找到选定的物流渠道和目的地
            const logistics = logisticsChannels.find(l => l.id === logisticsId);
            const destination = destinations.find(d => d.id === destinationId);
            
            if (!logistics || !destination) {
                throw new Error('未找到选定的物流渠道或目的地');
            }

            // 获取产品分类
            const productCategory = await this.database.getProductCategory(productName);

            // 1. 计算产品成本
            const productCost = weight * unitPrice;

            // 2. 计算物流费用
            const logisticsCost = this.calculateLogisticsCost(weight, logistics);

            // 3. 计算关税
            const tariffCost = this.calculateTariff(productCost, destination, productCategory);

            // 4. 计算特殊处理费用
            const specialHandlingCost = this.calculateSpecialHandling(weight, productCategory);

            // 5. 计算小计（成本 + 物流 + 关税 + 特殊处理）
            const subtotal = productCost + logisticsCost + tariffCost + specialHandlingCost;

            // 6. 计算利润
            const profitAmount = this.calculateProfit(subtotal, profitSettings);

            // 7. 计算最终报价
            const finalPrice = subtotal + profitAmount;

            // 8. 汇率转换（如果需要）
            const finalPriceInTargetCurrency = finalPrice * destination.exchange_rate;

            return {
                productCost: this.roundPrice(productCost),
                logisticsCost: this.roundPrice(logisticsCost),
                tariffCost: this.roundPrice(tariffCost),
                specialHandlingCost: this.roundPrice(specialHandlingCost),
                subtotal: this.roundPrice(subtotal),
                profitAmount: this.roundPrice(profitAmount),
                finalPrice: this.roundPrice(finalPrice),
                finalPriceInTargetCurrency: this.roundPrice(finalPriceInTargetCurrency),
                currency: destination.currency,
                exchangeRate: destination.exchange_rate,
                logistics: logistics,
                destination: destination,
                productCategory: productCategory,
                calculations: {
                    weight: weight,
                    unitPrice: unitPrice,
                    profitRate: profitSettings.profit_rate
                }
            };

        } catch (error) {
            throw new Error(`计算报价时出错: ${error.message}`);
        }
    }

    // 计算物流费用
    calculateLogisticsCost(weight, logistics) {
        const baseCost = weight * logistics.cost_per_kg;
        return Math.max(baseCost, logistics.min_cost);
    }

    // 计算关税
    calculateTariff(productCost, destination, productCategory) {
        let tariffRate = destination.tariff_rate;
        
        // 如果有产品分类，添加额外关税
        if (productCategory) {
            tariffRate += productCategory.additional_tariff;
        }
        
        return productCost * tariffRate;
    }

    // 计算特殊处理费用
    calculateSpecialHandling(weight, productCategory) {
        if (!productCategory) {
            return 0;
        }
        
        // 特殊处理费用可以是固定费用或基于重量的费用
        return productCategory.special_handling;
    }

    // 计算利润
    calculateProfit(subtotal, profitSettings) {
        const percentageProfit = subtotal * profitSettings.profit_rate;
        const markupProfit = subtotal * profitSettings.markup_rate;
        
        // 取较大的利润值，但不能低于最小利润
        return Math.max(
            Math.max(percentageProfit, markupProfit),
            profitSettings.min_profit
        );
    }

    // 价格四舍五入
    roundPrice(price) {
        return Math.round(price * 100) / 100;
    }

    // 批量计算（用于比较不同物流渠道）
    async calculateMultipleQuotes(productName, weight, unitPrice, destinationId) {
        const logisticsChannels = await this.database.getLogisticsChannels();
        const quotes = [];

        for (const logistics of logisticsChannels) {
            try {
                const quote = await this.calculateQuote(
                    productName, 
                    weight, 
                    unitPrice, 
                    logistics.id, 
                    destinationId
                );
                quotes.push({
                    logisticsChannel: logistics.name,
                    deliveryDays: logistics.delivery_days,
                    ...quote
                });
            } catch (error) {
                console.error(`计算 ${logistics.name} 报价时出错:`, error);
            }
        }

        // 按价格排序
        return quotes.sort((a, b) => a.finalPrice - b.finalPrice);
    }

    // 价格敏感性分析
    async analyzePriceSensitivity(productName, weight, unitPrice, logisticsId, destinationId) {
        const baseQuote = await this.calculateQuote(productName, weight, unitPrice, logisticsId, destinationId);
        
        const analysis = {
            base: baseQuote,
            weightSensitivity: [],
            unitPriceSensitivity: []
        };

        // 重量敏感性分析 (-20% to +20%)
        for (let factor = 0.8; factor <= 1.2; factor += 0.1) {
            const newWeight = weight * factor;
            const quote = await this.calculateQuote(productName, newWeight, unitPrice, logisticsId, destinationId);
            analysis.weightSensitivity.push({
                weightChange: this.roundPrice((factor - 1) * 100),
                newWeight: this.roundPrice(newWeight),
                finalPrice: quote.finalPrice,
                priceChange: this.roundPrice(((quote.finalPrice / baseQuote.finalPrice) - 1) * 100)
            });
        }

        // 单价敏感性分析 (-20% to +20%)
        for (let factor = 0.8; factor <= 1.2; factor += 0.1) {
            const newUnitPrice = unitPrice * factor;
            const quote = await this.calculateQuote(productName, weight, newUnitPrice, logisticsId, destinationId);
            analysis.unitPriceSensitivity.push({
                priceChange: this.roundPrice((factor - 1) * 100),
                newUnitPrice: this.roundPrice(newUnitPrice),
                finalPrice: quote.finalPrice,
                totalPriceChange: this.roundPrice(((quote.finalPrice / baseQuote.finalPrice) - 1) * 100)
            });
        }

        return analysis;
    }

    // 生成报价报告
    generateQuoteReport(quote) {
        const report = {
            summary: `产品: ${quote.calculations.weight}kg × ¥${quote.calculations.unitPrice}/kg`,
            breakdown: [
                `产品成本: ¥${quote.productCost}`,
                `物流费用: ¥${quote.logisticsCost} (${quote.logistics.name})`,
                `关税: ¥${quote.tariffCost} (${quote.destination.name})`,
            ],
            total: `最终报价: ¥${quote.finalPrice}`,
            foreignCurrency: quote.currency !== 'CNY' ? 
                `目标货币: ${quote.finalPriceInTargetCurrency} ${quote.currency}` : null,
            deliveryTime: `预计交付: ${quote.logistics.delivery_days} 天`,
            profitMargin: `利润: ¥${quote.profitAmount} (${this.roundPrice(quote.profitAmount / quote.finalPrice * 100)}%)`
        };

        if (quote.specialHandlingCost > 0) {
            report.breakdown.splice(-1, 0, `特殊处理费: ¥${quote.specialHandlingCost}`);
        }

        return report;
    }
}

// 导出计算器实例
window.calculator = null; // 将在popup.js中初始化 