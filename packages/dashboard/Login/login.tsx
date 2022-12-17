// SPDX-License-Identifier: MIT

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, Typography, Avatar, Card, Form } from '@douyinfe/semi-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconSetting, IconExit } from '@douyinfe/semi-icons';

import { useLocale } from '@dashboard/locales';
import { rules } from '@dashboard/utils';
import { AsyncForm } from '@dashboard/AsyncForm';
import { AppSetting } from '@dashboard/AppSetting';
import { AppContext } from '@dashboard/App';
import { Token, writeToken } from '@dashboard/App/context/token';

interface Account {
    username?: string
    password?: string
}

interface Props {
    children?: ReactNode

    /**
     * 登录框父容器的 CSS 类名
     *
     * 默认采用 `login__container`，该类定义于 style.css
     */
    className?: string
}

/**
 * 登录页面组件
 */
export function Login({children = undefined, className = 'login__container'}: Props): JSX.Element {
    return <div className={className }>
        {createSubmitForm(children)}
    </div>;
}

function createSubmitForm(footer?: React.ReactNode) {
    const ctx = useContext(AppContext);
    const [visible, setVisible] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();
    const locale = useLocale();

    useEffect(()=>{
        ctx.title = locale.common.login;
    }, []);

    const submit = async (value: Account) => {
        const r = await ctx.post('/login', value);
        if (!r.ok) {
            return r.problem;
        }

        writeToken(r.body as Token);
        nav(nextPage(ctx.options.homePath, loc.search));
    };

    return <Card
        footer={footer}
        footerLine={footer ? true : false}
        style={{padding: '8px 20px', width: '500px'}}
        header={
            <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={ctx.options.logo} />
                    <Typography.Title heading={2} style={{marginLeft: '20px', display: 'inline'}}>{ctx.options.name}</Typography.Title>
                </span>
                <IconSetting style={{cursor: 'pointer'}} onClick={()=>setVisible(true)} />
            </span>
        }
    >
        <AsyncForm labelPosition='inset' initValues={{}} onSubmit={submit}>
            <Form.Input size='large' field='username' label={locale.common.username} rules={[rules.required(locale)]} />
            <Form.Input size='large' field='password' label={locale.common.password} mode='password' rules={[rules.required(locale)]} />
            <Button
                style={{marginTop: '20px'}}
                block
                size='large'
                type='primary'
                htmlType='submit'
                icon={<IconExit />}
                iconPosition='right'
            >{locale.common.login}</Button>
        </AsyncForm>
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
