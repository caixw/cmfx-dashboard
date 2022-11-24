// SPDX-License-Identifier: MIT

import React, { useContext, useEffect, useState } from 'react';
import {Button, Card, Row, Col, Form, Divider } from '@douyinfe/semi-ui';
import { useLocation, useNavigate } from "react-router-dom";
import { IconSetting, IconDownloadStroked, IconRedoStroked } from '@douyinfe/semi-icons';

import { Locale, LocaleConsumer } from '@dashboard/locales';
import { AppSetting } from '@dashboard/AppSetting';
import { AppContext } from '@dashboard/App/context';
import { Token, writeToken } from '@dashboard/App/context/token';

interface Account {
    username?: string
    password?: string
}

export function Login() {
    return <Row align='middle' justify='center' type='flex' style={{marginTop: '100px'}}>
        <Col xxl={8} xl={10} lg={12} sm={16} xs={24}>
            <LocaleConsumer>
                {
                    (locale:  Locale) => { return <SubmitForm locale={locale} />; }
                }
            </LocaleConsumer>
        </Col>
    </Row>;
}

function SubmitForm(props: {locale: Locale}) {
    const [visible, setVisible] = useState(false);
    const ctx = useContext(AppContext);
    const nav = useNavigate();
    const loc = useLocation();

    useEffect(()=>{
        ctx.title = props.locale.common.login;
    });

    const submit = async (value: Account) => {
        const r = await ctx.post('/login', value);
        if (!r.ok) {
            console.log(r.problem);
            return;
        }

        writeToken(r.body as Token);
        nav(nextPage(ctx.options.homePath, loc.search));
    };

    return <Card title={props.locale.common.login}
        headerExtraContent={<IconSetting onClick={()=>setVisible(true)} style={{cursor: 'pointer'}} />}>
        <Form labelPosition='inset' initValues={{}} onSubmit={submit}>
            <Form.Input field='username' label={props.locale.common.username} />
            <Form.Input field='password' label={props.locale.common.password} mode='password' />
            <Divider margin={15} />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type='tertiary' htmlType='reset' icon={<IconRedoStroked />}>{props.locale.common.reset}</Button>
                <Button
                    type='primary'
                    htmlType='submit'
                    icon={<IconDownloadStroked rotate={270} />}
                    iconPosition='right'
                >{props.locale.common.login}</Button>
            </div>
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
