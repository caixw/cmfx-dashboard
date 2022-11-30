// SPDX-License-Identifier: MIT

import React from "react";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { Form } from "@douyinfe/semi-ui";

import { Paging, useLocale } from "cmfx-dashboard";
import { PagingDataType } from "./mock";

export function PagingDemo() {
    const loc = useLocale();

    const columns: Array<ColumnProps<PagingDataType>> = [
        {title: '#', dataIndex: 'id'},
        {title: 'NO', dataIndex: 'no'},
        {title: '名称', dataIndex: 'name'},
        {title: loc.common.username, dataIndex: 'username'},
        {title: '性别', dataIndex: 'sex', render(text: string){
            switch (text) {
            case 'male':
                return '男';
            case 'female':
                return '女';
            default:
                return '未知';
            }
        }},
    ];

    return <div style={{padding: '8px'}}>
        return <Paging url='/paging'
            queries={<Form.Input field="age" width={200} />}
            paging={true}
            columns={columns} />;
    </div>;
}
