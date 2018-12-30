const yargs = require('yargs')

const utils = require('./utils')
const { wildcard } = require('./config')
const fixTypo = require('./libs/fix-typo')
const fixMissing = require('./libs/fix-missing')

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
  if (argv.privateKey.length !== 52) {
    console.log('\x1b[31m', '\n\rThe Bitcoin private key must be in a WIF (Wallet Import Format) and should be exactly 52 characters long.\n\rIf you need to restore missing characters, put underscore _ on the position that you are missing a symbol.', '\x1b[0m')
  } else {
    let found = false

    if (~argv.privateKey.indexOf(wildcard)) {
      found = fixMissing(argv.publicAddress, argv.privateKey)
    } else {
      found = fixTypo(argv.publicAddress, argv.privateKey)
    }

    if (found) {
      utils.clearProgress()
      utils.printPrivateKey(found)
    } else {
      console.log('\x1b[31m', '\n\rNo WIF private key found that corresponds to the provided public address.', '\x1b[0m')
    }
  }
}
