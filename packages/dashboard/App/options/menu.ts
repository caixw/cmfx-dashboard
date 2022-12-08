// SPDX-License-Identifier: MIT

import React from 'react';
import { get } from 'lodash-es';
import { Route } from '@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation';
import { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';

import { Locale } from '@dashboard/locales';

export interface MenuItem {
    textKey: string
    itemKey: string
    icon?: React.ReactNode
    items?: Array<MenuItem>
}

// 菜单项上的一些额外数据
export interface AdditionalMenuItem {
    itemKey?: string
    breadcrumb?: Array<Route>
}

export type NavMenuItem = {
    text: string
    icon?: React.ReactNode
    items?: Array<NavMenuItem>
} & AdditionalMenuItem;

export type UserMenuItem = {
    itemKey: string
    icon?: React.ReactNode
    textKey: string
    node: 'item'
} | { node: 'divider' }

export type UserDropdownMenuItem = DropDownMenuItem & AdditionalMenuItem;

type UserMenuClick = (data: UserDropdownMenuItem) => void;

export function buildMenus(parent: Array<Route>, menus: Array<MenuItem>, locale: Locale): Array<NavMenuItem> {
    const ret: Array<NavMenuItem> = [];
    for(const item of menus) {
        const text = get(locale, item.textKey) ?? item.textKey;

        const breadcrumb = Object.assign([], parent);
        breadcrumb.push({
            path: item.itemKey as string,
            icon: item.icon,
            name: text as string
        });

        const sub: NavMenuItem ={
            text: text,
            itemKey: item.itemKey,
            icon: item.icon,
            breadcrumb: breadcrumb,
        };
        if (item.items) {
            sub.items = buildMenus(breadcrumb, item.items, locale);
        }

        ret.push(sub);
    }

    return ret;
}

export function findMenuByKey(items: Array<NavMenuItem>, key: string): NavMenuItem | null{
    for(const item of items) {
        if (item.itemKey === key) {
            return item;
        }

        if (item.items) {
            const data =findMenuByKey(item.items, key);
            if (data) {
                return data;
            }
        }
    }

    return null;
}

// click 表示点击用户菜单项时需要执行的操作；
export function buildUserMenus(parent: Array<Route>, click: UserMenuClick, menus: Array<UserMenuItem>, locale: Locale): Array<UserDropdownMenuItem> {
    const ret: Array<UserDropdownMenuItem> = [];
    for(const item of menus) {
        if (item.node === 'divider') {
            ret.push({node: 'divider'});
            continue;
        }

        const name = get(locale, item.textKey) ?? item.textKey;
        const breadcrumb = Object.assign([], parent);
        breadcrumb.push({
            path: item.itemKey,
            icon: item.icon,
            name: name as string
        });


        const sub:UserDropdownMenuItem = {
            name: name,
            breadcrumb: breadcrumb,
            icon: item.icon,
            node: 'item',
            itemKey: item.itemKey,
        };
        sub.onClick = ()=>click(sub);

        ret.push(sub);
    }

    return ret;
}
