import getTagEqual from '../../type/getTagEqual';

export default function isFuzzyJsDom(window = globalThis): boolean {
    return (
        !Object.getOwnPropertyDescriptor(window, 'window')
            ?.get?.toString()
            .includes('[native code]') &&
        getTagEqual(window.navigator, 'Navigator') &&
        window.navigator.userAgent?.includes('jsdom')
    );
}
