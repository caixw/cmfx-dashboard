// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { buildOptions } from '@/plugins/options/options';
import { defaultOptions } from '~/plugins/options/options.test';
import { getToken, writeToken, delToken } from '@/pages/app/token';

const o = buildOptions(defaultOptions);

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('token', async()=>{
    test('getToken undefined', ()=>{
        expect(getToken(o)).toBeUndefined();
    });

    test('writeToken undefined', ()=>{
        writeToken(o);
        expect(getToken(o)).toBeUndefined(); // 依然不存在
    });

    test('writeToken', async ()=>{
        writeToken(o, {
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 1,
        });
        const t = getToken(o);
        expect(t).not.toBeUndefined();
        expect(t?.access_token).toEqual('access');
        expect(t?.expires).toEqual(1);

        await sleep(2000);
        expect(getToken(o)).toBeUndefined(); // 依然不存在
    });

    test('delToken', ()=>{
        writeToken(o, {
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 1,
        });
        expect(getToken(o)).not.toBeUndefined();

        delToken(o);
        expect(getToken(o)).toBeUndefined();
    });
});
