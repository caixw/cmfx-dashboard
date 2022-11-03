// SPDX-License-Identifier: MIT

import { h } from 'vue';
import { DropdownOption, MenuOption, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Composer } from 'vue-i18n';

import type { MenuItem } from '@/plugins/options';

interface LabelRender {
    (): string
}

export type I18nMenuOption = MenuOption & {
    labels?: Array<LabelRender>
}

/**
 * 生成用户菜单
 * @param $i18n 本地化对象
 * @param menus 菜单项的定义
 * @returns
 */
export function buildUserMenus($i18n: Composer, menus: Array<MenuItem>): Array<DropdownOption> {
    const menuOptions:Array<DropdownOption> = [];

    for (const item of menus) {
        const label = ()=> $i18n.t(item.label);

        if (item.type === 'group') { // 分组
            throw 'userMenus 不支持该类型';
        } else if (item.type === 'divider') {
            menuOptions.push({type: 'divider'});
        } else if (item.children) { // 带下级菜单
            menuOptions.push({
                label: label,
                key: item.key,
                children: buildUserMenus($i18n, item.children),
            });
        } else { // 没有下级菜单
            menuOptions.push({label: label, key: item.key});
        }
    }

    return menuOptions;
}

/**
 * 生成 n-layout-side 中的菜单项
 *
 * @param $i18n 本地化对象
 * @param menus 菜单项的定义
 * @returns 菜单项
 */
export function buildMenus($i18n: Composer, menus: Array<MenuItem>): Array<I18nMenuOption> {
    return buildMenuItems($i18n, [], menus);
}

/**
 * 按名称的上下级顺序返回所有的标题名称
 * @param m
 * @returns
 */
export function buildMenuLabels(m: I18nMenuOption): Array<string> {
    if (!m.labels) {
        return [];
    }

    const parents: Array<string> = [];
    for(const f of m.labels) {
        parents.push(f());
    }
    return parents;
}

function buildMenuItems($i18n: Composer, p: Array<LabelRender>, menus: Array<MenuItem>): Array<I18nMenuOption> {
    const menuOptions:Array<I18nMenuOption> = [];

    for (const item of menus) {
        const labels = Object.assign([], p);
        const label = ()=> $i18n.t(item.label);
        labels.push(label);

        if (item.type === 'group') { // 分组
            if (!item.children) {
                throw 'group 没有子菜单';
            }

            menuOptions.push({
                labels: labels, // 由 breadcrumb 使用
                label: label,
                type: 'group',
                key: item.key,
                children: buildMenuItems($i18n, labels, item.children),
            });
        } else if (item.type === 'divider') {
            if (item.children) {
                throw 'divider 不应该有子菜单';
            }

            menuOptions.push({
                labels: labels,
                type: 'divider',
                key: item.key,
            });
        } else if (item.children) { // 带下级菜单
            const menu: MenuOption = {
                labels: labels,
                label: label,
                key: item.key,
                children: buildMenuItems($i18n, labels, item.children),
            };
            if (item.icon) {
                menu.icon = () => h(NIcon, {component: item.icon}, {});
            }
            menuOptions.push(menu);
        } else { // 没有下级菜单
            const menu: MenuOption = {
                labels: labels,
                label: ()=> h(RouterLink, {to:{name: item.key}}, {default: ()=> label()}),
                key: item.key,
            };
            if (item.icon) {
                menu.icon = () => h(NIcon, {component: item.icon}, {});
            }
            menuOptions.push(menu);
        }
    }

    return menuOptions;
}

export function findUserMenu(key: string, menus: Array<DropdownOption>): DropdownOption|undefined {
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
