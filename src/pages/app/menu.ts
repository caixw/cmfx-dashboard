// SPDX-License-Identifier: MIT

import { h } from 'vue';
import { MenuOption, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

import type { MenuItem } from '@/plugins/options';

/**
 * 生成 n-layout-side 中的菜单项
 *
 * @param menus 菜单项的定义
 * @returns 菜单项
 */
export function buildMenus(menus: Array<MenuItem>): Array<MenuOption> {
    return buildMenuItems([], menus);
}

function buildMenuItems(p: Array<string>, menus: Array<MenuItem>): Array<MenuOption> {
    const menuOptions:Array<MenuOption> = [];

    for (const item of menus) {
        const labels = Object.assign([], p);
        labels.push(item.label);

        if (item.type === 'group') { // 分组
            if (!item.children) {
                throw 'group 没有子菜单';
            }

            menuOptions.push({
                labels: labels, // 由 breadcrumb 使用
                label: item.label,
                type: 'group',
                key: item.key,
                children: buildMenuItems(labels, item.children),
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
                label: item.label,
                key: item.key,
                children: buildMenuItems(labels, item.children),
            };
            if (item.icon) {
                menu.icon = () => h(NIcon, {component: item.icon}, {});
            }
            menuOptions.push(menu);
        } else { // 没有下级菜单
            const menu: MenuOption = {
                labels: labels,
                label: ()=> h(RouterLink, {to:{name: item.key}}, {default: ()=> item.label}),
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

