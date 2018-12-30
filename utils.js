const bitcoin = require('bitcoinjs-lib')

function isCompressedWIF (privateKey) {
  if (privateKey.length === 52) {
    return true
  }

  if (privateKey.length === 51) {
    return privateKey.charAt(0) !== '5'
  }

  if (privateKey.length < 51) {
    return privateKey.charAt(0) !== '5'
  }
}

function isRealWIF (publicAddress, WIF) {
  try {
    const keyPair = bitcoin.ECPair.fromWIF(WIF)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    return address === publicAddress
  } catch (e) {
    return false
  }
}

function log (msg) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(msg)
  }
}

function replaceAt (string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1)
}

module.exports = {
  isCompressedWIF: isCompressedWIF,
  isRealWIF: isRealWIF,
  log: log,
  replaceAt: replaceAt
}
