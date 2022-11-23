// SPDX-License-Identifier: MIT

import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "@dashboard/App/context";
import { delToken } from "@dashboard/App/context/token";
import { Locale, LocaleConsumer } from "@dashboard/locales";

export function LogoutAction(props: {locale: Locale}) {
    const ctx = useContext(AppContext);
    const nav = useNavigate();

    useEffect(()=>{
        ctx.title = props.locale.common.login;

        ctx.del('/login').catch((reason)=>{console.error(reason);});

        delToken();
        nav(ctx.options.loginPath);
    });
    return <></>;
}

export function Logout() {
    return <LocaleConsumer>
        {
            (locale) => LogoutAction({locale})
        }
    </LocaleConsumer>;
}
