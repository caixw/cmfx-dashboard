// SPDX-License-Identifier: MIT

import { test, describe, expect } from 'vitest';

import { encodeQuery, buildRowKey } from '@/components/table/table';

describe('encodeQuery', ()=>{
    test('单个', ()=>{
        expect(encodeQuery({str:'str'})).toEqual('str=str&');
    });

    test('多个', ()=>{
        expect(encodeQuery({str:'str', num: 1})).toEqual('str=str&num=1&');
    });

    test('空对象', ()=>{
        expect(encodeQuery({})).toEqual('');
    });

    test('undefined', ()=>{
        expect(encodeQuery()).toEqual('');
    });

    test('字符串属性', ()=>{
        expect(encodeQuery({'page-size': 5, page: 0})).toEqual('page-size=5&page=0&');
    });

    test('数组', ()=>{
        expect(encodeQuery({'page-sizes': [5,50,100], page: 0})).toEqual('page-sizes=5,50,100&page=0&');
    });
});

describe('buildRowKey', ()=>{
    const obj = {
        num: 1,
        str: 'str',
        obj: {num: 1}
    };

    test('string', ()=>{
        const f = buildRowKey('str');
        expect(typeof f).toEqual('function');
        expect(f(obj)).toEqual('str');
    });

    test('number', ()=>{
        const f = buildRowKey('num');
        expect(typeof f).toEqual('function');
        expect(f(obj)).toEqual(1);
    });

    test('不存在的字段', ()=>{
        const f = buildRowKey('not-exists');
        expect(typeof f).toEqual('function');
        expect(()=>f(obj)).toThrowError('无效的字段类型');
    });

    test('字段类型无效', ()=>{
        const f = buildRowKey('obj');
        expect(typeof f).toEqual('function');
        expect(()=>f(obj)).toThrowError('无效的字段类型');
    });

    test('undefined', ()=>{
        const f = buildRowKey(undefined);
        expect(()=>f(obj)).toThrowError('未指定的 rowKey');
    });
});
