// SPDX-License-Identifier: MIT

import React from 'react';

import { WYSIWYG, FormWYSIWYG } from 'cmfx-dashboard';
import { Button, Checkbox, Divider, Form } from '@douyinfe/semi-ui';

export function WysiwygDemo(): JSX.Element {
    const [loading, setLoading] = React.useState(false);
    const [readonly, setReadonly] = React.useState(false);
    const [v, sv] = React.useState('<strong>abc</strong>abc');

    return <>
        <WYSIWYG value={v} onChange={(v)=>sv(v)} height={200} id='editor1' readOnly={readonly} loading={loading} />
        <br />
        <Checkbox value={loading} onChange={(e)=>setLoading(e.target.checked ?? false)}>loading</Checkbox>
        <Checkbox value={readonly} onChange={(e)=>setReadonly(e.target.checked ?? false)}>readonly</Checkbox>
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
