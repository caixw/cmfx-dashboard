// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { Checkbox, Radio, RadioGroup } from '@douyinfe/semi-ui';
import { IconStop } from '@douyinfe/semi-icons';
import { RadioChangeEvent } from '@douyinfe/semi-ui/lib/es/radio';
import a11y from '@semi-bot/semi-theme-a11y/semi.min.css?inline';
import { CheckboxEvent } from '@douyinfe/semi-ui/lib/es/checkbox';

import { Locale, LocaleConsumer } from '@dashboard/locales';

const themeStyleID = 'cmfx-theme-style-id';

const a11yKey = 'theme-a11y';
const colorKey = 'theme-color';

// 预定义的色阶表，由 semi 提供：
// https://semi.design/zh-CN/basic/tokens
const colors: ReadonlyArray<string> = [
    '--semi-blue', // 第一个元素为默认值
    '--semi-amber',
    '--semi-cyan',
    '--semi-green',
    '--semi-grey',
    '--semi-indigo',
    '--semi-light-blue',
    '--semi-light-green',
    '--semi-lime',
    '--semi-orange',
    '--semi-pink',
    '--semi-purple',
    '--semi-red',
    '--semi-teal',
    '--semi-violet',
    '--semi-yellow',
];

function setColor(name?: string) {
    const s = document.body.style;

    if (!name) {
        s.removeProperty('--semi-color-primary');
        s.removeProperty('--semi-color-primary-hover');
        s.removeProperty('--semi-color-primary-active');
        s.removeProperty('--semi-color-primary-disabled');

        window.localStorage.removeItem(colorKey);
        return;
    }

    if (!colors.includes(name)) {
        console.error(`颜色名称 ${name} 并不存在于预定义表中`);
        return;
    }

    const build = (level: number): string => {
        return buildColor(name, level);
    };

    s.setProperty('--semi-color-primary', build(5));
    s.setProperty('--semi-color-primary-hover', build(6));
    s.setProperty('--semi-color-primary-active', build(7));
    s.setProperty('--semi-color-primary-disabled', build(2));

    window.localStorage.setItem(colorKey, name);
}

export function buildColor(name: string, level: number): string {
    return `rgba(var(${name}-${level}),1)`;
}

function setA11y(enabled?: boolean) {
    if (enabled) {
        const style = document.createElement('style');
        style.id = themeStyleID;
        style.setAttribute('type', 'text/css');
        style.innerText = a11y;
        document.head.appendChild(style);

        window.localStorage.setItem(a11yKey, 'true');
    } else {
        const style = document.getElementById(themeStyleID);
        if (style) {
            document.head.removeChild(style);
        }

        window.localStorage.removeItem(a11yKey);
    }
}

export function initTheme() {
    setA11y(window.localStorage.getItem(a11yKey) ? true : false);
    setColor(window.localStorage.getItem(colorKey) || colors[0]);
}

export function ThemeSelectorUI() {
    const a11yEnabled = window.localStorage.getItem(a11yKey) ? true : false;
    const [a11y, enabledA11y] = useState<boolean | undefined>(a11yEnabled);

    const [colorName, setColorName] = useState(window.localStorage.getItem(colorKey) || colors[0]);

    const changeColor = (e: RadioChangeEvent) => {
        setColorName(e.target.value);
        setColor(e.target.value);
    };

    const changeA11y = (e: CheckboxEvent) => {
        enabledA11y(e.target.checked);
        setA11y(e.target.checked);
    };

    return <LocaleConsumer>
        {
            (l: Locale)=> {
                return <>
                    <RadioGroup disabled={a11y} aria-label={l.appSetting.theme} type="pureCard" value={colorName} onChange={changeColor}>
                        {
                            colors.map((t)=>
                                <Radio key={t} value={t} style={{marginRight: '0', padding: '0'}}>
                                    <IconStop size='extra-large' style={{color:buildColor(t, 5)}} />
                                </Radio>
                            )
                        }
                    </RadioGroup>
                    <Checkbox defaultChecked={a11y} onChange={changeA11y} style={{marginTop: '20px'}} extra={l.appSetting.a11y_detail}>{l.appSetting.a11y}</Checkbox>
                </>;
            }
        }
    </LocaleConsumer>;
}
