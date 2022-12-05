// SPDX-License-Identifier: MIT

import React from "react";
import { RouteObject } from 'react-router-dom';

import { Admins } from "./admin";
import { Edit } from "./edit";
import { GroupAccess } from "./access";
import { Groups } from "./group";

/**
 * 返回一组与管理员操作相关的路由设定
 * @param path 该系列路由的根路径
 */
export function AdminsRoute(path: string): Array<RouteObject> {
    return [
        {
            path: path,
            element: <Admins />,
        },
        {
            path: path+'/:id',
            element: <Edit />,
        }
    ];
}

/**
 * 返回与权限操作相关的路由设定
 * @param path 该系列路由的根路径
 */
export function GroupsRoute(path: string): Array<RouteObject> {
    return [
        {
            path: path,
            element: <Groups />
        },
        {
            path: path+'/:id/access',
            element: <GroupAccess />
        }
    ];
}
