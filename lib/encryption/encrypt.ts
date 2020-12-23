import {transformValue} from './transform-value'
import {isBase64} from './util'

export const encryptValue = (
    value: string,
    oneTimePadKey: string
): string => {
    if (isBase64(value)) throw new Error('Value is already encrypted');

    const encryptedValue = transformValue(value, oneTimePadKey);

    return Buffer.from(encryptedValue).toString('base64');
}
