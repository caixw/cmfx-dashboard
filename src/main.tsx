// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom/client';
import { IconAscend, IconButtonStroked, IconHome } from '@douyinfe/semi-icons';

import {
    UnauthRoute, AuthRoute, Options,
    App, Layout, Login, Logout, install
} from 'cmfx-dashboard';

import { Home } from './Home';
import { Buttons } from './Buttons';
import { Paging } from './Paging';
import { Table } from './Table';
import Logo from '@/assets/react.svg';
import { mock } from './mock';
import './style.css';

install('zh-CN', {
    demo: {
        button: '按钮'
    }
});

install('zh-TW', {
    demo: {
        button: '按钮_TW'
    }
});

const options: Options = {
    name: 'cmfx',
    logo: Logo,

    loginPath: '/login',
    homePath: '/home',

    routes: [
        {
            path: 'login',
            element: <UnauthRoute><Login /></UnauthRoute>
        },
        {
            path: '/',
            element: <AuthRoute><Layout /></AuthRoute>,
            children: [
                {
                    path: 'logout',
                    element: <Logout />
                },
                {
                    path: 'home',
                    element: <Home />
                },
                {
                    path: 'buttons',
                    element: <Buttons />
                },
                {
                    path: 'paging',
                    element: <Paging />
                },
                {
                    path: 'table',
                    element: <Table />
                },
            ]
        },
    ],

    menus: [
        {
            itemKey: '/home',
            textKey: 'home',
            icon: <IconHome />
        },
        {
            itemKey: '/buttons',
            textKey: 'custom.demo.button',
            icon: <IconButtonStroked />
        },

        {
            itemKey: '/p',
            textKey: 'table',
            icon: <IconAscend />,
            items: [
                {
                    itemKey: '/table',
                    textKey: '无分页表格'
                },
                {
                    itemKey: '/paging',
                    textKey: '分页表格'
                },
            ]
        },
    ],
    userMenus: [
        {
            itemKey: '/home',
            textKey: 'custom.demo.button',
            icon: <IconHome />,
            node: 'item'
        },
        {
            node: 'divider'
        },
        {
            itemKey: '/logout',
            textKey: 'common.logout',
            node: 'item',
            icon: <IconHome />
        },
    ],

    urlPrefix: 'http://localhost/admin'
};

mock();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App options={options} />
    </React.StrictMode>
);
