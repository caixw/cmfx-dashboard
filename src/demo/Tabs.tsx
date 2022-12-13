// SPDX-License-Identifier: MIT

import React from 'react';
import { Form } from '@douyinfe/semi-ui';

import { ResponsiveTabs, TabPane } from 'cmfx-dashboard';
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
