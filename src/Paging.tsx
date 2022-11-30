// SPDX-License-Identifier: MIT

import React from "react";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { Form } from "@douyinfe/semi-ui";

import { Paging as P, LocaleConsumer } from "cmfx-dashboard";
import { PagingDataType } from "./mock";

export function PagingDemo() {
    return <div style={{padding: '8px'}}>
        <LocaleConsumer>
            {
                (l)=>{
                    const columns: Array<ColumnProps<PagingDataType>> = [
                        {title: '#', dataIndex: 'id'},
                        {title: 'NO', dataIndex: 'no'},
                        {title: '名称', dataIndex: 'name'},
                        {title: l.common.username, dataIndex: 'username'},
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

                    return <P
                        queries={<Form.Input field="age" width={200} />}
                        url='/paging'
                        paging={true}
                        columns={columns} />;
                }
            }
        </LocaleConsumer>
    </div>;
}
