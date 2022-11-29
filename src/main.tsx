// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom/client';
import { IconAlertCircle, IconAscend, IconButtonStroked, IconGridSquare, IconHome } from '@douyinfe/semi-icons';

import {
    UnauthRoute, AuthRoute, Options, ErrorPage,
    App, Layout, Login, Logout, install, SecurityLog
} from 'cmfx-dashboard';
import 'cmfx-dashboard/style.css';

import { Home } from './Home';
import { ButtonsDemo } from './Buttons';
import { PagingDemo } from './Paging';
import { TableDemo } from './Table';
import { AsyncFormDemo } from './AsyncForm';
import Logo from '@/assets/react.svg';
// import BG from '@/assets/login-bg.svg';
import { mock } from './mock';

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
    name: 'cmfx 后台管理系统',
    logo: Logo,
    // loginBG: BG,

    loginPath: '/login',
    homePath: '/home',

    routes: [
        {
            path: 'login',
            element: <UnauthRoute><Login footer={<div>&copy; by caixw</div>} /></UnauthRoute>
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
                    element: <ButtonsDemo />
                },
                {
                    path: 'paging',
                    element: <PagingDemo />
                },
                {
                    path: 'table',
                    element: <TableDemo />
                },
                {
                    path: 'async-form',
                    element: <AsyncFormDemo />
                },
                {
                    path: 'error-page-404',
                    element: <ErrorPage code={404} title='page not found' />
                },
                {
                    path: 'error-page-403',
                    element: <ErrorPage code={403} />
                },
                {
                    path: 'security-log',
                    element: <SecurityLog url='/security-log' />
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
            itemKey: '/async-form',
            textKey: 'async-form',
            icon: <IconGridSquare />
        },
        {
            itemKey: '/error-page',
            textKey: 'error-page',
            icon: <IconAlertCircle />,
            items: [
                {
                    itemKey: '/error-page-404',
                    textKey: '404'
                },
                {
                    itemKey: '/error-page-403',
                    textKey: '403'
                }
            ]
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
            itemKey: '/security-log',
            textKey: 'common.security_log',
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
