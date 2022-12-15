// SPDX-License-Identifier: MIT

import React from 'react';
import { TabPane, Typography } from '@douyinfe/semi-ui';

import { ResponsiveTabs } from '@dashboard/ResponsiveTabs';

/**
 * 设置页的面板内容
 */
export const Pane: React.FC<{
    /**
     * 标题
     */
    title: string

    /**
     * 副标题，具体的描述信息
     */
    description?: string

    /**
     * 唯一键
     */
    itemKey: string

    children: React.ReactNode
}> = () => { return null; };

type PaneType = ReturnType<typeof Pane>;

interface Props {
    /**
     * 是否固定 tabBar 在屏幕上方
     */
    sticky?: boolean

    children: Array<PaneType> | PaneType;
}

/**
 * 设置页面
 */
export function Setting(props: Props): JSX.Element {
    const panes = buildPanes(props.children);
    return <ResponsiveTabs sticky={props.sticky}tabBarStyle={{minWidth: '150px'}}>{panes}</ResponsiveTabs>;
}

function buildPanes(children: Props['children']): Array<JSX.Element> {
    const panes: Array<JSX.Element> = [];
    React.Children.map(children, (child)=>{
        const p = child?.props;

        const header = <div>
            <Typography.Title>{p.title}</Typography.Title>
            <Typography.Text>{p.description}</Typography.Text>
        </div>;

        panes.push(<TabPane key={p.itemKey}
            itemKey={p.itemKey}
            tab={<Typography.Title>{p.title}</Typography.Title>}
        >{header}{p.children}</TabPane>);
    });

    return panes;
}
