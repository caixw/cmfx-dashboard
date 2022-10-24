// SPDX-License-Identifier: MIT

import { InjectionKey, inject, provide } from 'vue';
import { Router } from 'vue-router';

import { Return, f } from './api';
import { Options, Theme, ThemeMode, optionsKey } from '@/plugins/options';
import { getToken, delToken, writeToken, Token } from './token';
import { getCanonicalLocale } from './locale';

const key = Symbol('cmfx') as InjectionKey<Cmfx>;

interface LocaleSetter {
    (t: string): void
}

interface ThemeSetter {
    (t: Theme | null): void
}

interface ThemeModeSetter {
    (t: ThemeMode): void
}

export class Cmfx {
    readonly #options: Required<Options>;
    readonly #setLocale: LocaleSetter;
    readonly #setTheme: ThemeSetter;
    readonly #setThemeMode: ThemeModeSetter;

    constructor(ls: LocaleSetter, ts: ThemeSetter, ms: ThemeModeSetter) {
        const o = inject(optionsKey);
        if (!o) {
            throw ('用户未安装 plugins/options 插件');
        }
        this.#options = o;

        this.#setLocale = ls;
        this.#setTheme = ts;
        this.#setThemeMode = ms;

        provide(key, this);
    }

    /**
     * 返回选项值
     */
    get options(): Required<Options> { return this.#options; }

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
     * 设置子标题
     *
     * 设置 document.title 的子标题
     * @param title 子标题，如果为空，则只显示 name 属性值。
     */
    setTitle(title: string) {
        if (title) { title += this.options.titleSeparator; }
        document.title = title + this.options.name;
    }

    /**
     * 设置新的主题
     *
     * 会根据 setThemeMode 的设置自动选择是 light 还是 dark。
     * @param t 主题的 ID，如果为 null，表示采用默认的主题。
     */
    setTheme(t: string | null) {
        if (t === null) {
            this.#setTheme(null);
            return;
        }

        const theme = this.options.themes.find((theme: Theme):boolean=>{return theme.id == t;});
        if (!theme) {
            throw `${t} 主题并不存在`;
        }
        this.#setTheme(theme);
    }

    /**
     * 设置新的主题
     * @param mode 主题名称，可以是 os, dark 和 light
     */
    setThemeMode(m: ThemeMode) {
        this.#setThemeMode(m);
    }

    /**
     * 设置本地化信息
     * @param t 本地化字符串
     */
    setLocale(t: string) {
        t = getCanonicalLocale(t);

        this.options.locale = t;
        this.#setLocale(t);
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
}

export function useCmfx(): Cmfx {
    const inst = inject(key);
    if (!inst) {
        throw '未指定配置项';
    }
    return inst;
}
