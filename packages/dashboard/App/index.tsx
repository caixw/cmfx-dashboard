// SPDX-License-Identifier: MIT

import React, { useState } from "react";
import { ConfigProvider } from '@douyinfe/semi-ui';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';

import { init } from "@dashboard/AppSetting";
import { getLocaleCode, getLocale } from "@dashboard/locales";
import { Context, AppContext, ContextOptions } from "./context";
import { buildOptions, Options } from './options';

function Wrapper(props: {options: Required<ContextOptions>}) {
    const [locale, setLocale] = useState(getLocale(getLocaleCode()));

    const ctx = new Context(props.options, (code: string)=>{
        setLocale(getLocale(code));
    });

    init();

    return <AppContext.Provider value={ctx}>
        <ConfigProvider locale={locale}>
            <Outlet />
        </ConfigProvider>
    </AppContext.Provider>;
}

export function App(props: {options: Options}) {
    const o = buildOptions(props.options);
    const routes = [
        {
            path: '/',
            element: <Wrapper options={o} />,
            children: o.routes
        }
    ];
    const router = createHashRouter(routes);
    return <RouterProvider router={router} />;
}
