<template>
    <n-dropdown trigger="click" :options="attrs" @select="select">
        <n-tooltip>
            <template #trigger>
                <n-button circle :bordered="false" :focusable="false">
                    <template #icon><n-icon :component="TableViewFilled" /></template>
                </n-button>
            </template>
            {{$t('table.attribute')}}
        </n-tooltip>
    </n-dropdown>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import {
    RadioButtonCheckedFilled, RadioButtonUncheckedFilled, CheckBoxFilled, CheckBoxOutlineBlankFilled, TableViewFilled
} from '@vicons/material';
import {
    NIcon, NDropdown, NTooltip, NButton, DropdownOption, DropdownDividerOption
} from 'naive-ui';
import { useI18n } from 'vue-i18n';

export type HeightType = 'small' | 'medium' | 'large';

const $i18n = useI18n();
const emit = defineEmits<{
    (e: 'striped', v: boolean): void
    (e: 'height', v: HeightType): void
}>();

const striped = ref(false);
const height = ref<HeightType>('medium');

const renderRadioIcon = (v: HeightType) => {
    return () => {
        const icon = (v === height.value ? RadioButtonCheckedFilled : RadioButtonUncheckedFilled);
        return h(NIcon, null, {default: () => h(icon)});
    };
};

const renderCheckboxIcon = () => {
    return () => {
        const icon = (striped.value ? CheckBoxFilled : CheckBoxOutlineBlankFilled);
        return h(NIcon, null, {default: () => h(icon)});
    };
};

const attrs: Array<DropdownOption | DropdownDividerOption> = [
    { key: 'small', label: ()=> $i18n.t('table.small_height'), icon: renderRadioIcon('small') },
    { key: 'medium', label: ()=> $i18n.t('table.medium_height'), icon: renderRadioIcon('medium') },
    { key: 'large', label: ()=> $i18n.t('table.large_height'), icon: renderRadioIcon('large') },
    { type: 'divider' },
    { key: 'striped', label: ()=> $i18n.t('table.striped'), icon: renderCheckboxIcon() }
];

function select(val: string) {
    switch(val) {
    case 'small':
    case 'medium':
    case 'large':
        height.value = val;
        emit('height', val);
        return;
    case 'striped':
        striped.value = !striped.value;
        emit('striped', striped.value);
        return;
    }
}
</script>
