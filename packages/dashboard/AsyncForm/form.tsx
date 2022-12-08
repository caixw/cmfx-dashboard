// SPDX-License-Identifier: MIT

import React, { useEffect, useState, useRef } from 'react';
import { Form, Spin } from '@douyinfe/semi-ui';
import { BaseFormProps, FormApi } from "@douyinfe/semi-ui/lib/es/form";

import { Problem } from '@dashboard/App/context/api';
import { ObjectType } from '@dashboard/utils';

type Props<T extends ObjectType> = Omit<BaseFormProps, 'onSubmit'> & {
    /**
     * 异步初始化表单的方法
     *
     * NOTE: 如果此值不为空，那么 initValues 将不会起实际作用。
     * @returns 返回用于初始化表单的对象
     */
    onInit?:()=>Promise<T>

    /**
     * 用户提交表单所执行的操作
     *
     * @returns 有错误返回错误没有错误不返回内容。
     */
    onSubmit: (v: T)=>Promise<Problem|undefined>
}

/**
 * 异步表单
 *
 * 与普通表单的区别在于：onSubmit 是 async 类型的函数，
 * 在函数返回前，整个表单处于 loading 状态。
 */
export function AsyncForm<T extends ObjectType>(props: Props<T>): JSX.Element {
    const [loading, setLoading] = useState(false);
    const api = useRef<FormApi>();

    useEffect(()=>{
        if (!props.onInit) {
            return;
        }

        setLoading(true);
        props.onInit().then((v: T)=>{
            api.current?.setValues(v);
        }).catch((reason)=>{
            console.error(reason);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const submit = (v: T)=> {
        setLoading(true);
        props.onSubmit(v).then((p?:Problem)=>{
            p?.params?.forEach((f)=>{
                api.current?.setError(f.name, f.message);
            });
        }).catch((reason)=>{
            console.error(reason);
        }).finally(()=>{
            setLoading(false);
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {onInit, ...p} = props;

    return <Spin spinning={loading} size='large'>
        <Form {...p} onSubmit={submit} getFormApi={(formApi: FormApi)=>api.current = formApi}>
            {props.children}
        </Form>
    </Spin>;
}
