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
        <div v-for="(col,index) of editable" justify="space-between" class="line" :key="index">
            <n-icon class="drag" :component="DragIndicatorFilled" :size="20" />

            <n-checkbox v-model:checked="col.visible">
                {{getTitle(col)}}
            </n-checkbox>

            <div class="fixed">
                <n-tooltip>
                    <template #trigger>
                        <n-icon :size="20" :component="AlignHorizontalLeftFilled" @click="col.fixed='left'"
                        :color="col.fixed === 'left' ? $theme.primaryColor : ''" />
                    </template>
                    {{$t('table.fixed_left')}}
                </n-tooltip>
                &#160;&#160;
                <n-tooltip>
                    <template #trigger>
                        <n-icon :size="20" :component="AlignHorizontalRightFilled" @click="col.fixed='right'"
                        :color="col.fixed === 'right' ? $theme.primaryColor : ''" />
                    </template>
                    {{$t('table.fixed_right')}}
                </n-tooltip>
            </div>
        </div>
    </n-space>
</n-popover>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ViewColumnFilled, DragIndicatorFilled, AlignHorizontalLeftFilled, AlignHorizontalRightFilled } from '@vicons/material';
import {
    NButton, NIcon, NTooltip, NPopover, NSpace, NCheckbox,
    DataTableColumn, useThemeVars
} from 'naive-ui';

import { fromEditableColumnTypes, toEditableColumnTypes, EditableColumnType } from './paging';

const $theme = useThemeVars();

// props
interface Props {
    columns: Array<DataTableColumn>
}
const props = defineProps<Props>();

const origin: Array<EditableColumnType> = [];// 保留原始的列数据
const editable = ref<Array<EditableColumnType>>([]);// 可编辑对象

// emit
const emit = defineEmits<{
    (e: 'setColumns', v: Array<DataTableColumn>): void
}>();

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

onMounted(()=>{
    origin.push(...toEditableColumnTypes(props.columns));
    editable.value.push(...toEditableColumnTypes(props.columns));
});
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
