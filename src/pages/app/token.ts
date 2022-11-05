// SPDX-License-Identifier: MIT

import localforage from 'localforage';

const tokenName = 'admin_token';

/**
 * 获取 Token
 *
 * @returns 如果返回的空，表示不存在或是已经过期被删除。
 */
export async function getToken(): Promise<undefined | Token> {
    const v = await localforage.getItem(tokenName);
    if (v === null) {
        return;
    }
    const t = v as ExpiredToken;

    if (t.expired <= now()) {
        await delToken();
        return;
    }
    return t;
}

/**
 * 写入 token
 * @returns
 */
export async function writeToken(t?: Token) {
    if (!t) { return; }

    const expired = now() + t.expires;
    await localforage.setItem(tokenName, {
        access_token: t.access_token,
        refresh_token: t.refresh_token,
        expires: t.expires,
        expired: expired,
    });
}

/**
 * 删除 token
 */
export async function delToken() {
    await localforage.removeItem(tokenName);
}

export interface Token {
    access_token: string
    refresh_token: string
    expires: number // 过期时间，单位为秒。
}

type ExpiredToken = Token & {expired: number};

function now(): number {
    return Math.floor(Date.now() / 1000);
}
