// SPDX-License-Identifier: MIT

import { RouteLocationNormalized } from 'vue-router';
import { DataTableColumn } from 'naive-ui';
import { ComposerTranslation } from 'vue-i18n';

export interface Page<T> {
    count: number
    more?: boolean
    current: Array<T>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Query = Record<string, any>;

export interface CheckMeta {
    row: unknown | undefined
    action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll'
}

/**
 * 将一个普通对象转换成查询字符串
 * @param q 普通对象
 * @returns 符合要求的查询字符串，其第一个字符为 & 或是空对象的情况下返回空值。
 */
export function encodeQuery(q?: Query): string {
    if (!q) {
        return '';
    }

    let query = '';
    Object.entries(q).forEach(([key, val])=>{
        if (Array.isArray(val)) {
            val = val.join(',');
        }
        query+=`${key}=${val}&`;
    });
    return query;
}

// 从查询参数中初始化 Query 对象
export function initQuery($route: RouteLocationNormalized): Query {
    const q: Query = {};
    Object.entries($route.query).forEach(([k,v])=>{
        if (Array.isArray(v)) {
            q[k] = v[0];
        } else {
            q[k] = v;
        }
    });
    return q;
}


// 用于表示可编辑的数据类型
type DataTableColumnAdditional = { visible?: boolean }
    | { visible?: boolean, key: string }
    | { visible?: boolean, key: string, title: string }
export type EditableColumnType = DataTableColumn & DataTableColumnAdditional

export function fromEditableColumnTypes(cols: Array<EditableColumnType>): Array<DataTableColumn> {
    const ret: Array<DataTableColumn> = [];

    for(const col of cols) {
        if (!col.visible) {
            continue;
        }

        const clone = Object.assign({}, col);
        delete clone.visible;
        ret.push(clone);
    }

    return ret;
}

export function toEditableColumnTypes(t: ComposerTranslation,cols: Array<DataTableColumn>): Array<EditableColumnType> {
    const ret: Array<EditableColumnType> = [];

    for(const [index,value] of cols.entries()) {
        if ('type' in value) {
            switch(value.type) {
            case 'selection':
                ret.push(Object.assign({
                    visible: true,
                    key: '__selection__' + index.toString(),
                    title: t('table.select_all'),
                }, value));
                break;
            case 'expand':
                ret.push(Object.assign({
                    visible: true,
                    key: '__expand__' + index.toString(),
                }, value));
                break;
            default:
                throw '无效的 DataTableColumn.type';
            }
            continue;
        }

        ret.push(Object.assign({visible: true}, value));
    }

    return ret;
}
