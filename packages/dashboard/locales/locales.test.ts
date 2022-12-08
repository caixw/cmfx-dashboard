// SPDX-License-Identifier: MIT

import { test, expect, describe } from 'vitest';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';

import { getLocaleCode, setLocaleCode, getLocale, install, locales } from './locales';

describe('storage locale', ()=>{
    test('get null', ()=>{
        expect(getLocaleCode()).toEqual('zh-CN');
    });

    test('set locale code', ()=>{
        setLocaleCode('zh-TW');
        expect(getLocaleCode()).toEqual('zh-TW');
    });
});

describe('getLocale', ()=>{
    test('正常', ()=>{
        expect(getLocale('zh-TW')).not.toBeNull();
    });

    test('not exists', ()=>{
        expect(()=>getLocale('not-exists')).toThrowError('无效的本地化代码');
    });
});

describe('install', ()=>{
    test('zh-CN', ()=>{
        install(zh_CN.code, {abc: 'ABC'});
        expect(locales.get(zh_CN.code)?.Cmfx.custom).toEqual({abc:'ABC'});
    });

    test('zh-CN 覆盖', ()=>{
        install(zh_CN.code, {'abc': 'ABCD', 'abc.def': 'DEF'});
        expect(locales.get(zh_CN.code)?.Cmfx.custom).toEqual({abc:'ABCD', 'abc.def': 'DEF'});
    });

    test('not-exists', ()=>{
        expect(()=>install('not-exists', {abc: 'ABC'})).toThrowError('不支持 not-exists 的本地化');
    });
});
