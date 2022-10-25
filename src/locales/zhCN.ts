// SPDX-License-Identifier: MIT

import { getCanonicalLocale } from '@/pages/app/locale';

// eslint-disable-next-line
const messages: Record<string, any> = {};
messages[getCanonicalLocale('zh-cn')] = {
    locale: {
        'de-DE': '德语',
        'en-GB': '英国英语',
        'en-US': '英语',
        'eo': '世界语',
        'es-AR': '西班牙语（阿根廷)',
        'fr-FR': '法语',
        'id-ID': '印度尼西亚语',
        'it-IT': '意大利语',
        'ja-JP': '日语',
        'ko-KR': '韩语',
        'nb-NO': '书面挪威语',
        'nl-NL': '荷兰语（荷兰）',
        'pl-PL': '波兰语（波兰）',
        'pt-BR': '葡萄牙语 (巴西)',
        'ru-RU': '俄罗斯语',
        'sk-SK': '斯洛伐克语',
        'th-TH': '泰语（泰国）',
        'uk-UA': '乌克兰语',
        'vi-VN': '越南语（越南）',
        'zh-CN': '简体中文',
        'zh-TW': '繁体中文'
    },
    common: {
        default: '默认',
        login: '登录',
        logout: '退出',
        password: '密码',
        required: '不能为空',
        reset: '重置',
        security_log: '安全日志',
        settings: '设置',
        username: '账号'
    },
    theme: {
        dark: '暗色模式',
        light: '亮色模式',
        os: '跟随系统'
    }
};

export default messages;
