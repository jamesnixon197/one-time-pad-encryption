import generateCryptoRandomString from 'crypto-random-string';

export const generateOneTimePadKey = (keyLength: number): string => {
    if (!keyLength) throw new Error('Key length has to be 1 or more');

    return generateCryptoRandomString({length: keyLength});
}
