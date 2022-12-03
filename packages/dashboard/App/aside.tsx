// SPDX-License-Identifier: MIT

import React, { useState, useEffect } from "react";
import { Nav, Layout } from '@douyinfe/semi-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Route } from "@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation";

import { Context } from './context';
import { useLocale } from "@dashboard/locales";
import { buildMenus, findMenuByKey, AdditionalMenuItem, NavMenuItem } from "./options/menu";

type RoutesSetter = React.Dispatch<React.SetStateAction<Array<Route>>>;

export function Aside(props:{ctx: Context, setRoutes: RoutesSetter}): JSX.Element {
    const nav = useNavigate();
    const loc = useLocation();
    const locale = useLocale();
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [openedKeys, setOpenedKeys] = useState<Array<React.ReactText>>([]);
    const [collapsed, setCollapsed] = useState(false);
    const [bodyHeight, setBodyHeight] = useState('100vh');

    const menus = buildMenus([], props.ctx.options.menus, locale);

    const opened = (e: {itemKey: React.ReactText, openKeys: Array<React.ReactText>, domEvent: MouseEvent, isOpen: boolean}) => {
        const keys = Object.assign([], openedKeys);
        if (e.isOpen) {
            keys.push(e.itemKey);
        }else{
            const index = keys.indexOf(e.itemKey);
            if (index > -1) {
                keys.splice(index, 1);
            }
        }
        setOpenedKeys(keys);
    };

    const selected = (e: NavMenuItem | null) => {
        if (!e) { // 可能是点击了用户菜单等功能，导致传入空对象。
            setSelectedKeys([]);
            return;
        }

        setSelectedKeys([e.itemKey as string]);
        props.setRoutes((e as AdditionalMenuItem).breadcrumb as Array<Route>);
        props.ctx.title = e.text as string;
    };

    useEffect(()=>{
        const hh = document.getElementsByClassName('nav-header')[0].clientHeight;
        const fh = document.getElementsByClassName('nav-footer')[0].clientHeight;
        setBodyHeight(`calc(100vh - ${hh}px - ${fh}px)`);
    });

    useEffect(()=>{
        selected(findMenuByKey(menus, loc.pathname));
    }, [loc.pathname, locale]); // locale 用于触发 breadcrumb 组件中的内容改变

    return <Layout.Sider breakpoint={['md']} onBreakpoint={(screen, broken)=>setCollapsed(!broken)}>
        <Nav bodyStyle={{overflowY: 'scroll', height: bodyHeight}}
            items={menus}
            isCollapsed={collapsed}
            onCollapseChange={(c: boolean)=>{setCollapsed(c);}}
            onOpenChange={opened}
            openKeys={openedKeys}
            onSelect={(e)=>nav(e.itemKey as string)}
            selectedKeys={selectedKeys}
        >
            <Nav.Header
                className="nav-header"
                style={{borderBottom: '1px solid var(--semi-color-border)'}}
                text={props.ctx.options.name}
                logo={<img src={props.ctx.options.logo} />}
            />
            <Nav.Footer className="nav-footer" collapseButton={true} />
        </Nav>
    </Layout.Sider>;
}
