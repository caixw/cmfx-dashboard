// SPDX-License-Identifier: MIT

import type { InjectionKey, App } from 'vue';

import type { Options } from './options';
import { presetOptions } from './options';


export const optionsKey = Symbol() as InjectionKey<Required<Options>>;

/**
 * 创建 options 插件
 * @param o 选项
 * @returns
 */
export function createOptions(o: Options) {
    return {
        install(app: App) {
            o = Object.assign(presetOptions, o);
            app.provide(optionsKey, o);
        }
    };
}
