import { GenericOptions } from './generic';

export interface StartsSlice extends GenericOptions {
    /** 是否保留从索引 `0` 到偏移索引之间的值 */
    preserve?: boolean;
}
