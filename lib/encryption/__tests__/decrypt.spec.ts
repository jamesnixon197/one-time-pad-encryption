import {decryptValue} from '../decrypt';
import {encryptValue} from '../encrypt';
import * as transformValueLibrary from '../transform-value';

import {buildRandomString} from '../../../test/helpers';

describe('Decrypt value', () => {
    let transformValueSpy: jest.SpyInstance;
    let valueToDecrypt: string;
    let keyToDecryptWith: string;

    beforeEach(() => {
        transformValueSpy = jest.spyOn(
            transformValueLibrary,
            'transformValue'
        );

        keyToDecryptWith = buildRandomString(9);
    });

    describe('Value already encrypted', () => {
        beforeEach(() => {
            valueToDecrypt = buildRandomString(9);
        });

        it('should throw an error', async () => {
            expect(() =>
                decryptValue(valueToDecrypt, keyToDecryptWith)
            ).toThrowError('Value is not encrypted');
        });

        it('should not call transformValue', async () => {
            try {
                decryptValue(valueToDecrypt, keyToDecryptWith);
            } catch (e) {
                expect(transformValueSpy).not.toHaveBeenCalled();
            }
        });
    });

    describe('Decrypting an encrypted value', () => {
        let encryptedValue: string;

        beforeEach(() => {
            keyToDecryptWith = buildRandomString(9);
            valueToDecrypt = buildRandomString(9);

            encryptedValue = encryptValue(
                valueToDecrypt,
                keyToDecryptWith
            );
        });

        it('should call transformValue with parameters', async () => {
            decryptValue(encryptedValue, keyToDecryptWith);

            expect(transformValueSpy).toHaveBeenCalledWith(
                Buffer.from(encryptedValue, 'base64').toString('utf-8'),
                keyToDecryptWith
            );
        });

        it('should return the decrypted value', async () => {
            const decryptedValue = decryptValue(
                encryptedValue,
                keyToDecryptWith
            );

            expect(decryptedValue).toBe(valueToDecrypt);
        });
    });
});
