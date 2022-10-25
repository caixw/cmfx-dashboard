// SPDX-License-Identifier: MIT

import { getCanonicalLocale } from '@/pages/app/locale';

// eslint-disable-next-line
const messages: Record<string, any> = {};
messages[getCanonicalLocale('zh-TW')] = {
    locale: {
        'de-DE': '德語',
        'en-GB': '英國英語',
        'en-US': '英語',
        'eo': '世界語',
        'es-AR': '西班牙語（阿根廷)',
        'fr-FR': '法語',
        'id-ID': '印度尼西亞語',
        'it-IT': '意大利語',
        'ja-JP': '日語',
        'ko-KR': '韓語',
        'nb-NO': '書面挪威語',
        'nl-NL': '荷蘭語（荷蘭）',
        'pl-PL': '波蘭語（波蘭）',
        'pt-BR': '葡萄牙語 (巴西)',
        'ru-RU': '俄羅斯語',
        'sk-SK': '斯洛伐克語',
        'th-TH': '泰語（泰國）',
        'uk-UA': '烏克蘭語',
        'vi-VN': '越南語（越南）',
        'zh-CN': '簡體中文',
        'zh-TW': '繁體中文'
    },
    common: {
        login: '登錄',
        username: '賬號',
        password: '密碼',
        reset: '重置',
        default: '默認',
        required: '不能為空'
    },
    theme: {
        dark: '暗色模式',
        light: '亮色模式',
        os: '跟隨系統'
    }
};

export default messages;
