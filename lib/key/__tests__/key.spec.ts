import {generateOneTimePadKey} from './..'

describe('Generate a random key of specified length', () => {
    it('should error on 0 or null length', async () => {
        expect(() => generateOneTimePadKey(0)).toThrowError(
            'Key length has to be 1 or more'
        );
    });

    it('should return a key of a certain length', async () => {
        const key = generateOneTimePadKey(10);

        expect(key.length).toBe(10);
    });
});
