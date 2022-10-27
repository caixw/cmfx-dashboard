// SPDX-License-Identifier: MIT

// app
export { useCmfx, XApp } from '@/pages/app';

// login
export { default as XLogin } from '@/pages/Login.vue';

// logout
export { default as XLogout } from '@/pages/Logout.vue';

// layout
export { XLayout } from '@/pages/layout';

// components
export { XLocaleSelector } from '@/components/locale-selector';
export { XThemeSelector } from '@/components/theme-selector';

// options
export type { Options, MenuItem, Theme, ThemeMode } from '@/plugins/options';
export { presetThemes, createOptions } from '@/plugins/options';
