// SPDX-License-Identifier: MIT

export interface Page<T> {
    count: number
    more?: boolean
    current: Array<T>
}

export type Query = Record<string, unknown>;

/**
 * 将一个普通对象转换成查询字符串
 * @param q 普通对象
 * @returns 符合要求的查询字符串，其第一个字符为 & 或是空对象的情况下返回空值。
 */
export function encodeQuery(q?: Query, client?: boolean): string {
    if (!q) {
        return '';
    }

    let query = '';
    Object.entries(q).forEach(([key, val])=>{
        if (Array.isArray(val)) {
            if (client) {
                val = '['+val.join(',')+']';
            }else{
                val = val.join(',');
            }
        }
        query+=`&${key}=${val}`;
    });
    return query;
}

// 从查询参数中初始化 Query 对象
export function parseQueryForClient(query: string, defPage: number, defSize: number): {q: Query, page: number, size: number} {
    const q: Query = {};
    const p = new URLSearchParams(query);

    p.forEach((v, k)=>{
        if (k === 'page' || k === 'size') {
            return;
        }

        if (v.at(0) === '[' && v.at(-1) === ']') {
            q[k] = v.slice(1, v.length-1).split(',').filter((v)=>{return v;});
        } else {
            q[k] = v;
        }
    });

    return {
        q: q,
        page: p.get('page') ? parseInt(p.get('page') as string) : defPage,
        size: p.get('size') ? parseInt(p.get('size') as string) : defSize,
    };
}
