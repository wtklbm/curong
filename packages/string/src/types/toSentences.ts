import { BindOutsideOptions } from './bindOutside';

export type ToSentencesOptions = BindOutsideOptions & {
    /** 是否将省略号也拆分为一行，默认为 `true` */
    ellipsis?: boolean;
};
