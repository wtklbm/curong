export type EnsureArrayOptions = {
    /** 当值为 `null` 时是否可以转换为 `[null]`。默认为 `false` */
    allowNull?: boolean;

    /** 当值为 `undefined` 时是否可以转换为 `[undefined]`，默认为 `false` */
    allowUndefined?: boolean;
};
