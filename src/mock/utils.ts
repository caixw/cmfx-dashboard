// SPDX-License-Identifier: MIT

export function getQuery(url: string, key: string, def: string): string {
    const u = new URL(url);
    return u.searchParams.get(key) ?? def;
}
