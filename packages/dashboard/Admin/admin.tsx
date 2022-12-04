// SPDX-License-Identifier: MIT

import React, { useContext, useRef } from 'react';
import { Button, Form, Avatar, Typography } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

import { Paging, ColumnProps, Ref as PagingRef } from '@dashboard/Paging';
import { Admin, getSexes, getStates, Sex } from './types';
import { useLocale } from '@dashboard/locales';
import { ConfirmButton } from '@dashboard/ConfirmButton';
import { AppContext } from '@dashboard/App/context';
import { mapToSelectOptions } from '@dashboard/utils';

/**
 * 管理员列表页组件
 */
export function Admins(): JSX.Element {
    const ctx = useContext(AppContext);
    const locale = useLocale();
    const sexes = getSexes(locale);
    const states = getStates(locale);
    const paging = useRef<PagingRef>(null);
    const nav = useNavigate();

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
            >{locale.common.delete}</ConfirmButton>&#160;
            <Button onClick={()=>nav(`/admins/${record.id}`)}>{locale.common.edit}</Button>&#160;
            <Button onClick={()=>nav(`/admins/${record.id}/access`)}>{locale.admin.permission}</Button>&#160;
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
        <Button type='primary' onClick={()=>nav('/admins/0')}>{locale.common.new}</Button>
    </>;

    const queries = <>
        <Form.Input label={locale.common.search_content} field='text' />
        <Form.Select multiple label={locale.common.state} field='state' optionList={mapToSelectOptions(states)} />
        <Form.Select multiple label={locale.common.sex} field='sex' optionList={mapToSelectOptions(sexes)} />
    </>;

    return <Paging paging
        ref={paging}
        url='/admins'
        toolbar={toolbar}
        queries={queries}
        columns={columns}
    />;
}
