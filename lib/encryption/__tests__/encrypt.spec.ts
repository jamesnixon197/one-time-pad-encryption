import {encryptValue} from '../encrypt';
import {isBase64} from '../util';
import * as transformValueLibrary from '../transform-value';

import {buildRandomString} from '../../../test/helpers';

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

    describe('Value already encrypted', () => {
        let base64EncodedValue: string;

        beforeEach(() => {
            base64EncodedValue = Buffer.from(valueToEncrypt).toString('base64');
        });

        it('should throw an error', async () => {
            expect(() =>
                encryptValue(base64EncodedValue, keyToEncryptWith)
            ).toThrowError('Value is already encrypted');
        });

        it('should not call transformValue', async () => {
            try {
                encryptValue(base64EncodedValue, keyToEncryptWith);
            } catch (e) {
                expect(transformValueSpy).not.toHaveBeenCalled();
            }

        });
    });

    describe('Value not already encrypted', () => {
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
