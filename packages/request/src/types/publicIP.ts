/** 本地的公共的 `IP` 地址 */
export type publicIpResult = {
    /** 公共的 `IP` 地址 */
    ip: number;

    /** 城市信息 */
    city: {
        /** 城市的 `ID` */
        id: number;

        /** 城市的名称 */
        name: string;
    };
};
