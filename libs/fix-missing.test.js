const expect = require('expect')
const fixMissing = require('./fix-missing.js')
const replaceAt = require('../utils').replaceAt

describe('Fix missing symbols at known positions for compressed WIF', () => {
  const publicKey = '1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu'
  const privateKey = 'L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2'

  it('should fix one missing char in private key', () => {
    expect(fixMissing(publicKey, replaceAt(privateKey, 23, '_'))).toEqual(privateKey)
  })

  it('should fix two missing chars in private key', () => {
    let badPrivateKey = replaceAt(privateKey, 18, '_')
    badPrivateKey = replaceAt(badPrivateKey, 46, '_')
    expect(fixMissing(publicKey, badPrivateKey)).toEqual(privateKey)
  })

  it('should fix two consecutive chars', () => {
    let badPrivateKey = replaceAt(privateKey, 2, '_')
    badPrivateKey = replaceAt(badPrivateKey, 3, '_')
    expect(fixMissing(publicKey, badPrivateKey)).toEqual(privateKey)
  })
})

describe('Fix missing symbols at known positions for uncompressed WIF', () => {
  const publicKey = '1LsokirqYNN4ApEV276bLZXFqvFpEo3i1o'
  const privateKey = '5K1mCzSrt59Piqdfe1gByWhxPCjHP5qddwPXkNk9u94nM94ixPF'

  it('should fix one missing char in private key', () => {
    expect(fixMissing(publicKey, replaceAt(privateKey, 23, '_'))).toEqual(privateKey)
  })

  it('should fix two missing chars in private key', () => {
    let badPrivateKey = replaceAt(privateKey, 18, '_')
    badPrivateKey = replaceAt(badPrivateKey, 46, '_')
    expect(fixMissing(publicKey, badPrivateKey)).toEqual(privateKey)
  })

  it('should fix two consecutive chars', () => {
    let badPrivateKey = replaceAt(privateKey, 2, '_')
    badPrivateKey = replaceAt(badPrivateKey, 3, '_')
    expect(fixMissing(publicKey, badPrivateKey)).toEqual(privateKey)
  })
})
