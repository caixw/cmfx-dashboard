// SPDX-License-Identifier: MIT

import React from "react";
import { Paging } from "@dashboard/Paging";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";

import { useLocale } from "@dashboard/locales";

export interface Props {
    url: string
}

interface Log {
    id: number;
    ua: string;
    ip: string;
    created: string;
    content: string;
}

/**
 * 安全日志页面组件
 */
export function SecurityLog(props: Props): JSX.Element {
    const l = useLocale();
    const columns: Array<ColumnProps<Log>> = [
        {dataIndex: 'id', title: '#'},
        {dataIndex: 'ua', title: l.common.ua},
        {dataIndex: 'ip', title: l.common.ip},
        {dataIndex: 'created', title: l.common.created_time},
        {dataIndex: 'content', title: l.common.content},
    ];

    return <Paging url={props.url} columns={columns} paging={true} />;
}
