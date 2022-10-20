// SPDX-License-Identifier: MIT

import { Options } from './options';

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
        const t = JSON.parse(v) as Required<Token>;
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
    t.expired = now() + t.expires;
    cfg.storage.setItem(cfg.name, JSON.stringify(t));
}

/**
 * 删除 token
 * @param o
 */
export function delToken(o: Required<Options>) {
    const cfg = o.token;
    cfg.storage.removeItem(cfg.name);
}

interface Token {
    access_token: string
    refresh_token: string
    expires: number
    expired?: number
}

function now(): number {
    return Math.floor(Date.now() / 1000);
}
