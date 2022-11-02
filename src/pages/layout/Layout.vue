<template>
    <n-layout has-sider position="absolute">
        <n-layout-sider :native-scrollbar="false" :collapsed="collapsed" bordered collapse-mode="width"
            :collapsed-width="64" content-style="padding: 10px">
            <n-space align="center">
                <n-avatar :size="44" round :src="$cmfx.options.logo" />
                <div v-show="!collapsed">{{$cmfx.options.name}}</div>
            </n-space>
            <n-menu :collapsed-width="48" :collapsed-icon-size="22" :options="menus" @update:value="menuSelect" />
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
import { ref, VNodeChild, onMounted } from 'vue';
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
import { buildMenus, buildUserMenus, buildMenuLabels } from './menu';
import { Admin, getInfo } from './admin';

const $i18n = useI18n();
const $cmfx = useCmfx();
const $router = useRouter();
const breadcrumbs = ref<string[]>([]);

// 用户菜单

const userMenus = buildUserMenus($i18n, $cmfx.options.userMenus);
function userMenuSelect(key: string, item: DropdownOption) {
    $router.push({name: key});

    const f = item.label as {():VNodeChild};
    $cmfx.setTitle(f() as string);
    breadcrumbs.value = [f() as string];
}

// 侧边栏菜单

const menus = ref(buildMenus($i18n, $cmfx.options.menus));
const collapsed = ref(false);
function menuSelect(key: string, item: MenuOption) {
    if (typeof(item.label) === 'string' ) {
        $cmfx.setTitle(item.label);
    }else{
        const f = item.label as {():VNodeChild};
        $cmfx.setTitle(f() as string);
    }
    breadcrumbs.value = buildMenuLabels(item);
}

// 全屏
const { isFullscreen, toggle } = useFullscreen();

const info = ref<Admin>({name: '', username: '', nickname: '', state: 'normal', sex: 'unknown'});
onMounted(async()=>{
    info.value = await getInfo($cmfx);
    $cmfx.watchBreakpoint((p?: string)=>{
        collapsed.value = p === 'xs' || p === 's';
    });
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
