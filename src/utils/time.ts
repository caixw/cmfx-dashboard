// SPDX-License-Identifier: MIT

/**
 * 延时返回
 * @param ms 时间，以毫秒为单位
 * @returns
 */
export function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
