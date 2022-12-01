// SPDX-License-Identifier: MIT

import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { RowSelectionProps } from "@douyinfe/semi-ui/lib/es/table";
import { Button, Form, Divider, Table } from "@douyinfe/semi-ui";
import { useReactToPrint } from 'react-to-print';
import { useLocation } from "react-router-dom";

import { AppContext } from "@dashboard/App/context";
import { LocaleConsumer } from "@dashboard/locales";
import { Locale } from "@dashboard/locales";
import { Page, encodeQuery, parseQuery } from "./types";
import { Toolbar } from "./toolbar";

const defaultPage = 1; // 默认页码

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordType = Record<string, any>;

export type { ColumnProps };

export type LineHeight = 'default'|'middle'|'small';

export interface Props<T extends RecordType> {
    url: string // 表格数据请求的地址
    columns: Array<ColumnProps<T>>
    rowKey?: string // 每一行的唯一字段的字段名
    paging: boolean // 是否分页

    queries?: React.ReactNode // 查询参数的组件，字段名不能是 page 和 size。
    toolbar?: React.ReactNode // 自定义工具栏内容

    rowSelection?: RowSelectionProps<T>
}

export interface Ref {
    load: ()=>Promise<void>
}

export const Paging = React.forwardRef(PagingInner) as <T extends RecordType>(
    props: Props<T> & { ref?: React.ForwardedRef<Ref> }
) => ReturnType<typeof PagingInner>;

// 分页表格
// T 表示数据类型
function PagingInner<T extends RecordType>(props: Props<T>, ref: React.ForwardedRef<Ref>) {
    const ctx = useContext(AppContext);
    const loc = useLocation();

    useImperativeHandle(ref, ()=>{
        return {
            load: load
        };
    });

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Array<T>>([]);
    const [page, setPage] = useState(defaultPage);
    const [size, setSize] = useState(ctx.options.pageSizes[0]);
    const [total, setTotal] = useState(0);
    const [lineHeight, setLineHeight] = useState<LineHeight>('default');
    const [manualCount, setManualCount] = useState(0); // 手动加载的次数，用于刷新数据
    const [strip, setStrip] = useState(0);
    const [columns, setColumns] = useState(props.columns);
    const printable = useRef(null);
    const queryForm = useRef(null);

    // 加载远程数据
    const load = async()=>{
        setLoading(true);

        let url = props.url+'?';
        if (props.paging) {
            url += `page=${page-1}&size=${size}`;
        }
        if (props.queries) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const vals = (queryForm.current as any).formApi.getValues();
            url += encodeQuery(vals);
        }

        const r = await ctx.get(url);
        if (!r.ok) {
            setLoading(false);
            console.error(r.problem);
            return;
        }

        if (props.paging){
            let body: Page<T> = {count:0, current: []};
            if (r.status !== 404) {
                body = r.body as Page<T>;
            }
            setData(body.current);
            setTotal(body.count);
        } else {
            if (r.status === 404) {
                setData([]);
            } else {
                setData(r.body as Array<T>);
            }
        }

        setLoading(false);
    };

    useEffect(()=>{
        const q = parseQuery(loc.search, defaultPage, ctx.options.pageSizes[0]);
        if (props.queries) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (queryForm.current as any).formApi.setValues(q.q);
        }

        if (props.paging) {
            setSize(q.size);
            setPage(q.page);
        }
    }, []);

    useEffect(()=>{
        load();
    }, [page, size, manualCount]);

    // 生成查询组件
    let search: React.ReactNode = null;
    if (props.queries) {
        search = <>
            <Form
                ref={queryForm}
                style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '10px'}}
                layout='horizontal'
                labelPosition='inset'
            >
                {props.queries}
                <LocaleConsumer>
                    {
                        (l: Locale) => {
                            return <Button onClick={()=>setManualCount(manualCount+1)} style={{marginLeft: 'auto'}}>{l.common.search}</Button>;
                        }
                    }
                </LocaleConsumer>
            </Form>
            <Divider style={{marginTop: '10px', marginBottom: '10px'}} />
        </>;
    }

    return <div>
        {search}

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>{props.toolbar}</div>
            <div>
                <Toolbar
                    columns={props.columns}
                    setColumns={setColumns}
                    reload={()=>setManualCount(manualCount+1)}
                    stripeNumber={strip}
                    setStrip={(n: number)=>{setStrip(n);}}
                    lineHeight={lineHeight}
                    setLineHeight={(s: LineHeight)=>setLineHeight((s))}
                    print={useReactToPrint({content:()=>printable.current, documentTitle: ctx.title})} />
            </div>
        </div>
        <Divider style={{marginTop: '5px'}} />

        <Table
            ref={printable}
            size={lineHeight}
            onRow={(r, i)=>{
                i = (i ?? 0) + 1;
                if (!strip || i%strip !== 0) { return {}; }
                return {style:{background: 'var(--semi-color-fill-0)'}};
            }}
            rowSelection={props.rowSelection}
            columns={columns}
            rowKey={props.rowKey}
            loading={loading}
            dataSource={data}
            pagination={props.paging ? {
                pageSizeOpts: ctx.options.pageSizes,
                currentPage: page,
                pageSize: size,
                total: total,
                showSizeChanger: true,
                onChange: (p, s) => {
                    setPage(p);
                    setSize(s);
                },
            } : false }
        />
    </div>;
}
