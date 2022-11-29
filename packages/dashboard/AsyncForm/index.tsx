// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { Form, Spin } from '@douyinfe/semi-ui';
import { BaseFormProps } from "@douyinfe/semi-ui/lib/es/form";

type SubmitType = Record<string, unknown>;

type Props = Omit<BaseFormProps, 'onSubmit'> & {
    onSubmit: (v: SubmitType)=>Promise<void>
}

// 异步表单
export function AsyncForm(props: Props) {
    const [loading, setLoading] = useState(false);
    const submit = (v: SubmitType)=> {
        setLoading(true);
        props.onSubmit(v).catch((reason)=>{
            console.error(reason);
        }).finally(()=>{
            setLoading(false);
        });
    };

    return <Spin spinning={loading} size='large'>
        <Form {...props} onSubmit={submit}>
            {props.children}
        </Form>
    </Spin>;
}
