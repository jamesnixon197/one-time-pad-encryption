export const transformValue = (
    value: string,
    oneTimePadKey: string
): string => {
    if (!value) throw new Error('Value is invalid');
    if (!oneTimePadKey) throw new Error('One time key is invalid');

    const valueBinaries = getBinariesFromUnicode(value);
    const keyBinaries = getBinariesFromUnicode(oneTimePadKey);

    if (valueBinaries.length != keyBinaries.length)
        throw new Error('Key & value mismatch, two different lengths');

    return buildTransformedValue(valueBinaries, keyBinaries);
};

const getBinariesFromUnicode = (unicodeString: string): Array<string> => {
    const characterCodes: Array<number> = getCharCodeOfString(unicodeString);

    return characterCodes.map((value) => value.toString(2).padStart(16, '0'));
};

const getUnicodeCharacterFromBinary = (binaryString: string): string => {
    const characterCode: number = parseInt(binaryString, 2);

    return String.fromCharCode(characterCode);
};

const getCharCodeOfString = (value: string): Array<number> => {
    const characterCodes: Array<number> = [];

    for (let index = 0; index < value.length; index++) {
        const characterCode = value.charCodeAt(index);
        characterCodes.push(characterCode);
    }

    return characterCodes;
};

const buildTransformedValue = (
    valueBinaries: Array<string>,
    keyBinaries: Array<string>
): string => {
    let transformedString = '';
    valueBinaries.forEach((value, index) => {
        let transformedBinaryBlock = '';
        const keyBits = keyBinaries[index].split('');
        const valueBits = value.split('');

        valueBits.forEach((value, index) => {
            transformedBinaryBlock += +value ^ +keyBits[index];
        });

        transformedString += getUnicodeCharacterFromBinary(
            transformedBinaryBlock
        );
    });

    return transformedString;
};
