// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { checkMenuKey } from '@/plugins/options/menu';

describe('checkMenuKey', ()=>{
    test('正常', ()=>{
        expect(checkMenuKey([], [])).not.Throw;
    });

    test('没有重复', ()=>{
        expect(checkMenuKey([], [
            { key: 'k1', label: 'l1' },
            { key: 'k2', label: 'l2' },
            { key: 'k3', label: 'l3' },
        ])).not.Throw;
    });

    test('没有重复-子元素', ()=>{
        expect(checkMenuKey([], [
            { key: 'k1', label: 'l1' },
            { key: 'k2', label: 'l2', children: [
                { key: 'k20', label: 'l20' },
                { key: 'k21', label: 'l21' },
            ]},
            { key: 'k3', label: 'l3' },
        ])).not.Throw;
    });

    test('重复', ()=>{
        expect(()=>checkMenuKey([], [
            { key: 'k1', label: 'l1' },
            { key: 'k2', label: 'l2' },
            { key: 'k1', label: 'l1' },
        ])).toThrowError('存在同名的 key: k1');
    });

    test('重复-子元素', ()=>{
        expect(()=>checkMenuKey([], [
            { key: 'k1', label: 'l1' },
            { key: 'k2', label: 'l2', children: [
                { key: 'k1', label: 'l1' },
            ]},
            { key: 'k3', label: 'l3' },
        ])).toThrowError('存在同名的 key: k1');
    });
});
