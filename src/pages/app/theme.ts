// SPDX-License-Identifier: MIT

import { GlobalThemeOverrides } from 'naive-ui';

export type ThemeMode = 'os' | 'dark' | 'light'

export interface Theme {
    dark: GlobalThemeOverrides
    light: GlobalThemeOverrides
}

export const blue = {
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
};
