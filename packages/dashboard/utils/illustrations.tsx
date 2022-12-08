// SPDX-License-Identifier: MIT

import React from "react";
import {
    IllustrationNoAccess, IllustrationNoAccessDark,
    IllustrationNotFound, IllustrationNotFoundDark,
    IllustrationFailure, IllustrationFailureDark,
} from '@douyinfe/semi-illustrations';

export interface Image {
    light: React.ReactNode
    dark: React.ReactNode
}

const illustrations = new Map<number, Image>([
    [403, { light: <IllustrationNoAccess />, dark: <IllustrationNoAccessDark />} ],
    [404, { light: <IllustrationNotFound />, dark: <IllustrationNotFoundDark />} ],
    [500, { light: <IllustrationFailure />, dark: <IllustrationFailureDark />} ],
]);

/**
 * 获取插图
 * @param index 图片的编号，如果不需要，传递 undefined 即可。
 */
export function illustration(index?: number): Image | undefined {
    if (index !== undefined) {
        const img = illustrations.get(index);
        if (!img) {
            throw Error(`指定的插图 ${index} 并不存在`);
        }
        return img;
    }
}
