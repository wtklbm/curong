import { stdout } from 'process';

import { isEqual, isUintSafe } from '@curong/types';

import {
    cursorHidden,
    cursorOnLineBegin,
    eraseLine,
    cursorShow
} from './sequence';

import { ProgressBarOptions } from './types/progressBar';

/** 相当于: `\u001B[A\u001B[E\u001B[K` */
const clearLine = () => cursorOnLineBegin + eraseLine();

/**
 * 终端进度条
 *
 * 创建一个用于终端的进度条用于显示进度操作，进度条使用了终端上的光标操作，
 * 因为光标的唯一性，所以目前只能同时创建一个进度条。
 */
export default class ProgressBar {
    options: ProgressBarOptions;
    private index: number;
    private record: string[];

    constructor(options?: ProgressBarOptions) {
        options = {
            total: NaN,
            percentage: true,
            count: true,
            picture: true,
            hiddenCursor: true,
            ...options
        };

        this.options = options;
        this.index = -1;
        this.record = [];
        this.reset();
    }

    /** 重置进度条 */
    private reset(): void {
        const {
            total,
            percentage,
            count,
            picture,
            hiddenCursor
        } = this.options;

        let bars = [];
        const lastIndex = this.index + 1;

        if (isUintSafe(total)) {
            // 有限
            if (picture) {
                const finish = Math.floor((lastIndex / total!) * 10);
                const text = '#'.repeat(finish).padEnd(10, ' ');
                bars.push(`[${text}]`);
            }

            if (percentage) {
                const number = Math.floor((lastIndex / total!) * 100);
                bars.push(`${number}%`);
            }

            if (count) {
                bars.push(`(${lastIndex}/${total})`);
            }
        } else {
            // 无限
            bars.push('RUNNING:');
        }

        if (hiddenCursor) {
            bars[0] = cursorHidden + (bars[0] || '');
        }

        this.record = bars;
    }

    /**
     * 以不改变进度的方式向终端写入数据
     *
     * @param value 要写入的数据
     * @returns 如果进度执行完成则返回 `true`，否则为 `false`
     * @info
     *
     * ### 结束进度
     *
     * 因为要考虑进度条在终端上的位置关系，所以当不再使用进度条时，请使用 `this.end()` 方法来结束当前进度条。
     *
     * ```javascript
     *  function delay() {
     *      return new Promise(resolve => {
     *          setTimeout(() => resolve(), 200);
     *      });
     *  }
     *
     *  async function main() {
     *      const bar1 = new ProgressBar({ total: 30 });
     *      console.log('正在加载进度条...');
     *
     *      for (let i = 0, len = 30; i < len; i++) {
     *          bar1.pushWrite(`进度: ${i}`);
     *          await delay();
     *
     *          // 不要这样使用
     *          // if (i === 2) {
     *          //     break;
     *          // }
     *
     *          // 结束进度条
     *          if(i === 2) {
     *              bar1.end();
     *              break;
     *          }
     *
     *          bar1.write(`当前进度结束`);
     *          await delay();
     *      }
     *
     *      console.log('进度条执行完成');
     *  }
     *
     * ```
     */
    write(value: string = ''): boolean {
        stdout.write(`${clearLine()}${this.record.join(' ')} ${value}`);

        return isEqual(this.options.total, this.index) && this.end();
    }

    /**
     * 向终端写入数据并改变当前的进度
     *
     * @param value 要写入的数据
     * @returns 如果进度执行完成则返回 `true`，否则为 `false`
     */
    pushWrite(value: string = ''): boolean {
        this.index++;
        this.reset();

        return this.write(value);
    }

    /**
     * 结束当前进度条的进度
     *
     * @returns 该方法始终返回 `true`
     */
    end(): boolean {
        let bar = clearLine();
        this.options.hiddenCursor && (bar += cursorShow);
        stdout.write(bar);

        return true;
    }
}
