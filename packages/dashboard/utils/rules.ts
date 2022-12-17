// SPDX-License-Identifier: MIT

import { RuleItem } from "@douyinfe/semi-ui/lib/es/form";

import { Locale } from "@dashboard/locales";

export const rules = {
    /**
     * 始终返回验证正确的验证规则
     */
    ok: {validator(){return true;}},

    required(l: Locale): RuleItem {
        return { required: true, message: l.errors.required };
    },

    email(l: Locale): RuleItem {
        return { type: 'email', message: l.errors.invalid_format };
    },

    url(l: Locale): RuleItem {
        return { type: 'url', message: l.errors.invalid_format };
    },

    date(l: Locale): RuleItem {
        return { type: 'date', message: l.errors.invalid_format };
    },

    pattern(pattern: RegExp | string, l: Locale): RuleItem {
        return { pattern: pattern, message: l.errors.invalid_format };
    }
};
