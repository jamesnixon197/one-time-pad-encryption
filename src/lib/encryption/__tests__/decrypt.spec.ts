import {decryptValue} from '../decrypt';
import {encryptValue} from '../encrypt';
import * as transformValueLibrary from '../transform-value';

import {buildRandomString} from '../../../../test/helpers';

describe('Decrypt value', () => {
    let transformValueSpy: jest.SpyInstance;
    let valueToDecrypt: string;
    let keyToDecryptWith: string;
    let encryptedValue: string;

    beforeEach(() => {
        transformValueSpy = jest.spyOn(
            transformValueLibrary,
            'transformValue'
        );

        keyToDecryptWith = buildRandomString(9);
        valueToDecrypt = buildRandomString(9);

        encryptedValue = encryptValue(valueToDecrypt, keyToDecryptWith);
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
