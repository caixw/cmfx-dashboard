// SPDX-License-Identifier: MIT

import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Modal } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useNavigate } from 'react-router-dom';

import { AsyncTable, ColumnProps, Ref as AsyncTableRef } from '@dashboard/AsyncTable';
import { DeleteAction } from '@dashboard/AsyncTable/actions';
import { AppContext } from '@dashboard/App/context';
import { useLocale } from '@dashboard/locales';
import { Return } from '@dashboard/App/context/api';
import { Actions } from '@dashboard/Actions';

import { Group } from './types';

/**
 * 权限组列表
 */
export function Groups(): JSX.Element {
    const loc = useLocale();
    const ctx = useContext(AppContext);
    const [g, setG] = useState<Group>({ id:0, name: '', description: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const form = useRef(null);
    const table = useRef<AsyncTableRef>(null);
    const nav = useNavigate();

    const editGroup = (g: Group)=> {
        setG(g);
        setModalVisible(true);
    };

    // 编辑或添加
    const save = async() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fa = (form.current as any).formApi as FormApi;
        const val = fa.getValues();
        let r: Return;
        if (val.id) {
            r = await ctx.put(`/groups/${val.id}`, {name: val.name, description: val.description});
        } else {
            r = await ctx.post('/groups', {name: val.name, description: val.description});
        }

        if (!r.ok) {
            console.error(r.problem);
        }

        setModalVisible(false);

        table.current?.load();
    };

    const cols: Array<ColumnProps<Group>> = [
        { title: '#', dataIndex: 'id' },
        { title: loc.common.name, dataIndex: 'name' },
        { title: loc.common.description, dataIndex: 'description' },
        { title: loc.common.actions, className: 'no-print', render: (key: string, record: Group): React.ReactNode => {
            return <Actions>
                <DeleteAction locale={loc} url={`/groups/${record.id}`} reload={()=>table.current?.load()} />
                <Button onClick={()=>editGroup(record)}>{loc.common.edit}</Button>
                <Button onClick={()=>nav(`/groups/${record.id}/access`)}>{loc.admin.permission}</Button>
            </Actions>; }
        }
    ];

    const queries = <>
        <Form.Input label={loc.common.search_content} field='text' labelPosition='inset' />
    </>;

    const toolbar = <>
        <Button type='primary' onClick={()=>editGroup({id: 0, name: '', description: ''})}>{loc.common.new}</Button>
    </>;

    return <>
        <AsyncTable url='/groups'
            ref={table}
            queries={queries}
            toolbar={toolbar}
            paging={false}
            columns={cols}
        />

        <Modal title={g.id ? loc.common.edit : loc.common.new}
            visible={modalVisible}
            onCancel={()=>setModalVisible(false)}
            onOk={()=>save()}
        >
            <Form initValues={g} ref={form} allowEmpty>
                <Form.Input label={loc.common.name} field='name' />
                <Form.TextArea label={loc.common.description} field='description' />
            </Form>
        </Modal>
    </>;
}
