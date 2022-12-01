// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { sleep } from 'cmfx-dashboard';

export function adminMock() {
    fetchMock.get(/.+groups/i, async()=>{
        await sleep(500);

        return [
            {id:1, name: '管理员', description: '管理员的描述信息', parent: 0},
            {id:2, name: '权限组2', description: '权限组2的描述信息', parent: 0},
            {id:3, name: '子权限组2', description: '子权限组2的描述信息', parent: 2},
        ];
    });
}
