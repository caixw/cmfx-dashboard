// SPDX-License-Identifier: MIT

import React from "react";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button";
import { Button } from "@douyinfe/semi-ui";

export type Props = Omit<ButtonProps, 'onClick'> & {
    onClick: (e: React.MouseEvent) => Promise<void>
}

/**
 * 异步按钮
 *
 * 对 click 事件作了调整，返回 Promise<void> 对象，
 * 在 Promise 没正确返回前，按钮将一直处于 loading 或是禁用状态。
 */
export function AsyncButton(props: Props): JSX.Element {
    const [loading, setLoading] = React.useState(false);

    const click = async (e: React.MouseEvent) => {
        setLoading(true);
        await props.onClick(e);
        setLoading(false);
    };

    return <Button
        {...props}
        loading={props.icon ? loading : undefined}
        disabled={!props.icon ? loading : undefined}
        onClick={click}
    >{props.children}</Button>;
}
