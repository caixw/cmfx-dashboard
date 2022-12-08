// SPDX-License-Identifier: MIT

import {describe, expect, test} from 'vitest';

import { nextPage } from './login';

describe('nextPage', ()=>{
    test('空 search', ()=>{
        expect(nextPage('preset', '')).toEqual('preset');
    });

    test('空 search.from', ()=>{
        expect(nextPage('preset', 'k=v')).toEqual('preset');
    });

    test('正确的 search.form', ()=>{
        expect(nextPage('preset', 'from=/path')).toEqual('/path');
    });
});
