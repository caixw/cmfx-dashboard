// SPDX-License-Identifier: MIT

import React from "react";
import { RouteObject } from 'react-router-dom';

import { Admins } from "./admin";
import { Edit } from "./edit";
import { Access } from "./access";

/**
 * 返回一组与管理员操作相关的路由设定
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
        },
        {
            path: path+'/:id/access',
            element: <Access />,
        },
    ];
}

