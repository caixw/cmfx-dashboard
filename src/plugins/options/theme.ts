// SPDX-License-Identifier: MIT

import { GlobalThemeOverrides } from 'naive-ui';

export type ThemeMode = 'os' | 'dark' | 'light'

export interface Theme {
    dark: GlobalThemeOverrides
    light: GlobalThemeOverrides
}

export interface NamedTheme {
    id: string
    name: string
    theme?: Theme
}

// 一些预定义的主题内容
// TODO
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
