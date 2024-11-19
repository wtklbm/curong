import { Writer as _Writer } from './steno';

/**
 * 具有原子写入的、带有锁机制的、支持重试的超快速异步文件写入器
 *
 * 该方法 [`typicode/steno`](https://github.com/typicode/steno/blob/main/src/index.ts) 库的原始实现。
 * 如果频繁操作同一个文件的时候，推荐使用 `Writer`。
 *
 * @example
 *
 * ```typescript
 * const file = new Writer('file.txt');
 *
 * await file.write('some data');
 * await file.write('some data');
 * await file.write('some data');
 * ```
 */
const Writer = _Writer;

export default Writer;
