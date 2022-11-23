// SPDX-License-Identifier: MIT

import React, { useContext } from 'react';

import { Radio, RadioGroup } from '@douyinfe/semi-ui';

import { LocaleConsumer, locales } from '@dashboard/locales';
import { AppContext } from '@dashboard/App/context';

export function LocaleSelectorUI() {
    const ctx = useContext(AppContext);

    return <LocaleConsumer>
        {
            (l) => {
                return <RadioGroup value={ctx.localeCode} onChange={(e)=>ctx.localeCode = e.target.value}>
                    {
                        Array.from(locales.keys()).map((key)=>
                            <Radio key={key} value={key}>
                                {l.locale[key]}<span style={{color:'var(--semi-color-disabled-text)'}}>({key})</span>
                            </Radio>
                        )
                    }
                </RadioGroup>;
            }
        }
    </LocaleConsumer>;
}
