// SPDX-License-Identifier: MIT

import React, { ReactNode } from "react";
import { IconMore } from "@douyinfe/semi-icons";
import { Dropdown, Button } from "@douyinfe/semi-ui";

export interface Props {
    /**
     * 次要的操作
     *
     * NOTE: 需返回 <Dropdown.Menu> 元素内容。
     */
    more?: ReactNode

    children: React.ReactNode
}

/**
 * 操作按钮列表，一般用于表格项
 */
export function Actions(props: Props): JSX.Element {
    return <div style={{display: 'flex', gap: '5px'}}>
        {props.children}
        {more(props.more)}
    </div>;
}

function more(m: ReactNode): React.ReactNode | undefined {
    if (!m) {
        return;
    }

    return <Dropdown render={m}>
        <Button theme="borderless" icon={<IconMore />} />
    </Dropdown>;
}
