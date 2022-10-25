// SPDX-License-Identifier: MIT

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomeRound } from '@vicons/material';

import App from '@/pages/app/App.vue';
import { createOptions } from './plugins/options';
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

const i18n = createI18n({
    legacy: false,
    messages: Object.assign(zhCN, zhTW),
});

const options = createOptions({
    name: 'cmfx',
    logo: logo,

    urlPrefix: 'http://localhost/admin',
    loginPage: 'login',
    presetPage: 'logout',

    themes: [
        {
            id: 'default',
            name: 'common.default'
        },
        {
            id: 'blue',
            name: 'blue',
            theme: {
                light: {
                    common: {
                        baseColor: '#8bbccc',
                        primaryColor: '#000000'
                    }
                },
                dark: {
                    common: {
                        baseColor: '#eaeaea',
                        primaryColor: '#00abb3'
                    }
                }
            }
        }
    ],

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

createApp(App).use(router).use(i18n).use(options).mount('#app');
