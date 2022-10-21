// SPDX-License-Identifier: MIT

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomeRound } from '@vicons/material';

import App from '@/pages/App.vue';
import { createCmfx } from './plugins/cmfx';
import logo from '@/assets/logo.png';

// createWebHistory 路径不带 #，不能直接访问项目，需要 nginx 转发
// createWebHashHistory 路径带 #
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/pages/logout.vue')
        },
        {
            path: '/page',
            name: 'page',
            component: () => import('@/packages/page/Page.vue')
        },
        {
            path: '/errpage',
            name: 'errpage',
            component: () => import('@/packages/errpage/Page.vue')
        },
    ],
});

const cmfx = createCmfx({
    name: 'cmfx',
    logo: logo,

    urlPrefix: 'http://localhost/admin',
    loginPage: 'login',
    presetPage: 'logout',

    menus: [
        {
            label: 'label1',
            icon: HomeRound,
            key: 'layout'
        },
        {
            label: 'label2',
            icon: HomeRound,
            key: 'layout',
            children: [
                {
                    label: '无图标',
                    key: 'layout'
                },
                {
                    label: '有图标',
                    icon: HomeRound,
                    key: 'layout',
                    children: [
                        {
                            label: '三级菜单-无图标',
                            key: 'layout'
                        },
                        {
                            label: '三级菜单-有图标',
                            icon: HomeRound,
                            key: 'layout'
                        },
                    ]
                },
            ]
        },
    ]
});

createApp(App).use(router).use(cmfx).mount('#app');
