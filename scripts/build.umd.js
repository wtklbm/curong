const chalk = require('chalk');
const { terser } = require('rollup-plugin-terser');
const { build } = require('./build');
const { compress } = require('minimist')(process.argv.slice(2));

const banner = require('./build/banner');
const { join } = require('path');
const { promises } = require('fs');

/**
 * 创建打包任务
 *
 * @param {string} name 包名
 * @param {string} input 入口
 * @param {string} output 出口
 * @param {Object} [options] 配置参数
 */
function create(name, input, output, options = {}) {
    options = {
        input,
        output: {
            name,
            file: compress ? output.replace(/\.js$/, '.min.js') : output,
            format: 'umd',
            banner
        },
        tsConfig: { target: 'es5', module: 'umd' },
        terser: terser({
            include: [/^.+\.min\.js$/],
            output: { comments: false }
        }),
        ...options
    };

    build(options);
}

!(async function () {
    console.log(chalk.blue(`INFO: 正在${compress ? '压缩' : '生成'}umd模块!`));

    // 汇总类型声明，将类型声明打包成一个文件
    const rootDir = join(__dirname, '../packages');
    const dirnames = await promises.readdir(rootDir);

    for (let i = 0, len = dirnames.length; i < len; i++) {
        const dirname = dirnames[i];

        if (dirname === '.DS_Store') {
            continue;
        }

        const packageDir = join(rootDir, dirname);
        const input = `${packageDir}/src/index.ts`;
        const output = `${packageDir}/dist/index.umd.js`;
        create(dirname, input, output);
    }
})();
