// SPDX-License-Identifier: MIT

import React from 'react';
import { SideSheet, Divider } from '@douyinfe/semi-ui';
import { IconDuration, IconColorPalette, IconLanguage } from '@douyinfe/semi-icons';
import { SideSheetProps } from '@douyinfe/semi-foundation/lib/es/sideSheet/sideSheetFoundation';

import { LocaleConsumer, Locale } from '@dashboard/locales';
import { LocaleSelectorUI } from './locale';
import { ModeSelectorUI, initThemeMode } from './mode';
import { ThemeSelectorUI, initTheme } from './theme';

// 根据设置项初始化整个应用
export function init() {
    initThemeMode();
    initTheme();
}

/**
 * 应用设置组件
 */
export function AppSetting(props: Pick<SideSheetProps, 'visible' | 'onCancel'>): JSX.Element {
    return <LocaleConsumer>
        {
            (l: Locale) => {
                return <SideSheet title={l.appSetting.appSetting} visible={props.visible} onCancel={props.onCancel}>
                    <Divider align="left"><IconDuration />&#160;{l.appSetting.theme_mode}</Divider>
                    <br />
                    <ModeSelectorUI />

                    <br /><br />

                    <Divider align="left"><IconColorPalette />&#160;{l.appSetting.theme}</Divider>
                    <br />
                    <ThemeSelectorUI />

                    <br /><br />

                    <Divider align="left"><IconLanguage />&#160;{l.locale.locale}</Divider>
                    <br />
                    <LocaleSelectorUI />
                    <br /><br />
                </SideSheet>;
            }
        }
    </LocaleConsumer>;
}
