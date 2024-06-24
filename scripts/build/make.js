const { dirname } = require('path');
const { promises } = require('fs');
const { gzipSync } = require('zlib');

const { rollup } = require('rollup');
const { green, cyan, bold } = require('colorette');

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

    console.log(
        `${green(bold(file))}`,
        `mini: ${cyan(minSize + 'kb')} /`,
        `gzip: ${cyan(gZippedSize + 'kb')} /`
    );
}

module.exports = make;
