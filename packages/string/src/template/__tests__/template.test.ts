// @ts-nocheck

import { createTemplate, template } from '..';

describe('@curong/string/template', () => {
    test('测试1：传入字符串模板和变量对象进行插值', () => {
        const result = template('Hello {name}!', { name: 'Alice' });
        expect(result).toBe('Hello Alice!');
    });

    test('测试2：未提供变量时，模板不做插值', () => {
        const result = template('Hello {name}!', undefined);
        expect(result).toBe('Hello {name}!');
    });

    test('测试3：未提供插值选项时，使用默认前缀和后缀进行插值', () => {
        const result = template('Hello {name}!', { name: 'Bob' });
        expect(result).toBe('Hello Bob!');
    });

    test('测试4：自定义插值选项，使用不同的前缀和后缀进行插值', () => {
        const result = template(
            'Hello {{name}}!',
            { name: 'Charlie' },
            { prefix: '{{', suffix: '}}' }
        );
        expect(result).toBe('Hello Charlie!');
    });

    test('测试5：传入空字符串时，不进行任何替换', () => {
        const result = template('', { name: 'Alice' });
        expect(result).toBe('');
    });

    test('测试6：传入字符串模板但没有匹配的变量时，返回原始模板', () => {
        const result = template('Hello {name}!', { age: 25 });
        expect(result).toBe('Hello {name}!');
    });

    test('测试7：变量值为 null 时，替换为字符串 "null"', () => {
        const result = template('Hello {name}!', { name: null });
        expect(result).toBe('Hello null!');
    });

    test('测试8：变量值为 undefined 时，不进行替换', () => {
        expect(template('Hello {name}!', { name: undefined })).toBe(
            'Hello undefined!'
        );
        expect(template('Hello {name}!', {})).toBe('Hello {name}!');
    });

    test('测试9：变量值为数字时，进行正确插值', () => {
        const result = template('Your age is {age}.', { age: 30 });
        expect(result).toBe('Your age is 30.');
    });

    test('测试10：使用 createTemplate 函数配置前缀和后缀', () => {
        const configure = createTemplate({ prefix: '{{', suffix: '}}' });
        const result = configure('Hello {{name}}!', { name: 'David' });
        expect(result).toBe('Hello David!');
    });

    test('测试11：createTemplate 函数不传入插值选项时，使用默认选项', () => {
        const configure = createTemplate({ prefix: '{{', suffix: '}}' });
        const result = configure('Hello {name}!', { name: 'Emily' });
        expect(result).toBe('Hello {name}!');
    });

    test('测试12：createTemplate 函数中的内部插值选项优先于外部传入的配置', () => {
        const configure = createTemplate({ prefix: '[', suffix: ']' });
        const result = configure(
            'Hello {{name}}!',
            { name: 'Frank' },
            { prefix: '{{', suffix: '}}' }
        );
        expect(result).toBe('Hello Frank!');
    });

    test('测试17：template 函数传入 undefined 变量时，不抛出异常', () => {
        const result = template('Hello {name}!', undefined);
        expect(result).toBe('Hello {name}!');
    });

    test('测试18：template 函数传入非字符串模板时，抛出异常', () => {
        expect(() => template(null, { name: 'Alice' })).toThrow();
        expect(() => template(123, { name: 'Alice' })).toThrow();
    });
});
