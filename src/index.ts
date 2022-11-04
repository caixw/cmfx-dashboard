// SPDX-License-Identifier: MIT

// pages

export { useCmfx, XApp } from '@/pages/app';
export { XLayout } from '@/pages/layout';

export { default as XLogin } from '@/pages/Login.vue';
export { default as XLogout } from '@/pages/Logout.vue';

// components

export { XLocaleSelector } from '@/components/locale-selector';
export { XThemeSelector } from '@/components/theme-selector';

export { default as XSecurityLog } from '@/components/SecurityLog.vue';

// plugins
export type { Options, MenuItem, Theme, ThemeMode } from '@/plugins/options';
export { presetThemes, createOptions } from '@/plugins/options';

// utils
export { sleep } from '@/utils';
