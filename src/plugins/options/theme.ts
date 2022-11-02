// SPDX-License-Identifier: MIT

import { darkTheme, GlobalThemeOverrides, lightTheme } from 'naive-ui';

export interface Breakpoints {[k:string]:number}

// NOTE: 尽量保持与 naive 的 config-provider.breakpoints 相同。
export const presetBreakpoints: Breakpoints = {
    xs: 0,
    s: 640,
    m: 1024,
    l: 1280,
    xl: 1536,
    xxl: 1290
};

export type ThemeMode = 'os' | 'dark' | 'light'

export interface Theme {
    dark: GlobalThemeOverrides
    light: GlobalThemeOverrides
}

export interface NamedTheme {
    id: string // 主题的唯一 ID
    name: string // 主题名称的翻译项 ID
    theme?: Theme
}

// 一些预定义的主题内容
export const presetThemes: Array<NamedTheme> = [
    {
        id: 'default',
        name: 'common.default'
    },
    {
        id: 'blue',
        name: 'blue',
        theme: {
            light: {
                common: Object.assign({}, lightTheme.common, {
                    baseColor: '#8bbccc',
                    primaryColor: '#000000'
                })
            },
            dark: {
                common: Object.assign({}, darkTheme.common, {
                    baseColor: '#eaeaea',
                    primaryColor: '#00abb3'
                })
            }
        }
    }
];
