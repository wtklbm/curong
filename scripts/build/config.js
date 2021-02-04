const { join } = require('path');

const TS = require('typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').default;
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const typescript = require('rollup-plugin-typescript2');

// @ts-ignore
const { version } = require('../../lerna.json');
const banner = require('./banner');

/**
 * 动态创建 `rollup` 配置
 *
 * @param {*} options
 */
function config(options = {}) {
    const { input, output = {}, tsConfig, terser, external } = options;

    return {
        input,

        plugins: [
            // 转换 `commonjs` 模块为 `es6` 模块，该插件必须放在最上面执行
            // @ts-ignore
            commonjs(),

            // @ts-ignore
            resolve({
                browser: true,
                // 加载 `node` 模块
                preferBuiltins: true,
                jail: join(__dirname, '../..')
            }),

            // @ts-ignore
            typescript({
                typescript: TS,
                tsconfigDefaults: {
                    ...tsConfig,
                    removeComments: true,
                    sourceMap: false
                },
                tsconfigOverride: {
                    ...tsConfig,
                    removeComments: true,
                    sourceMap: false
                },
                clean: true
            }),

            // @ts-ignore
            replace({
                __VERSION__: version
            }),

            // 处理 `json` 格式的模块
            // @ts-ignore
            json(),

            terser
        ],

        // 需要将哪些模块视为外部模块，非外部模块会被打包进最终的代码里
        external,

        output: {
            ...output,
            sourcemap: true,
            banner
        }
    };
}

module.exports = config;
