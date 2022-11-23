// SPDX-License-Identifier: MIT

import React from 'react';
import { get } from 'lodash-es';
import { Route } from "@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation";

import { Locale } from '@dashboard/locales';

export interface MenuItem {
    textKey: string
    text?: string
    itemKey: string
    icon?: React.ReactNode
    items?: Array<MenuItem>
    breadcrumb?: Array<Route>
}

export interface UserMenuItem {
    itemKey: string
    icon?: React.ReactNode
    items?: Array<UserMenuItem>
    breadcrumb?: Array<Route>

    textKey: string // textKey 如果为 --- 也表示 divider
    name?: string // 作为用户菜单时的标题
    node: 'divider' | 'title' | 'item' // 节点类型 divider 或是为空
}

export function checkMenuKey(keys: Array<string>, menus: Array<MenuItem>) {
    for(const m of menus) {
        if (keys.find((v)=>{return v==m.itemKey;})) {
            throw `存在同名的 itemKey: ${m.itemKey}`;
        }
        if (m.itemKey) {
            keys.push(m.itemKey);
        }

        if (m.items) {
            checkMenuKey(keys, m.items);
        }
    }
}

export function buildMenus(parent: Array<Route>, menus: Array<MenuItem>, locale: Locale) {
    for(const item of menus) {
        item.text = get(locale, item.textKey) ?? item.textKey;
        const routes = Object.assign([], parent);
        routes.push({
            path: item.itemKey as string,
            icon: item.icon,
            name: item.text as string
        });
        item.breadcrumb = routes;

        if (item.items) {
            buildMenus(routes, item.items, locale);
        }
    }
}

export function buildUserMenus(parent: Array<Route>, menus: Array<UserMenuItem>, locale: Locale) {
    for(const item of menus) {
        if (item.node === 'divider') {
            continue;
        }

        item.name = get(locale, item.textKey) ?? item.textKey;
        const routes = Object.assign([], parent);
        routes.push({
            path: item.itemKey as string,
            icon: item.icon,
            name: item.name as string
        });
        item.breadcrumb = routes;

        if (item.items) {
            buildUserMenus(routes, item.items, locale);
        }
    }
}
