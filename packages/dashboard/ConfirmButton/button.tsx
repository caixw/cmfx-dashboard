// SPDX-License-Identifier: MIT

import React from 'react';
import { ButtonProps } from '@douyinfe/semi-ui/lib/es/button';
import { PopconfirmProps } from '@douyinfe/semi-ui/lib/es/popconfirm';
import { Popconfirm, Button } from '@douyinfe/semi-ui';

export type Props = Pick<PopconfirmProps, 'title' | 'content' | 'onConfirm'> &
    Omit<ButtonProps, 'onClick' | 'onMouseDown' | 'onMouseEnter' | 'onMouseLeave'>;

/**
 * 需要再一次确定操作的按钮
 */
export function ConfirmButton(props: Props): JSX.Element {
    const [loading, setLoading] = React.useState(false);

    const confirm = async (e: React.MouseEvent) => {
        if (!props.onConfirm) {
            return;
        }

        const p = props.onConfirm(e);
        if (!(p instanceof Promise)) {
            return;
        }

        setLoading(true);
        p.then(()=>{
            setLoading(false);
        }).catch((reason)=>{
            console.error(reason);
            setLoading(false);
        });
        return;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {title, content, onConfirm, ...buttonProps} = props;
    return <Popconfirm title={props.title} content={props.content} onConfirm={confirm}>
        <Button
            {...buttonProps}
            loading={props.icon ? loading : undefined}
            disabled={!props.icon ? loading : undefined}
        >{props.children}</Button>
    </Popconfirm>;
}
