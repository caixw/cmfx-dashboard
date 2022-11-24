// SPDX-License-Identifier: MIT

import React, { useState, useContext, useEffect } from "react";
import { Nav, Layout as SLayout, Button, Breadcrumb, Dropdown } from '@douyinfe/semi-ui';
import { IconSetting, IconMaximize, IconMinimize, IconUserCircle } from "@douyinfe/semi-icons";
import { Outlet, useNavigate } from 'react-router-dom';
import { OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import { Route } from "@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation";

import { AppSetting } from "@dashboard/AppSetting";
import { AppContext, Context } from "./context";
import { Locale, LocaleConsumer } from "@dashboard/locales";
import { buildMenus, buildUserMenus, AdditionalMenuItem, UserDropdownMenuItem } from "./options/menu";

export function Layout() {
    const [visible, setVisible] = useState(false);
    const [routes, setRoutes] = useState<Array<Route>>([]);
    const [collapsed, setCollapsed] = useState(false);
    const nav = useNavigate();
    const ctx = useContext(AppContext);

    const collapseChange = (screen: string, broken: boolean) => {
        setCollapsed(!broken);
    };

    const clickUserMenuItem = (data: UserDropdownMenuItem) => {
        if ('name' in data) {
            ctx.title = data.name as string;
        }
        setRoutes(data.breadcrumb as Array<Route>);
        nav(data.itemKey as string);
    };

    return <>
        <SLayout hasSider style={{height:'100vh', overflowY:'hidden'}}>
            <SLayout.Sider breakpoint={['md']} onBreakpoint={collapseChange}>
                <Aside ctx={ctx} setRoutes={setRoutes} collapsed={collapsed} setCollapsed={setCollapsed} />
            </SLayout.Sider>

            <SLayout>
                <SLayout.Header style={{background: 'var(--semi-color-bg-1)', position: 'sticky', top: 0}}>
                    <Nav mode='horizontal'>
                        <Breadcrumb routes={routes} compact={false} />
                        <Nav.Footer>
                            <>
                                <Fullscreen />
                                <Button theme="borderless" icon={<IconSetting />} onClick={()=>setVisible(true)} />
                                <LocaleConsumer>
                                    {
                                        (l: Locale) => {
                                            const menus = buildUserMenus([], clickUserMenuItem, ctx.options.userMenus, l);
                                            return <Dropdown menu={menus}>
                                                <Button theme="borderless" icon={<IconUserCircle />}>bbbbbbb</Button>
                                            </Dropdown>;
                                        }
                                    }
                                </LocaleConsumer>
                            </>
                        </Nav.Footer>
                    </Nav>
                </SLayout.Header>

                <SLayout.Content style={{overflow: 'scroll'}}>
                    <Outlet />
                </SLayout.Content>
            </SLayout>
        </SLayout>
        <AppSetting visible={visible} onCancel={()=>setVisible(false)} />
    </>;
}

type RoutesSetter = React.Dispatch<React.SetStateAction<Array<Route>>>;
type CollapsedSetter = React.Dispatch<React.SetStateAction<boolean>>;

function Aside(props:{ctx: Context, setRoutes:RoutesSetter, collapsed: boolean, setCollapsed: CollapsedSetter}) {
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [openedKeys, setOpenedKeys] = useState<Array<React.ReactText>>([]);
    const [bodyHeight, setBodyHeight] = useState('100vh');
    const nav = useNavigate();

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

    const selected = (e: OnSelectedData) => {
        const item = e.selectedItems[0];
        const key = e.itemKey as string;

        setSelectedKeys([key]);
        props.setRoutes((item as AdditionalMenuItem).breadcrumb as Array<Route>);
        props.ctx.title = item.text as string;
        nav(key);
    };

    useEffect(()=>{
        const hh = document.getElementsByClassName('nav-header')[0].clientHeight;
        const fh = document.getElementsByClassName('nav-footer')[0].clientHeight;
        setBodyHeight(`calc(100vh - ${hh}px - ${fh}px)`);
    });

    return <LocaleConsumer>
        {
            (l: Locale) => {
                const menus = buildMenus([], props.ctx.options.menus, l);
                return <Nav
                    bodyStyle={{overflowY: 'scroll', height: bodyHeight}}
                    items={menus}
                    isCollapsed={props.collapsed}
                    onCollapseChange={(c: boolean)=>{props.setCollapsed(c);}}
                    onOpenChange={opened}
                    openKeys={openedKeys}
                    onSelect={selected}
                    selectedKeys={selectedKeys}
                >
                    <Nav.Header
                        className="nav-header"
                        style={{borderBottom: '1px solid var(--semi-color-border)'}}
                        text={props.ctx.options.name}
                        logo={<img src={props.ctx.options.logo} />}
                    />
                    <Nav.Footer className="nav-footer" collapseButton={true} />
                </Nav>;
            }
        }
    </LocaleConsumer>;
}

export function Fullscreen() {
    const [fullscreen, setFullscreen] = useState(document.fullscreenElement ? true : false);

    const change = ()=>{
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
        setFullscreen(!fullscreen);
    };

    return <Button role='button' onClick={change} theme="borderless" icon={fullscreen ? <IconMinimize /> : <IconMaximize />} />;
}
