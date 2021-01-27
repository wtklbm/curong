export type ProgressBarOptions = {
    /** 总数，默认为 `NaN` */
    total?: number;

    /** 是否显示百分比，默认为 `true` */
    percentage?: boolean;

    /** 是否显示计数，默认为 `true` */
    count?: boolean;

    /** 是否显示动态进度条图像，默认为 `true` */
    picture?: boolean;

    /** 是否隐藏光标，默认为 `true` */
    hiddenCursor?: boolean;
};
