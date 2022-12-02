// SPDX-License-Identifier: MIT

import { OptionProps } from "@douyinfe/semi-ui/lib/es/select";

// 将 Map<string|number, string> 转换成 Select.optionList 可接受的类型
export function mapToSelectOptions(m: Map<string|number, string>) {
    const opts: Array<OptionProps> = [];
    m.forEach((val, key)=>{
        opts.push({value: key, label: val});
    });
    return opts;
}

export function objectsToSelectOptions(objs: Array<Record<string, unknown>>, label: string, value: string) {
    const opts: Array<OptionProps> = [];
    objs.forEach((obj)=>{
        const v = obj[value];
        if (typeof v === 'number' || typeof v === 'string') {
            opts.push({value: v, label: obj[label] as string});
        } else {
            throw `${value} 表示的字段内容必须得是 number 或是 string 类型`;
        }
    });
    return opts;
}
