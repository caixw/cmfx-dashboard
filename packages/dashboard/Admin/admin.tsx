// SPDX-License-Identifier: MIT

import React, { useContext, useRef } from 'react';
import { useNavigate, RouteObject } from 'react-router-dom';
import { Button, Form, Avatar, Typography, Tooltip } from '@douyinfe/semi-ui';
import { IconShield } from '@douyinfe/semi-icons';
import { TypographyBaseType } from '@douyinfe/semi-ui/lib/es/typography';

import { AsyncTable, ColumnProps, AsyncTableRef, DeleteAction } from '@dashboard/AsyncTable';
import { useLocale } from '@dashboard/locales';
import { AppContext } from '@dashboard/App';
import { mapToSelectOptions } from '@dashboard/utils';
import { AsyncFormSelect } from '@dashboard/AsyncSelect';
import { Actions } from '@dashboard/Actions';

import { Admin, getSexes, getStates, loadGroupsSelectOptions, Sex } from './types';
import { Edit } from './edit';

/**
 * 返回一组与管理员操作相关的路由设定
 * @param path 该系列路由的根路径
 */
export function AdminRoutes(path: string): Array<RouteObject> {
    return [
        {
            path: path,
            element: <Admins />,
        },
        {
            path: path+'/:id',
            element: <Edit />,
        }
    ];
}

/**
 * 管理员列表页组件
 */
function Admins(): JSX.Element {
    const ctx = useContext(AppContext);
    const locale = useLocale();
    const sexes = getSexes(locale);
    const states = getStates(locale);
    const table = useRef<AsyncTableRef>(null);
    const nav = useNavigate();

    const renderActions = (key: number, record: Admin) => {
        return <Actions>
            <DeleteAction locale={locale} url={`/admins/${record.id}`} reload={()=>table.current?.load()} />
            <Button onClick={()=>nav(`/admins/${record.id}`)}>{locale.common.edit}</Button>
        </Actions>;
    };

    const renderState = (key: string, record: Admin) => {
        let type:TypographyBaseType|undefined = undefined;
        switch (key) {
        case 'normal':
            break;
        case 'locked':
        case 'left':
            type = 'warning';
            break;
        default:
            throw `无效的状态 ${key}`;
        }

        if (!record.super) {
            return <Typography.Text type={type}>{states.get(key)}</Typography.Text>;
        }
        return <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography.Text type={type}>{states.get(key)}</Typography.Text>&#160;
            <Tooltip content={locale.admin.super_tooltip}><IconShield /></Tooltip>
        </div>;
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

    return <AsyncTable paging
        ref={table}
        url='/admins'
        toolbar={toolbar}
        queries={queries}
        columns={columns}
    />;
}
