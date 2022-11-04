// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { sleep } from '@/utils';

export function mock(){
    fetchMock.config.overwriteRoutes = true;

    fetchMock.post(/.+login/i, {
        access_token: 'access',
        refresh_token: 'refresh',
        expires: 3600
    });
    fetchMock.delete(/.+login/i, 204);

    fetchMock.get(/.+info/i, {
        name: 'name',
        nickname: 'nickname',
        username: 'username',
        sex: 'female',
        state: 'normal'
    });

    fetchMock.get(/.+paging-1/i, async ()=>{ // 分页信息
        await sleep(1000);

        return {
            count: 100,
            more: true,
            current: [
                {id: 1, no: 'no1', name: 'n1', username: 'u1', sex: 'female' },
                {id: 2, no: 'no2', name: 'n2', username: 'u2', sex: 'male' },
                {id: 3, no: 'no3', name: 'n3', username: 'u3', sex: 'male' },
                {id: 4, no: 'no4', name: 'n4', username: 'u4', sex: 'male' },
                {id: 5, no: 'no5', name: 'n5', username: 'u5', sex: 'male' },
            ]
        };
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
}

export function restore() {
    fetchMock.restore();
}
