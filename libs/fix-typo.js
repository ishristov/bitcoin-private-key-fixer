const _ = require('lodash')

const utils = require('../utils')
const { chars } = require('../config')

/**
 * Loop through each symbol of the private key, and replace it with
 * all possible 58 symbols and check whether the updated private key
 * can generate the known public address
 *
 * @param {string} publicAddress - the public address associated with
 * the private key in question
 * @param {string} knownPrivateKey - the private key that needs fixing
 */
function fixTypo (publicAddress, knownPrivateKey) {
  let found = false
  let test = knownPrivateKey

  _.forEach(knownPrivateKey, (s, index) => {
    if (found) {
      return false
    }
    test = knownPrivateKey
    _.forEach(chars, (c) => {
      test = utils.replaceAt(test, index, c)
      if (utils.isRealWIF(publicAddress, test)) {
        found = test
        return false
      }
    })
  })

  return found
}

module.exports = fixTypo
