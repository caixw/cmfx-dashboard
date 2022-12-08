// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { Radio, RadioGroup } from '@douyinfe/semi-ui';
import { RadioChangeEvent } from '@douyinfe/semi-ui/lib/es/radio';

import { Locale, LocaleConsumer } from '@dashboard/locales';

export type ThemeMode = 'os' | 'dark' | 'light';

// 该值同时用于保存在 localStorage 与 semi 在 body 上设置的字段名。
const themeModeKey = 'theme-mode';

const themeModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');

export function initThemeMode() {
    setThemeMode(getThemeMode());
}

function getThemeMode(): ThemeMode {
    return window.localStorage.getItem(themeModeKey) as ThemeMode || 'os';
}

function setThemeMode(mode: ThemeMode) {
    switch (mode) {
    case 'dark':
        changeThemeMode(mode);
        themeModeMatcher.removeEventListener('change', listenThemeMode);
        return;
    case 'light':
        changeThemeMode(mode);
        themeModeMatcher.removeEventListener('change', listenThemeMode);
        return;
    case 'os':
        if (themeModeMatcher.matches) {
            changeThemeMode('dark');
        }
        themeModeMatcher.addEventListener('change', listenThemeMode);
    }
}

function listenThemeMode(e: MediaQueryListEvent) {
    changeThemeMode(e.matches ? 'dark' : 'light');
}

function changeThemeMode(mode: 'dark' | 'light') {
    const body = document.body;
    switch (mode) {
    case 'dark':
        if (body.getAttribute(themeModeKey) !== 'dark') {
            body.setAttribute(themeModeKey, 'dark');
        }
        return;
    case 'light':
        if (body.hasAttribute(themeModeKey)) {
            body.removeAttribute(themeModeKey);
        }
        return;
    }
}

export function ModeSelectorUI() {
    const m = getThemeMode();
    setThemeMode(m);
    const [mode, setMode] = useState(m);

    const change = (e: RadioChangeEvent)=>{
        window.localStorage.setItem(themeModeKey, e.target.value);
        setThemeMode(e.target.value);
        setMode(e.target.value);
    };

    return <LocaleConsumer>
        {
            (l: Locale) => {
                return <RadioGroup aria-label={l.appSetting.theme} onChange={change} value={mode}>
                    <Radio value='os'>{l.appSetting.theme_os}</Radio>
                    <Radio value='dark'>{l.appSetting.theme_dark}</Radio>
                    <Radio value='light'>{l.appSetting.theme_light}</Radio>
                </RadioGroup>;
            }
        }
    </LocaleConsumer>;
}
