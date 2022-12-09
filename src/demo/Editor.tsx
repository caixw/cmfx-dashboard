// SPDX-License-Identifier: MIT

import React from 'react';

import { WYSIWYG } from 'cmfx-dashboard';
import { Button } from '@douyinfe/semi-ui';

export function WysiwygDemo(): JSX.Element {
    const [v, sv] = React.useState('<strong>abc</strong>abc');
    return <>
        <WYSIWYG value={v} onChange={(v)=>sv(v)} height={200} />
        <br />
        <Button onClick={()=>console.log(v)}>输出内容到 console</Button>
    </>;
}
