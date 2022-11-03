// SPDX-License-Identifier: MIT

// app
export { useCmfx, XApp } from '@/pages/app';

// pages
export { default as XLogin } from '@/pages/Login.vue';
export { default as XLogout } from '@/pages/Logout.vue';
export { XLayout } from '@/pages/layout';

// components
export { XLocaleSelector } from '@/components/locale-selector';
export { XThemeSelector } from '@/components/theme-selector';

// plugins
export type { Options, MenuItem, Theme, ThemeMode } from '@/plugins/options';
export { presetThemes, createOptions } from '@/plugins/options';

// utils
export { sleep } from '@/utils';
