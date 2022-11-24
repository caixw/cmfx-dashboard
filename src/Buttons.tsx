// SPDX-License-Identifier: MIT

import React from "react";
import { Divider, Toast } from "@douyinfe/semi-ui";

import { ConfirmButton, AsyncButton, sleep } from 'cmfx-dashboard';
import { IconAlarm } from "@douyinfe/semi-icons";

export function Buttons() {
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
    </div>;
}
