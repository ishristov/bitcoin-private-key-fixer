const expect = require('expect')

const fixTypo = require('./fix-typo.js')
const replaceAt = require('../utils').replaceAt

describe('Fix single typo for compressed WIF', () => {
  const publicKey = '1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu'
  const privateKey = 'L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2'

  it('should fix typo in private key', () => {
    expect(fixTypo(publicKey, replaceAt(privateKey, 12, 'V'))).toEqual(privateKey)
  })

  it('should fix typo if it is the first char', () => {
    expect(fixTypo(publicKey, replaceAt(privateKey, 0, 'V'))).toEqual(privateKey)
  })

  it('should fix typo if it is the last char', () => {
    let index = privateKey.length - 1
    expect(fixTypo(publicKey, replaceAt(privateKey, index, 'V'))).toEqual(privateKey)
  })
})

describe('Fix single typo for uncompressed WIF', () => {
  const publicKey = '1LsokirqYNN4ApEV276bLZXFqvFpEo3i1o'
  const privateKey = '5K1mCzSrt59Piqdfe1gByWhxPCjHP5qddwPXkNk9u94nM94ixPF'

  it('should fix typo in private key', () => {
    expect(fixTypo(publicKey, replaceAt(privateKey, 12, 'V'))).toEqual(privateKey)
  })

  it('should fix typo if it is the first char', () => {
    expect(fixTypo(publicKey, replaceAt(privateKey, 0, 'V'))).toEqual(privateKey)
  })

  it('should fix typo if it is the last char', () => {
    let index = privateKey.length - 1
    expect(fixTypo(publicKey, replaceAt(privateKey, index, 'V'))).toEqual(privateKey)
  })
})
