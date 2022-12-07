// SPDX-License-Identifier: MIT

import React from "react";
import { Button, Divider, Dropdown, Toast } from "@douyinfe/semi-ui";
import { IconAlarm } from "@douyinfe/semi-icons";

import { ConfirmButton, AsyncButton, Actions } from 'cmfx-dashboard';

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export function ButtonsDemo() {
    return <div style={{padding: '10px'}}>
        <Divider>AsyncButton</Divider>
        <br />
        <AsyncButton icon={<IconAlarm />} onClick={async()=>{await sleep(1000);}}>左图标 loading</AsyncButton>
        &#160;&#160;&#160;
        <AsyncButton iconPosition="right" icon={<IconAlarm />} onClick={async()=>{await sleep(1000);}}>右图标 loading</AsyncButton>
        &#160;&#160;&#160;
        <AsyncButton onClick={async()=>{await sleep(1000);}}>无图标 loading</AsyncButton>

        <br />
        <br />
        <Divider>ConfirmButton</Divider>
        <br />
        <ConfirmButton title="title" content="abc">默认</ConfirmButton>
        &#160;&#160;&#160;
        <ConfirmButton title="title" content="abc" onConfirm={()=>{Toast.info('回调');}}>回调</ConfirmButton>
        &#160;&#160;&#160;
        <ConfirmButton title="title" content="abc" icon={<IconAlarm />} onConfirm={async()=>{await sleep(1000);}}>左图标 loading</ConfirmButton>
        &#160;&#160;&#160;
        <ConfirmButton title="title" content="abc" iconPosition="right" icon={<IconAlarm />} onConfirm={async()=>{await sleep(1000);}}>右图标 loading</ConfirmButton>
        &#160;&#160;&#160;
        <ConfirmButton title="title" content="abc" onConfirm={async()=>{await sleep(1000);}}>无图标 loading</ConfirmButton>

        <br />
        <br />
        <Divider>Actions</Divider>
        <br />
        <Actions>
            <Button>b1</Button>
            <Button>b2</Button>
        </Actions>

        &#160;&#160;&#160;
        <Actions more={
            <Dropdown.Menu>
                <Dropdown.Item>more1</Dropdown.Item>
                <Dropdown.Item>more2</Dropdown.Item>
                <Dropdown.Item>more3</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>more4</Dropdown.Item>
            </Dropdown.Menu>
        }>
            <Button>b1</Button>
            <Button>b2</Button>
        </Actions>
    </div>;
}
