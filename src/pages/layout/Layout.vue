<template>
    <n-layout has-sider position="absolute">
        <n-layout-sider :native-scrollbar="false" :collapsed="sideVisible" bordered collapse-mode="width"
            :collapsed-width="64" content-style="padding: 10px">
            <n-space align="center">
                <n-avatar :size="44" round :src="$cmfx.options.logo" />
                <div v-show="!sideVisible">{{$cmfx.options.name}}</div>
            </n-space>
            <n-menu :collapsed-width="48" :collapsed-icon-size="22" :options="menus" @update:value="menuSelect" />
        </n-layout-sider>

        <n-layout>
            <n-layout-header class="header" position="absolute" bordered>
                <n-space justify="space-between" align="center">
                    <n-space align="center">
                        <n-button circle @click="sideVisible=!sideVisible">
                            <template #icon>
                                <n-icon :component="sideVisible ? MenuFilled : MenuOpenFilled" />
                            </template>
                        </n-button>
                        <n-breadcrumb>
                            <n-breadcrumb-item v-for="(item, index) of breadcrumbs" :key="index">{{item}}</n-breadcrumb-item>
                        </n-breadcrumb>
                    </n-space>

                    <n-space justify="end" size="small">
                        <n-button circle @click="toggle"> <!-- fullscreen -->
                            <template #icon>
                                <n-icon :component="isFullscreen ? FullscreenExitFilled : FullscreenFilled" />
                            </template>
                        </n-button>
                        <x-theme-selector />
                        <x-locale-selector />

                        <n-dropdown trigger="hover" :options="userMenus" @select="userMenuSelect">
                            <n-button round>
                                <template #icon>
                                    <n-icon>
                                        <menu-open-filled />
                                    </n-icon>
                                </template>
                                abc
                            </n-button>
                        </n-dropdown>
                    </n-space>
                </n-space>
            </n-layout-header>

            <n-layout-content position="absolute" :native-scrollbar="false" content-style="padding:10px" class="main">
                <router-view />
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    NLayout, NLayoutHeader, NLayoutSider, NLayoutContent, // layout
    NBreadcrumb, NBreadcrumbItem, // breadcrumb
    NAvatar, NButton, NDropdown, NIcon, NMenu, NSpace, MenuOption,
    DropdownOption, DropdownDividerOption
} from 'naive-ui';
import {
    MenuFilled, MenuOpenFilled,
    FullscreenFilled, FullscreenExitFilled,
} from '@vicons/material';
import { useFullscreen } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { XThemeSelector } from '@/components/theme-selector';
import { XLocaleSelector } from '@/components/locale-selector';
import { buildMenus } from './menu';
import { useCmfx } from '@/pages/app';

const $i18n = useI18n();
const $cmfx = useCmfx();
const $router = useRouter();
const breadcrumbs = ref<string[]>([]);

const userMenus: Array<DropdownOption&{name: string} | DropdownDividerOption> = [
    {
        key: 'settings',
        name: $cmfx.options.pages.userSetting,
        label: ()=> $i18n.t('common.settings')
    },
    {
        key: 'password',
        name: $cmfx.options.pages.userPassword,
        label: ()=> $i18n.t('common.password')
    },
    {
        key: 'securitylog',
        name: $cmfx.options.pages.userSecurityLog,
        label: ()=> $i18n.t('common.security_log')
    },
    {
        type: 'divider'
    },
    {
        key: 'logout',
        name: $cmfx.options.pages.logout,
        label: ()=> $i18n.t('common.logout')
    },
];
function userMenuSelect(key: string, item: DropdownOption&{name:string}) {
    $router.push({name: item.name});
    $cmfx.setTitle(item.label as string);
}

const menus = ref(buildMenus($cmfx.options.menus));
const sideVisible = ref(false);
function menuSelect(key: string, item: MenuOption&{name:string}) {
    $cmfx.setTitle(item.label as string);
    breadcrumbs.value = item.labels as string[];
}

const { isFullscreen, toggle } = useFullscreen();
</script>

<style scoped>
.header {
    padding: 10px;
}

.main {
    top: 64px;
}
</style>
