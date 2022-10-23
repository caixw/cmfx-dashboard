// SPDX-License-Identifier: MIT

import { getCanonicalLocale } from '@/pages/app/locale';

// eslint-disable-next-line
const messages: Record<string, any> = {};
messages[getCanonicalLocale('zh-TW')] = {
    message: {
        login: '登錄',
        username: '賬號',
        password: '密碼',
        reset: '重置',
        required: '不能為空'
    }
};

export default messages;
