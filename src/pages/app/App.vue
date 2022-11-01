<template>
    <n-config-provider :theme="themeMode"
        :theme-overrides="theme === undefined ? null : (themeMode === null ? theme.light : theme.dark)"
        :locale="naiveLocale.locale" :date-locale="naiveLocale.date">
        <n-global-style />
        <n-message-provider>
            <router-view></router-view>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import {
    NConfigProvider, NMessageProvider,
    darkTheme, useOsTheme, NGlobalStyle, // 主题
    GlobalTheme
} from 'naive-ui';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ThemeMode, Theme } from '@/plugins/options';
import { Cmfx } from './cmfx';
import { getNaiveLocale, NaiveLocale } from './locale';
import { installRouter } from './token';

const $router = useRouter();
const $i18n = useI18n();

// theme mode

const themeMode = ref<GlobalTheme | null>(null);

const osTheme = useOsTheme();
let stopOsThemeWatcher = watch(osTheme, (n) => {
    themeMode.value = n === 'dark' ? darkTheme : null;
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

onMounted(() => {
    installRouter($cmfx.options, $router);
    $cmfx.themeMode = 'os';
    $cmfx.locale = $i18n.availableLocales[0];
});

onUnmounted(() => {
    if (stopOsThemeWatcher) {
        stopOsThemeWatcher();
    }
});
</script>
