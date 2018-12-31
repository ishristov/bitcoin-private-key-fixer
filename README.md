# Bitcoin Private Key Fixer

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/ishristov/bitcoin-private-key-fixer.svg?branch=master)](https://travis-ci.org/ishristov/bitcoin-private-key-fixer)

1. This tool can find and fix a random typo. If the `private key` has 1 symbol that is not correct, the tool will find it and change it to its real value and will restore the original `private key`.

2. It can also find up to 4 missing symbols from the `private key` assuming we know the positions of those missing symbols. It will also work with more than 4 symbols but with each symbol we add we will slow the script ~60 times so it practically becomes useless after the 4th or 5th missing character (depending on your computer).

## Important

**-> This is all said below but since people are very cautions and suspicious (as they SHOULD be with such tools) I want to emphasize on it. The only safe way to use the tool is to follow these exact steps**:

Download the code -> turn off your internet -> run the code and find the key -> sweep the private key with a mobile wallet to transfer the funds -> remove the tool (instructions below) -> restart computer -> turn on computer.

**Even if you haven't found the key for some reason, you still have to remove the tool and restart the computer before going back online.**

## Requirements

The script will only work if

1. The `private key` is in a **WIF** compressed format. This is a Wallet Import Format that is 52 characters long (assuming no missing symbols) and should start with `K` or `L`.
2. The `public address` that is associated with the `private key` in question is known and is also in compressed format.

The basic functionality in the popular https://www.bitaddress.org website for generating a single wallet generates the `public address` and the `private key` in those exact formats and they are widely used.

They look like these:

Public address: `1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu`

Private key: `L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2`

## Getting started

If you don't have Node.js you have to [download](https://nodejs.org/en/download/) it and install it first.

Then run the following commands into the `Terminal` (for MacOS) or the `Command Prompt` (for Windows) to download the tool and start playing with it.

```bash
git clone https://github.com/ishristov/bitcoin-private-key-fixer.git
cd bitcoin-private-key-fixer
npm install
```

### Going offline

At this point it would be best to turn off your internet connection and continue offline because your computer might be infected with viruses or malware. It is also recommended to have a mobile Bitcoin wallet nearby so if the private key is indeed recovered, the funds can be immediately transfered to it because the key would no longer be considered safe (some malicious program might intercept it and steal it).

### Restore by fixing a single typo

To fix a typo in the private key, replace the `{PUBLIC_ADDRESS}` and the `{PRIVATE_KEY}` with your known `public address` and your broken `private key` and run the command in the `Terminal`.

```bash
node app.js --publicAddress={PUBLIC_ADDRESS} --privateKey={PRIVATE_KEY}
```

For example


```bash
node app.js --publicAddress=1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu --privateKey=L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6ts
```

![privatekeyfound](https://github.com/ishristov/bitcoin-private-key-fixer/blob/master/assets/private-key-found.png)

### Restore up to 4-5 missing simbols

To restore missing characters from the WIF private key, replace the `{PUBLIC_ADDRESS}` and the `{PRIVATE_KEY}` with your known `public address` and your `private key`, put underscore `_` on each position where you are missing a symbol and and run the command in the `Terminal`.

```bash
node app.js --publicAddress={PUBLIC_ADDRESS} --privateKey={PRIVATE_KEY}
```

For example

```bash
node app.js --publicAddress=1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu --privateKey=L3__pev_jjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2
```

![privatekeyprocessing](https://github.com/ishristov/bitcoin-private-key-fixer/blob/master/assets/private-key-processing.png)

### Going back online

If a private key was successfully recovered and the BTC funds were transfered out, it would be best to first delete the tool by running the following comamnd into the Terminal `cd ../ && rm -Rf bitcoin-private-key-fixer` then restart your computer and only then it would be relatively safe to connect back to the internet.

## Contributions
If a private key is successfully restored any donation would be highly appreciated.

:beers: [3CyTvaE9GVYTDZD2wPsyu8aZwTT5u9vfbC](https://www.blockchain.com/btc/address/3CyTvaE9GVYTDZD2wPsyu8aZwTT5u9vfbC)

[![Donation link with qr code](https://blockchain.info/qr?data=3CyTvaE9GVYTDZD2wPsyu8aZwTT5u9vfbC&size=200)](https://www.blockchain.com/btc/address/3CyTvaE9GVYTDZD2wPsyu8aZwTT5u9vfbC)
