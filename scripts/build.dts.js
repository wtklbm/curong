const { promises } = require('fs');
const { join } = require('path');

const { yellow, green } = require('colorette');
const { rollup } = require('rollup');
const dts = require('rollup-plugin-dts').default;
const { readFile, writeFile } = promises;

/**
 * 创建类型声明文件
 */
!(async function () {
    console.log(yellow('正在生成类型声明文件'));

    // 汇总类型声明，将类型声明打包成一个文件
    const rootDir = join(__dirname, '../packages');
    const dirnames = await promises.readdir(rootDir);
    const tsconfigPath = join(__dirname, '..', 'tsconfig.json');
    const tsconfig = await readFile(tsconfigPath, 'utf-8');

    await writeFile(
        tsconfigPath,
        tsconfig.replace(/"removeComments": *true,/, '"removeComments": false,')
    );

    for (let i = 0, len = dirnames.length; i < len; i++) {
        const dirname = dirnames[i];

        if (dirname === '.DS_Store') {
            continue;
        }

        const packageDir = join(rootDir, dirname);
        const input = `${packageDir}/src/index.ts`;
        const bundle = await rollup({
            input,
            output: [{ format: 'es' }],
            plugins: [dts()]
        });

        console.log(green(input));
        await bundle.write({ dir: join(packageDir, 'dist') });
    }

    await writeFile(tsconfigPath, tsconfig);
})();
