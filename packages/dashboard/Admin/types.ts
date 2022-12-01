// SPDX-License-Identifier: MIT

import type { Admin as a, Sex } from '@dashboard/App/admin';
import type { Locale } from '@dashboard/locales';

export { Sex };

export interface Group {
    id: number
    name: string
    description: string
    parent?: number
}

export type Admin = a & {group: number};

export function getSexes(l: Locale): Map<Sex, string> {
    return new Map<Sex, string>([
        ['male', l.common.male_sex],
        ['female', l.common.female_sex],
        ['unknown', l.common.unknown_sex],
    ]);
}

export function getStates(l: Locale): Map<string, string> {
    return new Map<string, string>([
        ['normal', l.common.normal_state],
        ['locked', l.common.locked_state],
        ['left', l.common.left_state],
    ]);
}
