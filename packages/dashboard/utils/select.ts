// SPDX-License-Identifier: MIT

import { OptionProps } from "@douyinfe/semi-ui/lib/es/select";

import { ObjectType } from "./object";

/**
 * 将 Map<string|number, string> 转换成 Select.optionList 可接受的类型
 */
export function mapToSelectOptions(m: Map<string|number, string>): Array<OptionProps> {
    const opts: Array<OptionProps> = [];
    m.forEach((val, key)=>{
        opts.push({value: key, label: val});
    });
    return opts;
}

/**
 * 将 Array<object> 转换成 Select.optionList 可授受的类型
 *
 * @param label 表示标题的字段名；
 * @param value 表示值的字段名；
 */
export function objectsToSelectOptions(objs: Array<ObjectType>, label: string, value: string): Array<OptionProps> {
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
