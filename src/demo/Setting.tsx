// SPDX-License-Identifier: MIT

import React from 'react';
import { Form } from '@douyinfe/semi-ui';

import { Pane, Setting } from 'cmfx-dashboard';

export function SettingDemo():JSX.Element {
    return <Setting sticky>
        <Pane title='abc' description='这是一段很长的描述信息' itemKey='abc'>
            <Form>
                <Form.Input field='abc' />
                <Form.Input field='def' />
            </Form>
        </Pane>

        <Pane title='def' description='这是一段很长的描述信息' itemKey='def'>
            <Form>
                <Form.Input field='abc' />
                <Form.Input field='def' />
                <Form.TextArea field='textarea' rows={10} />
            </Form>
        </Pane>
    </Setting>;
}
