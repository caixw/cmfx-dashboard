// SPDX-License-Identifier: MIT

import { GlobalThemeOverrides } from 'naive-ui';

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
                common: {
                    baseColor: '#8bbccc',
                    primaryColor: '#000000'
                }
            },
            dark: {
                common: {
                    baseColor: '#eaeaea',
                    primaryColor: '#00abb3'
                }
            }
        }
    }
];
