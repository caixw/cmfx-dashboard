// SPDX-License-Identifier: MIT

import React from 'react';

import { WYSIWYG, FormWYSIWYG } from 'cmfx-dashboard';
import { Button, Divider, Form } from '@douyinfe/semi-ui';

export function WysiwygDemo(): JSX.Element {
    const [v, sv] = React.useState('<strong>abc</strong>abc');
    return <>
        <WYSIWYG value={v} onChange={(v)=>sv(v)} height={200} id='editor1' />
        <br />
        <Button onClick={()=>console.log(v)}>输出内容到 console</Button>

        <br />
        <Divider>insetLabel</Divider>
        <br />
        <WYSIWYG value={v} onChange={(v)=>sv(v)} height={200} id='editor2' insetLabel='insetLabel' />


        <br />
        <Divider>form+insetLabel</Divider>
        <br />
        <Form initValues={{content:'<del>del</del><br />line2'}} labelPosition='inset'>
            <FormWYSIWYG height={200} id='editor3' field='content' label='content+label' />
        </Form>

        <br />
        <Divider>form</Divider>
        <br />
        <Form initValues={{content:'<del>del</del><br />line2'}}>
            <FormWYSIWYG height={200} id='editor4' field='content' label='content+label' />
        </Form>
    </>;
}
