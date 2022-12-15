// SPDX-License-Identifier: MIT

import React from 'react';
import { Form, List } from '@douyinfe/semi-ui';

import { FormPaneContent, Pane, Setting } from 'cmfx-dashboard';

export function SettingDemo():JSX.Element {
    return <Setting sticky>
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
