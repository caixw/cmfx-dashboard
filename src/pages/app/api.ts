// SPDX-License-Identifier: MIT

import { Options } from '@/plugins/options';
import { delToken, getToken } from './token';
import { Cmfx } from './cmfx';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

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
    ok: boolean; // [200-299]，ok 为 true。
}

/**
 * 对 fetch 的简单封装
 *
 * @param method 请求方法
 * @param url 访问的路径，如果不是以 https:// 或是 http:// 开头的，则会当其当作 Options.urlPrefix 下的子路径处理。
 * @param obj 发送的对象，如果是 GET 等操作，传递 null 即可。
 * @param upload 是否为上传对象。
 * @returns
 */
export async function f(cmfx: Cmfx, method: Method, url: string, obj?: FormData | unknown, upload?: boolean): Promise<Return> {
    const o = cmfx.options;
    url = buildURL(o.urlPrefix, url);

    const t = getToken(o);
    const headers: HeadersInit = {
        'Authorization': t ? t.access_token : '',
        'Content-Type': o.contentType,
        'Accept-Language': cmfx.locale
    };

    let body: FormData | string | undefined = undefined;
    if (upload) {
        body = obj as FormData;
    } else if (obj) {
        switch (o.contentType) {
        case 'application/json':
            body = JSON.stringify(obj);
            break;
        default:
            throw '不支持的 content-type';
        }
    }

    const req: RequestInit = {
        method: method,
        mode: 'cors',
        headers: headers,
        body: body,
    };
    return await request(o, req, url);
}

async function request(o: Required<Options>, req: RequestInit, url: string): Promise<Return> {
    const resp = await fetch(url, req);

    if (resp.ok) { // status: 200-299
        let body: unknown = undefined;
        const txt = await resp.text();
        if (txt.length > 0){ // 比如 204，没有实际内容返回。
            body = JSON.parse(txt);
        }
        return {
            status: resp.status,
            ok: true,
            body: body
        };
    }

    // 以下为非正常状态处理

    let ok = false;
    switch (resp.status) {
    case 401:
        delToken(o); // 不返回
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
    return {
        status: resp.status,
        ok: ok,
        problem: p,
    };
}

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
