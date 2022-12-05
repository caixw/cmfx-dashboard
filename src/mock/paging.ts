// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { getQuery } from './utils';

export interface PagingDataType {
    id:number
    no: string
    name: string
    username: string
    sex: 'female' | 'male' | 'unknown'
}
const maxPagingSize = 500;

function buildPagingData(start:number, size: number):Array<PagingDataType> {
    const data:Array<PagingDataType> = [];
    for(let i=1;i<=size;i++) {
        const id = start+i;
        data.push({
            id: id,
            no: 'no'+id,
            name: 'name-'+id,
            username: 'username-'+id,
            sex: (id%2===0) ? 'female': 'male'
        });
    }
    return data;

}

export function pagingMock() {
    fetchMock.get(/.+paging/i, (url: string)=>{ // 分页信息
        const page = parseInt(getQuery(url, 'page', '0'));
        const size = parseInt(getQuery(url, 'size', '33'));
        console.log('mock:', url, page, size);

        const start = page * size;
        return {
            current: buildPagingData(start, size),
            more: (page*(size+1)) < maxPagingSize,
            count: maxPagingSize
        };
    }, {delay: 1000});

    fetchMock.get(/.+table/i, ()=>{ // 分页信息
        return buildPagingData(0, 50);
    }, {delay: 500});
}
