// SPDX-License-Identifier: MIT

import { ResponseError } from 'cmfx-dashboard';

export function ErrorDemo(): JSX.Element {
    throw new Error('throw new Error()');
}

export function ResponseErrorDemo(props: {status: number, title?: string}): JSX.Element {
    throw new ResponseError(props.status, props.title);
}

export function StringErrorDemo(): JSX.Element {
    throw '这是字符串类型的错误: throw "string"';
}
