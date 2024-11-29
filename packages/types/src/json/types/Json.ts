/** JSON 的类型 */
/* prettier-ignore */
export type Json =
    | null | boolean | number | string | JSON[]
    | { [prop: string]: JSON; };
