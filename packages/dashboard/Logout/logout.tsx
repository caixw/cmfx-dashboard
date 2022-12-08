// SPDX-License-Identifier: MIT

import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '@dashboard/App';
import { delToken } from '@dashboard/App/context/token';
import { useLocale } from '@dashboard/locales';

/**
 * 注销登录的组件
 */
export function Logout(): JSX.Element {
    const locale = useLocale();
    const ctx = useContext(AppContext);
    const nav = useNavigate();

    useEffect(()=>{
        ctx.title = locale.common.logout;

        ctx.del('/login').catch((reason)=>{console.error(reason);});

        delToken();
        nav(ctx.options.loginPath);
    });
    return <></>;
}
