// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { Form, Spin } from '@douyinfe/semi-ui';
import { BaseFormProps } from "@douyinfe/semi-ui/lib/es/form";

type SubmitType = Record<string, unknown>;

type Props = Omit<BaseFormProps, 'onSubmit'> & {
    onSubmit: (v: SubmitType)=>Promise<void>
}

/**
 * 异步表单
 *
 * 与普通表单的区别在于：onSubmit 是 async 类型的函数，
 * 在函数返回前，整个表单处于 loading 状态。
 */
export function AsyncForm(props: Props): JSX.Element {
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
