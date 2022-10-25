// SPDX-License-Identifier: MIT

import type { InjectionKey, App } from 'vue';

import { MenuItem } from './menu';
import { NamedTheme } from './theme';

export const optionsKey = Symbol() as InjectionKey<Required<Options>>;

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

    // 一些必要页面的名称定义
    loginPage: string
    presetPage: string

    // api 相关
    urlPrefix: string
    contentType?: string
    acceptType?: string

    // 所有的主题
    //
    //可以创建一个 theme 为空的主题，表示采用系统主题。
    themes: Array<NamedTheme>

    userMenus: Array<MenuItem> // 用户菜单

    menus: Array<MenuItem> // 侧边栏的菜单
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
function buildOptions(o: Options): Required<Options> {
    const opt = Object.assign(presetOptions, o);

    if (opt.themes.length === 0) {
        throw 'themes 不能为空';
    }

    return opt;
}

const presetOptions = {
    titleSeparator: ' | ',

    token: {
        storage: window.localStorage,
        name: 'admin_token'
    },

    contentType: 'application/json',
    acceptType: 'application/json',
    locale: 'zh-CN',
};
