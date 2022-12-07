// SPDX-License-Identifier: MIT

import fetchMock from 'fetch-mock';

import { Group, Admin } from 'cmfx-dashboard/Admin/types';
import { getQuery } from './utils';
import Avatar from '@/assets/react.svg';

function getID(url: string): number {
    const index = url.lastIndexOf('/');
    return parseInt(url.substring(index+1));
}

const groups: Array<Group> = [
    {id:1, name: '管理员', description: '管理员的描述信息', parent: 0},
    {id:2, name: '权限组2', description: '权限组2的描述信息', parent: 0},
    {id:3, name: '子权限组2', description: '子权限组2的描述信息', parent: 2},
];
let groupsIndex = groups.length;

function buildAdmins(size: number): Array<Admin> {
    const admins: Array<Admin> = [];
    for(let i=1;i<=size;i++) {
        let state = 'normal';
        let sex = 'unknown';
        let avatar = '';
        const v = i%3;
        switch (v) {
        case 0:
            break;
        case 1:
            state = 'locked';
            sex = 'female';
            break;
        case 2:
            state = 'left';
            sex = 'male';
            avatar = Avatar;
        }
        admins.push({
            id: i,
            name: `管理员${i}`,
            username: `admin${i}`,
            nickname: `管理员昵称${i}`,
            group: v+1,
            super: i === 1,
            state, sex, avatar});
    }
    return admins;
}

const admins = buildAdmins(50);
let adminsIndex = admins.length;

export function adminMock() {
    fetchMock.get('path:/admin/groups', (url)=>{
        console.debug('get', url);
        return groups;
    }, {delay: 500});

    fetchMock.post('path:/admin/groups', (url, opt) => {
        console.debug('post', url);
        groupsIndex++;
        const obj = JSON.parse(opt.body as string) as Group;
        obj.id = groupsIndex;
        groups.push(obj);
        return 201;
    }, {delay: 500});

    fetchMock.delete('express:/admin/groups/:id', (url)=>{
        const id = getID(url);
        console.debug('delete:', url, id);
        const index = groups.findIndex((v)=>{return v.id === id;});
        groups.splice(index, 1);
        return 204;
    }, {delay: 500});

    fetchMock.put('express:/admin/groups/:id',(url, opt) => {
        const id = getID(url);
        console.debug('put', url, id);
        const index = groups.findIndex((v)=>{return v.id === id;});
        const obj = JSON.parse(opt.body as string) as Group;
        obj.id = id;
        groups[index] = obj;
        return 204;
    }, {delay:500});

    fetchMock.get('path:/admin/admins', (url)=>{
        console.debug(url);
        const page = parseInt(getQuery(url, 'page', '0'));
        const size = parseInt(getQuery(url, 'size', '33'));
        const start = page * size;
        const end = start + size;
        if (start>admins.length) {
            return 404;
        }
        return {
            current: admins.slice(start, end),
            more: end < admins.length,
            count: admins.length
        };
    }, {delay: 500});

    fetchMock.post('path:/admin/admins', (url, opt) => {
        console.debug('post', url, opt.body);
        adminsIndex++;
        const obj = JSON.parse(opt.body as string) as Admin;
        obj.id = adminsIndex;
        admins.push(obj);
        return 201;
    }, {delay: 500});

    fetchMock.get('express:/admin/admins/:id', (url)=>{
        const id = getID(url);
        console.debug('get:', url, id);
        return admins.find((v)=>{return v.id === id;});
    }, {delay: 500});

    fetchMock.delete('express:/admin/admins/:id', (url)=>{
        const id = getID(url);
        console.debug('delete:', url, id);
        const index = admins.findIndex((v)=>{return v.id === id;});
        admins.splice(index, 1);
        return 204;
    }, {delay: 500});

    fetchMock.patch('express:/admin/admins/:id',(url, opt) => {
        const id = getID(url);
        console.debug('patch', url, opt.body);
        const index = admins.findIndex((v)=>{return v.id === id;});
        const obj = JSON.parse(opt.body as string) as Admin;
        obj.id = id;
        obj.username = admins[index].username;
        admins[index] = obj;
        return 204;
    }, {delay:500});
}
