// SPDX-License-Identifier: MIT

import { RouteObject } from 'react-router-dom';

export function checkRoutes(parent: string, keys: Array<string>, routes: Array<RouteObject>) {
    for(const r of routes) {
        if (keys.find((v)=>{return v==r.path;})) {
            throw `存在同名的路由: ${r.path}`;
        }
        if (r.path) {
            keys.push(r.path);
        }

        if (r.children) {
            const last = parent.at(parent.length-1);
            const start = r.path ? r.path.at(0) : '';
            if (last === '/' && start === '/') {
                r.path = r.path?.slice(1);
            }else if (last !== '/' && start !== '/') {
                r.path = '/' + r.path;
            }
            checkRoutes(parent += r.path, keys, r.children);
        }
    }
}
