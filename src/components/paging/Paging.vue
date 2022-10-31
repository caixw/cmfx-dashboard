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

                <!-- 表属性 -->
                <x-table-attribute @striped="setStriped" @height="setHeight" />

                <!-- 列设置 -->
                <x-column-attribute :columns="props.columns" @set-columns="setColumns" />

            </n-space>
        </n-space>
    </n-space>

    <n-data-table :columns="columns" :data="data" :striped="striped" :size="height"
        :on-update:page-size="load" :on-update:page="load" :pagination="pagination" /><!-- pagination -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    NButton, NDataTable, NDivider, NIcon, NTooltip, NSpace,
    PaginationProps, DataTableColumn
} from 'naive-ui';
import { SearchFilled, RefreshFilled } from '@vicons/material';

import { useCmfx } from '@/pages/app';
import { Page, Query, encodeQuery } from './paging';
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
}
const props = withDefaults(defineProps<Props>(), {
    pageSizes: () => [20, 50, 100],
    queries: undefined,
});
if (props.pageSizes.length === 0) {
    throw '参数 pageSizes 不能为空';
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
