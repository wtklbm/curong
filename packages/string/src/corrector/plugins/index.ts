import { fullSpace } from './fullSpace';
import { convertFullStop } from './fullStop';
import { convertMiddleDot } from './middleDot';

/** 中文美化插件 */
const plugins: ((value: string) => string)[] = [
    convertMiddleDot,
    fullSpace,
    convertFullStop
];

export default plugins;
