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
