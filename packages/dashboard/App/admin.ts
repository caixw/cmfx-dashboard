// SPDX-License-Identifier: MIT

import { Context } from "./context";

export interface Admin {
    id: number
    name: string
    nickname: string
    username: string
    state: 'normal' | 'locked' | 'left'
    avatar?: string
    sex: Sex
    super?: boolean // 是否为超级管理员
}

export type Sex = 'unknown' | 'male' | 'female'

export async function getInfo(ctx: Context): Promise<Admin> {
    const r = await ctx.get('/info');
    if (!r.ok) {
        console.error(r.problem);
    }
    return r.body as Admin;
}
