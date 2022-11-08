<template>
    <x-paging :url="props.url" :queries="queries" :columns="columns">
        <template #search>
            <n-input clearable class="text" v-model:value="queries.text" :placeholder="$t('common.search_content')" />
        </template>
    </x-paging>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
    NInput,
    DataTableColumn
} from 'naive-ui';

import { XPaging, Query } from '@/components/table';

const $i18n = useI18n();

const columns: Array<DataTableColumn> = [
    { key: 'ua', title: ()=>$i18n.t('common.ua') },
    { key: 'ip', title: ()=>$i18n.t('common.ip') },
    { key: 'created', title: ()=>$i18n.t('common.created_time') },
    { key: 'content', title: ()=>$i18n.t('common.content') },
];

const props = defineProps<{url: string}>();

const queries = ref<Query>({text:''});
</script>

<style scoped>
.text {
    width: 200px;
}
</style>
