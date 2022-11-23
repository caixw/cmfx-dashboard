// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';

import { checkRoutes } from './route';

describe('checkRoute', ()=>{
    test('有重复的 path', ()=>{
        const routes = [
            {path: '/id'},
            {path: '/id'}
        ];

        expect(()=>checkRoutes('', [], routes)).toThrowError('存在同名的路由');
    });

    test('正常', ()=>{
        const routes = [
            {path: '/id-1'},
            {
                path: '/id-2',
                children: [
                    { path: 'id2-1' },
                    { path: '/id2-2' },
                    {
                        path: '/id2-3/',
                        children: [
                            { path: '/id3-1' },
                            { path: '/id3-2' },
                            {
                                path: '/id3-3'
                            },
                        ]
                    },
                ]
            }
        ];

        expect(()=>checkRoutes('', [], routes)).not.toThrow();
    });
});

