<template>
    <x-paging url="/url" :columns="cols" :queries="queries" :page-sizes="[50,100]">
        <template #search>
            <n-input v-model:value="queries.str" />
            <n-input-number v-model:value="queries.num" />
            <n-select style="min-width: 100px" multiple v-model:value="queries.array" :options="options" />
        </template>
        <template #actions>
            <n-space>
                <n-button>aaa</n-button>
                <n-button>bbb</n-button>
            </n-space>
        </template>
    </x-paging>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    DataTableColumn, NSpace, NInput, NInputNumber, NSelect, SelectOption, NButton
} from 'naive-ui';

import { XPaging, Query } from '@/components/paging';

const queries = ref<Query>({
    str: 'str',
    num: 1,
    array: [1,2]
});

const options: Array<SelectOption> = [
    { label: '1', value: 1},
    { label: '二', value: 2},
    { label: '三', value: 3},
];

const cols: Array<DataTableColumn> = [
    {title: 'ID', key: 'id'},
    {title: 'NO', key: 'no'},
    {title: '姓名', key: 'no'},
    {title: '账号', key: 'no'},
    {title: '性别', key: 'no'},
    {title: '操作', key: 'no'},
];
</script>
