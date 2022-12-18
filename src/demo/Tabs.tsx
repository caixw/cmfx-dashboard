// SPDX-License-Identifier: MIT

import React from 'react';
import { Form, List } from '@douyinfe/semi-ui';

import { ResponsiveTabs, TabPane, FormPaneContent, Pane, Setting } from 'cmfx-dashboard';
import { TableDemo } from './AsyncTable';

export function TabsDemo(): JSX.Element {
    return <ResponsiveTabs sticky>
        <TabPane tab="表格" itemKey="table" >
            <TableDemo />
        </TabPane>

        <TabPane tab="设置" itemKey="setting">
            <Form>
                <Form.Input field="abc" />
            </Form>
        </TabPane>
    </ResponsiveTabs>;
}

export function SettingDemo():JSX.Element {
    return <Setting sticky style={{margin: 'auto', maxWidth: '500px'}}>
        <Pane title='abc' description='这是一段很长的描述信息' itemKey='abc'>
            <List>
                <List.Item>item1</List.Item>
                <List.Item>item2</List.Item>
                <List.Item>item3</List.Item>
                <List.Item>item4</List.Item>
            </List>
        </Pane>

        <Pane title='def' description='这是一段很长的描述信息' itemKey='def'>
            <FormPaneContent url='/admin/setting' saveMethod='PATCH'>
                <Form.Input field='abc' />
                <Form.Input field='def' />
                <Form.TextArea field='textarea' rows={10} />
            </FormPaneContent>
        </Pane>
    </Setting>;
}
