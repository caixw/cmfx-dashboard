// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { sleep } from 'cmfx-dashboard';
import { pagingMock } from './paging';
import { adminMock } from './admin';

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

    fetchMock.get(/.+security-log/i, async ()=>{ // 安全日志
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

    adminMock();
    pagingMock();
}

export function restore() {
    fetchMock.restore();
}
