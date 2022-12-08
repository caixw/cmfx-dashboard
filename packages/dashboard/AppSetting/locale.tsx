// SPDX-License-Identifier: MIT

import React, { useContext } from 'react';
import { Radio, RadioGroup } from '@douyinfe/semi-ui';
import { RadioChangeEvent } from '@douyinfe/semi-ui/lib/es/radio';

import { useLocale, locales } from '@dashboard/locales';
import { AppContext } from '@dashboard/App';

export function LocaleSelectorUI() {
    const l = useLocale();
    const ctx = useContext(AppContext);

    return <RadioGroup value={ctx.localeCode} onChange={(e: RadioChangeEvent)=>ctx.localeCode = e.target.value}>
        {
            Array.from(locales.keys()).map((key)=>
                <Radio key={key} value={key}>
                    {l.locale[key]}<span style={{color:'var(--semi-color-disabled-text)'}}>({key})</span>
                </Radio>
            )
        }
    </RadioGroup>;
}
