import { formatWithOptions } from 'util';

import {
    isEqual,
    isNotZero,
    isNumber,
    isObjectHave,
    isStringHave
} from '@curong/types';

import fontColor from './fontColor';
import type { ColorName, ForMatInfo, ForMatOptions } from './types';

const LF = '\n';

/**
 * 制作大标题
 *
 * @param type 标题的类型，默认为 `error`
 * @param title 标题的名称
 * @returns 返回制作好的大标题文本
 */
function makeTitle(type: ForMatInfo['type'] = 'error', title?: string): string {
    if (!isStringHave(title)) {
        return '';
    }

    /** 创建带有转义序列样式的文本 */
    const createStyleText = (color: ColorName) => {
        /** 左侧的标题 */
        const leftTitle = fontColor(` ${type.toLocaleUpperCase()} `, {
            foreground: 'lightwhite',
            background: color
        });

        /** 右侧的内容 */
        const rightContent = fontColor(title, { foreground: color });

        return [leftTitle, rightContent].join(' ');
    };

    switch (type) {
        case 'warn':
            return createStyleText('yellow');

        case 'info':
            return createStyleText('green');

        case 'error':
        default:
            return createStyleText('lightred');
    }
}

/**
 * 制作消息
 *
 * @param info 消息对象
 * @returns 返回制作好的消息
 */
function makeInfo(info: ForMatInfo) {
    const messages: string[] = [];

    if (!isObjectHave(info)) {
        return messages;
    }

    const {
        type = 'error',
        name,
        code,
        message,
        data,
        date = true,
        stack = false
    } = info;

    /** 小标题的名字 */
    const INFO_NAME = {
        DATE: '时间',
        NAME: '名称',
        CODE: '代码',
        MESSAGE: '消息',
        DATA: '数据',
        STACK: '堆栈'
    };

    /** 向消息列表中添加小标题 */
    const pushLittleTitle = (data: any, name?: string) => {
        if (isStringHave(name)) {
            const title = fontColor(` ${name} `, {
                foreground: 'lightwhite',
                background: 'cyan'
            });

            messages.push(LF + title);
        }

        messages.push(data);
    };

    /** 添加消息 */
    Object.keys(info).forEach(key => {
        switch (key) {
            case 'name':
                if (isStringHave(name)) {
                    pushLittleTitle(name, INFO_NAME.NAME);
                }
                break;

            case 'code':
                if (isNumber(code) || isStringHave(code)) {
                    pushLittleTitle(code, INFO_NAME.CODE);
                }
                break;

            case 'message':
                if (isStringHave(message)) {
                    pushLittleTitle(message, INFO_NAME.MESSAGE);
                }
                break;

            case 'data':
                pushLittleTitle(data, INFO_NAME.DATA);
                break;
        }
    });

    if (date) {
        const time = new Date().toLocaleString();
        pushLittleTitle(
            fontColor(time, { foreground: 'magenta' }),
            INFO_NAME.DATE
        );
    }

    if (stack || (isEqual(type, 'error') && messages.length > 0)) {
        const stack: string | undefined = new Error().stack;

        if (isStringHave(stack)) {
            const newStack = LF + stack.split(LF).slice(3).join(LF);
            const styleText = fontColor(newStack, {
                foreground: 'red'
            });

            pushLittleTitle(styleText, INFO_NAME.STACK);
        }
    }

    return messages;
}

/**
 * 根据传递的内容来格式化用于终端调试的文本信息
 *
 * @param info 要打印的信息对象
 *
 * - `type` 要显示的类型，分为 `info` `warn` `error` 三种
 * - `title` 大标题的内容
 * - `name` 名称
 * - `code` 代码
 * - `message` 消息
 * - `data` 数据
 * - `date` 日期
 * - `stack` 堆栈
 *
 * @param options 配置对象
 *
 * - `display` 是否显示标题和分割线
 *   - `title` 是否显示大标题
 *   - `dividers` 是否显示分割线
 *
 * @returns 返回格式化好的字符串文本
 * @example
 *
 * ```javascript
 * const ret = format({
 *     type: 'info',
 *     title: '这是标题',
 *     message: '这是信息',
 *     code: 500,
 *     data: {
 *         a: 1,
 *         b: {
 *             c: 'xxx'
 *         },
 *         d: ['xxx'],
 *         e: new Date('2020-01-01')
 *     },
 *     date: false,
 *     stack: false
 * });
 *
 * // \u001B[38;5;15;48;5;2m INFO \u001B[39;49m \u001B[38;5;2m这是标题\u001B[39m
 * // --------------------------------------------------------------------------------
 * // \u001B[38;5;15;48;5;6m 消息 \u001B[39;49m 这是信息
 * // \u001B[38;5;15;48;5;6m 代码 \u001B[39;49m \u001B[33m500\u001B[39m
 * // \u001B[38;5;15;48;5;6m 数据 \u001B[39;49m {
 * //     a: \u001B[33m1\u001B[39m,
 * //     b: {
 * //         c: \u001B[32m'xxx'\u001B[39m
 * //     },
 * //     d: [
 * //         \u001B[32m'xxx'\u001B[39m,
 * //         [length]: \u001B[33m1\u001B[39m
 * //     ],
 * //     e: \u001B[35m2020-01-01T00:00:00.000Z\u001B[39m
 * // }
 * // --------------------------------------------------------------------------------
 * console.log(ret);
 * ```
 */
export default function format(info: ForMatInfo, options?: ForMatOptions) {
    options = {
        showHidden: true,
        depth: null,
        colors: true,
        maxArrayLength: null,
        compact: false,
        sorted: true,
        ...options
    };

    const { dividers = true, title = true } = options.display ?? {};
    const splitChars: string = '-'.repeat(80);
    const styleText: string[] = [];
    const styleMsg = makeInfo(info);

    /** 根据类型显示大标题 */
    if (title) {
        styleText.push(makeTitle(info.type, info.title));
    }

    /** 处理标题分隔符 */
    if (dividers) {
        styleText.push(LF + splitChars, ...styleMsg, LF + splitChars);
    } else {
        styleText.push(...styleMsg);
    }

    /** 添加空行 */
    if (isNotZero(styleMsg.length)) {
        styleText[0] = LF + styleText[0].trimStart();
        styleText.push(LF);
    }

    return formatWithOptions({ ...options }, ...styleText);
}
