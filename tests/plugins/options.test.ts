// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';
import { buildOptions, presetOptions } from '@/plugins/options/options';

export const defaultOptions = {
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
    return Object.assign({}, defaultOptions);
}

describe('buildOptions', ()=>{
    test('default', ()=>{
        const o = buildOptions(copy());
        expect(o.urlPrefix).toEqual(defaultOptions.urlPrefix);
        expect(o.themes.length).toEqual(1);
        expect(o.token.name).toEqual(presetOptions.token.name);
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

    test('menus.id 有相同值',() => {
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
        expect(()=>buildOptions(o)).toThrowError('menus.key');
    });

    test('userMenus.id 有相同值',() => {
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
        expect(()=>buildOptions(o)).toThrowError('userMenus.key');
    });
});

