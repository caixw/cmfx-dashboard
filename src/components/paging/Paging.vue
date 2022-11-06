<template>
    <div class="search" v-if="props.queries">
        <slot name="search"></slot>
        <n-button type="primary" @click="load" class="search-button">
            <template #icon><n-icon :component="SearchFilled" /></template>
            {{ $t('common.search') }}
        </n-button>
    </div>

    <n-divider class="divider" v-if="props.queries" />

    <x-table-actions :columns="props.columns" :loading="loading" @load="load" @set-columns="setColumns" @set-striped="setStriped" @set-height="setHeight">
        <slot name="actions"></slot>
    </x-table-actions>

    <n-data-table id="table" :columns="columns" :data="data" :striped="striped" :size="height" :loading="loading"
        :rowKey="props.rowKey ? rowKey : undefined" @update-checked-row-keys="checked"
        @update:page-size="load" @update:page="load" :pagination="props.paging ? pagination : undefined" /><!-- pagination -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    NButton, NDataTable, NDivider, NIcon,
    PaginationProps, DataTableColumn
} from 'naive-ui';
import { SearchFilled } from '@vicons/material';

import { useCmfx } from '@/pages/app';
import { Page, Query, encodeQuery, CheckMeta } from './paging';
import { XTableActions, HeightType } from '@/components/table-actions';

const $cmfx = useCmfx();

// props
const props = withDefaults(defineProps<{
    // query
    url: string // 表格数据请求的地址
    queries?: Query // 表格数据的查询参数
    pageSizes?: Array<number> // 同 DataTable.page-size 属性
    paging?: boolean // 是否需要分页

    // data table
    columns: Array<DataTableColumn> // 列定义
    rowKey?: string // 每一行的唯一字段的字段名
}>(), {
    queries: undefined,
    pageSizes: () => [20, 50, 100, 200],
    paging: true
});
if (props.pageSizes.length === 0) {
    throw '参数 pageSizes 不能为空';
}
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: 'loaded', data: Page<any>): void
}>();
function checked(keys: Array<string | number>, rows: Array<unknown>, meta: CheckMeta): void {
    emits('checked', keys, rows, meta);
}

function rowKey(a: {[key: string]: unknown}): string | number {
    if (!props.rowKey) {
        throw '未指定的 rowKey';
    }

    const v = a[props.rowKey];
    switch (typeof v) {
    case 'string':
        return v as string;
    case 'number':
        return v as number;
    default:
        throw '无效的字段类型';
    }
}

// 分页对象
const pagination = ref<PaginationProps>({
    showSizePicker: true,
    itemCount: 0,
    pageSizes: props.pageSizes,
    page: 0,
    pageSize: props.pageSizes[0]
});

// 表属性
const striped = ref(false);
const height = ref<HeightType>('medium');
function setStriped(v: boolean) { striped.value = v; }
function setHeight(v: HeightType) { height.value = v; }

// 设置列属性
const columns = ref(props.columns);
function setColumns(v: Array<DataTableColumn>) {
    columns.value = v;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any>(undefined);

const loading = ref(true); // 初始时为 loading 状态

async function load() { reload(); }

/**
 * 重新加载数据，诸如删除或是修改了数据，可以调用此方法刷新页面数据。
 *
 * NOTE: 在处理 before 时，页面即会处于 loading 状态。
 * @param before 在加载数据之前执行的操作，如果返回 false，则会中断函数的操作。
 */
async function reload(before?: {():boolean}) {
    let query = encodeQuery(props.queries);
    if (props.paging) {
        query += `page=${pagination.value.page}&size=${pagination.value.pageSize}`;
    }

    loading.value = true;

    if (before && !before()) {
        loading.value = false;
        return;
    }

    const r = await $cmfx.get(`${props.url}?${query}`);
    loading.value = false;

    if (!r.ok) {
        console.error(r.problem);
        return;
    }

    if (r.status === 404) {
        data.value = [];
        emits('loaded', {count:0, more: false, current:[]});
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const page = r.body as Page<any>;
        data.value = page.current;
        pagination.value.itemCount = page.count;
        emits('loaded', page);
    }
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
