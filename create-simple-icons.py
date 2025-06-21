#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单图标生成器 - 为Chrome插件创建PNG图标
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """创建指定尺寸的图标"""
    # 创建图像
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 绘制渐变背景（简化版）
    # 主色调：蓝紫色渐变
    for y in range(size):
        alpha = int(255 * (1 - y / size * 0.3))  # 渐变透明度
        color = (102, 126, 234, alpha)  # 蓝紫色
        draw.line([(0, y), (size, y)], fill=color)
    
    # 绘制圆角矩形背景
    margin = size // 8
    draw.rounded_rectangle(
        [margin, margin, size-margin, size-margin],
        radius=size//6,
        fill=(102, 126, 234, 255)
    )
    
    # 添加卡车符号（简化版）
    center = size // 2
    truck_size = size // 3
    
    # 卡车车身
    draw.rectangle(
        [center - truck_size//2, center - truck_size//4, 
         center + truck_size//3, center + truck_size//4],
        fill='white'
    )
    
    # 卡车车头
    draw.rectangle(
        [center + truck_size//3, center - truck_size//6,
         center + truck_size//2, center + truck_size//6],
        fill='white'
    )
    
    # 车轮
    wheel_radius = size // 20
    draw.ellipse(
        [center - truck_size//3 - wheel_radius, center + truck_size//6,
         center - truck_size//3 + wheel_radius, center + truck_size//6 + wheel_radius*2],
        fill='white'
    )
    draw.ellipse(
        [center + truck_size//6 - wheel_radius, center + truck_size//6,
         center + truck_size//6 + wheel_radius, center + truck_size//6 + wheel_radius*2],
        fill='white'
    )
    
    # 保存图标
    icons_dir = 'icons'
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)
    
    filepath = os.path.join(icons_dir, filename)
    img.save(filepath, 'PNG')
    print(f"✅ 创建图标: {filepath} ({size}x{size})")

def main():
    """生成所有尺寸的图标"""
    print("🚚 开始生成Chrome插件图标...")
    
    sizes = [
        (16, 'icon16.png'),
        (32, 'icon32.png'), 
        (48, 'icon48.png'),
        (128, 'icon128.png')
    ]
    
    for size, filename in sizes:
        create_icon(size, filename)
    
    print("🎉 所有图标生成完成！")
    print("📁 图标位置: icons/")
    print("📋 下一步: 重新打包Chrome插件")

if __name__ == "__main__":
    main() 