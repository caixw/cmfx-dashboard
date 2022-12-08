// SPDX-License-Identifier: MIT

/**
 * 表示 HTTP 状态错误
 */
export class ResponseError extends Error {
    status: number;
    statusText: string;

    constructor(status: number, title: string) {
        super(title);
        this.status = status;
        this.statusText = title;
    }
}
