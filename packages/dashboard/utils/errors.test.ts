// SPDX-License-Identifier: MIT

import { zhCN } from '@dashboard/locales/zh_CN';
import { test, expect, describe } from 'vitest';
import { ResponseError } from './errors';

describe('ResponseError', ()=>{
    test('with title', ()=>{
        const err = new ResponseError(404, '404-title');
        expect(err.message).toEqual('404-title');
        expect(err.statusText).toEqual('404-title');
        expect(err.status).toEqual(404);
    });

    test('without title', ()=>{
        const err = new ResponseError(404);
        expect(err.message).toEqual(zhCN.errors.error_404);
        expect(err.statusText).toEqual(zhCN.errors.error_404);
        expect(err.status).toEqual(404);
    });

    test('status not in locale', ()=>{
        const err = new ResponseError(-1);
        const title = `并未实现对 ${-1} 错误的翻译`;
        expect(err.message).toEqual(title);
        expect(err.statusText).toEqual(title);
        expect(err.status).toEqual(-1);
    });
});
