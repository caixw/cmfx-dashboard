// SPDX-License-Identifier: MIT

import React, { useContext, CSSProperties } from "react";
import { Button } from "@douyinfe/semi-ui";

import { AppContext } from "@dashboard/App/context";
import { Locale, LocaleConsumer } from "@dashboard/locales";
import { useNavigate } from "react-router-dom";

export interface Props {
    code: number
    title?: string
}

/**
 * 错误页面
 */
export function ErrorPage(props: Props): JSX.Element {
    const ctx = useContext(AppContext);
    const nav = useNavigate();

    const backHome = ()=>{ nav(ctx.options.homePath); };
    const backPrevPage = ()=>{ nav(-1); };

    const bodyStyle: CSSProperties = {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    };

    const codeStyle: CSSProperties = {
        fontSize: '7em'
    };

    return <div style={bodyStyle}>
        <div style={{marginLeft: '-120px'}}>
            <code style={codeStyle}>{props.code}</code>

            { props.title ? <p>{props.title}</p> : null }

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <LocaleConsumer>
                    {
                        (l: Locale)=>{
                            return <>
                                <Button type='primary' onClick={backHome}>{l.errorPage.back_home}</Button>
                                <Button type='primary' onClick={backPrevPage}>{l.errorPage.back_prev_page}</Button>
                            </>;
                        }
                    }
                </LocaleConsumer>
            </div>
        </div>
    </div>;
}
