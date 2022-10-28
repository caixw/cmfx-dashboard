<template>
    <n-space vertical class="topbar">
        <n-space class="search">
            <slot name="search"></slot>
            <n-button @click="load" v-if="props.queries">
                <template #icon><n-icon :component="SearchFilled" /></template>
                {{ $t('common.search') }}
            </n-button>
        </n-space>
        <slot name="actions"></slot>
    </n-space>

    <n-data-table :columns="props.columns" :data="data"
        :on-update:page-size="load" :on-update:page="load" :pagination="pagination" /><!-- pagination -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    NButton, NDataTable, NIcon, NSpace,
    PaginationProps, DataTableColumn,
} from 'naive-ui';
import { SearchFilled } from '@vicons/material';

import { useCmfx } from '@/pages/app';
import { Page, Query, encodeQuery } from './paging';

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

// 分页对象
const pagination = ref<PaginationProps>({
    itemCount: 0,
    pageSizes: props.pageSizes,
    page: 0,
    pageSize: props.pageSizes[0]
});

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
    margin-bottom: 10px;
}

.topbar {
    margin-bottom: 10px;
}
</style>
