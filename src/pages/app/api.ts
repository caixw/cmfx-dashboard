// SPDX-License-Identifier: MIT

import type { Router } from 'vue-router';

import { Options } from '@/plugins/options';
import { delToken, getToken } from './token';
import { Cmfx } from './cmfx';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const contentType = 'application/json';

/**
 * api 接口返回的错误信息接口
 */
export interface Problem {
    title: string;
    type: string;
    params?: Array<Field>;
}

export interface Field {
    name: string;
    message: Array<string>;
}

export interface Return {
    problem?: Problem;
    body?: unknown;
    status: number;
    ok: boolean; // [200-299], 404，ok 为 true。
}

/**
 * 安装路由守卫
 */
export function installNavigationGuard(o: Required<Options>, r: Router) {
    r.beforeEach(async(to)=>{
        if (await getToken()) { // 已登录
            if (to.name === o.loginPage) {
                return { name: o.presetPage };
            }
            return true;
        } else { // 已登录
            if (to.name !== o.loginPage) {
                return { name: o.loginPage };
            }
            return true;
        }
    });
}

/**
 * 对 fetch 的简单封装
 *
 * @param method 请求方法
 * @param url 访问的路径，如果不是以 https:// 或是 http:// 开头的，则会当其当作 Options.urlPrefix 下的子路径处理。
 * @param obj 发送的对象，如果是 GET 等操作，传递 null 即可。
 * @returns
 */
export async function f(cmfx: Cmfx, method: Method, url: string, obj?: unknown): Promise<Return> {
    const t = await getToken();
    const req: RequestInit = {
        method: method,
        body: JSON.stringify(obj),
        mode: 'cors',
        headers: {
            'Authorization': t ? t.access_token : '',
            'Content-Type': contentType,
            'Accept': contentType + '; charset=utf-8',
            'Accept-Language': cmfx.locale
        },
    };
    return await request(req, buildURL(cmfx.options.urlPrefix, url));
}

/**
 * 采用 fetch 上传内容
 * @param url 上传地址
 * @param obj 上传的对象
 * @returns
 */
export async function upload(cmfx: Cmfx, url: string, obj: FormData): Promise<Return> {
    const t = await getToken();
    const req: RequestInit = {
        method: 'POST',
        mode: 'cors',
        body: obj,
        headers: {
            'Authorization': t ? t.access_token : '',
            'Accept': contentType + '; charset=utf-8',
            'Accept-Language': cmfx.locale
        },
    };
    return await request(req, buildURL(cmfx.options.urlPrefix, url));
}

async function request(req: RequestInit, url: string): Promise<Return> {
    const resp = await fetch(url, req);

    if (resp.ok) { // status: 200-299
        const txt = await resp.text();
        if (txt.length === 0) { // 比如 204，没有实际内容返回。
            return { status: resp.status, ok: true };
        }
        return { status: resp.status, ok: true, body: JSON.parse(txt) };
    }

    // 以下为非正常状态处理

    let ok = false;
    switch (resp.status) {
    case 401:
        await delToken(); // 不返回
        break;
    case 404: // 404 算正常返回
        ok = true;
    }

    let p: Problem|undefined = undefined;
    try {
        p = await resp.json() as Problem;
    } catch(error) {
        console.error(error);
    }
    return { status: resp.status, ok: ok, problem: p };
}

/**
 * 将 prefix 和 url 合并形成一条完整的 URL
 * @param prefix URL 前缀
 * @param url 访问的路径，也可以是完成的 URL，则会忽略 prefix。
 * @returns 结合之后的内容
 */
export function buildURL(prefix: string, url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    if (url.charAt(0) !== '/' && prefix.substring(prefix.length-1) !=='/') {
        url = '/' + url;
    }

    if (url.charAt(0) === '/' && prefix.substring(prefix.length-1) ==='/') {
        url = url.substring(1);
    }

    return prefix + url;
}
