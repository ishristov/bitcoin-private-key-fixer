const expect = require('expect')

const fixMissingEnd = require('./fix-missing-end')

describe('Fix missing symbols at the end of a WIF compressed private key', () => {
  const publicKey = '1CjV8fZz6R8LTwFaAsRUwWFEJbtEXQp7iu'
  const privateKey = 'L3mopevKjjjcy2mqVbcHs2zWwoujMRpzRyN6mpidwdqmMPmqc6t2'

  it('should recover private key when missing last 1 character', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -1))).toEqual(privateKey)
  })

  it('should recover private key when missing last 2 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -2))).toEqual(privateKey)
  })

  it('should recover private key when missing last 3 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -3))).toEqual(privateKey)
  })

  it('should recover private key when missing last 4 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -4))).toEqual(privateKey)
  })

  it('should recover private key when missing last 5 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -5))).toEqual(privateKey)
  })

  it('should recover private key when missing last 6 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -6))).toEqual(privateKey)
  })
})

describe('Fix missing symbols at the end of a WIF uncompressed private key', () => {
  const publicKey = '1LsokirqYNN4ApEV276bLZXFqvFpEo3i1o'
  const privateKey = '5K1mCzSrt59Piqdfe1gByWhxPCjHP5qddwPXkNk9u94nM94ixPF'

  it('should recover private key when missing last 1 character', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -1))).toEqual(privateKey)
  })

  it('should recover private key when missing last 2 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -2))).toEqual(privateKey)
  })

  it('should recover private key when missing last 3 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -3))).toEqual(privateKey)
  })

  it('should recover private key when missing last 4 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -4))).toEqual(privateKey)
  })

  it('should recover private key when missing last 5 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -5))).toEqual(privateKey)
  })

  it('should recover private key when missing last 6 characters', () => {
    expect(fixMissingEnd(publicKey, privateKey.slice(0, -6))).toEqual(privateKey)
  })
})
