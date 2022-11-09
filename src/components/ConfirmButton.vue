<template>
    <n-popconfirm @positive-click="click" :positive-button-props="{type: 'primary'}">
        <template #trigger>
                <n-button :disabled="props.disabled || loading" :loading="props.icon ? loading : false" :type="props.type" :size="props.size">
                    <template #icon v-if="props.icon"><n-icon :component="props.icon" /></template>
                    {{props.label}}
                </n-button>
        </template>
        <slot></slot>
    </n-popconfirm>
</template>

<script setup lang="ts">
import { ref, Component } from 'vue';
import { NButton, NIcon, NPopconfirm } from 'naive-ui';

export type OkFunc = () => Promise<void>

const props = withDefaults(defineProps<{
    type?: 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
    size?: 'tiny' | 'small' | 'medium' | 'large'
    icon?: Component
    disabled?: boolean
    label: string
    ok: OkFunc
}>(), {
    type: 'default',
    size: 'small',
    disabled: false
});

const loading = ref(false);

async function click() {
    loading.value = true;
    await props.ok();
    loading.value = false;
}
</script>
