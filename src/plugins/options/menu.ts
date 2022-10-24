// SPDX-License-Identifier: MIT

import { Component } from 'vue';

/**
 * 菜单项
 */
export interface MenuItem {
    label: string // 标题
    key: string // 唯一 ID，也是路由跳转的名称
    icon?: Component
    children?: Array<MenuItem>
    type?: 'group' | 'divider' // 特殊类别
}

