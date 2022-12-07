// SPDX-License-Identifier: MIT

import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Avatar, Typography } from '@douyinfe/semi-ui';

import { Paging, ColumnProps, Ref as PagingRef } from '@dashboard/Paging';
import { DeleteAction } from '@dashboard/Paging/actions';
import { Admin, getSexes, getStates, loadGroupsSelectOptions, Sex } from './types';
import { useLocale } from '@dashboard/locales';
import { AppContext } from '@dashboard/App/context';
import { mapToSelectOptions } from '@dashboard/utils';
import { AsyncFormSelect } from '@dashboard/AsyncSelect';
import { Actions } from '@dashboard/Actions';

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
        return <Actions>
            <DeleteAction locale={locale} url={`/admins/${record.id}`} reload={()=>paging.current?.load()} />
            <Button onClick={()=>nav(`/admins/${record.id}`)}>{locale.common.edit}</Button>
        </Actions>;
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
        {title: locale.common.actions, className: 'no-print', render: renderActions},
    ];

    const toolbar = <>
        <Button type='primary' onClick={()=>nav('/admins/0')}>{locale.common.new}</Button>
    </>;

    const queries = <>
        <Form.Input label={locale.common.search_content} field='text' />
        <Form.Select multiple label={locale.common.state} field='state' optionList={mapToSelectOptions(states)} />
        <Form.Select multiple label={locale.common.sex} field='sex' optionList={mapToSelectOptions(sexes)} />
        <AsyncFormSelect multiple label={locale.admin.group} field='group' loadOptions={async ()=>await loadGroupsSelectOptions(ctx)} />
    </>;

    return <Paging paging
        ref={paging}
        url='/admins'
        toolbar={toolbar}
        queries={queries}
        columns={columns}
    />;
}
