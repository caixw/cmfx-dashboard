<template>
    <x-table url="/table" :columns="cols">
    </x-table>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { DataTableColumn } from 'naive-ui';

import { XTable, XConfirmButton } from '@/components';
import { useCmfx } from '@/pages';

const $cmfx = useCmfx();

const cols: Array<DataTableColumn> = [
    {title: 'ID', key: 'id'},
    {title: 'NO', key: 'no'},
    {title: '姓名', key: 'name'},
    {title: '账号', key: 'username'},
    {title: '性别', key: 'sex'},
    {title: '特别长的列名称', key: 'sex'},
    {title: '操作', className: 'no-print', key: 'id', render: ()=>{
        return h(XConfirmButton, {label: '删除', type: 'error', 'ok': onOK }, {default: ()=>{return '确定要删除吗？';}});
    }},
];

async function onOK(): Promise<void> {
    await $cmfx.get('/paging');
}
</script>
