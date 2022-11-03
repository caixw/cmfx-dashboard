<template>
    <n-config-provider :theme="themeMode" :preflight-style-disabled="true" :breakpoints="breakpoints"
        :theme-overrides="theme === undefined ? null : (themeMode === null ? theme.light : theme.dark)"
        :locale="naiveLocale.locale" :date-locale="naiveLocale.date">
        <n-global-style />

        <n-notification-provider>
            <n-message-provider>
                <router-view></router-view>
            </n-message-provider>
        </n-notification-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import {
    NConfigProvider, NMessageProvider, NNotificationProvider,
    lightTheme, darkTheme, useOsTheme, NGlobalStyle, // 主题
    GlobalTheme
} from 'naive-ui';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ThemeMode, Theme } from '@/plugins/options';
import { Cmfx } from './cmfx';
import { getNaiveLocale, NaiveLocale } from './locale';
import { installNavigationGuard } from './token';

const $router = useRouter();
const $i18n = useI18n();

// theme mode

const themeMode = ref<GlobalTheme | null>(null);

const osTheme = useOsTheme();
let stopOsThemeWatcher = watch(osTheme, (n) => {
    themeMode.value = n === 'dark' ? darkTheme : lightTheme;
});

function setThemeMode(mode: ThemeMode) {
    stopOsThemeWatcher();
    switch (mode) {
    case 'os':
        themeMode.value = osTheme.value === 'dark' ? darkTheme : null;

        stopOsThemeWatcher = watch(osTheme, (n) => { // 监视变化
            themeMode.value = n === 'dark' ? darkTheme : null;
        });
        break;
    case 'light':
        themeMode.value = null;
        break;
    case 'dark':
        themeMode.value = darkTheme;
        break;
    }
}

const theme = ref<Theme|undefined>();
function setTheme(t?: Theme) {
    theme.value = t;
}

// 本地化
const naiveLocale = ref<NaiveLocale>(getNaiveLocale('zh-CN'));
function setLocale(t: string) {
    $i18n.locale.value = t;
    naiveLocale.value = getNaiveLocale(t);
}

const $cmfx = new Cmfx(setLocale, setTheme, setThemeMode);

// 不需要 ref，config-provider 本身就是响应式的。
const breakpoints = $cmfx.options.breakpoints;

onMounted(async() => {
    installNavigationGuard($cmfx.options, $router);
    $cmfx.locale = $i18n.availableLocales[0];
});

onUnmounted(() => {
    if (stopOsThemeWatcher) {
        stopOsThemeWatcher();
    }
});
</script>
