// SPDX-License-Identifier: MIT

export interface Page<T> {
    count: number
    more?: boolean
    current: Array<T>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Query = Record<string, any>;

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
        query+=`&${key}=${val}`;
    });
    return query;
}
