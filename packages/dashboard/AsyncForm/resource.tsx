// SPDX-License-Identifier: MIT

import React, { CSSProperties } from 'react';
import { Button, Divider } from '@douyinfe/semi-ui';

import { ObjectType } from '@dashboard/utils';
import { AppContext, Return, Problem } from '@dashboard/App';
import { useLocale } from '@dashboard/locales';

import { AsyncForm } from './form';

interface Props<T extends ObjectType, KEY = number> {
    /**
     * 资源的 ID
     *
     * 如果此值为 undefined，表示是添加新资源，表单由 initValues 初始化。
     */
    id?: KEY

    /**
     * 表单的初始值，仅在 id === undefined 时才有效。
     */
    initValues?: T

    /**
     * 远程资源的基地址
     *
     * 完整的资源地址为 options.urlPrefix + '/' + url + id
     */
    url: string

    /**
     * 保存资源时的请求方法
     *
     * 如果 id === undefined，表示是添加新内容，统一采用 POST。
     */
    modifyMethod?: 'PUT' | 'PATCH'

    /**
     * 在数据提交之前作的修正
     * @param vals 原始数据
     * @param id 当前数据的 ID，等同于 Props.id
     * @returns 修正后的数据
     */
    beforeSave?: (vals: T, id?: KEY)=>T


    /**
     * 数据提交之后执行的操作
     */
    afterSave?: ()=>void

    /**
     * 除保存之外的额外按钮
     *
     * 这些按钮的 htmlType 不应该是 submit，该值已经赋给了保存，
     * 如果有多个按钮，可以使用 React.Fragment 包装。
     */
    actions?: React.ReactNode

    children: React.ReactNode

    style?: CSSProperties
}

/**
 * 对某单一远程资源的处理表单
 *
 * T 表示表单的数据类型；KEY 表示表单数据的唯一 ID 的类型，一般用于地址取值。
 */
export function AsyncResourceForm<T extends ObjectType, KEY = number>(props: Props<T, KEY>): JSX.Element {
    const ctx = React.useContext(AppContext);
    const l = useLocale();
    const resURL = `${props.url}/${props.id}`; // 资源地址，仅在 props.id 不为 undefined 时有意义。

    // 提交数据
    const submit = async(vals: T): Promise<Problem|undefined> =>{
        if (props.beforeSave) {
            vals = props.beforeSave(vals, props.id);
        }

        let r: Return;
        if (undefined === props.id) {
            r = await ctx.post(props.url, vals);
        } else {
            switch (props.modifyMethod) {
            case 'PUT':
                r = await ctx.put(resURL, vals);
                break;
            case 'PATCH':
                r = await ctx.patch(resURL, vals);
                break;
            default:
                throw Error('无效的请求方法，只能是 PUT 或是 PATCH');
            }
        }

        if (!r.ok) {
            return r.problem;
        }

        if (props.afterSave) {
            props.afterSave();
        }
    };

    // 获取初始数据
    const init = async(): Promise<T> => {
        if (undefined === props.id) {
            return props.initValues as T;
        }

        const r = await ctx.get(resURL);
        if (!r.ok) {
            throw Error(r.problem?.title);
        }
        return r.body as T;
    };

    return <AsyncForm onInit={init} onSubmit={submit} layout="vertical" style={props.style}>
        {props.children}
        <Divider style={{margin: '10px 0 15px 0'}} />
        <div className="cmfx-actions">
            {props.actions}
            <Button htmlType='submit' type="primary">{l.common.save}</Button>
        </div>
    </AsyncForm>;
}
