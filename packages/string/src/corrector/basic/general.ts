import revise from './revise';
import typeset from './typeset';

/**
 * 默认中文美化函数
 *
 * @param value 要美化的中文语句
 * @returns 返回美化好的语句
 */
export default function general(value: string): string {
    const newValue: string[] = [];
    const lists = typeset(value);

    for (let i = 0, len = lists.length; i < len; i++) {
        const list = lists[i];
        let { match, data } = list;

        if (!match) {
            newValue.push(data);
            continue;
        }

        const preItem = (lists[i - 1] ?? {}).data ?? '';
        const sufItem = (lists[i + 1] ?? {}).data ?? '';

        newValue.push(revise(data, preItem, sufItem));
    }

    return newValue.join('').trim();
}
