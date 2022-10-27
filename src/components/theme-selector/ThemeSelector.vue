<template>
    <n-dropdown :options="themes" @select="change">
        <n-button circle>
            <template #icon><n-icon :component="PaletteFilled" /></template>
        </n-button>
    </n-dropdown>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { PaletteFilled, RadioButtonCheckedFilled, RadioButtonUncheckedFilled } from '@vicons/material';
import { useI18n } from 'vue-i18n';
import { DropdownOption, DropdownDividerOption, NIcon, NButton, NDropdown } from 'naive-ui';

import { useCmfx } from '@/pages/app';
import { ThemeMode } from '@/plugins/options';

const $cmfx = useCmfx();
const $i18n = useI18n();

const renderThemeModeIcon = (v: ThemeMode) => {
    return () => {
        const icon = (v === $cmfx.themeMode ? RadioButtonCheckedFilled : RadioButtonUncheckedFilled);
        return h(NIcon, null, {default: () => h(icon)});
    };
};

const renderThemeIcon = (v: string) => {
    return () => {
        const icon = (v === $cmfx.theme ? RadioButtonCheckedFilled : RadioButtonUncheckedFilled);
        return h(NIcon, null, {default: () => h(icon)});
    };
};

const renderLabel = (id: string) => {
    return () => {
        return h('span', null, {default: ()=> $i18n.t(id)});
    };
};

const themes: Array<DropdownDividerOption | DropdownOption> = [
    {
        key: 'os',
        label: renderLabel('theme.os'),
        icon: renderThemeModeIcon('os')
    },
    {
        key: 'light',
        label: renderLabel('theme.light'),
        icon: renderThemeModeIcon('light')
    },
    {
        key: 'dark',
        label: renderLabel('theme.dark'),
        icon: renderThemeModeIcon('dark')
    },
    { type: 'divider' },
];
for (const t of $cmfx.options.themes) {
    themes.push({ key: t.id, label: renderLabel(t.name), icon: renderThemeIcon(t.id) });
}

const change = (id: string) => {
    switch (id) {
    case 'os':
    case 'dark':
    case 'light':
        $cmfx.themeMode = id;
        break;
    default:
        $cmfx.theme = id;
    }
};
</script>
