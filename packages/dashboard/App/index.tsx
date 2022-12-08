// SPDX-License-Identifier: MIT

import React, { useState } from "react";
import { ConfigProvider } from '@douyinfe/semi-ui';
import { createHashRouter, RouterProvider, Outlet, RouteObject } from 'react-router-dom';

import { init } from "@dashboard/AppSetting";
import { getLocaleCode, getLocale } from "@dashboard/locales";

import { Context, AppContext, ContextOptions } from "./context";
import { buildOptions, Options } from './options';
import { ErrorBoundary } from './errors';

function Wrapper(props: {options: Required<ContextOptions>}) {
    const [locale, setLocale] = useState(getLocale(getLocaleCode()));

    const ctx = new Context(props.options, (code: string)=>{
        setLocale(getLocale(code));
    });

    init();

    return <ConfigProvider locale={locale}>
        <AppContext.Provider value={ctx}>
            <Outlet />
        </AppContext.Provider>
    </ConfigProvider>;
}

/**
 * 最外层的组件
 * @param props 包含了以下属性：
 *  - options 用户提供的配置项
 */
export function App(props: {options: Options}): JSX.Element {
    const o = buildOptions(props.options);
    const routes = [
        {
            path: '/',
            element: <Wrapper options={o} />,
            children: o.routes
        }
    ];
    buildRoutes(routes);
    const router = createHashRouter(routes);
    return <RouterProvider router={router} />;
}

function buildRoutes(routes: Array<RouteObject>) {
    routes.forEach((r)=>{
        if (r.errorElement) {
            return;
        }
        r.errorElement = <ErrorBoundary />;
        if (r.children && r.children.length > 0) {
            buildRoutes(r.children);
        }
    });
}
