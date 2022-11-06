// SPDX-License-Identifier: MIT

import { DataTableColumn } from 'naive-ui';
import { ComposerTranslation } from 'vue-i18n';

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

