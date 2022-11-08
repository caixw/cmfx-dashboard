<template>
    <n-space justify="space-between" class="actions">
        <n-space justify="start">
            <slot></slot>
        </n-space>

        <n-space justify="end" :size="0">
            <!-- 刷新 -->
            <n-tooltip>
                <template #trigger>
                    <n-button :disabled="loading" circle :bordered="false" :focusable="false" @click="emits('load')">
                        <template #icon><n-icon :component="RefreshFilled" /></template>
                    </n-button>
                </template>
                {{$t('common.refresh')}}
            </n-tooltip>

            <n-tooltip v-if="props.printArea">
                <template #trigger>
                    <n-button :disabled="loading" circle :bordered="false" :focusable="false" v-print="printer">
                        <template #icon><n-icon :component="PrintFilled" /></template>
                    </n-button>
                </template>
                {{$t('common.print')}}
            </n-tooltip>

            <!-- 表属性 -->
            <n-dropdown trigger="click" :options="attrs" @select="selectAttr">
            <n-tooltip>
                <template #trigger>
                    <n-button circle :bordered="false" :focusable="false">
                        <template #icon><n-icon :component="TableViewFilled" /></template>
                    </n-button>
                </template>
                {{$t('table.attribute')}}
            </n-tooltip>
        </n-dropdown>

            <!-- 列设置 -->
            <x-column-attribute :columns="props.columns" @set-columns="setColumns" />
        </n-space>
    </n-space>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import {
    NTooltip, NSpace, NButton, NIcon,
    NDropdown, DropdownOption, DropdownDividerOption,
    DataTableColumn
} from 'naive-ui';
import {
    RefreshFilled, PrintFilled,
    RadioButtonCheckedFilled, RadioButtonUncheckedFilled, CheckBoxFilled, CheckBoxOutlineBlankFilled, TableViewFilled
} from '@vicons/material';
import { useI18n } from 'vue-i18n';
import vPrint from 'vue3-print-nb';

import { default as XColumnAttribute } from './ColumnAttribute.vue';

export type HeightType = 'small' | 'medium' | 'large';

const $i18n = useI18n();

// props
const props = withDefaults(defineProps<{
    printArea?: string // 需要打印的元素 ID，如果为空则不显示打印按钮。
    printTitle?: string
    columns: Array<DataTableColumn>
    loading: boolean // 父元素是否处于加载状态，该状态下，某些按钮可能不可用。
}>(), {
    printTitle: '',
});

// emits
const emits = defineEmits<{
    (e: 'setColumns', v: Array<DataTableColumn>): void
    (e: 'setStriped', v: boolean): void
    (e: 'setHeight', v: HeightType): void
    (e: 'load'): void
}>();

const printer = {
    id: props.printArea,
    popTitle: props.printTitle,
};

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

function selectAttr(val: string) {
    switch(val) {
    case 'small':
    case 'medium':
    case 'large':
        height.value = val;
        emits('setHeight', val);
        return;
    case 'striped':
        striped.value = !striped.value;
        emits('setStriped', striped.value);
        return;
    }
}

function setColumns(v: Array<DataTableColumn>) {
    emits('setColumns', v);
}
</script>

<style scoped>
.actions {
    margin-bottom: 10px;
}
</style>
