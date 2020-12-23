import {transformValue} from './transform-value';
import {isBase64} from './util';

export const decryptValue = (
    encryptedValue: string,
    oneTimePadKey: string
): string => {
    if (!isBase64(encryptedValue)) throw new Error('Value is not encrypted');

    const decodedValue = Buffer.from(encryptedValue, 'base64').toString(
        'utf-8'
    );

    return transformValue(decodedValue, oneTimePadKey);
};
