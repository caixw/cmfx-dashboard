// SPDX-License-Identifier: MIT

import React, { useState, useEffect } from 'react';
import { Nav, Layout } from '@douyinfe/semi-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Route } from '@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation';
import { OnSelectedData } from '@douyinfe/semi-ui/lib/es/navigation';

import { useLocale } from '@dashboard/locales';
import { IDType } from '@dashboard/utils';

import { Context } from './context';
import { buildMenus, findMenuByKey, AdditionalMenuItem, NavMenuItem } from './options';
import { registerBreakpoint, triggerBreakpoint } from './breakpoint';

type RoutesSetter = React.Dispatch<React.SetStateAction<Array<Route>>>;

export function Aside(props:{ctx: Context, setRoutes: RoutesSetter}): JSX.Element {
    const nav = useNavigate();
    const loc = useLocation();
    const locale = useLocale();
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [openedKeys, setOpenedKeys] = useState<Array<IDType>>([]);
    const [collapsed, setCollapsed] = useState(false);
    const [bodyHeight, setBodyHeight] = useState('100vh');

    const menus = buildMenus([], props.ctx.options.menus, locale);

    const opened = (e: {itemKey?: IDType, openKeys?: Array<IDType>, domEvent?: MouseEvent, isOpen?: boolean}) => {
        if (!e.itemKey) {
            return;
        }

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

    useEffect(()=>{
        return registerBreakpoint((s, match)=>setCollapsed(!match));
    });

    return <Layout.Sider breakpoint={['md']} onBreakpoint={triggerBreakpoint}>
        <Nav bodyStyle={{overflowY: 'scroll', height: bodyHeight}}
            items={menus}
            isCollapsed={collapsed}
            onCollapseChange={(c: boolean)=>{setCollapsed(c);}}
            onOpenChange={opened}
            openKeys={openedKeys}
            onSelect={(e: OnSelectedData)=>nav(e.itemKey as string)}
            selectedKeys={selectedKeys}
        >
            <Nav.Header className="nav-header"
                style={{borderBottom: '1px solid var(--semi-color-border)'}}
                text={props.ctx.options.name}
                logo={<img src={props.ctx.options.logo} />}
            />
            <Nav.Footer className="nav-footer" collapseButton={true} />
        </Nav>
    </Layout.Sider>;
}
