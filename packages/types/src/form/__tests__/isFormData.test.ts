/**
 * @jest-environment jsdom
 */

import { isFormData } from '..';

describe('@curong/types/isFormData', () => {
    test('测试1', () => {
        expect(isFormData({})).toBe(false);
        expect(isFormData(new FormData())).toBe(true);
    });

    test('测试2', () => {
        const formData = new FormData();
        formData.append('username', 'JohnDoe');
        const fileInput: any = document.querySelector('input[type="file"]');
        const file = fileInput?.files[0];
        formData.append('profilePicture', file);

        expect(isFormData(formData)).toBe(true);
    });
});
