// SPDX-License-Identifier: MIT

import React, { useContext, useRef } from 'react';
import { Button, Form, Avatar, Typography } from '@douyinfe/semi-ui';

import { Paging, ColumnProps, Ref as PagingRef } from '@dashboard/Paging';
import { Admin, getSexes, getStates, Sex } from './types';
import { useLocale } from '@dashboard/locales';
import { ConfirmButton } from '@dashboard/ConfirmButton';
import { AppContext } from '@dashboard/App/context';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';

export function Admins() {
    const ctx = useContext(AppContext);
    const locale = useLocale();
    const sexes = getSexes(locale);
    const states = getStates(locale);
    const paging = useRef<PagingRef>(null);

    const renderActions = (key: number, record: Admin) => {
        const del = async()=>{
            const r = await ctx.del(`/admins/${record.id}`);
            if (!r.ok) {
                console.error(r.problem);
            }
            paging.current?.load();
        };
        return <>
            <ConfirmButton title={locale.common.confirm_delete_title}
                content={locale.common.confirm_delete_detail}
                onConfirm={del}
                type='danger'
            >删除</ConfirmButton>&#160;
            <Button>编辑</Button>&#160;
            <Button>权限</Button>&#160;
        </>;
    };

    const renderState = (key: string) => {
        switch (key) {
        case 'normal':
            return <Typography.Text>{states.get(key)}</Typography.Text>;
        case 'locked':
            return <Typography.Text type='warning'>{states.get(key)}</Typography.Text>;
        case 'left':
            return <Typography.Text type='warning'>{states.get(key)}</Typography.Text>;
        default:
            throw `无效的状态 ${key}`;
        }
    };

    const columns: Array<ColumnProps<Admin>> = [
        {title: '#', dataIndex: 'id'},
        {title: locale.common.avatar, dataIndex: 'avatar', render:(key: string, r: Admin)=>{
            return <Avatar src={r.avatar}>{r.name[0]}</Avatar>;
        }},
        {title: locale.common.name, dataIndex: 'name'},
        {title: locale.common.username, dataIndex: 'username'},
        {title: locale.common.nickname, dataIndex: 'nickname'},
        {title: locale.common.sex, dataIndex: 'sex', render: (key: Sex)=>{ return sexes.get(key); }},
        {title: locale.common.state, dataIndex: 'state', render: renderState},
        {title: locale.common.actions, render: renderActions},
    ];

    const toolbar = <>
        <Button type='primary'>{locale.common.new}</Button>
    </>;

    const sexesList: Array<OptionProps> = [];
    sexes.forEach((val, key)=>sexesList.push({value: key, label: val}));
    const statesList: Array<OptionProps> = [];
    states.forEach((val, key)=>statesList.push({value: key, label: val}));
    const queries = <>
        <Form.Input label={locale.common.search_content} field='text' />
        <Form.Select multiple label={locale.common.state} field='state' optionList={statesList} />
        <Form.Select multiple label={locale.common.sex} field='sex' optionList={sexesList} />
    </>;

    return <Paging paging
        ref={paging}
        url='/admins'
        toolbar={toolbar}
        queries={queries}
        columns={columns}
    />;
}

export function AdminEdit() {
    // TODO
}

export function Access() {
    // TODO
}
