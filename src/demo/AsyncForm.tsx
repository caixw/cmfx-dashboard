// SPDX-License-Identifier: MIT

import React, { useContext } from "react";
import { Button, Divider, Form } from "@douyinfe/semi-ui";


import { AppContext, AsyncForm, AsyncFormSelect } from "cmfx-dashboard";
import { objectsToSelectOptions } from "cmfx-dashboard";



export function AsyncFormDemo() {
    const ctx = useContext(AppContext);

    const groupsToSelectOptions = async() => {
        const r = await ctx.get('/groups');
        if (!r.ok) {
            console.error(r.problem);
            return [];
        }
        return objectsToSelectOptions(r.body as Array<Record<string, unknown>>, 'name', 'id');
    };

    return <AsyncForm style={{padding: '20px'}} onSubmit={async()=>{await ctx.get('/paging');}} initValues={{group: 1}}>
        <Form.Input field="abc" />
        <Form.Input field="def" label="DEF" />

        <AsyncFormSelect labelPosition="inset" label='async-select' field='group' loadOptions={async()=>await groupsToSelectOptions()} />

        <Divider />
        <br />
        <Button htmlType="reset">Reset</Button>
        &#160;&#160;&#160;
        <Button htmlType="submit">OK(触发 loading)</Button>
    </AsyncForm>;
}
