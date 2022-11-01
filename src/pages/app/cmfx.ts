// SPDX-License-Identifier: MIT

import { InjectionKey, inject, provide } from 'vue';

import { Return, f } from './api';
import { Options, NamedTheme, Theme, ThemeMode, optionsKey } from '@/plugins/options';
import { delToken, writeToken, Token } from './token';
import { getCanonicalLocale, presetLocale } from './locale';

const key = Symbol('cmfx') as InjectionKey<Cmfx>;

interface LocaleSetter {
    (t: string): void
}

interface ThemeSetter {
    (t?: Theme): void
}

interface ThemeModeSetter {
    (t: ThemeMode): void
}

export class Cmfx {
    readonly #options: Required<Options>;

    #locale: string;
    readonly #setLocale: LocaleSetter;

    #theme?: string;
    readonly #setTheme: ThemeSetter;

    #themeMode: ThemeMode;
    readonly #setThemeMode: ThemeModeSetter;

    constructor(ls: LocaleSetter, ts: ThemeSetter, ms: ThemeModeSetter) {
        const o = inject(optionsKey);
        if (!o) {
            throw ('用户未安装 plugins/options 插件');
        }
        this.#options = o;

        this.#locale = presetLocale;
        this.#setLocale = ls;

        this.#theme = undefined;
        this.#setTheme = ts;

        this.#themeMode = 'os';
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
        return f(this, 'POST', url, body);
    }

    patch(url: string, body: unknown): Promise<Return> {
        return f(this, 'PATCH', url, body);
    }

    put(url: string, body: unknown): Promise<Return> {
        return f(this, 'PUT', url, body);
    }

    del(url: string): Promise<Return> {
        return f(this, 'DELETE', url);
    }

    get(url: string): Promise<Return> {
        return f(this, 'GET', url);
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
        return f(this, 'POST', url, data, true);
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

    get theme(): string | undefined { return this.#theme; }
    set theme(id: string | undefined) {
        this.#theme = id;

        if (!id) {
            this.#setTheme();
            return;
        }

        const theme = this.options.themes.find((theme: NamedTheme):boolean=>{return theme.id == id;});
        if (!theme) {
            throw `${id} 主题并不存在`;
        }
        this.#setTheme(theme.theme);
    }

    get themeMode(): ThemeMode { return this.#themeMode; }
    set themeMode(m: ThemeMode) {
        this.#themeMode = m;
        this.#setThemeMode(m);
    }

    get locale(): string { return this.#locale; }
    set locale(t: string) {
        t = getCanonicalLocale(t);
        this.#locale = t;
        this.#setLocale(t);
    }

    /**
     * 退出登录
     */
    async logout() {
        const ret = await this.del('/login');
        if (!ret.ok) {
            console.error(ret.problem);
        }

        delToken(this.options);
    }

    /**
     * 执行登录操作
     * @param account 账号信息
     */
    async login(account: unknown): Promise<boolean> {
        const r = await this.post('/login', account);
        if (!r.ok) {
            console.log(r.problem);
            return false;
        }

        writeToken(this.options, r.body as Token);
        return true;
    }
}

export function useCmfx(): Cmfx {
    const inst = inject(key);
    if (!inst) {
        throw '未指定配置项';
    }
    return inst;
}
