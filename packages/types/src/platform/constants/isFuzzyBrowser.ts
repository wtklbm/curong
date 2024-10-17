import isDocument from '../../element/isDocument';
import isWindow from '../../element/isWindow';
import isFunction from '../../function/isFunction';
import getTagEqual from '../../type/getTagEqual';

export default function isFuzzyBrowser(): boolean {
    return (
        isWindow(globalThis) &&
        isDocument(globalThis.document) &&
        getTagEqual(globalThis.history, 'History') &&
        getTagEqual(globalThis.navigator, 'Navigator') &&
        isFunction(globalThis.HTMLImageElement) &&
        isFunction(globalThis.HTMLCanvasElement) &&
        isFunction(globalThis.HTMLVideoElement)
    );
}
