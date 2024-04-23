const { join } = require('path');

const TS = require('typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').default;
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const typescript = require('rollup-plugin-typescript2');
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

        // 禁止树摇晃，防止自己写的某些死代码莫名的被优化掉
        treeshake: false,

        plugins: [
            // 转换 `commonjs` 模块为 `es6` 模块，该插件必须放在最上面执行
            commonjs(),

            resolve({
                browser: true,
                // 加载 `node` 模块
                preferBuiltins: true,
                jail: join(__dirname, '../..')
            }),

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

            replace({
                preventAssignment: true,
                __VERSION__: version
            }),

            // 处理 `json` 格式的模块
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
