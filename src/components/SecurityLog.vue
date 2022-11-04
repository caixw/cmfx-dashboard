<template>
    <x-paging :url="props.url" :queries="queries" :columns="columns">
        <template #search>
            <n-input clearable class="text" v-model:value="queries.text" :placeholder="$t('common.search_content')" />
        </template>
    </x-paging>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    NInput,
    DataTableColumn
} from 'naive-ui';

import { XPaging, Query } from '@/components/paging';

const columns: Array<DataTableColumn> = [
    { key: 'ua', title: 'common.ua' },
    { key: 'ip', title: 'common.ip' },
    { key: 'created', title: 'common.created_time' },
    { key: 'content', title: 'common.content' },
];

const props = defineProps<{url: string}>();

const queries = ref<Query>({text:''});
</script>

<style scoped>
.text {
    width: 200px;
}
</style>
