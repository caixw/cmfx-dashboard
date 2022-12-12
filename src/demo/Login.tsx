// SPDX-License-Identifier: MIT

import { Login } from "cmfx-dashboard";
import { Button, ButtonGroup } from "@douyinfe/semi-ui";
import React from "react";

import './login.css';

export function LoginDemo(): JSX.Element {
    const [css, setCss] = React.useState<string|undefined>('login__container');

    return <Login className={css}>
        <p>样式：</p>
        <ButtonGroup>
            <Button onClick={()=>setCss('login__container--left')}>左-带背景</Button>
            <Button onClick={()=>setCss(undefined)}>中</Button>
            <Button onClick={()=>setCss('login__container--right')}>右</Button>
        </ButtonGroup>
    </Login>;
}
