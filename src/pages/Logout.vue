<template>
    {{$t('common.logout')}}
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

import { useCmfx } from '@/pages/app';

const $cmfx = useCmfx();
const $router = useRouter();

onMounted(async()=>{
    await $cmfx.logout();
    $router.push({name: $cmfx.options.loginPage});
});
</script>
