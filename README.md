![Code is verified](https://github.com/jamesnixon197/one-time-pad-encryption/workflows/Code%20verification/badge.svg?branch=main)
# One-Time-Pad encryption method
TypeScript example of how one-time-pad encryption works.

## Note

I just made this to practice cryptography. As much as I have pride in my own work, I'm not sure how secure the random seed generator is, meaning it may be very predictable and easy to hack.

Also, as a one time pad, if you're encrypting a piece of data that is very short the key will also be very short (and easy to break!).

## Set up

To build a new version of the script, run:
`npm run build`

To run all tests, run:
`npm run test`

To run all tests and generate a coverage report, run:
`npm run test:coverage`

To lint all of the code, run:
`npm run lint`

## How to run the script

Once you've cloned down the repository, run:
`npm link`

### Encryption

To encrypt a value and generate a random key run:
`otp-encrypt -e "<plain text>"`

To encrypt a value with your own key (make sure the key is the same length as the plain-text) run:
`otp-encrypt -e "<plain text>" -k "<custom_key>"`

### Decryption

To decrypt a value run:
`otp-encrypt -d "<encrypted_value>" -k "<one-time-pad key>"`

## How it works

The script uses a [**stream cipher**](https://www.youtube.com/watch?v=rAFNmO-4CIA) to encrypt the plain-text data, which you provide.

It works by first splitting up & converting the characters of the plain-text &
one-time-pad key strings, to their relevant decimal `UTF-16` character code. (e.g. q = 113)

Once we have the decimal values of each character, they all get converted, again, to 16-bit binary.

Then, it compares each bit of the plain text & key binary
strings, using the XOR operator (due to the fact that it's perfectly reversible)
to produce new binary strings for each character.

Finally, it converts the new encrypted binary strings back to a Unicode string and encodes it with `Base64` (or else the encrypted value will have a ton of weird characters & new lines)

### Example
Plain Text: `Y` = `89` = `0000000001011001`.
One-Time-Pad key: `u` = `117` = `0000000001110101`

`XOR`'ing the two of them produces:
`0000000000101101`

which is the 16-bit binary for the character '`-`'

### Useful Links

- [XOR Table](https://www.allaboutcircuits.com/textbook/digital/chpt-8/karnaugh-maps-truth-tables-boolean-expressions/)
- [UTF-16 Table](https://asecuritysite.com/coding/asc2)

