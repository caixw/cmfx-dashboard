// SPDX-License-Identifier: MIT

import React from 'react';
import { LocaleConsumer as SLocaleConsumer } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import zh_TW from '@douyinfe/semi-ui/lib/es/locale/source/zh_TW';

import { ObjectType } from '@dashboard/utils';
import { zhCN } from './zh_CN';
import { zhTW } from './zh_TW';

type Item = Record<string, string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Locale<T extends ObjectType = any> {
    locale: Item
    common: Item // 一些通用的本地化内容
    admin: Item
    errorPage: Item
    paging: Item
    appSetting: Item

    // 用户自定义的数据添加在此处
    custom: T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props<T extends ObjectType = any> {
    children: (l: Locale<T>) => React.ReactNode
}

/**
 * 返回自定义的本地化数据
 */
export function LocaleConsumer<T extends ObjectType>(props: Props): JSX.Element {
    return <SLocaleConsumer componentName='Cmfx'>
        {
            (l: Locale<T>) => {
                return props.children(l);
            }
        }
    </SLocaleConsumer>;
}

export const locales = new Map<string, typeof zh_CN & {Cmfx:Locale}>([
    [zh_CN.code, { ...zh_CN, Cmfx: zhCN }],
    [zh_TW.code, { ...zh_TW, Cmfx: zhTW }],
]);

/**
 * 添加自定义的本地化信息
 */
export function install<T extends ObjectType>(code: string, obj: T): void {
    const l = locales.get(code);
    if (!l) {
        throw `不支持 ${code} 的本地化`;
    }
    l.Cmfx.custom = obj;
}

const localeKey = 'locale';

export function getLocaleCode() {
    return window.localStorage.getItem(localeKey) || zh_CN.code;
}

export function setLocaleCode(code: string) {
    window.localStorage.setItem(localeKey, code);
}

export function getLocale(code: string) {
    const l = locales.get(code);
    if (!l) {
        throw `无效的本地化代码：${code}`;
    }
    return l;
}

export function useLocale(): Locale {
    return getLocale(getLocaleCode()).Cmfx;
}
