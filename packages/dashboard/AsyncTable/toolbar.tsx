// SPDX-License-Identifier: MIT

import React from 'react';
import {
    IconPrint, IconRefresh, IconLineHeight, IconAlignJustify, IconAlignLeft, IconAlignRight, IconAlignCenter
} from '@douyinfe/semi-icons';
import { ColumnProps, Size } from '@douyinfe/semi-ui/lib/es/table';
import { Button, ButtonGroup, Dropdown, Popover, Tooltip } from '@douyinfe/semi-ui';
import { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';

import { ObjectType } from '@dashboard/utils';
import { useLocale } from '@dashboard/locales';

interface Props<T extends ObjectType> {
    reload: ()=> void
    print: ()=> void

    setLineHeight: (size: Size)=> void
    lineHeight: Size

    stripeNumber: number
    setStrip: (n: number)=> void

    columns: Array<ColumnProps<T>>
    setColumns:(cols: Array<ColumnProps<T>>)=> void

    toggleSticky: ()=>void
    sticky: boolean
}

export function Toolbar<T extends ObjectType>(props: Props<T>): JSX.Element {
    const l = useLocale();
    const [count, refresh] = React.useState(0);
    const cols: Array<ColumnProps<T>> = Object.assign([], props.columns);
    const setCols = ()=> {
        props.setColumns(cols);
        refresh(count+1);
    };

    const setFixed = (v: ColumnProps<T>, fixed?: 'left'|'right')=>{
        v.fixed = fixed;
        setCols();
    };

    const setAlign = (v: ColumnProps<T>, align: 'left'|'right'|'center')=>{
        v.align = align;
        setCols();
    };

    const menu: Array<DropDownMenuItem> = [
        {node: 'item', active: props.sticky, name: l.paging.sticky_header, onClick:()=>props.toggleSticky()},
        {node: 'divider'},
        {node: 'title', name: l.paging.striped},
        {node: 'item', active: props.stripeNumber === 0, name: l.paging.striped_none, onClick:()=>props.setStrip(0)},
        {node: 'item', active: props.stripeNumber === 2, name: l.paging.striped_2, onClick:()=>props.setStrip(2)},
        {node: 'item', active: props.stripeNumber === 3, name: l.paging.striped_3, onClick:()=>props.setStrip(3)},
        {node: 'divider'},
        {node: 'title', name: l.paging.line_height},
        {node: 'item', active: props.lineHeight === 'default', name: l.paging.default_size, onClick:()=>props.setLineHeight('default')},
        {node: 'item', active: props.lineHeight === 'middle', name: l.paging.middle_size, onClick:()=>props.setLineHeight('middle')},
        {node: 'item', active: props.lineHeight === 'small', name: l.paging.small_size, onClick:()=>props.setLineHeight('small')},
    ];

    const popItems = cols.map((v, index)=>
        <div key={index} style={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <div style={{marginRight: 'auto', marginLeft: '5px'}}>
                { (typeof(v.title) === 'function') ? v.title() : v.title }
            </div>
            <ButtonGroup style={{marginLeft: '20px'}}>
                <Tooltip content={l.paging.fixed_left}>
                    <Button onClick={()=>setFixed(v, 'left')} theme={v.fixed===true || v.fixed==='left' ? 'solid':'light'} icon={<IconAlignLeft />} />
                </Tooltip>
                <Tooltip content={l.paging.fixed_none}>
                    <Button onClick={()=>setFixed(v, undefined)} theme={!v.fixed ? 'solid':'light'} icon={<IconAlignJustify />} />
                </Tooltip>
                <Tooltip content={l.paging.fixed_right}>
                    <Button onClick={()=>setFixed(v, 'right')} theme={v.fixed==='right' ? 'solid':'light'} icon={<IconAlignRight />} />
                </Tooltip>
            </ButtonGroup>

            <ButtonGroup style={{marginLeft: '20px'}}>
                <Tooltip content={l.paging.align_left}>
                    <Button onClick={()=>setAlign(v, 'left')} theme={v.align===undefined || v.align==='left' ? 'solid':'light'} icon={<IconAlignLeft />} />
                </Tooltip>
                <Tooltip content={l.paging.align_center}>
                    <Button onClick={()=>setAlign(v, 'center')} theme={v.align==='center' ? 'solid':'light'} icon={<IconAlignCenter />} />
                </Tooltip>
                <Tooltip content={l.paging.align_right}>
                    <Button onClick={()=>setAlign(v, 'right')} theme={v.align==='right' ? 'solid':'light'} icon={<IconAlignRight />} />
                </Tooltip>
            </ButtonGroup>
        </div>
    );

    const popPanel = <div style={{display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px'}}>
        {popItems}
    </div>;

    return <>
        <Tooltip content={l.common.refresh}>
            <Button type="tertiary" theme="borderless" onClick={props.reload} icon={<IconRefresh />} />
        </Tooltip>

        <Tooltip content={l.common.print}>
            <Button type="tertiary" theme="borderless" onClick={props.print} icon={<IconPrint />} />
        </Tooltip>

        <Popover trigger='click' content={popPanel}>
            <div style={{display: 'inline-block'}}>
                <Tooltip content={l.paging.column_setting}>
                    <Button type="tertiary" theme="borderless" icon={<IconAlignJustify rotate={90} />} />
                </Tooltip>
            </div>
        </Popover>

        <Dropdown showTick menu={menu} trigger='click'>
            <div style={{display: 'inline-block'}}>
                <Tooltip content={l.paging.row_setting}>
                    <Button type="tertiary" theme="borderless" icon={<IconLineHeight />} />
                </Tooltip>
            </div>
        </Dropdown>
    </>;
}
