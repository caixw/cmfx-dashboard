// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';
import { buildOptions } from '@/plugins/options/options';

export const presetOptions = {
    name: 'name',
    logo: 'logo',
    loginPage: 'login',
    presetPage: 'preset',
    urlPrefix: '/admin',

    themes: [
        {
            id: 't1',
            name: 'n1'
        }
    ],

    userMenus: [
        {
            key: 'k1',
            label: 'l1'
        }
    ],

    menus: [
        {
            key: 'k1',
            label: 'l1'
        }
    ]
};

function copy() {
    return Object.assign({}, presetOptions);
}

describe('buildOptions', ()=>{
    test('default', ()=>{
        const o = buildOptions(copy());
        expect(o.urlPrefix).toEqual(presetOptions.urlPrefix);
        expect(o.themes.length).toEqual(1);
    });

    test('themes.id 有相同值',() => {
        const o = Object.assign(copy(), {themes: [
            {
                id: 'id',
                name: 'name',
            },
            {
                id: 'id',
                name: 'name',
            }
        ]});
        expect(()=>buildOptions(o)).toThrowError('themes.id');
    });

    test('menus.key 有相同值',() => {
        const o = Object.assign(copy(), {menus: [
            {
                key: 'id',
                label: 'name',
            },
            {
                key: 'id',
                label: 'name',
            }
        ]});
        expect(()=>buildOptions(o)).toThrowError('存在同名的 key: id');
    });

    test('userMenus.key 有相同值',() => {
        const o = Object.assign(copy(), {userMenus: [
            {
                key: 'id',
                label: 'name',
            },
            {
                key: 'id',
                label: 'name',
            }
        ]});
        expect(()=>buildOptions(o)).toThrowError('存在同名的 key: id');
    });
});

