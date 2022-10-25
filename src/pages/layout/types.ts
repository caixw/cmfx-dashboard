// SPDX-License-Identifier: MIT

export interface User {
    name: string
    nickname: string
    username: string
    state: 'normal' | 'locked' | 'left'
    avatar?: string
    sex: Sex
}

export type Sex = 'unknown' | 'male' | 'female'
