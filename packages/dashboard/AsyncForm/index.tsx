// SPDX-License-Identifier: MIT

import React, { useEffect, useState, useRef } from 'react';
import { Form, Spin } from '@douyinfe/semi-ui';
import { BaseFormProps } from "@douyinfe/semi-ui/lib/es/form";

import { Return } from '@dashboard/App/context/api';

export type ValuesType = Record<string, unknown>;

type Props = Omit<BaseFormProps, 'onSubmit'> & {
    /**
     * 异步初始化表单的方法
     *
     * NOTE: 如果此值不为空，那么 initValues 将不会起实际作用。
     */
    onInit?:()=>Promise<ValuesType>

    /**
     * 用户提交表单所执行的操作
     *
     * @returns 用户无须处理 400 的状态，返回后由组件自行处理。
     */
    onSubmit: (v: ValuesType)=>Promise<Return>

    /**
     * onSubmit 之后的操作
     *
     * @param ok onSubmit 是否返回期望的结果。
     */
    afterSubmit?: (ok: boolean)=>void
}

/**
 * 异步表单
 *
 * 与普通表单的区别在于：onSubmit 是 async 类型的函数，
 * 在函数返回前，整个表单处于 loading 状态。
 */
export function AsyncForm(props: Props): JSX.Element {
    const [loading, setLoading] = useState(false);
    const table = useRef<Form>(null);
    const fa = table.current?.formApi;

    useEffect(()=>{
        if (!props.onInit) {
            return;
        }

        setLoading(true);
        props.onInit().then((v: ValuesType)=>{
            fa?.setValues(v);
        }).catch((reason)=>{
            console.error(reason);
        }).finally(()=>{
            setLoading(false);
        });
    }, [fa]);

    const submit = (v: ValuesType)=> {
        setLoading(true);
        props.onSubmit(v).then((r: Return)=>{
            if (r.ok) {
                return true;
            }
            if (r.status !== 400) {
                console.error(r.problem);
                return false;
            }

            r.problem?.params?.forEach((f)=>{
                fa?.setError(f.name, f.message);
            });
            return false;
        }).then((ok)=>{
            if (props.afterSubmit) {
                props.afterSubmit(ok);
            }
        }).catch((reason)=>{
            console.error(reason);
        }).finally(()=>{
            setLoading(false);
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {onInit, afterSubmit, ...p} = props;

    return <Spin spinning={loading} size='large'>
        <Form {...p} onSubmit={submit} ref={table}>
            {props.children}
        </Form>
    </Spin>;
}
