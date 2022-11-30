// SPDX-License-Identifier: MIT

import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Modal } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';

import { Paging, ColumnProps } from '@dashboard/Paging';
import { ConfirmButton } from '@dashboard/ConfirmButton';
import { AppContext } from '@dashboard/App/context';
import { useLocale } from '@dashboard/locales';
import { Return } from '@dashboard/App/context/api';
import { Group } from './types';

export function Groups() {
    const loc = useLocale();
    const ctx = useContext(AppContext);
    const [g, setG] = useState<Group>({ id:0 ,name: '', description: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const form = useRef(null);

    const editGroup = (g: Group)=> {
        setG(g);
        setModalVisible(true);
    };

    const save = async() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fa = (form.current as any).formApi as FormApi;
        const val = fa.getValues();
        let r: Return;
        if (val.id) {
            r = await ctx.patch(`/groups/{val.id}`, {name: val.name, description: val.description});
        } else {
            r = await ctx.post('/groups', {name: val.name, description: val.description});
        }

        if (!r.ok) {
            console.error(r.problem);
        }
    };

    const renderActions = (key: string, record: Group): React.ReactNode => {
        const delItem = async()=>{
            const r = await ctx.del(`/groups/${record.id}`);
            if (!r.ok) {
                console.error(r.problem);
                return;
            }
        };

        return <>
            <ConfirmButton type='danger'
                onConfirm={delItem}
                title={loc.common.confirm_delete_title}
                content={loc.common.confirm_delete_detail}
            >{loc.common.delete}</ConfirmButton>
            <Button onClick={()=>editGroup(record)}>{loc.common.edit}</Button>
        </>;
    };

    const cols: Array<ColumnProps<Group>> = [
        { title: '#', dataIndex: 'id' },
        { title: loc.common.name, dataIndex: 'name' },
        { title: loc.common.description, dataIndex: 'description' },
        { title: loc.common.actions, className: 'no-print', render: renderActions },
    ];

    const queries = <>
        <Form.Input label={loc.common.search_content} field='text' labelPosition='inset' />
    </>;

    const toolbar = <>
        <Button type='primary' onClick={()=>editGroup({id: 0, name: '0', description: '0'})}>{loc.common.new}</Button>
    </>;

    return <>
        <Paging url='/groups'
            queries={queries}
            toolbar={toolbar}
            paging={false}
            columns={cols} />;

        <Modal title={g.id ? loc.common.edit : loc.common.new}
            visible={modalVisible}
            onCancel={()=>setModalVisible(false)}
            onOk={()=>save()}
        >
            <Form initValues={g} ref={form}>
                <Form.Input label={loc.common.name} field='name' />
                <Form.Input label={loc.common.description} field='description' />
            </Form>
        </Modal>
    </>;
}
