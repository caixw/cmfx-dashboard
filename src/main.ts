// SPDX-License-Identifier: MIT

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomeRound } from '@vicons/material';

import './style.css';
import { XApp } from '@/pages/app';
import { createOptions, presetThemes } from './plugins';
import logo from '@/assets/logo.png';
import { mock } from './demo/mock';

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
                    path: '/buttons',
                    name: 'buttons',
                    component: () => import('@/demo/Buttons.vue')
                },
                {
                    path: '/test2',
                    name: 'test2',
                    component: () => import('@/demo/Test2.vue')
                },
                {
                    path: '/paging',
                    name: 'paging',
                    component: () => import('@/demo/Paging.vue')
                },
                {
                    path: '/table',
                    name: 'table',
                    component: () => import('@/demo/Table.vue')
                },
                {
                    path: '/securitylog',
                    name: 'securitylog',
                    component: () => import('@/demo/SecurityLog.vue')
                },
                {
                    path: '/settings',
                    name: 'user_settings',
                    component: () => import('@/demo/Settings.vue')
                },

                // admin
                {
                    path: '/groups',
                    name: 'groups',
                    component: async () => (await import('@/pages')).XAdminGroups
                },
            ]
        },
        {
            path: '/errpage',
            name: 'errpage',
            component: () => import('@/demo/Buttons.vue')
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
    presetPage: 'buttons',

    themes: presetThemes,

    userMenus: [
        {
            label: 'common.settings',
            key: 'user_settings',
        },
        {
            label: 'common.password',
            children: [
                {
                    label: 'common.logout',
                    key: 'buttons'
                },
                {
                    label: 'common.logout',
                    key: 'test5'
                }
            ]
        },
        {
            label: 'common.security_log',
            key: 'securitylog',

        },
        {
            label: '---',
            type: 'divider'
        },
        {
            label: 'common.logout',
            key: 'logout'
        }
    ],

    menus: [
        {
            label: '各类按钮',
            icon: HomeRound,
            key: 'buttons'
        },
        {
            label: '表格',
            key: 'table-key',
            icon: HomeRound,
            children: [
                {
                    label: '分页表格',
                    key: 'paging'
                },
                {
                    label: '表格',
                    key: 'table'
                },
                {
                    label: 'common.username',
                    icon: HomeRound,
                    key: 'username',
                    children: [
                        {
                            label: '三级菜单-无图标',
                            key: 'test2'
                        }
                    ]
                },
            ]
        },
    ]
});

mock();

createApp(XApp).use(router).use(i18n).use(options).mount('#app');
