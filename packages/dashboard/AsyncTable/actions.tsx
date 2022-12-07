// SPDX-License-Identifier: MIT

import React, { useContext } from "react";
import { ConfirmButton } from "@dashboard/ConfirmButton";
import { AppContext } from "@dashboard/App/context";
import { Locale } from "@dashboard/locales";

interface DeleteProps {
    locale: Locale

    /**
     * 删除操作调用的远程的 URL
     *
     * NOTE: 会采用 DELETE 调用该 URL
     */
    url: string

    /**
     * 删除之后调用的刷新操作
     */
    reload: ()=>void
}

/**
 * 表格中的删除按钮执行的操作
 * @param props
 * @returns
 */
export function DeleteAction(props: DeleteProps): JSX.Element {
    const ctx = useContext(AppContext);

    const delItem = async()=>{
        const r = await ctx.del(props.url);
        if (!r.ok) {
            console.error(r.problem);
        }
        props.reload();
    };

    return <ConfirmButton title={props.locale.common.confirm_delete_title}
        content={props.locale.common.confirm_delete_detail}
        onConfirm={delItem}
        type='danger'
    >{props.locale.common.delete}</ConfirmButton>;
}
