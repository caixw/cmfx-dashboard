// SPDX-License-Identifier: MIT

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AppContext } from './context';

const tokenName = 'cmfx_token';
const s = window.localStorage;

/**
 * 获取 Token
 *
 * @returns 如果返回的空，表示不存在或是已经过期被删除。
 */
export function getToken(): undefined | Token {
    const v = s.getItem(tokenName);
    if (v === null) {
        return;
    }
    const t = JSON.parse(v) as ExpiredToken;

    if (t.expired <= now()) {
        delToken();
        return;
    }
    return t;
}

// 写入 token
export function writeToken(t?: Token) {
    if (!t) { return; }

    const expired = now() + t.expires;
    s.setItem(tokenName, JSON.stringify({
        access_token: t.access_token,
        refresh_token: t.refresh_token,
        expires: t.expires,
        expired: expired,
    }));
}

// 删除 token
export function delToken() {
    s.removeItem(tokenName);
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

/**
 * 指定该组件不需要经过登录验证即可访问
 */
export function UnauthRoute(props: {children: JSX.Element}): JSX.Element {
    if (!getToken()) { // 未登录
        return props.children;
    }

    const ctx = useContext(AppContext);
    return <Navigate to={ctx.options.homePath} />;
}

/**
 * 指定需要登录验证才能访问的页面
 */
export function AuthRoute(props: {children: JSX.Element}): JSX.Element {
    if (getToken()) { // 已登录
        return props.children;
    }

    const ctx = useContext(AppContext);
    const loc = useLocation();
    return <Navigate to={{pathname: ctx.options.loginPath, search: `from=${loc.pathname}`}} />;
}
