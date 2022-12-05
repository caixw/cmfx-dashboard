// SPDX-License-Identifier: MIT

import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';

import type { Admin as a, Sex } from '@dashboard/App/admin';
import { Context } from '@dashboard/App/context';
import type { Locale } from '@dashboard/locales';
import { objectsToSelectOptions } from '@dashboard/utils/select';

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

export async function loadGroupsSelectOptions(ctx: Context): Promise<Array<OptionProps>> {
    const r = await ctx.get('/groups');
    if (!r.ok) {
        console.error(r.problem);
        return [];
    }
    return objectsToSelectOptions(r.body as Array<Group>, 'name', 'id');
}
