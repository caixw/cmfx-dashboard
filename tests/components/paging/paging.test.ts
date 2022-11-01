// SPDX-License-Identifier: MIT

import { test, describe, expect } from 'vitest';
import { DataTableColumn } from 'naive-ui';

import { encodeQuery, EditableColumnType, toEditableColumnTypes, fromEditableColumnTypes } from '@/components/paging/paging';

describe('encodeQuery', ()=>{
    test('单个', ()=>{
        expect(encodeQuery({str:'str'})).toEqual('&str=str');
    });

    test('多个', ()=>{
        expect(encodeQuery({str:'str', num: 1})).toEqual('&str=str&num=1');
    });

    test('空对象', ()=>{
        expect(encodeQuery({})).toEqual('');
    });

    test('undefined', ()=>{
        expect(encodeQuery()).toEqual('');
    });

    test('字符串属性', ()=>{
        expect(encodeQuery({'page-size': 5, page: 0})).toEqual('&page-size=5&page=0');
    });

    test('数组', ()=>{
        expect(encodeQuery({'page-sizes': [5,50,100], page: 0})).toEqual('&page-sizes=5,50,100&page=0');
    });
});

describe('toEditableColumnTypes', ()=>{
    const t = (id: string): string => { return id }

    test('default', ()=>{
        const cols: Array<DataTableColumn> = [
            {key: 'k1'},
            {key: 'k2'},
        ];

        expect(toEditableColumnTypes(t, cols)).toEqual([
            {key: 'k1', visible: true},
            {key: 'k2', visible: true},
        ]);

        expect(cols).toEqual([
            {key: 'k1'},
            {key: 'k2'},
        ]);
    });

    test('empty', ()=>{
        expect(toEditableColumnTypes(t, [])).toEqual([]);
    });

    test('type = selection | expand', () => {
        const cols: Array<DataTableColumn> = [
            {key: 'k1'},
            {type: 'selection'},
            {type: 'expand'},
        ];

        expect(toEditableColumnTypes(t, cols)).toEqual([
            {key: 'k1', visible: true},
            {visible: true, key: '__selection__1', title: 'table.select_all', type: 'selection'},
            {visible: true, key: '__expand__2', type: 'expand'},
        ]);

        expect(cols).toEqual([
            {key: 'k1'},
            {type: 'selection'},
            {type: 'expand'},
        ]);
    });
});

describe('fromEditableColumnTypes',()=>{
    test('default', ()=>{
        const cols: Array<EditableColumnType> = [
            {key: 'k1', visible: true},
            {key: 'k2', visible: false},
            {key: 'k3', visible: true},
        ];

        expect(fromEditableColumnTypes(cols)).toEqual([
            {key: 'k1'},
            {key: 'k3'},
        ]);

        expect(cols).toEqual([ // 未改哟从原始的值
            {key: 'k1', visible: true},
            {key: 'k2', visible: false},
            {key: 'k3', visible: true},
        ]);
    });


    test('empty', ()=>{
        expect(fromEditableColumnTypes([])).toEqual([]);
    });

    test('!visible', ()=>{
        const cols = [
            {key: 'k1', visible: false},
            {key: 'k2', visible: false},
        ];

        expect(fromEditableColumnTypes(cols)).toEqual([]);
        expect(cols).toEqual([
            {key: 'k1', visible: false},
            {key: 'k2', visible: false},
        ]);
    });
});
