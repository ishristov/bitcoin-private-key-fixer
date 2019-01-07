const _ = require('lodash')
const bs58check = require('bs58check')

const Progress = require('../Progress')
const utils = require('../utils')
const { chars, wildcard } = require('../config')

/**
 * Replaces all missing symbols (marked with _ ) with the base58 allowed
 * symbols and checks whether the new private key can generate the
 * public key that is associated with the original private key.
 *
 * Returns the fixed private key or false otherwise.
 *
 * @param {string} publicAddress - the public address associated with
 * the private key in question
 * @param {string} badPrivateKey - the private key that needs fixing
 */

function fixMissing (publicAddress, badPrivateKey) {
  let found = false
  let test = badPrivateKey

  const badChars = _.countBy(badPrivateKey)[wildcard] || 0
  const possibleVariations = Math.pow(58, badChars)
  const progress = new Progress(possibleVariations)

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
        if (bs58check.decodeUnsafe(test) && utils.isRealWIF(publicAddress, test)) {
          found = test
          return false
        }
      }
    })
  }

  utils.log('\n\rMissing symbols: ' + badChars + '. Trying ' + possibleVariations + ' possible combinations.')
  loopIndex(test, badPrivateKey.indexOf(wildcard))
  Progress.clear()

  return found
}

module.exports = fixMissing
