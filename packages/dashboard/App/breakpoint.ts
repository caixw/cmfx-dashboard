// SPDX-License-Identifier: MIT

import { SiderProps, ResponsiveMap } from '@douyinfe/semi-ui/lib/es/layout';

export type Breakpoint = NonNullable<SiderProps['onBreakpoint']>;

export const breakpoints: Array<Breakpoint> = [];

/**
 * 注册一个用于处理响应式的函数
 *
 * 该功能最终依赖 Layout.Sider 的相关功能，如果 Layout.Sider 失效，
 * 当前方法注册的内容也将不能使用。
 * @param f 响应式处理函数
 * @returns 取消当前注册的方法
 */
export function registerBreakpoint(f: Breakpoint): ()=>void {
    breakpoints.push(f);
    return ()=>{
        const index = breakpoints.indexOf(f);
        if (index >= 0) {
            breakpoints.splice(index, 1);
        }
    };
}

export function triggerBreakpoint(screen: keyof ResponsiveMap, match: boolean): void {
    breakpoints.forEach((f)=>f(screen, match));
}
