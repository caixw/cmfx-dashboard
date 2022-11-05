<template>
    <x-paging ref="pagingRef" url="/paging-1" :columns="cols" :page-sizes="[50,100]" :paging="false">
    </x-paging>
</template>

<script setup lang="ts">
import {
    DataTableColumn,
} from 'naive-ui';

import { XPaging } from '@/components/paging';

const cols: Array<DataTableColumn> = [
    {title: 'ID', key: 'id'},
    {title: 'NO', key: 'no'},
    {title: '姓名', key: 'name'},
    {title: '账号', key: 'username'},
    {title: '性别', key: 'sex'},
    {title: '特别长的列名称', key: 'sex'},
    //{title: '操作', key: 'no'},
];
</script>
