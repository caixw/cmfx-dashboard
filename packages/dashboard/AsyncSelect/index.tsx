// SPDX-License-Identifier: MIT

import { getSelect, Props, FormProps } from './select';

export function AsyncFormSelect(props: FormProps): JSX.Element {
    return getSelect(true, props);
}

export function AsyncSelect(props: Props): JSX.Element {
    return getSelect(false, props);
}
