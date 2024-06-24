const { join } = require('path');
const { promises } = require('fs');

const { compress } = require('minimist')(process.argv.slice(2));
const { yellow } = require('colorette');

const { build } = require('./build');
const banner = require('./build/banner');

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
        useTerser: !!compress,
        ...options
    };

    build(options);
}

!(async function () {
    console.log(yellow(`正在${compress ? '压缩' : '生成'} UMD 模块`));

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
