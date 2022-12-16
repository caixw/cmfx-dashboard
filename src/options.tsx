// SPDX-License-Identifier: MIT

import React from 'react';
import {
    IconAlertCircle, IconAscend, IconButtonStroked,
    IconEdit,
    IconGridSquare, IconHome, IconSetting, IconTabsStroked, IconUserGroup
} from '@douyinfe/semi-icons';

import {
    UnauthRoute, AuthRoute, Options, Locale,
    Layout, Logout, SecurityLog, LocaleConsumer,
    AdminsRoute, GroupsRoute,
} from 'cmfx-dashboard';

import { Home } from './demo/Home';
import { ButtonsDemo } from './demo/Buttons';
import { PagingDemo, TableDemo } from './demo/AsyncTable';
import { ResponseErrorDemo, ErrorDemo, StringErrorDemo } from './demo/Errors';
import { AsyncFormDemo } from './demo/AsyncForm';
import { WysiwygDemo } from './demo/Editor';
import { TabsDemo } from './demo/Tabs';
import { LoginDemo } from './demo/Login';
import { SettingDemo } from './demo/Setting';
import Logo from '@/assets/react.svg';

interface CustomType {
    demo: {
        button: string,
        errpage: {
            p404: string
        }
    }
}

export const options: Options = {
    name: 'cmfx 后台管理系统',
    logo: Logo,

    loginPath: '/login',
    homePath: '/home',

    routes: [
        {
            path: 'login',
            element: <UnauthRoute><LoginDemo /></UnauthRoute>
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

                {
                    path: '/tabs',
                    element: <TabsDemo />
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

                // editor
                {
                    path: 'editor-wysiwyg',
                    element: <WysiwygDemo />
                },

                // setting
                {
                    path: 'settings',
                    element: <SettingDemo />
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
            itemKey: '/tabs',
            textKey: 'tabs',
            icon: <IconTabsStroked />
        },

        {
            itemKey: '/editor-demo',
            textKey: '编辑器',
            icon: <IconEdit />,
            items: [
                {
                    itemKey: 'editor-wysiwyg',
                    textKey: 'WYSIWYG'
                }
            ]
        },

        {
            itemKey: '/setting-demo',
            textKey: 'setting',
            icon: <IconSetting />,
            items: [
                {
                    itemKey: 'settings',
                    textKey: '多组设置'
                }
            ]
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
