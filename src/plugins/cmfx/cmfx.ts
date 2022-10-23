// SPDX-License-Identifier: MIT

import { InjectionKey, inject, App } from 'vue';
import { MenuOption } from 'naive-ui';
import { Router } from 'vue-router';

import { Return, f } from './api';
import { buildMenus } from './menu';
import { Options, presetOptions } from './options';
import { getToken, delToken, writeToken, Token } from './token';

const key = Symbol('cmfx') as InjectionKey<Cmfx>;

/**
 * cmfx 项目相关的插件
 */
export class Cmfx {
    readonly #options: Required<Options>;

    constructor(o: Options) {
        this.#options = Object.assign(presetOptions, o);
    }

    /**
     * 返回选项值
     */
    get options(): Required<Options> { return this.#options; }

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
     * 修改本地化语言
     * @param id 语言 ID
     */
    setAcceptLanguage(id: string) {
        this.#options.locale = id;
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

    /**
     * 退出登录
     * @param r 路由
     */
    async logout(r: Router) {
        const ret = await this.del('/login');
        if (!ret.ok) {
            console.error(ret.problem);
        }

        delToken(this.#options);
        r.push({name: this.#options.loginPage});
    }

    /**
     * 执行登录操作
     * @param account 账号信息
     */
    async login(account: unknown) {
        const r = await this.post('/login', account);
        if (!r.ok) {
            console.log(r.problem);
        }

        writeToken(this.#options, r.body as Token);
    }

    install(app: App) {
        app.provide(key, this);
    }
}

/**
 * 创建 cmfx 插件
 * @param o 选项
 * @param v 本地化对象
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
