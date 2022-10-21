// SPDX-License-Identifier: MIT

import { InjectionKey, inject, App } from 'vue';
import { MenuOption } from 'naive-ui';
import { Router } from 'vue-router';

import { Return, f } from './api';
import { buildMenus } from './menu';
import { Options, defaultOptions } from './options';
import { getToken } from './token';

const key = Symbol('cmfx') as InjectionKey<Cmfx>;

/**
 * cmfx 项目相关的插件
 */
export class Cmfx {
    readonly #options: Required<Options>;

    constructor(o: Options) {
        this.#options = Object.assign(o, defaultOptions);
    }

    /**
     * 生成 n-layout-side 中的菜单项
     * @returns 菜单列表
     */
    buildMenus(): Array<MenuOption> {
        if (!this.#options.menus) {
            return [];
        }
        return buildMenus(this.#options.menus);
    }

    /**
     * 发起 POST 请求
     * @param url 请求地址
     * @param body 发送的内容
     * @returns
     */
    post(url: string, body: unknown): Promise<Return> {
        return f(this.#options, 'POST', url, body);
    }

    patch(url: string, body: unknown): Promise<Return> {
        return f(this.#options, 'PATCH', url, body);
    }

    put(url: string, body: unknown): Promise<Return> {
        return f(this.#options, 'PUT', url, body);
    }

    del(url: string): Promise<Return> {
        return f(this.#options, 'DELETE', url);
    }

    get(url: string): Promise<Return> {
        return f(this.#options, 'GET', url);
    }

    /**
     * 上传内容
     * @param url 上传地址
     * @param field 上传对象的字段名
     * @param blob 上传对象
     * @returns
     */
    upload(url: string, field: string, blob: Blob): Promise<Return> {
        const data = new FormData();
        data.append(field, blob);
        return f(this.#options, 'POST', url, data, true);
    }

    /**
     * 根据状态自动跳转到指定的页面
     */
    selectPage(r: Router) {
        let name = this.#options.loginPage;
        if (getToken(this.#options)) {
            name = this.#options.presetPage;
        }
        r.push({name: name});
    }

    install(app: App) {
        app.provide(key, this);
    }
}

/**
 * 创建 cmfx 插件
 * @param o 选项
 * @returns
 */
export function createCmfx(o: Options): Cmfx {
    return new Cmfx(o);
}

/**
 * 获取配置项
 *
 * @returns 配置项
 */
export function useCmfx(): Cmfx {
    const inst = inject(key);
    if (!inst) {
        throw '未指定配置项';
    }
    return inst;
}
