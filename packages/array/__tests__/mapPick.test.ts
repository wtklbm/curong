import { mapPick } from '../src';

describe('@curong/array/mapPick', () => {
    test('测试1', () => {
        const list: any[] = [];
        expect(mapPick(list, { id: v => v.toString() })).toEqual([]);
    });

    test('测试2', () => {
        const list: any[] = [1, 2, 3];
        expect(mapPick(list)).toEqual([]);
    });

    test('测试2', () => {
        const list = [
            { id: 1, name: 'bob' },
            { id: 2, name: 'sam' }
        ];

        expect(
            mapPick(list, {
                label: value => value.name,
                value: value => value.id
            })
        ).toEqual([
            { label: 'bob', value: 1 },
            { label: 'sam', value: 2 }
        ]);

        expect(
            mapPick(list, {
                label: value => value.name,
                value: value => value
            })
        ).toEqual([
            { label: 'bob', value: { id: 1, name: 'bob' } },
            { label: 'sam', value: { id: 2, name: 'sam' } }
        ]);

        expect(
            mapPick(list, {
                label: value => value.name,
                value: value => ({ ID: value.id, NAME: value.name })
            })
        ).toEqual([
            { label: 'bob', value: { ID: 1, NAME: 'bob' } },
            { label: 'sam', value: { ID: 2, NAME: 'sam' } }
        ]);

        expect(
            mapPick(list, {
                label: value => value.name,
                value: value => value.id.toString().padStart(3, '0')
            })
        ).toEqual([
            { label: 'bob', value: '001' },
            { label: 'sam', value: '002' }
        ]);
    });
});
