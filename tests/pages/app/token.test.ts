// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { getToken, writeToken, delToken } from '@/pages/app/token';

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('token', async()=>{
    test('getToken undefined', async()=>{
        expect(await getToken()).toBeUndefined();
    });

    test('writeToken undefined', async()=>{
        await writeToken();
        expect(await getToken()).toBeUndefined(); // 依然不存在
    });

    test('writeToken', async ()=>{
        await writeToken({
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 1,
        });
        const t = await getToken();
        expect(t).not.toBeUndefined();
        expect(t?.access_token).toEqual('access');
        expect(t?.expires).toEqual(1);

        await sleep(2000);
        expect(await getToken()).toBeUndefined(); // 依然不存在
    });

    test('delToken', async ()=>{
        await writeToken({
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 1,
        });
        expect(await getToken()).not.toBeUndefined();

        delToken();
        expect(await getToken()).toBeUndefined();
    });
});
