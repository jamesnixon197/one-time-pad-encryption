import {encryptValue} from '../encrypt';
import * as transformValueLibrary from '../transform-value';

import {buildRandomString} from '../../../../test/helpers';

const isBase64 = (value: string): boolean => {
    return (
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    ).test(value);
}

describe('Encrypt value', () => {
    let transformValueSpy: jest.SpyInstance;
    let valueToEncrypt: string;
    let keyToEncryptWith: string;

    beforeEach(() => {
        transformValueSpy = jest.spyOn(
            transformValueLibrary, 'transformValue'
        );

        valueToEncrypt = buildRandomString(9);
        keyToEncryptWith = buildRandomString(9);
    });

    describe('Value correctly encrypted', () => {
        it('should call transformValue with parameters', async () => {
            encryptValue(valueToEncrypt, keyToEncryptWith);

            expect(transformValueSpy).toHaveBeenCalledWith(
                valueToEncrypt,
                keyToEncryptWith
            );
        });

        it('should return an encrypted value', async () => {
            const encryptedValue = encryptValue(
                valueToEncrypt,
                keyToEncryptWith
            );

            expect(isBase64(encryptedValue)).toBeTruthy();
        });
    });
});
