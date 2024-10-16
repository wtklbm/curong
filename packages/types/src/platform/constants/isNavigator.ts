import getTagEqual from '../../type/getTagEqual';

export default function isNavigator(navigator = globalThis.navigator) {
    return getTagEqual(navigator, 'Navigator');
}
