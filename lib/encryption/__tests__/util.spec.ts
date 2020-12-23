import {isBase64} from '../util'

describe('isBase64 function', () => {
    describe('Not Base64', () => {
        it('should return falsey', async () => {
            expect(isBase64('Hello World!')).toBeFalsy();
        });
    });

    describe('Is Base64', () => {
        it('should return truthy', async () => {
            expect(
                isBase64(Buffer.from('Hello World!').toString('base64'))
            ).toBeTruthy();
        });
    });
});
