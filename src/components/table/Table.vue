<template>
    <div class="search" v-if="props.queries">
        <slot name="search"></slot>
        <n-button type="primary" @click="load" class="search-button">
            <template #icon><n-icon :component="SearchFilled" /></template>
            {{ $t('common.search') }}
        </n-button>
    </div>

    <n-divider class="divider" v-if="props.queries" />

    <x-actions :columns="props.columns" :loading="loading" @load="load" @set-columns="setColumns" @set-striped="setStriped" @set-height="setHeight">
        <slot name="actions"></slot>
    </x-actions>

    <n-data-table id="table" :columns="columns" :data="data" :striped="striped" :size="height" :loading="loading"
        :rowKey="props.rowKey ? buildRowKey(props.rowKey) : undefined" @update:checked-row-keys="checked" remote />
</template>

<script setup lang="ts" generic="T extends {[k:string]:any}">
import { ref, onMounted } from 'vue';
import {
    NButton, NDataTable, NDivider, NIcon,
    DataTableColumn
} from 'naive-ui';
import { SearchFilled } from '@vicons/material';

import { useCmfx } from '@/pages/app';
import { Query, encodeQuery, CheckMeta, buildRowKey } from './table';
import { default as XActions, HeightType } from './actions/Actions.vue';

const $cmfx = useCmfx();

// props
const props = defineProps<{
    url: string // 表格数据请求的地址
    queries?: Query // 表格数据的查询参数
    columns: Array<DataTableColumn> // 列定义
    rowKey?: string // 每一行的唯一字段的字段名
}>();
for(const col of props.columns) {
    if (!('type' in col)) {
        continue;
    }
    if (col.type === 'selection' && !props.rowKey) {
        throw '当列类型为 selection 时，rowKey 不能为空';
    }
}

// emits
const emits = defineEmits<{
    // DataTable.update-checked-row-keys 事件的外放
    (e: 'checked', keys: Array<string | number>, rows: Array<unknown>, meta: CheckMeta): void

    // 每次刷新数据成功之后触发的事件
    // eslint-disable-next-line no-undef
    (e: 'loaded', data: Array<T>): void
}>();
function checked(keys: Array<string | number>, rows: Array<unknown>, meta: CheckMeta): void {
    emits('checked', keys, rows, meta);
}

// table actions
const striped = ref(false);
const height = ref<HeightType>('medium');
const columns = ref(props.columns);
function setStriped(v: boolean) { striped.value = v; }
function setHeight(v: HeightType) { height.value = v; }
function setColumns(v: Array<DataTableColumn>) { columns.value = v; }

// eslint-disable-next-line no-undef
const data = ref<Array<T>>();

const loading = ref(true); // 初始时为 loading 状态

async function load() { reload(); }

/**
 * 重新加载数据，诸如删除或是修改了数据，可以调用此方法刷新页面数据。
 *
 * NOTE: 在处理 before 时，页面即会处于 loading 状态。
 * @param before 在加载数据之前执行的操作，如果返回 false，则会中断函数的操作。
 */
async function reload(before?: {():boolean}) {
    loading.value = true;

    if (before && !before()) {
        loading.value = false;
        return;
    }

    const r = await $cmfx.get(`${props.url}?${encodeQuery(props.queries)}`);
    loading.value = false;

    if (!r.ok) {
        console.error(r.problem);
        return;
    }

    if (r.status === 404) {
        data.value = [];
    } else {
        // eslint-disable-next-line no-undef
        data.value = r.body as Array<T>;
    }
    emits('loaded', data.value);
}

onMounted(() => {
    load();
});

defineExpose({reload});
</script>

<style scoped>
.search {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
}

.search-button {
    margin-left: auto;
}
.divider {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
