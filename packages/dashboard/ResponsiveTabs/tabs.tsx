// SPDX-License-Identifier: MIT

import React, { CSSProperties } from 'react';
import { Tabs } from '@douyinfe/semi-ui';
import { TabsProps, TabPosition } from '@douyinfe/semi-ui/lib/es/tabs';

import { registerBreakpoint } from '@dashboard/App';

export type Props = Omit<TabsProps, 'tabPosition'> & {
    /**
     * 是否固定在顶部
     */
    sticky?: boolean
};

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

    return <Tabs renderTabBar={(tabBarProps, DefaultTabBar)=>{
        const { style, ...p } = tabBarProps;

        const s: CSSProperties = style ?? {};
        s.top = '0';
        s.position = 'sticky';
        s.backgroundColor = 'var(--semi-color-bg-2)';
        s.zIndex = '1000';

        return <DefaultTabBar {...p} style={s} />;
    }}
    tabPosition={position}
    style={{alignItems: 'start'}}
    >{props.children}</Tabs>;
}
