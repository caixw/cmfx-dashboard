// SPDX-License-Identifier: MIT

import type { InjectionKey, App } from 'vue';

import { MenuItem, checkMenuKey } from './menu';
import { NamedTheme, Breakpoints, presetBreakpoints } from './theme';

export const optionsKey = Symbol() as InjectionKey<Required<Options>>;

/**
 * 整个项目的配置对象
 */
export interface Options {
    name: string // 应用名称
    logo: string // 应用图标
    titleSeparator?: string // 标题与子标题之间的分隔符，默认为 |

    loginPage: string // 登录页的名称
    presetPage: string // 登录之后自动跳转的页面名称

    // 所有 API 请求的前缀
    //
    // 如果请求的 API 不是以 https:// 和 http:// 开头的，
    // 都将以此值作为其访问地址的前缀添加上去。
    urlPrefix: string

    contentType?: string // 传递给服务的数据格式，默认为 application/json
    acceptType?: string // 请求的内容，默认为 application/json

    // 所有的预定义主题
    //
    // 可以创建一个 theme 为空的主题，表示采用系统主题。
    themes: Array<NamedTheme>

    userMenus: Array<MenuItem> // 用户菜单

    menus: Array<MenuItem> // 侧边栏的菜单

    // 自适应断点
    //
    // 最终会传递给 config-provider.breakpoints，
    // 如果为 undefined，则采用以下值：{
    //     xs: 0,
    //     s: 640,
    //     m: 1024,
    //     l: 1280,
    //     xl: 1536,
    //     xxl: 1290
    // }。
    breakpoints?: Breakpoints
}

/**
 * 创建 options 插件
 * @param o 选项
 * @returns
 */
export function createOptions(o: Options) {
    return {
        install(app: App) {
            app.provide(optionsKey, buildOptions(o));
        }
    };
}

// 检测对象的正确性
export function buildOptions(o: Options): Required<Options> {
    const opt = Object.assign({}, presetOptions, o);

    if (opt.themes.length === 0) {
        throw 'themes 不能为空';
    }

    if (opt.userMenus.length === 0) {
        throw 'userMenus 不能为空';
    }

    if (opt.menus.length === 0) {
        throw 'menus 不能为空';
    }

    const ids: Array<string> = [];
    for(const t of opt.themes) {
        if (ids.find((v)=>{return v==t.id;})) {
            throw `themes.id 存在同名的 ${t.id}`;
        }
        ids.push(t.id);
    }

    checkMenuKey([], opt.menus);

    checkMenuKey([], opt.userMenus);

    return opt;
}

export const presetOptions = {
    titleSeparator: ' | ',

    contentType: 'application/json',
    acceptType: 'application/json',

    breakpoints: presetBreakpoints,
};
