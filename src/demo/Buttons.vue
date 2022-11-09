<template>
    <x-confirm-button label="default" :ok="async ()=>{}">确定吗</x-confirm-button>
    &#160;
    <x-confirm-button label="primary" type="primary" :ok="async ()=>{}">确定吗</x-confirm-button>
    &#160;
    <x-confirm-button label="primary" type="primary" :ok="async ()=>{await sleep(1000);}">确定吗</x-confirm-button>
    &#160;
    <x-confirm-button label="disabled" disabled type="primary" :ok="async ()=>{}">确定吗</x-confirm-button>
    &#160;
    <x-confirm-button label="icon + label" :icon="DeleteFilled" type="primary" :ok="async ()=>{await sleep(1000);}">确定吗</x-confirm-button>
</template>

<script setup lang="ts">
import { XConfirmButton } from '@/components';
import { DeleteFilled } from '@vicons/material';

import { sleep } from '@/utils';
</script>
