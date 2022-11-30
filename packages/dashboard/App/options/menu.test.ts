// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { zhCN } from '@dashboard/locales/zh_CN';
import { zhTW } from '@dashboard/locales/zh_TW';
import { buildMenus, findMenuByKey, NavMenuItem } from './menu';

describe('buildMenuItems', ()=>{
    test('一维', ()=>{
        const menus = [
            {itemKey: 'k1', textKey: 'common.yes'},
            {itemKey: 'k2', textKey: 'common.no'},
            {itemKey: 'k3', textKey: '.not-exists.'},
        ];

        expect(buildMenus([], menus, zhCN)).toEqual([
            {itemKey: 'k1', text: zhCN.common.yes, breadcrumb: [
                {path: 'k1', name: zhCN.common.yes},
            ]},
            {itemKey: 'k2', text: zhCN.common.no, breadcrumb: [
                {path: 'k2', name: zhCN.common.no},
            ]},
            {itemKey: 'k3', text: '.not-exists.', breadcrumb: [
                {path: 'k3', name: '.not-exists.'},
            ]},
        ]);

        // 切换语言
        expect(buildMenus([{path: 'k1', name: zhTW.common.yes}], menus, zhTW)).toEqual([
            {itemKey: 'k1', text: zhTW.common.yes, breadcrumb: [
                {path: 'k1', name: zhTW.common.yes},
                {path: 'k1', name: zhTW.common.yes},
            ]},
            {itemKey: 'k2', text: zhTW.common.no, breadcrumb: [
                {path: 'k1', name: zhTW.common.yes},
                {path: 'k2', name: zhTW.common.no},
            ]},
            {itemKey: 'k3', text: '.not-exists.', breadcrumb: [
                {path: 'k1', name: zhTW.common.yes},
                {path: 'k3', name: '.not-exists.'},
            ]},
        ]);
    });

    test('多维', ()=>{
        const menus = [
            {itemKey: 'k1', textKey: 'common.yes'},
            {
                itemKey: 'k2',
                textKey: 'common.no',
                items: [
                    {itemKey: 'k21', textKey: 'common.yes'},
                    {itemKey: 'k22', textKey: 'common.no'},
                ]
            },
        ];
        expect(buildMenus([], menus, zhCN)).toEqual([
            {itemKey: 'k1', text: zhCN.common.yes, breadcrumb: [
                {path: 'k1', name: zhCN.common.yes},
            ]},
            {
                itemKey: 'k2',
                text: zhCN.common.no,
                breadcrumb: [
                    {path: 'k2', name: zhCN.common.no},
                ],
                items: [
                    {itemKey: 'k21', text: zhCN.common.yes, breadcrumb: [
                        {path: 'k2', name: zhCN.common.no},
                        {path: 'k21', name: zhCN.common.yes},
                    ]},
                    {itemKey: 'k22', text: zhCN.common.no, breadcrumb: [
                        {path: 'k2', name: zhCN.common.no},
                        {path: 'k22', name: zhCN.common.no},
                    ]},
                ]
            },
        ]);
    });
});

describe('findMenuByKey', ()=>{
    const data: Array<NavMenuItem> = [
        {
            itemKey: '/p1',
            text: 'p1'
        },
        {
            itemKey: '/p2',
            text: 'p2',
            items: [
                {
                    itemKey: '/p21',
                    text: 'p21'
                },
            ]
        },
    ];
    test('found', ()=>{
        expect(findMenuByKey(data, '/p21')).toEqual({itemKey: '/p21', text:'p21'});
    });

    test('not found', ()=>{
        expect(findMenuByKey(data, 'not-exists')).toBeNull();
    });
});
