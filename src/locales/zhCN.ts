// SPDX-License-Identifier: MIT

import { getCanonicalLocale } from '@/pages/app/locale';

// eslint-disable-next-line
const messages: Record<string, any> = {};
messages[getCanonicalLocale('zh-cn')] = {
    message: {
        login: '登录',
        username: '账号',
        password: '密码',
        reset: '重置',
        required: '不能为空'
    }
};

export default messages;
