<template>
    <x-paging ref="pagingRef" url="/paging-1" :columns="cols" :queries="queries" :page-sizes="[50,100]" :paging="paging" row-key="id" @checked="check">
        <template #search>
            <n-input v-model:value="queries.str" style="width: 1000px" />
            <n-input-number v-model:value="queries.num" style="width: 500px" />
            <n-select style="min-width: 100px; width: 150px" multiple v-model:value="queries.array" :options="options" />
        </template>
        <template #actions>
            <n-space>
                <n-button @click="reload_exit">刷新未执行</n-button>
                <n-button @click="reload">刷新</n-button>
                <n-button @click="paging=!paging">分页：{{paging}}</n-button>
            </n-space>
        </template>
    </x-paging>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    DataTableColumn, NSpace, NInput, NInputNumber, NSelect, SelectOption, NButton,
    useMessage
} from 'naive-ui';

import { XPaging, Query, CheckMeta } from '@/components/paging';

const $message = useMessage();
const pagingRef = ref<InstanceType<typeof XPaging>>();
const paging = ref(true);

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

function check(keys: Array<string | number>, rows: Array<unknown>, meta: CheckMeta): void {
    $message.success(meta.action + "," + keys);
}

function reload_exit() {
    pagingRef.value?.reload(()=>{
        $message.error('前置条件出错，未执行刷新！');
        return false;
    });
}

function reload() {
    pagingRef.value?.reload(()=>{
        $message.info('执行刷新！');
        return true;
    });
}
</script>
