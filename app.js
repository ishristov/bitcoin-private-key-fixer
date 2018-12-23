const _ = require('lodash')
const bitcoin = require('bitcoinjs-lib')
const yargs = require('yargs')
const qrcode = require('qrcode-terminal');

const wildcard = '_'
const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

const argv = yargs
  .options({
    address: {
      demand: true,
      describe: 'The public address that corresponds to the private key',
      string: true
    },
    privateKey: {
      demand: true,
      describe: 'The Bitcoin private key in a WIF (Wallet Import Format) that we need to fix. Should be 52 characters long',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

if (argv.privateKey.length !== 52) {
  console.log('\x1b[31m', '\n\rThe Bitcoin private key must be in a WIF (Wallet Import Format) and should be exactly 52 characters long.\n\rIf you need to restore missing characters, put underscore _ on the position that you are missing a symbol.', '\x1b[0m')
  return
}

const badChars = _.countBy(argv.privateKey)[wildcard] || 0;
const possibleVariations = Math.pow(58, badChars)

let found = false
let test = argv.privateKey

function clearProgress () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
}

function isRealWIF (WIF) {
  try {
    const keyPair = bitcoin.ECPair.fromWIF(WIF)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    return address === argv.address
  } catch (e) {
    return false
  }
}

function replaceAt (string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

if (~argv.privateKey.indexOf(wildcard)) {
  let tries = 0
  let percent

  // When new WIF private keys are being generated, this will update the progress
  // in percents but only when the percent is actially changed.
  const updateProgress = function () {
    tries++
    let currPercent = Math.round(tries/possibleVariations*100)
    if (percent !== currPercent) {
      percent = currPercent
      printProgress(percent)
    }
  }

  const printProgress = function (progress) {
    clearProgress()
    process.stdout.write(progress + '%')
  }

  // Changes all underscores to all possible symbols and generates a public address
  // to see whether it will match the public address that is provided.
  const loopIndex = function (str, index) {
    _.forEach(chars, (c) => {
      if (found) {
        return false
      }
  
      test = replaceAt(str, index, c)
      if (~test.indexOf(wildcard)) {
        loopIndex(test, test.indexOf(wildcard))
      } else {
        updateProgress()
        if (isRealWIF(test)) {
          found = true
          return false
        }
      }
    })
  }

  console.log('\n\rMissing symbols: ' + badChars + '. Trying ' + possibleVariations + ' possible variations...')
  loopIndex(test, argv.privateKey.indexOf(wildcard))
} else {
  if (isRealWIF(test)) {
    console.log('\x1b[33mThe WIF private key that was provided is correct, no changes are needed', '\x1b[0m')
    return
  } else {
    // Trying to fix a private key by altering a single character
    _.forEach(argv.privateKey, (s, index) => {
      if (found) {
        return false
      }
      test = argv.privateKey
      _.forEach(chars, (c) => {
        test = replaceAt(test, index, c)
        if (isRealWIF(test)) {
          found = true
          return false
        }
      })
    })
  }
}

if (found) {
  clearProgress()
  console.log('Bitcoin WIF private key found:', '\x1b[32m', test, '\x1b[0m')
  console.log('\n\r\x1b[35mATTENTION!\x1b[0m As the original WIF private key was found and shown on this device,\n\rit can no longer be considered safe because your computer might be infected with viruses or malwares.')
  console.log('\n\rIn order to secure the funds from this private key, it is recommended to transfer them immediately to another wallet.\n\rTo do so you have to sweep the wallet by scanning the QR code below from almost any Bitcoin wallet app (e.g. Coinomi).\n\r', '\x1b[0m')
  qrcode.generate(test)
} else {
  console.log('\x1b[31m', '\n\rNo WIF private key found that corresponds to the provided public address.', '\x1b[0m')
}

// Private Key WIF Compressed -> L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2
// Bitcoin Address Compressed -> 1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu

// node app.js --address=1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu --privateKey=L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2
// node app.js 1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu L3mopev___jcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2