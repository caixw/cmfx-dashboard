// SPDX-License-Identifier: MIT

import {describe, expect, test} from 'vitest';

import { breakpoints, registerBreakpoint, triggerBreakpoint } from './breakpoint';

describe('breakpoint', ()=>{
    let count = 0;
    expect(breakpoints).toHaveLength(0);
    expect(count).toEqual(0);

    test('registerBreakpoint', ()=>{
        const cancel = registerBreakpoint(()=>count++);
        expect(cancel).not.toBeFalsy();
        expect(breakpoints).toHaveLength(1);

        triggerBreakpoint('sm', true);
        expect(count).toEqual(1);

        cancel();
        cancel(); // 多次取消
        expect(breakpoints).toHaveLength(0);
    });

    test('registerBreakpoint 多个', ()=>{
        const c1 = registerBreakpoint(()=>count++);
        expect(c1).not.toBeFalsy();
        expect(breakpoints).toHaveLength(1);

        const c2 = registerBreakpoint(()=>count+=2);
        expect(c2).not.toBeFalsy();
        expect(breakpoints).toHaveLength(2);

        triggerBreakpoint('sm', true);
        expect(count).toEqual(4);

        c1();
        c1();
        triggerBreakpoint('sm', true);
        expect(count).toEqual(6); // 仅 c2，每次 +2
        expect(breakpoints).toHaveLength(1);

        c2();
        triggerBreakpoint('sm', true);
        expect(count).toEqual(6); // 没有了
        expect(breakpoints).toHaveLength(0);
    });
});
