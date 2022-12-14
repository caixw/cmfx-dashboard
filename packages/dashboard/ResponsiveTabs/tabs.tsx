// SPDX-License-Identifier: MIT

import React from 'react';
import { Tabs } from '@douyinfe/semi-ui';
import { TabsProps, TabPosition } from '@douyinfe/semi-ui/lib/es/tabs';

import { registerBreakpoint } from '@dashboard/App';

export type Props = Omit<TabsProps, 'tabPosition'> & {
    /**
     * 是否固定在顶部
     *
     * 如果此值为 true，那么 tabBarStyle, contentStyle 和 style 都会被强制修改。
     */
    sticky?: boolean
};

/**
 * 响应式的 tabs
 *
 * 这是对 semi-ui 中 Tabs 的再次处理，内容直接使用 TabPane 即可。
 * @param props 属性。与 semi-ui 相比，少了 tabPosition 字段
 */
export function ResponsiveTabs(props: Props): JSX.Element {
    const [position, setPosition] = React.useState<TabPosition>('left');

    React.useEffect(()=>{
        return registerBreakpoint((screen, match)=>{
            setPosition(match ? 'left' : 'top');
        });
    }, []);

    if (!props.sticky) {
        return <Tabs tabPosition={position} {...props}>{props.children}</Tabs>;
    }

    const tabBarStyle = Object.assign(props.tabBarStyle ?? {}, {
        top: '0',
        position: 'sticky',
        backgroundColor: 'var(--semi-color-bg-2)',
        zIndex: '1000',
        borderRight: 'none',
        borderTop: 'none'
    });

    const contentStyle = props.contentStyle ?? {};
    if (position === 'left') {
        contentStyle.borderLeft = '1px solid var(--semi-color-border)';
    } else {
        contentStyle.borderTop = '1px solid var(--semi-color-border)';
    }

    const style = Object.assign(props.style ?? {}, { alignItems: 'flex-start' });

    return <Tabs tabPosition={position}
        tabBarStyle={tabBarStyle}
        contentStyle={contentStyle}
        style={style}
        {...props}
    >{props.children}</Tabs>;
}
