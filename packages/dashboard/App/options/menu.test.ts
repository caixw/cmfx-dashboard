// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { zhCN } from '@dashboard/locales/zh_CN';
import { zhTW } from '@dashboard/locales/zh_TW';
import { buildMenus, checkMenuKey } from './menu';

describe('checkMenuKey', ()=>{
    test('有重复的 itemKey', ()=>{
        const menus = [
            {
                itemKey: 'id',
                textKey: 'name',
            },
            {
                itemKey: 'id',
                textKey: 'name',
            }
        ];

        expect(()=>checkMenuKey([], menus)).toThrowError('存在同名的 itemKey');
    });

    test('正常', ()=>{
        const menus = [
            {
                itemKey: 'id-1',
                textKey: 'name',
            },
            {
                itemKey: 'id-2',
                textKey: 'name',
            }
        ];

        expect(()=>checkMenuKey([], menus)).not.toThrow();
    });
});

describe('buildMenuItems', ()=>{
    test('一维', ()=>{
        const menus = [
            {itemKey: 'k1', textKey: 'common.yes'},
            {itemKey: 'k2', textKey: 'common.no'},
            {itemKey: 'k3', textKey: '.not-exists.'},
        ];

        buildMenus([], menus, zhCN);
        expect(menus).toEqual([
            {itemKey: 'k1', textKey: 'common.yes', text: zhCN.common.yes, breadcrumb: [
                {path: 'k1', name: zhCN.common.yes},
            ]},
            {itemKey: 'k2', textKey: 'common.no', text: zhCN.common.no, breadcrumb: [
                {path: 'k2', name: zhCN.common.no},
            ]},
            {itemKey: 'k3', textKey: '.not-exists.', text: '.not-exists.', breadcrumb: [
                {path: 'k3', name: '.not-exists.'},
            ]},
        ]);

        // 切换语言
        buildMenus([{path: 'k1', name: zhTW.common.yes}], menus, zhTW);
        expect(menus).toEqual([
            {itemKey: 'k1', textKey: 'common.yes', text: zhTW.common.yes, breadcrumb: [
                {path: 'k1', name: zhTW.common.yes},
                {path: 'k1', name: zhTW.common.yes},
            ]},
            {itemKey: 'k2', textKey: 'common.no', text: zhTW.common.no, breadcrumb: [
                {path: 'k1', name: zhTW.common.yes},
                {path: 'k2', name: zhTW.common.no},
            ]},
            {itemKey: 'k3', textKey: '.not-exists.', text: '.not-exists.', breadcrumb: [
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
        buildMenus([], menus, zhCN);
        expect(menus).toEqual([
            {itemKey: 'k1', textKey: 'common.yes', text: zhCN.common.yes, breadcrumb: [
                {path: 'k1', name: zhCN.common.yes},
            ]},
            {
                itemKey: 'k2',
                textKey: 'common.no',
                text: zhCN.common.no,
                breadcrumb: [
                    {path: 'k2', name: zhCN.common.no},
                ],
                items: [
                    {itemKey: 'k21', textKey: 'common.yes', text: zhCN.common.yes, breadcrumb: [
                        {path: 'k2', name: zhCN.common.no},
                        {path: 'k21', name: zhCN.common.yes},
                    ]},
                    {itemKey: 'k22', textKey: 'common.no', text: zhCN.common.no, breadcrumb: [
                        {path: 'k2', name: zhCN.common.no},
                        {path: 'k22', name: zhCN.common.no},
                    ]},
                ]
            },
        ]);
    });
});
