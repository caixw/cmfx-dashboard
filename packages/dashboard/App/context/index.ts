// SPDX-License-Identifier: MIT

import React from "react";

import { getLocaleCode, setLocaleCode } from "@dashboard/locales";
import { f, upload, Return } from './api';
import { Options } from '@dashboard/App/options';

type LocaleCodeSetter = (code: string) => void;

export type ContextOptions = Omit<Options, 'routes'>;

// AppContext 的实际类型
export class Context {
    #title = '';
    #options: Required<ContextOptions>;
    #setLocaleCode: LocaleCodeSetter;

    constructor(o: Required<ContextOptions>, ls: LocaleCodeSetter) {
        this.#options = o;

        this.#setLocaleCode = ls;
    }

    get options(): Required<ContextOptions> { return this.#options; }

    set title(title: string) {
        this.#title = title;
        if (title) {
            title += this.options.titleSeparator;
        }
        document.title = title + this.options.name;
    }
    get title(): string { return this.#title; }

    get localeCode(): string { return getLocaleCode(); }
    set localeCode(code: string) {
        setLocaleCode(code);
        this.#setLocaleCode(code);
    }

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

    upload(url: string, field: string, blob: Blob): Promise<Return> {
        const data = new FormData();
        data.append(field, blob);
        return upload(this, url, data);
    }
}

export const AppContext = React.createContext(new Context(
    {
        name: '',
        logo: '',
        titleSeparator: '|',
        pageSizes: [],
        loginBG: '',

        loginPath: '',
        homePath: '',

        menus: [],
        userMenus: [],

        urlPrefix: ''
    },
    () => {return;}
));
AppContext.displayName = 'AppContext';
