// SPDX-License-Identifier: MIT

export interface Admin {
    name?: string
    nickname?: string
    username?: string
    state?: 'normal' | 'locked' | 'left'
    avatar?: string
    sex?: Sex
}

export type Sex = 'unknown' | 'male' | 'female'
