import isDocument from '../../element/isDocument';
import isWindow from '../../element/isWindow';
import getTagEqual from '../../type/getTagEqual';

export default function isFuzzyBrowser(): boolean {
    return (
        typeof window === 'object' &&
        isWindow(window) &&
        isDocument(window.document) &&
        getTagEqual(window.history, 'History') &&
        getTagEqual(window.navigator, 'Navigator') &&
        typeof HTMLImageElement === 'function' &&
        typeof HTMLCanvasElement === 'function' &&
        typeof HTMLVideoElement === 'function'
    );
}
