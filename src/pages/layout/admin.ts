// SPDX-License-Identifier: MIT

import { Cmfx } from '@/pages/app';

export interface Admin {
    name: string
    nickname: string
    username: string
    state: 'normal' | 'locked' | 'left'
    avatar?: string
    sex: Sex
}

export type Sex = 'unknown' | 'male' | 'female'

export async function getInfo($cmfx: Cmfx): Promise<Admin> {
    const r = await $cmfx.get('/info');
    if (!r.ok) {
        console.error(r.problem);
    }
    return r.body as Admin;
}
