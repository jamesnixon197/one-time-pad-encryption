import {transformValue} from './transform-value'

export const encryptValue = (
    value: string,
    oneTimePadKey: string
): string => {
    return Buffer.from(
        transformValue(value, oneTimePadKey)
    ).toString('base64');
}
