// SPDX-License-Identifier: MIT

import { GlobalThemeOverrides } from 'naive-ui';

export type ThemeMode = 'os' | 'dark' | 'light'

export interface Theme {
    id: string // 主题 ID，需要唯一性。
    dark: GlobalThemeOverrides
    light: GlobalThemeOverrides
}
