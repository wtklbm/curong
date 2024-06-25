// @ts-nocheck

import { TextEncoder } from 'util';

import {
    isArray,
    isFormData,
    isFunction,
    isPlainObject,
    isString
} from '@curong/types';

const generateString = (size = 16) => {
    const alphabet =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    const { length } = alphabet;
    let str = '';

    while (size--) {
        str += alphabet[(Math.random() * length) | 0];
    }

    return str;
};

const textEncoder = new TextEncoder();
const CRLF = '\r\n';
const CRLF_BYTES = textEncoder.encode(CRLF);

const escapeName = (name: string): string => {
    return String(name).replace(/[\r\n"]/g, match => {
        return { '\r': '%0D', '\n': '%0A', '"': '%22' }[match] as string;
    });
};

export async function formDataToBuffer(
    form: FormData,
    headersHandler?: (headers: Record<string, string>) => void,
    options: { tag?: string; size?: number; boundary?: string } = {}
) {
    const {
        tag = 'form-data-boundary',
        size = 25,
        boundary = tag + '-' + generateString(size)
    } = options;

    if (!isFormData(form)) {
        throw TypeError('FormData instance required');
    }

    if (boundary.length < 1 || boundary.length > 70) {
        throw Error('boundary must be 10-70 characters long');
    }

    const boundaryBytes = textEncoder.encode('--' + boundary);
    const footerBytes = textEncoder.encode('--' + boundary + '--' + CRLF);
    let buffers: unknown[] = [];

    for (let [name, value] of Array.from(form.entries())) {
        const isStringValue = isString(value);

        let headers: string = `Content-Disposition: form-data; name="${escapeName(
            name
        )}"${
            !isStringValue && (value as Blob).name
                ? `; filename="${escapeName((value as Blob).name)}"`
                : ''
        }${CRLF}`;

        if (isStringValue) {
            value = textEncoder.encode(
                String(value).replace(/\r?\n|\r\n?/g, CRLF)
            );
        } else {
            headers += `Content-Type: ${
                (value as Blob).type || 'application/octet-stream'
            }${CRLF}`;

            if (isFunction(value.arrayBuffer)) {
                value = await value.arrayBuffer();
            }
        }

        buffers.push(
            boundaryBytes,
            textEncoder.encode(headers),
            new Uint8Array(value)
        );
    }

    buffers = buffers.map(b => [b, CRLF_BYTES]).flat();
    buffers.push(footerBytes);

    if (isFunction(headersHandler)) {
        headersHandler({
            'content-type': `multipart/form-data; boundary=${boundary}`
        });
    }

    return Buffer.concat(buffers);
}

export type NestedObject = {
    [key: PropertyKey]:
        | NestedObject
        | NestedObject[]
        | (object | string | boolean | number | null);
};

export function objectToFormData(
    object: NestedObject,
    options?: {
        arrayKeyPrefix?: string;
        formData: FormData;
        parentKey?: string;
    }
): FormData {
    const { arrayKeyPrefix, parentKey, formData } = {
        arrayKeyPrefix: '',
        parentKey: '',
        formData: new FormData(),
        ...options
    };

    if (isArray(object)) {
        for (const [index, value] of object.entries()) {
            const key = arrayKeyPrefix
                ? `${arrayKeyPrefix}[${index}]`
                : `${parentKey}[${index}]`;

            if (isPlainObject(value)) {
                objectToFormData(value, {
                    arrayKeyPrefix,
                    parentKey: key,
                    formData
                });
            } else {
                formData.append(key, value as string);
            }
        }

        return formData;
    }

    for (const [key, value] of Object.entries(object)) {
        const nestedKey = parentKey ? `${parentKey}.${key}` : key;

        if (isPlainObject(value)) {
            objectToFormData(value as NestedObject, {
                arrayKeyPrefix,
                parentKey: nestedKey,
                formData
            });
        } else {
            formData.append(nestedKey, value as any);
        }
    }

    return formData;
}
