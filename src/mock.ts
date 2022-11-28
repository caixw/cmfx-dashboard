// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { sleep } from 'cmfx-dashboard';

function getQuery(url: string, key: string, def: string): string {
    const u = new URL(url);
    return u.searchParams.get(key) ?? def;
}

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

export function mock(){
    fetchMock.config.overwriteRoutes = true;

    fetchMock.post(/.+login/i, async()=>{
        await sleep(1000);
        return {
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 3600
        };
    });

    fetchMock.delete(/.+login/i, 204);

    fetchMock.get(/.+info/i, {
        name: '姓名',
        nickname: '昵称',
        username: '账号',
        sex: 'female',
        state: 'normal'
    });

    fetchMock.get(/.+paging/i, async (url: string)=>{ // 分页信息
        await sleep(1000);
        const page = parseInt(getQuery(url, 'page', '0'));
        const size = parseInt(getQuery(url, 'size', '33'));
        console.log('mock:', url, page, size);

        const start = page * size;
        return {
            current: buildPagingData(start, size),
            more: (page*(size+1)) < maxPagingSize,
            count: maxPagingSize
        };
    });

    fetchMock.get(/.+table/i, async ()=>{ // 分页信息
        await sleep(500);
        return buildPagingData(0, 50);
    });

    fetchMock.get(/.+security-log/i, async ()=>{ // 分页信息
        return {
            count: 10,
            more: true,
            current: [
                {id: 1, ua: 'firefox', content: '登录', ip: '[::1]', created: '2022-01-02 17:00:02' },
                {id: 2, ua: 'firefox', content: '修改密码', ip: '[::1]', created: '2022-01-02 17:00:02' },
                {id: 3, ua: 'edge', content: '修改密码', ip: '[::1]', created: '2022-01-02 17:00:02' },
            ]
        };
    });

    fetchMock.get(/.+groups/i, async()=>{
        // TODO
    });
}

export function restore() {
    fetchMock.restore();
}
