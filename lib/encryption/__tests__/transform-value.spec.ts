import {transformValue} from '../transform-value'

import {buildRandomString} from '../../../test/helpers';

describe('Transform value', () => {
    let valueToEncrypt: string;
    let keyToEncryptWith: string;

    beforeEach(() => {
        valueToEncrypt = buildRandomString(9);
        keyToEncryptWith = buildRandomString(9);
    });

    describe('Passed in value is invalid', () => {
        it('should throw an error', async () => {
            expect(() => transformValue('', keyToEncryptWith)).toThrowError(
                'Value is invalid'
            );
        });
    });

    describe('Passed in key is invalid', () => {
        it('should throw an error', async () => {
            expect(() => transformValue(valueToEncrypt, '')).toThrowError(
                'One time key is invalid'
            );
        });
    });

    describe('Key & value have different lengths', () => {
        it('should throw an error', async () => {
            expect(
                () => transformValue(valueToEncrypt, keyToEncryptWith + '123')
            ).toThrowError(
                'Key & value mismatch, two different lengths'
            );
        });
    });

    describe('Transforming a basic value', () => {
        it('should return a value different from the original value', async () => {
            const transformedValue = transformValue(
                valueToEncrypt,
                keyToEncryptWith
            );

            expect(transformedValue).toEqual(
                expect.not.stringContaining(valueToEncrypt)
            );
        });
    });

    describe('Transforming a value with Unicode characters', () => {
        it('should return a value different from the original value', async () => {
            const transformedValue = transformValue(
                valueToEncrypt + '😒',
                keyToEncryptWith + '😒'
            );

            expect(transformedValue).toEqual(
                expect.not.stringContaining(valueToEncrypt + '😒')
            );
        });
    });
});
