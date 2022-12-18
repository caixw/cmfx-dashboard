// SPDX-License-Identifier: MIT

import React, { useContext } from 'react';
import { Button } from '@douyinfe/semi-ui';

import { AppContext, Return, Problem } from '@dashboard/App';
import { AsyncForm } from '@dashboard/AsyncForm';
import { ObjectType } from '@dashboard/utils';
import { useLocale } from '@dashboard/locales';

export interface FormPaneContentProps {
    /**
     * 配置项的地址
     *
     * NOTE: 获取和保存都是此地址
     */
    url: string

    /**
     * 保存配置项时的请求方法，可以是 PUT 或 PATCH，而获取则始终是 GET。
     */
    saveMethod?: 'PUT' | 'PATCH'

    children: React.ReactNode
}

/**
 * 以表单作为设置项内容的组件
 *
 * 要求设置项为一个对象，且获取和保存在同一个地址上，仅请求方法不同。
 * 获取配置为 GET，更新方法可以是 PUT 或 PATCH。
 */
export function FormPaneContent(props: FormPaneContentProps) {
    const ctx = useContext(AppContext);
    const l = useLocale();

    const submit = async(obj: ObjectType): Promise<Problem|undefined> =>{
        let r: Return;
        switch (props.saveMethod) {
        case 'PUT':
            r = await ctx.put(props.url, obj);
            break;
        case 'PATCH':
            r = await ctx.patch(props.url, obj);
            break;
        default:
            throw Error('无效的请求方法，只能是 PUT 或是 PATCH');
        }

        if (!r.ok) {
            return r.problem;
        }
    };

    const init = async(): Promise<ObjectType> => {
        const r = await ctx.get(props.url);
        if (!r.ok) {
            throw Error(r.problem?.title);
        }

        return r.body as ObjectType;
    };

    return <AsyncForm onInit={init} onSubmit={submit} layout="vertical">
        {props.children}
        <div className="cmfx-actions" style={{margin: '10px 0 15px 0'}}>
            <Button htmlType='reset' type="secondary">{l.common.reset}</Button>
            <Button htmlType='submit' type="primary">{l.common.save}</Button>
        </div>
    </AsyncForm>;
}
