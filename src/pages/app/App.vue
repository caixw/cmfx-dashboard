<template>
    <n-config-provider :theme="themeMode"
        :theme-overrides="theme === null ? null : (themeMode === null ? theme.light : theme.dark)"
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

import { ThemeMode, Theme } from './theme';
import { getCanonicalLocale, getNaiveLocale, NaiveLocale, presetLocale } from './locale';
import { useCmfx } from '@/plugins/cmfx';

const $cmfx = useCmfx();
const $router = useRouter();
const $i18n = useI18n();

const themeMode = ref<GlobalTheme | null>(null);
const theme = ref<Theme | null>(null);

const osTheme = useOsTheme();
let stopOsThemeWatcher = watch(osTheme, (n) => {
    themeMode.value = n === 'dark' ? darkTheme : null;
});

/**
 * 设置新的主题
 * @param mode 主题名称，可以是 os, dark 和 light
 */
function setThemeMode(mode?: ThemeMode) {
    stopOsThemeWatcher();
    switch (mode) {
    case 'os':
    case undefined:
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

/**
 * 设置子标题
 *
 * 设置 document.title 的子标题
 * @param title 子标题，如果为空，则只显示 name 属性值。
 */
function setTitle(title: string) {
    if (title) { title += $cmfx.options.titleSeparator; }
    document.title = title + $cmfx.options.name;
}

/**
 * 设置新的主题
 *
 * 会根据 setThemeMode 的设置自动选择是 light 还是 dark。
 * @param t 主题的定义
 */
function setTheme(t: Theme) {
    theme.value = t;
}

const naiveLocale = ref<NaiveLocale>(getNaiveLocale('zh-CN'));

/**
 * 设置本地化信息
 * @param t 本地化字符串
 */
function setLocale(t: string) {
    t = getCanonicalLocale(t);

    $cmfx.setAcceptLanguage(t);
    $i18n.locale.value = t;
    naiveLocale.value = getNaiveLocale(t);
}



defineExpose({ setThemeMode, setTheme, setTitle, setLocale });

setTitle('');
setLocale(presetLocale);

onMounted(() => {
    $cmfx.selectPage($router);
});

onUnmounted(() => {
    if (stopOsThemeWatcher) {
        stopOsThemeWatcher();
    }
});
</script>
