// SPDX-License-Identifier: MIT

import React, { useState, useContext, useEffect } from "react";
import { Nav, Layout as SLayout, Button, Breadcrumb, Dropdown, BackTop } from '@douyinfe/semi-ui';
import { IconSetting, IconMaximize, IconMinimize, IconUserCircle } from "@douyinfe/semi-icons";
import { Outlet, useNavigate } from 'react-router-dom';
import { Route } from "@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation";

import { AppSetting } from "@dashboard/AppSetting";
import { Locale, LocaleConsumer } from "@dashboard/locales";

import { AppContext } from "./context";
import { buildUserMenus, UserDropdownMenuItem } from "./options/menu";
import { Admin, getInfo } from './admin';
import { Aside } from "./aside";

/**
 * 已登录页面的布局样式
 *
 * NOTE: 所有已登录的页面都应该在注册在此页面之下。
 */
export function Layout(): JSX.Element {
    const [visible, setVisible] = useState(false);
    const [routes, setRoutes] = useState<Array<Route>>([]);
    const [info, setInfo] = useState<Partial<Admin>>({});
    const nav = useNavigate();
    const ctx = useContext(AppContext);

    const clickUserMenuItem = (data: UserDropdownMenuItem) => {
        if ('name' in data) {
            ctx.title = data.name as string;
        }
        setRoutes(data.breadcrumb as Array<Route>);
        nav(data.itemKey as string);
    };

    useEffect(()=>{
        getInfo(ctx).then((i)=>{setInfo(i);});
    }, []);

    return <>
        <SLayout hasSider style={{height:'100vh', overflowY:'hidden'}}>
            <Aside ctx={ctx} setRoutes={setRoutes} />

            <SLayout>
                <SLayout.Header style={{background: 'var(--semi-color-bg-1)', position: 'sticky', top: 0}}>
                    <Nav mode='horizontal'>
                        <Breadcrumb routes={routes} compact={false} />
                        <Nav.Footer>
                            <>
                                <Fullscreen />
                                <Button theme="borderless" style={{borderRadius: '100%'}}
                                    icon={<IconSetting size='large' />} onClick={()=>setVisible(true)}
                                />
                                <LocaleConsumer>
                                    {
                                        (l: Locale) => {
                                            const menus = buildUserMenus([], clickUserMenuItem, ctx.options.userMenus, l);
                                            return <Dropdown menu={menus}>
                                                <Button theme="borderless" style={{borderRadius: '16px'}}
                                                    icon={<IconUserCircle size='large' />}
                                                >{info.name}</Button>
                                            </Dropdown>;
                                        }
                                    }
                                </LocaleConsumer>
                            </>
                        </Nav.Footer>
                    </Nav>
                </SLayout.Header>

                <SLayout.Content style={{overflowY: 'scroll'}}>
                    <div style={{padding: '16px'}} id='__main'>
                        <Outlet />
                    </div>

                    <BackTop className="no-print"
                        style={{borderRadius: '100%', right: '20px', bottom: '20px'}}
                        target={()=>document.getElementById('__main')?.parentElement}
                    />
                </SLayout.Content>
            </SLayout>
        </SLayout>
        <AppSetting visible={visible} onCancel={()=>setVisible(false)} />
    </>;
}

export function Fullscreen(): JSX.Element {
    const [fullscreen, setFullscreen] = useState(document.fullscreenElement ? true : false);

    const change = ()=>{
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
        setFullscreen(!fullscreen);
    };

    return <Button role='button' onClick={change} theme="borderless" style={{borderRadius: '100%'}}
        icon={fullscreen ? <IconMinimize size='large' /> : <IconMaximize size='large' />} />;
}
