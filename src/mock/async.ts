// SPDX-License-Identifier: MIT

import fetchMock from "fetch-mock";

export interface DataType {
    num: number
    str: string
    bool: boolean
}

export function asyncMock() {
    fetchMock.get('path:/admin/async-data', ()=>{
        return {
            num: 1,
            str: 'str',
            bool: true,
            group: 1
        };
    }, {delay: 1000});

    fetchMock.post('path:/admin/async-invalid-data', ()=>{
        return new Response(JSON.stringify({
            title: '400-title',
            type: 'https://example.com/proboles/400',
            params: [
                { name: 'num', message: ['无效的值', '不能小于 100']},
                { name: 'str', message: ['无效的值']},
            ]
        }), {status: 400});
    }, {delay: 1000});
}
