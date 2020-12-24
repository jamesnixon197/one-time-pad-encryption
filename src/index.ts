#!/usr/bin/env node

import commander, {program} from 'commander'
import packageDetails from '../package.json'
import {generateOneTimePadKey} from './lib/key';
import {encryptValue} from './lib/encryption/encrypt';
import {decryptValue} from './lib/encryption/decrypt';

const runScript = (): void => {
    setUpCommander();

    if (program.encrypt && program.encrypt.length) {
        handleEncryptionOption();
    } else if (program.decrypt && program.decrypt.length) {
        handleDecryptionOption();
    }
}

const handleEncryptionOption = () => {
    const valueToEncrypt = program.encrypt;
    const oneTimePadKey = program.key || generateOneTimePadKey(
        valueToEncrypt.length
    );

    console.log(
        'Your one-time-pad key is (keep hold of this to decrypt):\n\''
        + oneTimePadKey
        + '\''
    );

    const encryptedValue = encryptValue(valueToEncrypt, oneTimePadKey);

    console.log('Your encrypted value is:\n\'' + encryptedValue + '\'');
}

const handleDecryptionOption = () => {
    const valueToDecrypt = program.decrypt;
    const oneTimePadKey = program.key;

    if (!oneTimePadKey) throw new Error('A key is required to decrypt');

    const decryptedValue = decryptValue(valueToDecrypt, oneTimePadKey);

    console.log('Your decrypted value is:\n\'' + decryptedValue + '\'');
};

const setUpCommander = (): void => {
    commander
        .version(packageDetails.version)
        .description(packageDetails.description)
        .option('-e --encrypt <value>', 'Encrypt the specified value')
        .option('-d --decrypt <value>', 'Decrypt the specified value')
        .option('-k --key <key>', 'Key to encrypt / decrypt a value with')
        .parse(process.argv);

}

runScript();
