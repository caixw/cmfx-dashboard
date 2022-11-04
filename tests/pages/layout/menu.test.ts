// SPDX-License-Identifier: MIT

import { test, describe, expect } from 'vitest';

import { buildLabels } from '@/pages/layout/menu';

describe('buildLabels',()=>{
    test('空', ()=>{
        expect(buildLabels({})).toEqual([]);
    });

    test('顺序是否一致', ()=>{
        expect(buildLabels({
            labels: [
                ()=>{return '1';},
                ()=>{return '2';},
                ()=>{return '3';},
            ]
        })).toEqual(['1', '2', '3']);
    });
});
