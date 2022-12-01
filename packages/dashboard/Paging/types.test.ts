// SPDX-License-Identifier: MIT

import { test, describe, expect } from 'vitest';

import { encodeQuery, parseQueryForClient } from './types';

describe('encodeQuery', ()=>{
    test('单个', ()=>{
        expect(encodeQuery({str:'str'})).toEqual('&str=str');
        expect(encodeQuery({str:'str'}, true)).toEqual('&str=str');
    });

    test('多个', ()=>{
        expect(encodeQuery({str:'str', num: 1})).toEqual('&str=str&num=1');
        expect(encodeQuery({str:'str', num: 1}, true)).toEqual('&str=str&num=1');
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
        expect(encodeQuery({'page-sizes': [5,50,100], page: 0}, true)).toEqual('&page-sizes=[5,50,100]&page=0');
    });
});

describe('parseQueryForclient', ()=>{
    test("仅 query", ()=>{
        expect(parseQueryForClient('k1=1&k2=k2', 1, 20)).toEqual({q:{k1:'1', k2:'k2'},page:1, size: 20});
    });

    test("query 包含数组格式 1", ()=>{
        expect(parseQueryForClient('k1=1&k2=[k2,k3]', 1, 20)).toEqual({q:{k1:'1', k2:['k2','k3']},page:1, size: 20});
    });

    test("query 包含 page", ()=>{
        expect(parseQueryForClient('k1=1&k2=k2&page=101', 1, 20)).toEqual({q:{k1:'1', k2:'k2'},page:101, size: 20});
    });
});
