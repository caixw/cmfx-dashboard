// SPDX-License-Identifier: MIT

import { test, expect } from 'vitest';

import { buildURL } from './api';

test('buildURL', ()=>{
    expect(buildURL('https://example.com','message')).toEqual('https://example.com/message');
    expect(buildURL('https://example.com','/message')).toEqual('https://example.com/message');
    expect(buildURL('https://example.com/','message')).toEqual('https://example.com/message');
    expect(buildURL('https://example.com/','/message')).toEqual('https://example.com/message');
});

