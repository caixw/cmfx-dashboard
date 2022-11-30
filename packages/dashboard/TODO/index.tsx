// SPDX-License-Identifier: MIT

import React from "react";

export function TODO(props: {text?: string}) {
    let text = props.text;
    if (!text) {
        text = 'TODO';
    }
    return <div>{text}</div>;
}
