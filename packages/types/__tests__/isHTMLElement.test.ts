/**
 * @jest-environment jsdom
 */

import { isHTMLElement } from '../src';

describe('@curong/types/isHTMLElement', () => {
    it('测试1', () => {
        expect(isHTMLElement(document)).toBe(false);
        expect(isHTMLElement(document.documentElement)).toBe(true);
        expect(isHTMLElement(document.createElement('input'))).toBe(true);
    });

    it('测试2', () => {
        const iframe = document.createElement('iframe');
        document.body.append(iframe);

        const iframeDocument = iframe.contentDocument!;
        const input = iframeDocument.createElement('input');
        iframeDocument.body.append(input);
        expect(isHTMLElement(input)).toBe(true);
    });
});
