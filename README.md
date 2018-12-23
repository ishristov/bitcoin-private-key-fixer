# Bitcoin Private Key Fixer


-> This tool can find a random typo. If the `private key` has 1 symbol that is not correct, the tool will find it and change it to its real value and will restore the original `private key`.

-> It can also find up to 4 missing symbols from the `private key` assuming we know the positions of those missing symbols. It will also work with more than 4 symbols but with each symbol we add we will slow the script ~60 times so it practically becomes useless after the 4th or 5th missing character (depending on your computer).

## Requirements

The script will only work if

1. The `private key` is in a **WIF** compressed format. This is a Wallet Import Format that is 52 characters long (assuming no missing symbols) and should start with `K` or `L`.
2. The `public address` that is associated with the `private key` in question is known and is also in compressed format.

The basic functionality in the popular https://www.bitaddress.org website for generating a single wallet generates the `public address` and the `private key` in those exact formats and they are widely used.

## Usage

If you don't have [Node.js](https://nodejs.org/en/download/) you have to 

### Restore by fixing a single typo

Just pass the known address and the 

### Restore up to 4-5 missing simbols

Put underscore 


