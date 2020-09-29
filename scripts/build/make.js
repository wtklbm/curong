const { dirname } = require('path');
const { promises } = require('fs');
const { gzipSync } = require('zlib');

const { rollup } = require('rollup');
const { compress } = require('brotli');
const chalk = require('chalk');

const config = require('./config');

/**
 * @param {any} options
 */
async function make(options) {
    const bundle = await rollup(config(options)).catch(
        /**
         * @param {*} e
         */
        e => {
            throw new Error(e);
        }
    );

    const { output } = options;
    const { file } = output;

    promises.mkdir(dirname(file), { recursive: true }).catch(e => {
        throw new Error(e);
    });

    await bundle.write(output);
    const code = await promises.readFile(file).catch(e => {
        throw new Error(e);
    });

    // 计算压缩后大小
    const minSize = (code.length / 1024).toFixed(2);
    const gZipped = gzipSync(code);
    const gZippedSize = (gZipped.length / 1024).toFixed(2);
    const compressed = compress(code);
    const compressedSize = compressed
        ? (compressed.length / 1024).toFixed(2)
        : 0;

    console.log(
        `${chalk.green(chalk.bold(file))}`,
        `mini: ${minSize}kb /`,
        `gzip: ${gZippedSize}kb /`,
        `compressedSize: ${compressedSize}kb`
    );
}

module.exports = make;
