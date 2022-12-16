// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, install } from 'cmfx-dashboard';
import 'cmfx-dashboard/style.css';

import { mock } from './mock';
import { options } from './options';

install('zh-CN', {
    demo: {
        button: '按钮',
        errpage: {
            p404: '404 页面翻译项'
        }
    }
});

install('zh-TW', {
    demo: {
        button: '按钮_TW',
        errpage: {
            p404: '404 页面翻译项_TW'
        }
    }
});

if (import.meta.env.VITE_MOCK) {
    console.debug('启用 mock 数据用于测试，如果需要完整的测试数据，请运行 https://github.com/issue9/cmfx 程序');
    mock();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App options={options} />
    </React.StrictMode>
);
