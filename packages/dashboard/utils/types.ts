// SPDX-License-Identifier: MIT

/**
 * Object 的类型定义
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectType = Record<string, any>;

/**
 * Form.validateFields 的类型
 */
export type ValidateFields<T extends ObjectType> = (values: T) => Partial<Record<keyof T, unknown>>
