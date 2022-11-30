// SPDX-License-Identifier: MIT

export type { Admin, Sex } from '@dashboard/App/admin';

export interface Group {
    id: number
    name: string
    description: string
    parent?: number
}
