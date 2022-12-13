// SPDX-License-Identifier: MIT

import React from "react";
import { Tabs } from '@douyinfe/semi-ui';
import { TabsProps, TabPosition } from "@douyinfe/semi-ui/lib/es/tabs";

import { registerBreakpoint } from "@dashboard/App";

export type Props = Omit<TabsProps, 'tabPosition'>;

/**
 * 响应式的 tabs
 * @param props 属性。与 semi-ui 相比，少了 tabPosition 字段
 */
export function ResponsiveTabs(props: Props): JSX.Element {
    const [position, setPosition] = React.useState<TabPosition>('left');

    React.useEffect(()=>{
        return registerBreakpoint((screen, match)=>{
            setPosition(match ? 'left' : 'top');
        });
    }, []);

    return <Tabs tabPosition={position}>{props.children}</Tabs>;
}
