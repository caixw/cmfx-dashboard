// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    IconAlertCircle, IconAscend, IconButtonStroked,
    IconGridSquare, IconHome, IconUserGroup
} from '@douyinfe/semi-icons';

import {
    UnauthRoute, AuthRoute, Options, Locale,
    App, Layout, Login, Logout, install, SecurityLog, LocaleConsumer,
    AdminsRoute, GroupsRoute
} from 'cmfx-dashboard';
import 'cmfx-dashboard/style.css';

import { Home } from './demo/Home';
import { ButtonsDemo } from './demo/Buttons';
import { PagingDemo, TableDemo } from './demo/AsyncTable';
import { ResponseErrorDemo, ErrorDemo, StringErrorDemo } from './demo/Errors';
import { AsyncFormDemo } from './demo/AsyncForm';
import Logo from '@/assets/react.svg';
// import BG from '@/assets/login-bg.svg';
import { mock } from './mock';

interface CustomType {
    demo: {
        button: string,
        errpage: {
            p404: string
        }
    }
}

install('zh-CN', {
    demo: {
        button: '按钮',
        errpage: {
            p404: '404 页面翻译项'
        }
    }
});

install('zh-TW', {
    demo: {
        button: '按钮_TW',
        errpage: {
            p404: '404 页面翻译项_TW'
        }
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
                    path: '/logout',
                    element: <Logout />
                },
                {
                    path: '/home',
                    element: <Home />
                },
                {
                    path: '/buttons',
                    element: <ButtonsDemo />
                },
                {
                    path: '/async-form',
                    element: <AsyncFormDemo />
                },
                {
                    path: '/security-log',
                    element: <SecurityLog url='/security-log' />
                },

                // 分页

                {
                    path: '/paging',
                    element: <PagingDemo />
                },
                {
                    path: '/table',
                    element: <TableDemo />
                },

                // error page

                {
                    path: '/error',
                    element: <ErrorDemo />
                },
                {
                    path: '/error-string',
                    element: <StringErrorDemo />
                },
                {
                    path: '/error-403',
                    element: <ResponseErrorDemo status={403} />
                },
                {
                    path: '/error-404',
                    element: <LocaleConsumer>
                        {
                            (l: Locale<CustomType>)=>{
                                // 翻译后的内容被抛出，所以翻译不起作用！
                                return <ResponseErrorDemo status={403} title={l.custom.demo.errpage.p404} />;
                            }
                        }
                    </LocaleConsumer>
                },

                // admins

                ...GroupsRoute('/groups'),
                ...AdminsRoute('/admins'),
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
            itemKey: '/admin-demo',
            textKey: '管理员',
            icon: <IconUserGroup />,
            items: [
                {
                    itemKey: '/groups',
                    textKey: '权限组'
                },
                {
                    itemKey: '/admins',
                    textKey: '管理员'
                }
            ]
        },


        {
            itemKey: '/error-demo',
            textKey: '错误页',
            icon: <IconAlertCircle />,
            items: [
                {
                    itemKey:  '/error',
                    textKey: 'error',
                },
                {
                    itemKey:  '/error-string',
                    textKey: '字符串错误',
                },
                {
                    itemKey: '/error-404',
                    textKey: '404'
                },
                {
                    itemKey: '/error-403',
                    textKey: '403'
                }
            ]
        },

        {
            itemKey: '/table-demo',
            textKey: '表格',
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
