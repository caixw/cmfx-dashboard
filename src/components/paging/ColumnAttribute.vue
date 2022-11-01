<template>
<n-popover trigger="click" placement="bottom" :show-arrow="false">
    <template #trigger>
        <n-tooltip>
            <template #trigger>
                <n-button circle :bordered="false" :focusable="false">
                    <template #icon><n-icon :component="ViewColumnFilled" /></template>
                </n-button>
            </template>
            {{$t('table.columns')}}
        </n-tooltip>
    </template>

    <template #footer>
        <n-space justify="space-between">
            <n-button size="small" @click="reset">{{$t('common.reset')}}</n-button>
            <n-button size="small" type="primary" @click="apply">{{$t('common.apply')}}</n-button>
        </n-space>
    </template>

    <n-space vertical>
        <draggable v-model="editable" group="g1" item-key="key">
        <template #item="{element}">
            <div justify="space-between" class="line">
                <n-icon class="drag" :component="DragIndicatorFilled" :size="20" />

                <n-checkbox v-model:checked="element.visible">
                    {{getTitle(element)}}
                </n-checkbox>

                <div class="fixed">
                    <n-tooltip>
                        <template #trigger>
                            <n-icon :size="20" :component="AlignHorizontalLeftFilled" @click="element.fixed='left'"
                            :color="element.fixed === 'left' ? $theme.primaryColor : ''" />
                        </template>
                        {{$t('table.fixed_left')}}
                    </n-tooltip>
                    &#160;&#160;
                    <n-tooltip>
                        <template #trigger>
                            <n-icon :size="20" :component="AlignHorizontalRightFilled" @click="element.fixed='right'"
                            :color="element.fixed === 'right' ? $theme.primaryColor : ''" />
                        </template>
                        {{$t('table.fixed_right')}}
                    </n-tooltip>
                </div>
            </div>
        </template>
        </draggable>
    </n-space>
</n-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ViewColumnFilled, DragIndicatorFilled, AlignHorizontalLeftFilled, AlignHorizontalRightFilled } from '@vicons/material';
import {
    NButton, NIcon, NTooltip, NPopover, NSpace, NCheckbox,
    DataTableColumn, useThemeVars
} from 'naive-ui';
import Draggable from 'vuedraggable';
import { useI18n } from 'vue-i18n';

import { fromEditableColumnTypes, toEditableColumnTypes, EditableColumnType } from './paging';

const $theme = useThemeVars();
const $i18n = useI18n();

// props
interface Props {
    columns: Array<DataTableColumn>
}
const props = defineProps<Props>();

// emit
const emit = defineEmits<{
    (e: 'setColumns', v: Array<DataTableColumn>): void
}>();

const origin = toEditableColumnTypes($i18n.t, props.columns); // 保留原始的列数据
const editable = ref(toEditableColumnTypes($i18n.t, props.columns));// 可编辑对象

function getTitle(col: EditableColumnType): string {
    if (!('title' in col)) { return ''; }

    if (typeof(col.title) === 'string') {
        return col.title;
    }
    return (<{():string}>col.title)();
}

function reset() {
    editable.value = [];
    for(const col of origin) {
        editable.value.push(Object.assign({}, col));
    }
}

function apply() {
    emit('setColumns', fromEditableColumnTypes(editable.value));
}
</script>

<style scoped>
.line {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.fixed {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
}

.drag {
    cursor: move;
    margin-right: 5px;
}
</style>
