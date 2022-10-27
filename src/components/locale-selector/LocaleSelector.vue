<template>
    <n-dropdown :options="locales" @select="change">
        <n-button circle>
            <template #icon><n-icon :component="LanguageFilled" /></template>
        </n-button>
    </n-dropdown>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { LanguageFilled, RadioButtonCheckedFilled, RadioButtonUncheckedFilled } from '@vicons/material';
import { useI18n } from 'vue-i18n';
import { DropdownOption, DropdownDividerOption, NIcon, NButton, NDropdown } from 'naive-ui';

import { useCmfx } from '@/pages/app';

const $cmfx = useCmfx();
const $i18n = useI18n();

const renderCheckIcon = (v: string) => {
    return () => {
        const icon = (v === $cmfx.locale ? RadioButtonCheckedFilled : RadioButtonUncheckedFilled);
        return h(NIcon, null, {default: () => h(icon)});
    };
};

const renderLabel = (id: string) => {
    return () => {
        return h('span', null, {default: ()=> $i18n.t('locale.'+id)});
    };
};

const locales: Array<DropdownDividerOption | DropdownOption> = [];
for (const l of $i18n.availableLocales) {
    locales.push({ key: l, label: renderLabel(l), icon: renderCheckIcon(l) });
}

const change = (id: string) => {
    $cmfx.locale = id;
};
</script>
