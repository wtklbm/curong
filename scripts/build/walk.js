const { promises } = require('fs');
const { resolve } = require('path');

const PACKAGES_DIR = 'packages';

/**
 * @param {Function} callback 回调函数
 */
async function walk(callback) {
    const dirs = await promises.readdir(PACKAGES_DIR).catch(e => {
        throw new Error(e);
    });

    for (let i = 0, len = dirs.length; i < len; i++) {
        const dir = dirs[i];

        const state = await promises
            .stat(resolve(PACKAGES_DIR, dir))
            .catch(e => {
                throw new Error(e);
            });

        state?.isDirectory() && typeof callback === 'function' && callback(dir);
    }
}

module.exports = walk;
