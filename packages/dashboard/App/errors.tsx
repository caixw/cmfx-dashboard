// SPDX-License-Identifier: MIT

import React, { ReactNode, useEffect, useState } from 'react';
import { Empty, Button } from '@douyinfe/semi-ui';
import { EmptyProps } from '@douyinfe/semi-ui/lib/es/empty';
import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router-dom';

import { AppContext, registerBreakpoint } from '@dashboard/App';
import { Locale, useLocale } from '@dashboard/locales';
import { illustration, ResponseError } from '@dashboard/utils';

/**
 * 为各个路由提供错误处理
 */
export function ErrorBoundary(): JSX.Element {
    const err = useRouteError();
    const l = useLocale();

    if (isRouteErrorResponse(err)) {
        return createError(l, err.status, err.statusText, err.status, err.error?.stack);
    }

    if (err instanceof ResponseError) {
        return createError(l, err.status, err.statusText, err.status, err.stack);
    }

    if (err instanceof Error) {
        return createError(l, err.name, err.message, 500, err.stack);
    }

    switch (typeof err) {
    case 'string':
        return createError(l, l.errors.unknown_error, err, 500);
    case 'number':
        return createError(l, l.errors.unknown_error, err.toString(), 500);
    default:
        // 无法处理的错误，抛给外层，提醒开者对该错误进行处理。
        throw new Error('未知识的错误类型');
    }
}

/**
 * 创建错误页面
 * @param l 翻译对象；
 * @param title 错误的简要说明；
 * @param desc 错误的明细，比如调用堆栈等；
 * @param image 显示的图片 ID，可参考 utils.illustration 的定义；
 * @param stack 调用堆栈；
 */
function createError(l: Locale, title: ReactNode, desc: ReactNode, image?: number, stack?: ReactNode): JSX.Element {
    const ctx = React.useContext(AppContext);
    const [layout, setLayout] = useState<EmptyProps['layout']>('horizontal');
    const nav = useNavigate();

    useEffect(()=>{
        return registerBreakpoint((screen, match)=>{
            setLayout(match ? 'horizontal' : 'vertical');
        });
    }, []);

    const backHome = ()=>{ nav(ctx.options.homePath); };
    const backPrevPage = ()=>{ nav(-1); };
    const img = illustration(image);


    const main = <Empty title={title}
        layout={layout}
        style={{maxWidth: '500px', margin: 'auto'}}
        description={desc}
        image={img ? img.light : undefined }
        darkModeImage={img ? img.dark : undefined}
    >
        <Button type='primary' onClick={backHome}>{l.errors.back_home}</Button>&#160;&#160;
        <Button type='primary' onClick={backPrevPage}>{l.errors.back_prev_page}</Button>
    </Empty>;

    if (!stack || import.meta.env.PROD) {
        return main;
    }

    return <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        {main}
        <pre style={{marginTop: '30px', whiteSpace: 'pre-wrap'}}>{stack}</pre>
    </div>;
}
