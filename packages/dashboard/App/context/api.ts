// SPDX-License-Identifier: MIT

import { delToken, getToken } from './token';
import { Context } from './context';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const contentType = 'application/json';
const charset = 'utf-8';
const reqContentType = contentType + '; charset=' + charset;

// api 接口返回的错误信息接口
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
 * 对 fetch 的简单封装
 *
 * @param method 请求方法
 * @param url 访问的路径，如果不是以 https:// 或是 http:// 开头的，则会当其当作 Options.urlPrefix 下的子路径处理。
 * @param obj 发送的对象，如果是 GET 等操作，传递 null 即可。
 * @returns
 */
export async function f(ctx: Context, method: Method, url: string, obj?: unknown): Promise<Return> {
    const t = getToken();
    const req: RequestInit = {
        method: method,
        body: JSON.stringify(obj),
        mode: 'cors',
        headers: {
            'Authorization': t ? t.access_token : '',
            'Content-Type': reqContentType,
            'Accept': contentType,
            'Accept-Charset': charset,
            'Accept-Language': ctx.localeCode
        },
    };
    return await request(req, buildURL(ctx.options.urlPrefix, url));
}

/**
 * 采用 fetch 上传内容
 * @param url 上传地址
 * @param obj 上传的对象
 * @returns
 */
export async function upload(ctx: Context, url: string, obj: FormData): Promise<Return> {
    const t = getToken();
    const req: RequestInit = {
        method: 'POST',
        mode: 'cors',
        body: obj,
        headers: {
            'Authorization': t ? t.access_token : '',
            'Accept': contentType,
            'Accept-Charset': charset,
            'Accept-Language': ctx.localeCode
        },
    };
    return await request(req, buildURL(ctx.options.urlPrefix, url));
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
        delToken();
        break;
    case 404: // 404 算正常返回
        ok = true;
    }

    let p: Problem|undefined = undefined;
    try {
        p = await resp.json() as Problem;
    } catch(error) { // 如果返回的是 Not Found 等未作特殊处理的错误，则分析成 JSON 会抛出异常。
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
