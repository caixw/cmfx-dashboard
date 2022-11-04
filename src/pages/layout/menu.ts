// SPDX-License-Identifier: MIT

import { h, VNodeChild } from 'vue';
import { DropdownOption, MenuOption, NIcon } from 'naive-ui';
import { ComposerTranslation } from 'vue-i18n';

import type { MenuItem } from '@/plugins/options';

export interface LabelRender {
    (): VNodeChild
}

// 用于保存上一级的标题
export interface Labels {
    labels?: Array<LabelRender>
}

// 按名称的上下级顺序返回所有的标题名称
export function buildLabels(m: Labels): Array<string> {
    if (!m.labels) {
        return [];
    }

    const parents: Array<string> = [];
    for(const f of m.labels) {
        parents.push(f() as string);
    }
    return parents;
}

function findItems(key: string, menus: Array<I18nDropdownOption|I18nMenuOption>): DropdownOption|MenuOption|undefined {
    for(const v of menus) {
        if (v.key === key) {
            return v;
        }

        if (v.children) {
            const ret = findUserMenu(key, v.children);
            if (ret) {
                return ret;
            }
        }
    }
}

//////////////////////////// user menu

export type I18nDropdownOption = DropdownOption & Labels;

export function findUserMenu(key: string, menus: Array<I18nDropdownOption>): DropdownOption|undefined {
    return findItems(key, menus) as DropdownOption|undefined;
}

// 生成用户菜单
export function buildUserMenus(t: ComposerTranslation, menus: Array<MenuItem>): Array<I18nDropdownOption> {
    return buildUserMenuItems(t, [], menus);
}

function buildUserMenuItems(t: ComposerTranslation, p: Array<LabelRender> ,menus: Array<MenuItem>): Array<I18nDropdownOption> {
    const menuOptions:Array<I18nDropdownOption> = [];

    for (const item of menus) {
        const labels = Object.assign([], p);
        const label = (): VNodeChild => t(item.label);
        labels.push(label);

        if (item.type === 'group') { // 分组
            throw 'userMenus 不支持该类型';
        } else if (item.type === 'divider') {
            menuOptions.push({type: 'divider'});
        } else if (item.children) { // 带下级菜单
            menuOptions.push({
                labels: labels,
                label: label,
                key: item.key,
                children: buildUserMenuItems(t, labels, item.children),
            });
        } else { // 没有下级菜单
            menuOptions.push({labels: labels, label: label, key: item.key});
        }
    }

    return menuOptions;
}

////////////////////////////////////  menu

export type I18nMenuOption = MenuOption & Labels;

export function findMenu(key: string, menus: Array<I18nMenuOption>): MenuOption|undefined {
    return findItems(key, menus) as MenuOption|undefined;
}

// 生成 n-layout-side 中的菜单项
export function buildMenus(t: ComposerTranslation, menus: Array<MenuItem>): Array<I18nMenuOption> {
    return buildMenuItems(t, [], menus);
}

function buildMenuItems(t: ComposerTranslation, p: Array<LabelRender>, menus: Array<MenuItem>): Array<I18nMenuOption> {
    const menuOptions:Array<I18nMenuOption> = [];

    for (const item of menus) {
        const labels = Object.assign([], p);
        const label = (): VNodeChild => t(item.label);
        labels.push(label);

        const menu:I18nMenuOption = { labels: labels, label: label, key: item.key };

        if (item.type === 'group') { // 分组
            if (!item.children) {
                throw 'group 没有子菜单';
            }
            menu.type = 'group';
            menu.children = buildMenuItems(t, labels, item.children);
        } else if (item.type === 'divider') {
            if (item.children) {
                throw 'divider 不应该有子菜单';
            }
            menu.type = 'divider';
        } else {
            if (item.icon) {
                menu.icon = () => h(NIcon, {component: item.icon}, {});
            }
            if (item.children) {
                menu.children = buildMenuItems(t, labels, item.children);
            }
        }

        menuOptions.push(menu);
    }

    return menuOptions;
}
