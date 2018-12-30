const yargs = require('yargs')
const qrcode = require('qrcode-terminal')

const utils = require('./utils')
const { wildcard } = require('./config')
const fixTypo = require('./libs/fix-typo')
const fixMissing = require('./libs/fix-missing')
const fixMissingEnd = require('./libs/fix-missing-end')

function printPrivateKey (privateKey) {
  console.log('Bitcoin WIF private key found:', '\x1b[32m', privateKey, '\x1b[0m')
  console.log('\n\r\x1b[35mATTENTION!\x1b[0m As the original WIF private key was found and shown on this device,\n\rit can no longer be considered safe because your computer might be infected with viruses or malwares.')
  console.log('\n\rIn order to secure the funds from this private key, it is recommended to transfer them immediately to another wallet.\n\rTo do so you have to sweep the wallet by scanning the QR code below from almost any Bitcoin wallet app (e.g. Coinomi).\n\r', '\x1b[0m')
  qrcode.generate(privateKey)
}

const argv = yargs
  .options({
    publicAddress: {
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

if (utils.isRealWIF(argv.publicAddress, argv.privateKey)) {
  console.log('\x1b[33mThe WIF private key that was provided is correct, no changes are needed.', '\x1b[0m')
} else {
  if (argv.privateKey.length > 52) {
    console.log('\x1b[31m', '\n\rThe Bitcoin private key must be in a WIF (Wallet Import Format) and cannot be more than 52 characters long.', '\x1b[0m')
  } else {
    let found = false

    const pkFullLength = utils.isCompressedWIF(argv.privateKey) ? 52 : 51

    if (argv.privateKey.length < pkFullLength) {
      found = fixMissingEnd(argv.publicAddress, argv.privateKey)
    } else if (~argv.privateKey.indexOf(wildcard)){
      found = fixMissing(argv.publicAddress, argv.privateKey)
    } else {
      found = fixTypo(argv.publicAddress, argv.privateKey)
    }

    if (found) {
      printPrivateKey(found)
    } else {
      console.log('\x1b[31m', '\n\rNo WIF private key found that corresponds to the provided public address.', '\x1b[0m')
    }
  }
}
