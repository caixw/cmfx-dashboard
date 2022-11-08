<template>
    <n-layout has-sider position="absolute">
        <n-layout-sider :native-scrollbar="false" :collapsed="collapsed" bordered collapse-mode="width"
            :collapsed-width="64" content-style="padding: 10px">
            <n-space align="center">
                <n-avatar :size="44" round :src="$cmfx.options.logo" />
                <div v-show="!collapsed">{{$cmfx.options.name}}</div>
            </n-space>
            <n-menu :collapsed-width="48" :collapsed-icon-size="22" :options="menus" :value="menuSelectedKey" @update:value="menuSelect" />
        </n-layout-sider>

        <n-layout>
            <n-layout-header class="header" position="absolute" bordered>
                <n-space justify="space-between" align="center">
                    <n-space align="center">
                        <n-button circle @click="collapsed=!collapsed">
                            <template #icon>
                                <n-icon :component="collapsed ? MenuFilled : MenuOpenFilled" />
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
                                    <n-icon class="avatar" :size="30" :component="AccountCircleFilled" />
                                </template>
                                {{info.username}}
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
import { ref, onMounted } from 'vue';
import {
    NLayout, NLayoutHeader, NLayoutSider, NLayoutContent, // layout
    NBreadcrumb, NBreadcrumbItem, // breadcrumb
    NAvatar, NButton, NDropdown, NIcon, NMenu, NSpace, MenuOption, DropdownOption
} from 'naive-ui';
import {
    MenuFilled, MenuOpenFilled, AccountCircleFilled,
    FullscreenFilled, FullscreenExitFilled
} from '@vicons/material';
import { useFullscreen } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { XThemeSelector } from '@/components/theme-selector';
import { XLocaleSelector } from '@/components/locale-selector';
import { useCmfx } from '@/pages/app';
import {
    buildMenus, buildUserMenus, buildLabels, findUserMenu, findMenu,
    Labels, LabelRender
} from './menu';
import { Admin, getInfo } from './admin';

const $i18n = useI18n();
const $cmfx = useCmfx();
const $router = useRouter();
const breadcrumbs = ref<string[]>([]);

const currentRouteName = $router.currentRoute.value.name as string;

function select(key: string, title: string, labels: Labels) {
    $cmfx.title = title;
    breadcrumbs.value = buildLabels(labels);

    menuSelectedKey.value = key;
    $router.push({name: key});
}

// 侧边栏菜单
const menus = buildMenus($i18n.t, $cmfx.options.menus);
const menuSelectedKey = ref<string|null|undefined>(currentRouteName);
const collapsed = ref(false);
function menuSelect(key: string, item: MenuOption) {
    select(key, (item.label as LabelRender)() as string, item as Labels);
}

// 用户菜单
const userMenus = buildUserMenus($i18n.t, $cmfx.options.userMenus);
function userMenuSelect(key: string, item: DropdownOption) {
    select(key, (item.label as LabelRender)() as string, item as Labels);
}

// 全屏
const { isFullscreen, toggle } = useFullscreen();

const info = ref<Admin>({name: '', username: '', nickname: '', state: 'normal', sex: 'unknown'});

onMounted(async()=>{
    info.value = await getInfo($cmfx);

    $cmfx.watchBreakpoint((p?: string)=>{
        collapsed.value = p === 'xs' || p === 's';
    });

    // 确保用户点击了刷新之后标题能正确显示
    const um = findUserMenu(currentRouteName, userMenus);
    const m = findMenu(currentRouteName, menus);
    if (um) {
        userMenuSelect(currentRouteName, um);
    } else if(m) {
        menuSelect(currentRouteName, m);
    }
});
</script>

<style scoped>
.header {
    padding: 10px;
}

.main {
    top: 64px;
}

.avatar {
    margin-left: -20px;
}
</style>
