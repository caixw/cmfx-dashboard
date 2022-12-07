// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { pagingMock } from './table';
import { adminMock } from './admin';
import { asyncMock } from './async';

export function mock(){
    fetchMock.config.overwriteRoutes = true;

    fetchMock.post('path:/admin/login', ()=>{
        return {
            access_token: 'access',
            refresh_token: 'refresh',
            expires: 3600
        };
    }, {delay: 1000});

    fetchMock.delete('path:/admin/login', 204);

    fetchMock.get('path:/admin/info', {
        name: '姓名',
        nickname: '昵称',
        username: '账号',
        sex: 'female',
        state: 'normal'
    });

    fetchMock.get(/.+security-log/i, ()=>{ // 安全日志
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
    asyncMock();
}

export function restore() {
    fetchMock.restore();
}
