const _ = require('lodash')

const utils = require('../utils')
const { chars, wildcard } = require('../config')

/**
 * Replaces all missing symbols (marked with _ ) with the base58 allowed
 * symbols and checks whether the new private key can generate the
 * public key that is associated with the original private key
 *
 * @param {string} publicAddress - the public address associated with
 * the private key in question
 * @param {string} knownPrivateKey - the private key that needs fixing
 */
function fixMissing (publicAddress, knownPrivateKey) {
  let found = false
  let test = knownPrivateKey

  const badChars = _.countBy(knownPrivateKey)[wildcard] || 0
  const possibleVariations = Math.pow(58, badChars)

  let tries = 0
  let percent

  // When new WIF private keys are being generated, this will update the progress
  // in percents but only when the percent is actially changed.
  const updateProgress = function () {
    tries++
    let currPercent = Math.round(tries / possibleVariations * 100)
    if (percent !== currPercent) {
      percent = currPercent
      printProgress(percent)
    }
  }

  const printProgress = function (progress) {
    utils.clearProgress()
    process.stdout.write('Progress: ' + progress + '%')
  }

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
        updateProgress()
        if (utils.isRealWIF(publicAddress, test)) {
          found = test
          return false
        }
      }
    })
  }

  console.log('\n\rMissing symbols: ' + badChars + '. Trying ' + possibleVariations + ' possible combinations.')
  loopIndex(test, knownPrivateKey.indexOf(wildcard))

  return found
}

module.exports = fixMissing
