// SPDX-License-Identifier: MIT

import { useLocale } from '@dashboard/locales';

/**
 * 表示 HTTP 状态错误
 */
export class ResponseError extends Error {
    status: number;
    statusText: string;

    constructor(status: number, title?: string) {
        if (!title) {
            const loc = useLocale();
            title = loc.errors[`error_${status}`] ?? `并未实现对 ${status} 错误的翻译`;
        }
        super(title);
        this.status = status;
        this.statusText = title;
    }
}
