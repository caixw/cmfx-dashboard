// SPDX-License-Identifier: MIT

import React from "react";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";

import { Paging } from "cmfx-dashboard";
import { PagingDataType } from "./mock";
import { Button } from "@douyinfe/semi-ui";

export function Table() {
    const columns: Array<ColumnProps<PagingDataType>> = [
        {title: '#', dataIndex: 'id'},
        {title: 'NO', dataIndex: 'no'},
        {title: '名称', dataIndex: 'name'},
        {title: '账号', dataIndex: 'username'},
        {title: '性别(不打印)', className: 'no-print', dataIndex: 'sex', render(text: string){
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
        <Paging
            url='/table'
            paging={false}
            columns={columns}
            toolbar={<><Button>新建</Button>&#160;&#160;<Button type="tertiary">删除</Button></>}
        />
    </div>;
}
