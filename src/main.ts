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
            component: () => import('@/pages/Test.vue')
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
                    path: '/test',
                    name: 'test',
                    component: () => import('@/pages/Test.vue')
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

    pages: {
        login: 'login',
        logout: 'logout',
        preset: 'test',
        userSetting: 'user_settings',
        userPassword: 'user_password',
        userSecurityLog: 'user_securitylog',
    },

    urlPrefix: 'http://localhost:8080/admin',

    themes: presetThemes,

    menus: [
        {
            label: 'label1',
            icon: HomeRound,
            key: 'layout'
        },
        {
            label: 'label2',
            icon: HomeRound,
            key: 'test',
            children: [
                {
                    label: '无图标',
                    key: 'test'
                },
                {
                    label: '有图标',
                    icon: HomeRound,
                    key: 'test',
                    children: [
                        {
                            label: '三级菜单-无图标',
                            key: 'test'
                        },
                        {
                            label: '三级菜单-有图标',
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
