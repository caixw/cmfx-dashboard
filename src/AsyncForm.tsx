// SPDX-License-Identifier: MIT

import React, { useContext } from "react";

import { AppContext, AsyncForm } from "cmfx-dashboard";
import { Button, Divider, Form } from "@douyinfe/semi-ui";

export function AsyncFormDemo() {
    const ctx = useContext(AppContext);
    return <AsyncForm style={{padding: '20px'}} onSubmit={async()=>{await ctx.get('/paging');}}>
        <Form.Input field="abc" />
        <Form.Input field="def" label="DEF" />

        <Divider />
        <br />

        <Button htmlType="reset">Reset</Button>
        &#160;&#160;&#160;
        <Button htmlType="submit">OK(触发 loading)</Button>
    </AsyncForm>;
}
