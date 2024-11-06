// https://github.com/uuidjs/uuid/blob/main/src/regex.ts

/** 验证 `uuid` 的正则字符串 */
const uuid =
    '(?:(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff))';

export default uuid;
