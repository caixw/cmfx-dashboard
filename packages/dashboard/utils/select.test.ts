// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { mapToSelectOptions, objectsToSelectOptions } from './select';

describe('mapToSelectOptions', ()=>{
    test('空对象', ()=>{
        expect(mapToSelectOptions(new Map<string, string>())).toEqual([]);
    });

    test('key=string', ()=>{
        const m = new Map<string, string>([
            ['k1', 'v1'],
            ['k2', 'v2'],
        ]);
        expect(mapToSelectOptions(m)).toEqual([
            {label: 'v1', value: 'k1'},
            {label: 'v2', value: 'k2'},
        ]);
    });

    test('key=number', ()=>{
        const m = new Map<number, string>([
            [1, 'v1'],
            [2, 'v2'],
        ]);
        expect(mapToSelectOptions(m)).toEqual([
            {label: 'v1', value: 1},
            {label: 'v2', value: 2},
        ]);
    });
});

describe('objectToSelectOptions', ()=>{
    test('空对象', ()=>{
        expect(objectsToSelectOptions([], 'l', 'v')).toEqual([]);
    });

    test('key=string', ()=>{
        const m = [
            {k:'k1', v:'v1'},
            {k:'k2', v:'v2'},
        ];
        expect(objectsToSelectOptions(m, 'v', 'k')).toEqual([
            {label: 'v1', value: 'k1'},
            {label: 'v2', value: 'k2'},
        ]);
    });

    test('key=number', ()=>{
        const m = [
            {k:1, v:'v1'},
            {k:2, v:'v2'},
        ];
        expect(objectsToSelectOptions(m, 'v', 'k')).toEqual([
            {label: 'v1', value: 1},
            {label: 'v2', value: 2},
        ]);
    });
});
