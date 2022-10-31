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
    const cols: Array<DataTableColumn> = [
        {key: 'k1'},
        {key: 'k2'},
    ];

    test('default', ()=>{
        expect(toEditableColumnTypes(cols.slice())).toEqual([
            {key: 'k1', visible: true},
            {key: 'k2', visible: true},
        ]);
        expect(cols).toEqual([
            {key: 'k1'},
            {key: 'k2'},
        ]);
    });

    test('empty', ()=>{
        expect(toEditableColumnTypes([])).toEqual([]);
    });
});

describe('fromEditableColumnTypes',()=>{
    const cols1: Array<EditableColumnType> = [
        {key: 'k1', visible: true},
        {key: 'k2', visible: false},
        {key: 'k3', visible: true},
    ];
    test('default', ()=>{
        expect(fromEditableColumnTypes(cols1.slice())).toEqual([
            {key: 'k1'},
            {key: 'k3'},
        ]);
        expect(cols1).toEqual([
            {key: 'k1', visible: true},
            {key: 'k2', visible: false},
            {key: 'k3', visible: true},
        ]);
    });


    test('empty', ()=>{
        expect(fromEditableColumnTypes([])).toEqual([]);
    });

    const cols2 = [
        {key: 'k1', visible: false},
        {key: 'k2', visible: false},
    ];
    test('!visible', ()=>{
        expect(fromEditableColumnTypes(cols2)).toEqual([]);
        expect(cols2).toEqual([
            {key: 'k1', visible: false},
            {key: 'k2', visible: false},
        ]);
    });
});
