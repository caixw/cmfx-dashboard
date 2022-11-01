<template>
    <x-paging url="/paging/1" :columns="cols" :queries="queries" :page-sizes="[50,100]" row-key="id">
        <template #search>
            <n-input v-model:value="queries.str" style="width: 1000px" />
            <n-input-number v-model:value="queries.num" style="width: 500px" />
            <n-select style="min-width: 100px; width: 150px" multiple v-model:value="queries.array" :options="options" />
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
import { ref, onBeforeMount, onUnmounted } from 'vue';
import fetchMock from 'fetch-mock';
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
    {type: 'selection'},
    {title: 'ID', key: 'id'},
    {title: 'NO', key: 'no'},
    {title: '姓名', key: 'name'},
    {title: '账号', key: 'username'},
    {title: '性别', key: 'sex'},
    {title: '特别长的列名称', key: 'sex'},
    //{title: '操作', key: 'no'},
];

onBeforeMount(()=>{
    fetchMock.mock(/.*/i, {
        count: 1,
        more: true,
        current: [
            {id: 1, no: 'no1', name: 'n1', username: 'u1', sex: 'female' },
            {id: 2, no: 'no2', name: 'n2', username: 'u2', sex: 'male' },
            {id: 3, no: 'no3', name: 'n3', username: 'u3', sex: 'male' },
            {id: 4, no: 'no4', name: 'n4', username: 'u4', sex: 'male' },
            {id: 5, no: 'no5', name: 'n5', username: 'u5', sex: 'male' },
        ]
    });
});

onUnmounted(()=>{
    fetchMock.restore();
});
</script>
