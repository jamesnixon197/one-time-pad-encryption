import {transformValue} from './transform-value';

export const decryptValue = (
    encryptedValue: string,
    oneTimePadKey: string
): string => {
    return transformValue(
        Buffer.from(encryptedValue, 'base64').toString('utf-8'),
        oneTimePadKey
    );
};
