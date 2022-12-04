// SPDX-License-Identifier: MIT

import { RouteObject } from 'react-router-dom';

import { MenuItem, UserMenuItem } from './menu';
import { checkRoutes } from './route';

/**
 * 初始化应用的选项
 */
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

    // 由 https://app.haikei.app/ 生成
    loginBG: 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="600" fill="#001220"></rect><defs><linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%"><stop offset="20%" stop-color="#001220" stop-opacity="1"></stop><stop offset="80%" stop-color="#001220" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%"><stop offset="20%" stop-color="#001220" stop-opacity="1"></stop><stop offset="80%" stop-color="#001220" stop-opacity="1"></stop></linearGradient></defs><g transform="translate(900, 0)"><path d="M0 324.5C-31.3 327.2 -62.6 330 -83.6 312C-104.5 294 -115.1 255.3 -139.5 241.6C-163.9 228 -202.1 239.3 -229.5 229.5C-256.9 219.6 -273.5 188.4 -272.8 157.5C-272.1 126.6 -254.1 95.8 -259.8 69.6C-265.6 43.4 -295 21.7 -324.5 0L0 0Z" fill="#0066FF"></path></g><g transform="translate(0, 600)"><path d="M0 -324.5C24.3 -305.4 48.5 -286.4 73.8 -275.3C99 -264.2 125.3 -261 139 -240.8C152.7 -220.5 153.8 -183.2 160.5 -160.5C167.2 -137.9 179.4 -129.9 210.4 -121.5C241.5 -113.1 291.3 -104.3 313.4 -84C335.6 -63.7 330 -31.8 324.5 0L0 0Z" fill="#0066FF"></path></g></svg>')
};

export function buildOptions(o: Options): Required<Options> {
    checkRoutes('', [], o.routes);
    return Object.assign({}, presetOptions, o);
}
