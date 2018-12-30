const _ = require('lodash')
const bs58 = require('bs58')
const bs58check = require('bs58check')

const Progress = require('../Progress')
const utils = require('../utils')
const { chars, wildcard } = require('../config')

// We can't calculate the hash/checksum of a base58 key directly.
// The checksum is calculated on the Buffer, not the base58 key,
// so to get its real hash/checksum we must decode the private key
// to become a Buffer, remove last 4 from it and then encode it
// back to a base58 private key so that the hash is encoded too.
function rehashPrivateKey (badPrivateKey) {
  const buffer = bs58.decode(badPrivateKey)
  return bs58check.encode(buffer.slice(0, -4))
}

/**
 * Puts underscores and 1111 at the end of the private key to compensate
 * for the missing symbols. The last 4 symbols are just a hash so
 * we can use 1111. Then starts changing the unterscores with
 * the base58 allowed symbols and recalculates the hash at the end.
 *
 * Returns the fixed private key or false otherwise.
 *
 * @param {string} publicAddress - the public address associated with
 * the private key in question
 * @param {string} badPrivateKey - the private key that needs fixing
 */
function fixMissingEnd (publicAddress, badPrivateKey) {
  const isCompressed = utils.isCompressedWIF(badPrivateKey)
  const pkFullLength = isCompressed ? 52 : 51

  let found = false

  const missingChars = pkFullLength - badPrivateKey.length

  // If only the hash (last 4 symbols) or part of is missing then
  // no brute force is needed and we can just recalculate the hash.
  if (badPrivateKey.length >= (pkFullLength - 4)) {
    utils.log('\n\rMissing symbols: ' + missingChars + '. Calculating new hash and private key.')

    // Put a few 1 (min 1, max 4) at the end of the private key to mimic
    // as a dummy hash so we can safely decode with bs58 without errors.
    badPrivateKey = badPrivateKey + _.repeat('1', missingChars)

    const rehashedPrivateKey = rehashPrivateKey(badPrivateKey)
    if (utils.isRealWIF(publicAddress, rehashedPrivateKey)) {
      found = rehashedPrivateKey
    }
  } else {
    const possibleVariations = Math.pow(58, missingChars - 4)
    const progress = new Progress(possibleVariations)

    utils.log('\n\rMissing symbols: ' + missingChars + '. Trying ' + possibleVariations + ' possible combinations.')

    // Put 1111 at the end to mimic as a dummy hash and fill the other
    // missing symbols with _ so we can have a full 52 length string.
    badPrivateKey = badPrivateKey + _.repeat(wildcard, pkFullLength - 4 - badPrivateKey.length) + '1111'

    let test = badPrivateKey

    // Changes all underscores to all possible symbols and generates a public address
    // to see whether it will match the public address that is provided.
    const loopIndex = function (str, index) {
      _.forEach(chars, (c) => {
        if (found) {
          return false
        }

        test = utils.replaceAt(str, index, c)
        if (~test.indexOf(wildcard)) {
          loopIndex(test, test.indexOf(wildcard))
        } else {
          progress.update()
          test = rehashPrivateKey(test)
          if (utils.isRealWIF(publicAddress, test)) {
            found = test
            return false
          }
        }
      })
    }

    loopIndex(test, badPrivateKey.indexOf(wildcard))
    Progress.clear()
  }

  return found
}

module.exports = fixMissingEnd
