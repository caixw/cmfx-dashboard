// SPDX-License-Identifier: MIT

import { Options } from '@/plugins/options';

/**
 * 获取 Token
 *
 * @param o 选项
 * @returns 如果返回的空，表示不存在或是已经过期被删除。
 */
export function getToken(o: Required<Options>): undefined | Token {
    const cfg = o.token;
    const v = cfg.storage.getItem(cfg.name);
    if (v === null) {
        return;
    }

    try {
        const t = JSON.parse(v) as Required<ExpiredToken>;
        if (t.expired <= now()) {
            delToken(o);
            return;
        }
        return t;
    } catch (error) {
        console.error(error);
    }
}

/**
 * 写入 token
 * @param o
 * @param t
 * @returns
 */
export function writeToken(o: Required<Options>, t?: Token) {
    if (!t) { return; }

    const cfg = o.token;
    const expired = now() + t.expires;
    cfg.storage.setItem(cfg.name, JSON.stringify({
        access_token: t.access_token,
        refresh_token: t.refresh_token,
        expires: t.expires,
        expired: expired,
    }));
}

/**
 * 删除 token
 * @param o
 */
export function delToken(o: Required<Options>) {
    const cfg = o.token;
    cfg.storage.removeItem(cfg.name);
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
