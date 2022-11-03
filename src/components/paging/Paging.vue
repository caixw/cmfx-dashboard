<template>
    <n-space vertical class="topbar">
        <div class="search" v-if="props.queries">
            <slot name="search"></slot>
            <n-button type="primary" @click="load" class="search-button">
                <template #icon><n-icon :component="SearchFilled" /></template>
                {{ $t('common.search') }}
            </n-button>
        </div>

        <n-divider class="divider" v-if="props.queries" />

        <n-space justify="space-between">
            <n-space justify="start">
                <slot name="actions"></slot>
            </n-space>

            <n-space justify="end" :size="0">
                <!-- 刷新 -->
                <n-tooltip>
                    <template #trigger>
                        <n-button circle :bordered="false" :focusable="false" @click="load">
                            <template #icon><n-icon :component="RefreshFilled" /></template>
                        </n-button>
                    </template>
                    {{$t('common.refresh')}}
                </n-tooltip>

                <n-tooltip>
                    <template #trigger>
                        <n-button circle :bordered="false" :focusable="false" v-print="'#table'">
                            <template #icon><n-icon :component="PrintFilled" /></template>
                        </n-button>
                    </template>
                    {{$t('common.print')}}
                </n-tooltip>

                <!-- 表属性 -->
                <x-table-attribute @striped="setStriped" @height="setHeight" />

                <!-- 列设置 -->
                <x-column-attribute :columns="props.columns" @set-columns="setColumns" />
            </n-space>
        </n-space>
    </n-space>

    <n-data-table id="table" :columns="columns" :data="data" :striped="striped" :size="height"
        :rowKey="rowKey" @update-checked-row-keys="checked"
        @update:page-size="load" @update:page="load" :pagination="pagination" /><!-- pagination -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    NButton, NDataTable, NDivider, NIcon, NTooltip, NSpace,
    PaginationProps, DataTableColumn
} from 'naive-ui';
import { SearchFilled, RefreshFilled, PrintFilled } from '@vicons/material';
import vPrint from 'vue3-print-nb';

import { useCmfx } from '@/pages/app';
import { Page, Query, encodeQuery, CheckMeta } from './paging';
import { default as XTableAttribute, HeightType } from './TableAttribute.vue';
import { default as XColumnAttribute } from './ColumnAttribute.vue';

const $cmfx = useCmfx();

// props
interface Props {
    // query
    url: string
    pageSizes: Array<number>
    queries?: Query

    // data table
    columns: Array<DataTableColumn>
    rowKey?: string // 每一行的唯一字段的字段名
}
const props = withDefaults(defineProps<Props>(), {
    pageSizes: () => [20, 50, 100],
    queries: undefined,
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
    // 选择列的事件
    //
    // keys 表示选中列的唯一 ID，值来源于 row-key 属性指定的字段所表示的值；
    // rows 为选中的每一行数据；
    // meta 表示执行的操作；
    (e: 'checked', keys: Array<string | number>, rows: Array<unknown>, meta: CheckMeta): void
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

/**
 * 重新加载当前页的数据，如果执行了删除操作，那么可能会使当前页失效。
 */
async function load() {
    let query = `page=${pagination.value.page}&size=${pagination.value.pageSize}`;
    query += encodeQuery(props.queries);

    const r = await $cmfx.get(`${props.url}?${query}`);
    if (!r.ok) {
        console.error(r.problem);
        return;
    }

    if (r.status === 404) {
        data.value = [];
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const page = r.body as Page<any>;
        data.value = page.current;
        pagination.value.itemCount = page.count;
    }
}

onMounted(() => {
    load();
});

defineExpose(load);
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

.topbar {
    margin-bottom: 10px;
}

.divider {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
