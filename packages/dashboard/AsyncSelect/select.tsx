// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from "react";
import { Select, Form } from "@douyinfe/semi-ui";
import { OptionProps, SelectProps } from "@douyinfe/semi-ui/lib/es/select";
import { CommonFieldProps } from "@douyinfe/semi-ui/lib/es/form";

export type Props = Omit<SelectProps, 'optionList' | 'loading'> & {
    loadOptions: ()=> Promise<Array<OptionProps>>
}

export type FormProps = Props & CommonFieldProps;

export function getSelect(form: boolean, props: Props | FormProps): JSX.Element {
    const [data, setData] = useState<Array<OptionProps>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        props.loadOptions().then((d)=>{
            setData(d);
        }).catch((reason)=>{
            console.error(reason);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if (form) {
        return <Form.Select loading={loading} {...props as FormProps} optionList={data} />;
    }
    return <Select loading={loading} {...props} optionList={data} />;
}
