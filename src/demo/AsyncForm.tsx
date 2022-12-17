// SPDX-License-Identifier: MIT

import React, { useContext } from "react";
import { Button, Divider, Form } from "@douyinfe/semi-ui";

import { rules, AppContext, Problem, AsyncForm, AsyncFormSelect, objectsToSelectOptions } from "cmfx-dashboard";
import { DataType } from "@/mock/async";


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

    return <AsyncForm layout='vertical'
        onInit={async()=>{
            return (await ctx.get('/async-data')).body as DataType;
        }}
        onSubmit={async():Promise<Problem|undefined>=>{
            const r = await ctx.post('/async-invalid-data', null);
            return r.ok ? undefined : r.problem;
        }}
    >
        <Form.InputNumber field="num" label='数值' rules={[rules.ok]} />
        <Form.Input field="str" label="字符" />
        <Form.Checkbox field="bool" label="Bool" />

        <AsyncFormSelect label='async-select' field='group' loadOptions={async()=>await groupsToSelectOptions()} />

        <Divider />
        <br />
        <Button htmlType="reset">Reset</Button>
        &#160;&#160;&#160;
        <Button htmlType="submit">Submit</Button>
    </AsyncForm>;
}
