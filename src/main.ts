// SPDX-License-Identifier: MIT

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomeRound } from '@vicons/material';

import { XApp } from '@/pages/app';
import { createOptions, presetThemes } from './plugins/options';
import logo from '@/assets/logo.png';

import { createI18n } from 'vue-i18n';
import zhCN from '@/locales/zhCN';
import zhTW from '@/locales/zhTW';


// createWebHistory 路径不带 #，不能直接访问项目，需要 nginx 转发
// createWebHashHistory 路径带 #
import { XLogout } from '@/index';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/Login.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: XLogout
        },
        {
            path: '/layout',
            name: 'layout',
            component: () => import('@/pages/layout/Layout.vue'),
            children: [
                {
                    path: '/test',
                    name: 'test',
                    component: () => import('@/pages/Test.vue')
                },
                {
                    path: '/test2',
                    name: 'test2',
                    component: () => import('@/pages/Test2.vue')
                },
            ]
        },
        {
            path: '/errpage',
            name: 'errpage',
            component: () => import('@/pages/Test.vue')
        },
    ],
});

const i18n = createI18n({
    legacy: false,
    messages: Object.assign(zhCN, zhTW),
});

const options = createOptions({
    name: 'cmfx',
    logo: logo,

    urlPrefix: 'http://localhost:8080/admin',
    loginPage: 'login',
    presetPage: 'test',

    themes: presetThemes,

    userMenus: [
        {
            label: 'common.settings',
            key: 'test2',
        },
        {
            label: 'common.password',
            key: 'test2',
        },
        {
            label: 'common.security_log',
            key: 'test2',
            children: [
                {
                    label: 'common.logout',
                    key: 'test'
                },
                {
                    label: 'common.logout',
                    key: 'test'
                }
            ]
        },
        {
            label: '---',
            key: '---',
            type: 'divider'
        },
        {
            label: 'common.logout',
            key: 'logout'
        }
    ],

    menus: [
        {
            label: 'label1',
            icon: HomeRound,
            key: 'layout'
        },
        {
            label: 'common.login',
            icon: HomeRound,
            key: 'test',
            children: [
                {
                    label: 'common.logout',
                    key: 'test'
                },
                {
                    label: 'common.username',
                    icon: HomeRound,
                    key: 'test',
                    children: [
                        {
                            label: '三级菜单-无图标',
                            key: 'test'
                        },
                        {
                            label: 'common.username',
                            icon: HomeRound,
                            key: 'test'
                        },
                    ]
                },
            ]
        },
    ]
});

createApp(XApp).use(router).use(i18n).use(options).mount('#app');
