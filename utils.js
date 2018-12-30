const bitcoin = require('bitcoinjs-lib')
const qrcode = require('qrcode-terminal')

function isRealWIF (publicAddress, WIF) {
  try {
    const keyPair = bitcoin.ECPair.fromWIF(WIF)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    return address === publicAddress
  } catch (e) {
    return false
  }
}

function printPrivateKey (privateKey) {
  console.log('Bitcoin WIF private key found:', '\x1b[32m', privateKey, '\x1b[0m')
  console.log('\n\r\x1b[35mATTENTION!\x1b[0m As the original WIF private key was found and shown on this device,\n\rit can no longer be considered safe because your computer might be infected with viruses or malwares.')
  console.log('\n\rIn order to secure the funds from this private key, it is recommended to transfer them immediately to another wallet.\n\rTo do so you have to sweep the wallet by scanning the QR code below from almost any Bitcoin wallet app (e.g. Coinomi).\n\r', '\x1b[0m')
  qrcode.generate(privateKey)
}

function replaceAt (string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1)
}

function clearProgress () {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
}

module.exports = {
  clearProgress: clearProgress,
  isRealWIF: isRealWIF,
  printPrivateKey: printPrivateKey,
  replaceAt: replaceAt
}
