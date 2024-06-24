const { yellow } = require('colorette');
const { compress } = require('minimist')(process.argv.slice(2));

const { build, walk } = require('./build');
const banner = require('./build/banner');

function main() {
    console.log(yellow('正在生成 ESModule 模块'));

    walk(
        /**
         * @param {string} dirname 目录名
         */
        dirname => {
            build({
                input: `./packages/${dirname}/src/index.ts`,

                output: {
                    file: `./packages/${dirname}/dist/index.es.js`,
                    format: 'esm',
                    banner
                },

                /**
                 * 忽略一些不被打包到当前模块的依赖，
                 * 那些不被打包的依赖会被当做外部模块使用。
                 *
                 * @param {string} id 模块名
                 */
                external(id) {
                    return ['tslib'].includes(id) || /^@curong-/i.test(id);
                },

                useTerser: !!compress
            });
        }
    );
}

main();
