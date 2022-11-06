// SPDX-License-Identifier: MIT

import { test, describe, expect } from 'vitest';
import { DataTableColumn } from 'naive-ui';

import { EditableColumnType, toEditableColumnTypes, fromEditableColumnTypes } from '@/components/table-actions/column';

describe('toEditableColumnTypes', ()=>{
    const t = (id: string): string => { return id; };

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

    const render = ()=> '';
    test('type = selection | expand', () => {
        const cols: Array<DataTableColumn> = [
            {key: 'k1'},
            {type: 'selection'},
            {type: 'expand', renderExpand: render},
        ];

        expect(toEditableColumnTypes(t, cols)).toEqual([
            {key: 'k1', visible: true},
            {visible: true, key: '__selection__1', title: 'table.select_all', type: 'selection'},
            {visible: true, key: '__expand__2', type: 'expand', renderExpand: render},
        ]);

        expect(cols).toEqual([
            {key: 'k1'},
            {type: 'selection'},
            {type: 'expand', renderExpand: render},
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
