// SPDX-License-Identifier: MIT

import { withField } from '@douyinfe/semi-ui';
import React, { CSSProperties, ReactNode } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = Pick<ReactQuillProps, 'onChange' | 'value' | 'placeholder' | 'readOnly'> & {
    /**
     * 编辑器的高度
     *
     * 如果是数值类型，则默认其单位为 px。
     */
    height?: string | number

    /**
     * 内联的标题，如果不为空将出现在 toolbar 最左侧。
     */
    insetLabel?: ReactNode

    /**
     * 唯一 ID，必填，当一个页面有多个编辑器时，采用此值进行区分。
     */
    id: string
};

/**
 * 内嵌于 Form 的编辑器
 */
export const FormWYSIWYG = withField(WYSIWYG, {
    valueKey: 'value',
    onKeyChangeFnName: 'onChange',
    valuePath: 'target.value',
});

/**
 * 所见即所得的在线编辑器
 *
 * 如果要设置高度，可直接通过 style 属性进行设置。
 */
export function WYSIWYG(props: Props): JSX.Element {
    const toolbarID = props.id + '-toolbar';
    const modules = {
        toolbar: { container: '#'+toolbarID }
    };

    const {height, insetLabel, ...p} = props;
    return <div id={props.id}>
        {createToolbar(toolbarID, insetLabel)}
        <ReactQuill {...p} modules={modules} style={getStyle(height)} />
    </div>;
}

export function getStyle(height?: number | string): CSSProperties | undefined {
    switch (typeof height) {
    case 'number':
        return { height: height.toString() + 'px' };
    case 'string':
        return { height };
    }
}

function createToolbar(id: string, label?: ReactNode): JSX.Element {
    return <div id={id}>
        <span className="ql-formats label">
            <span>{label}</span>
        </span>
        <span className="ql-formats">
            <select className="ql-font"></select>
            <select className="ql-size"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-header" value="1"></button>
            <button className="ql-header" value="2"></button>
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-direction" value="rtl"></button>
            <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-video"></button>
            <button className="ql-formula"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-clean"></button>
        </span>
    </div>;
}
