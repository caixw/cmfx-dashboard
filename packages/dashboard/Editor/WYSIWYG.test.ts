// SPDX-License-Identifier: MIT

import { test, describe, expect } from 'vitest';
import { getStyle } from './WYSIWYG';

describe('getStyle', ()=>{
    test('number', ()=>{
        expect(getStyle(21)).toEqual({height: '21px'});
    });

    test('string', ()=>{
        expect(getStyle('22px')).toEqual({height: '22px'});
    });

    test('undefined', ()=>{
        expect(getStyle()).toBeUndefined();
    });
});
