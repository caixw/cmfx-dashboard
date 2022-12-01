// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { Group } from 'cmfx-dashboard/Admin/types';

function getID(url: string): number {
    const index = url.lastIndexOf('/');
    return parseInt(url.substring(index+1));
}

const groups: Array<Group> = [
    {id:1, name: '管理员', description: '管理员的描述信息', parent: 0},
    {id:2, name: '权限组2', description: '权限组2的描述信息', parent: 0},
    {id:3, name: '子权限组2', description: '子权限组2的描述信息', parent: 2},
];

export function adminMock() {
    fetchMock.get('path:/admin/groups', async(url)=>{
        console.debug('get', url);
        return groups;
    }, {delay: 500});

    fetchMock.post('path:/admin/groups', async (url, opt) => {
        console.debug('post', url);
        groups.push(opt.body as unknown as Group);
        return 201;
    }, {delay: 500});

    fetchMock.delete('express:/admin/groups/:id', async(url)=>{
        const id = getID(url);
        console.debug('delete:', url, id);
        const index = groups.findIndex((v)=>{return v.id === id;});
        groups.splice(index, 1);
        return 204;
    }, {delay: 500});

    fetchMock.put('express:/admin/groups/:id',async (url, opt) => {
        const id = getID(url);
        console.debug('put', url, id);
        const index = groups.findIndex((v)=>{return v.id === id;});
        groups[index] = opt.body as unknown as Group;
        return 204;
    }, {delay:500});

    fetchMock.get('path:/admin/admins', async(url)=>{
        console.debug(url);
        // TODO
        return [];
    }, {delay: 500});
}
