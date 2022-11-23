// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { getToken, writeToken, delToken } from './token';
import { sleep } from '@dashboard/utils';

describe('token', ()=>{
    test('getToken undefined', ()=>{
        expect(getToken()).toBeUndefined();
    });

    test('writeToken undefined', ()=>{
        writeToken();
        expect(getToken()).toBeUndefined(); // 依然不存在
    });

    test('writeToken', async ()=>{
        writeToken({
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 1,
        });
        const t = getToken();
        expect(t).not.toBeUndefined();
        expect(t?.access_token).toEqual('access');
        expect(t?.expires).toEqual(1);

        await sleep(2000);
        expect(getToken()).toBeUndefined(); // 依然不存在
    });

    test('delToken', ()=>{
        writeToken({
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 1,
        });
        expect(getToken()).not.toBeUndefined();

        delToken();
        expect(getToken()).toBeUndefined();
    });
});
