// SPDX-License-Identifier: MIT

import { Component } from 'vue';

/**
 * 菜单栏的定义
 *
 * 包括了侧边栏的菜单以及用户菜单项。
 */
export interface MenuItem {
    label: string // 标题翻译 ID
    key: string // 唯一 ID，也是路由跳转的名称
    icon?: Component
    children?: Array<MenuItem>
    type?: 'group' | 'divider' // 特殊类别
}

