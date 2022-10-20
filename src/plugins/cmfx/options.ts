// SPDX-License-Identifier: MIT

import { MenuItem } from './menu';

/**
 * 整个项目的配置对象
 */
export interface Options {
    name: string // 应用名称
    logo: string // 应用图标

    token?: {
        storage: Storage
        name: string
    }

    // api 相关
    urlPrefix: string
    loginPage: string // 登录页的路由名称
    contentType?: string
    acceptType?: string
    pageSize?: number

    menus: Array<MenuItem> // 侧边栏的菜单
}

export const defaultOptions = {
    token: {
        storage: window.localStorage,
        name: 'admin_token'
    },

    contentType: 'application/json',
    acceptType: 'application/json',
    pageSize: 20
};
