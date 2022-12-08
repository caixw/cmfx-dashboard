// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { illustration } from './illustrations';

describe('illustration', ()=>{
    test('undefined', ()=>{
        expect(illustration(undefined)).toBeUndefined();
    });

    test('not-exists', ()=>{
        expect(()=>illustration(-1)).toThrowError('指定的插图 -1 并不存在');
    });

    test('正常返回', ()=>{
        expect(illustration(500)).not.toBeFalsy();
    });
});
