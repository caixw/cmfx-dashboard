// SPDX-License-Identifier: MIT

import { RouteObject } from 'react-router-dom';

import { MenuItem, UserMenuItem } from './menu';
import { checkRoutes } from './route';

// 初始化应用的选项
export interface Options {
    name: string // 应用名称，将显示在标题和左侧菜单栏顶部。
    logo: string // 应用图标，显示在左侧菜单栏顶部。
    titleSeparator?: string // 标题与子标题之间的分隔符，默认为 |
    pageSizes?: Array<number>
    loginBG?: string // 登录页的背景

    // 登录页和登录后的默认页地址
    loginPath: string
    homePath: string

    routes: Array<RouteObject> // 各类路由的定义
    menus: Array<MenuItem> // 菜单栏的定义
    userMenus: Array<UserMenuItem> // 用户菜单

    // 所有 API 请求的前缀
    //
    // 如果请求的 API 不是以 https:// 和 http:// 开头的，
    // 都将以此值作为其访问地址的前缀添加上去。
    urlPrefix: string
}

export const presetOptions = {
    titleSeparator: ' | ',
    pageSizes: [20, 50, 100, 200],
    loginBG: ''
};

export function buildOptions(o: Options): Required<Options> {
    checkRoutes('', [], o.routes);
    return Object.assign({}, presetOptions, o);
}
