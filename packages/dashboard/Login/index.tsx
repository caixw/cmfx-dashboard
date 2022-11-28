// SPDX-License-Identifier: MIT

import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import {Button, Typography, Avatar, Card, Form } from '@douyinfe/semi-ui';
import { useLocation, useNavigate } from "react-router-dom";
import { IconSetting, IconExit } from '@douyinfe/semi-icons';

import { Locale, LocaleConsumer } from '@dashboard/locales';
import { AppSetting } from '@dashboard/AppSetting';
import { AppContext, Context } from '@dashboard/App/context';
import { Token, writeToken } from '@dashboard/App/context/token';

interface Account {
    username?: string
    password?: string
}

export function Login(props: {footer?: React.ReactNode}) {
    const ctx = useContext(AppContext);
    const style: CSSProperties = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundSize: 'cover',
        backgroundImage: `url('${ctx.options.loginBG}')`
    };

    return <div style={style}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <LocaleConsumer>
                {
                    (locale:  Locale) => { return <SubmitForm locale={locale} ctx={ctx} footer={props.footer} />; }
                }
            </LocaleConsumer>
        </div>
    </div>;
}

function SubmitForm(props: {locale: Locale, ctx: Context, footer?: React.ReactNode}) {
    const [visible, setVisible] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();

    useEffect(()=>{
        props.ctx.title = props.locale.common.login;
    });

    const submit = async (value: Account) => {
        const r = await props.ctx.post('/login', value);
        if (!r.ok) {
            console.log(r.problem);
            return;
        }

        writeToken(r.body as Token);
        nav(nextPage(props.ctx.options.homePath, loc.search));
    };

    return <Card
        footer={props.footer}
        footerLine={props.footer ? true : false}
        style={{padding: '8px 20px', width: '500px'}}
        header={
            <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={props.ctx.options.logo} />
                    <Typography.Title heading={2} style={{marginLeft: '20px', display: 'inline'}}>{props.ctx.options.name}</Typography.Title>
                </span>
                <IconSetting style={{cursor: 'pointer'}} onClick={()=>setVisible(true)} />
            </span>
        }
    >
        <Form labelPosition='inset' initValues={{}} onSubmit={submit}>
            <Form.Input size='large' field='username' label={props.locale.common.username} />
            <Form.Input size='large' field='password' label={props.locale.common.password} mode='password' />
            <Button
                style={{marginTop: '20px'}}
                block
                size='large'
                type='primary'
                htmlType='submit'
                icon={<IconExit />}
                iconPosition='right'
            >{props.locale.common.login}</Button>
        </Form>
        <AppSetting visible={visible} onCancel={()=>setVisible(false)} />
    </Card>;
}

export function nextPage(preset: string, search: string): string {
    if (!search) {
        return preset;
    }

    const ps = new URLSearchParams(search);
    return ps.get('from') ?? preset;
}
