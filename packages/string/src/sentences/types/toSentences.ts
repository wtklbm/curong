import type { BindSideOptions } from '../../inside';

export type ToSentencesOptions = BindSideOptions & {
    /** 是否将省略号也拆分为一行，默认为 `true` */
    ellipsis?: boolean;
};
