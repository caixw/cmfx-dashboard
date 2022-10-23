// SPDX-License-Identifier: MIT

import { MenuItem } from './menu';

/**
 * 整个项目的配置对象
 */
export interface Options {
    name: string // 应用名称
    logo: string // 应用图标
    titleSeparator?: string // 标题与子标题之间的分隔符

    token?: {
        storage: Storage
        name: string
    }

    // api 相关
    urlPrefix: string
    loginPage: string // 登录页的路由名称
    presetPage: string // 登录后的默认页
    contentType?: string
    acceptType?: string
    locale?: string // 初始语言，如果未设置，则采用当前浏览器的语言。

    menus: Array<MenuItem> // 侧边栏的菜单
}

export const presetOptions = {
    titleSeparator: ' | ',

    token: {
        storage: window.localStorage,
        name: 'admin_token'
    },

    contentType: 'application/json',
    acceptType: 'application/json',
    locale: 'en',
};
