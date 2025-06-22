// 万邦物流数据验证脚本
// 在浏览器控制台运行此脚本

console.log('🚛 万邦物流数据验证开始...');

try {
    // 初始化数据库
    const database = new CompleteLogisticsDatabase();
    
    // 验证万邦物流服务
    const services = database.getServices('万邦物流');
    console.log('✅ 万邦物流服务列表:', Object.keys(services));
    
    // 验证每个服务的国家数量
    Object.keys(services).forEach(serviceName => {
        const countries = database.getCountries('万邦物流', serviceName);
        console.log(`📦 ${serviceName}: ${countries.length}个国家`);
        console.log(`   国家: ${countries.join(', ')}`);
    });
    
    // 测试价格计算
    console.log('\n💰 价格计算测试:');
    
    // 测试1: 服装专线到美国
    const test1 = database.calculateShipping('万邦物流', '服装专线', '美国', 1.5);
    console.log('测试1 - 服装专线到美国1.5KG:', test1);
    
    // 测试2: 专线挂号普货到澳大利亚（需要分区）
    const test2 = database.calculateShipping('万邦物流', '专线挂号普货', '澳大利亚', 2, '1区');
    console.log('测试2 - 专线挂号普货到澳大利亚1区2KG:', test2);
    
    // 测试3: 专线挂号带电到日本（首重续重）
    const test3 = database.calculateShipping('万邦物流', '专线挂号带电', '日本', 1.5);
    console.log('测试3 - 专线挂号带电到日本1.5KG:', test3);
    
    // 统计总国家数
    let totalCountries = 0;
    Object.keys(services).forEach(serviceName => {
        totalCountries += database.getCountries('万邦物流', serviceName).length;
    });
    
    console.log(`\n📊 万邦物流总计支持 ${totalCountries} 个国家服务`);
    console.log('✅ 万邦物流数据验证完成！');
    
} catch (error) {
    console.error('❌ 验证失败:', error);
} 