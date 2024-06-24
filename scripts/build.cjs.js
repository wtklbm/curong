const fs = require('fs');

const { yellow } = require('colorette');
const { compress } = require('minimist')(process.argv.slice(2));

const { build, walk } = require('./build');
const banner = require('./build/banner');

/**
 * 生成 `commonjs` 入口文件
 */
const entry = (name = 'index') => {
    return `${banner}module.exports = require(process.env.NODE_ENV === 'development' ? './${name}.dev.js' : './${name}.prod.js')`;
};

/**
 * 创建配置
 *
 * @param {string} dirname 目录名
 * @param {string} env 环境变量
 */
const genRollupConfig = (dirname, env = 'dev') => ({
    input: `./packages/${dirname}/src/index.ts`,

    output: {
        file: `./packages/${dirname}/dist/index.${env}.js`,
        exports: 'named',
        format: 'cjs',
        banner
    },

    /**
     * 外部依赖
     *
     * 在这里，可以忽略一些包，比如在一个模块中，把什么模块当做是一个外部依赖
     *
     * @param {string} id 模块名
     */
    external(id) {
        return ['tslib'].includes(id) || /^@curong-/i.test(id);
    },

    tsConfig: {
        target: 'es5',
        module: 'commonjs'
    },

    useTerser: compress ? Boolean(compress) : env !== 'dev',
});

function main() {
    console.log(yellow(`正在生成 CJS 模块`));

    walk(
        /**
         * @param {string} dirname 目录名
         */
        dirname => {
            fs.mkdirSync(`./packages/${dirname}/dist`, { recursive: true });
            build(genRollupConfig(dirname, 'dev'));
            build(genRollupConfig(dirname, 'prod'));
            fs.writeFileSync(
                `./packages/${dirname}/dist/index.js`,
                entry(),
                'utf8'
            );
        }
    );
}

main();
