import { encrypt, decrypt, encodeStr, decodeStr, createSecret } from '../encDec'

describe('test encrypt and decrypt', () => {
    test('the same secret', () => {
        const secret = 'secret'
        const message = 'message 1-M..@@'
        const encryptedMessage = encrypt(message, secret)
        expect(encryptedMessage).not.toEqual(message)

        const decryptedMessage = decrypt(encryptedMessage, secret)
        expect(decryptedMessage).toEqual(message)
    })

    test('name', () => {
        const key = createSecret()
        const message = '请输入项目名称：'
        const encryptedMessage = encrypt(message, key)
        expect(encryptedMessage).not.toEqual(message)

        const decryptedMessage = decrypt(encryptedMessage, key)
        expect(decryptedMessage).toEqual(message)
    })

    test('encode', () => {
        const key = createSecret()
        const message = '请输入项目名称：'
        const encodeMessage = encodeURIComponent(message)
        const encryptedMessage = encrypt(encodeMessage, key)
        expect(encryptedMessage).not.toEqual(encodeMessage)

        const decryptedMessage = decrypt(encryptedMessage, key)
        expect(decryptedMessage).toEqual(encodeMessage)

        expect(decodeURIComponent(decryptedMessage)).toEqual(message)
    })
})

describe('test encode and decode', () => {
    test('abc123', () => {
        const msg = 'abc123'
        expect(encodeStr(msg)).toEqual(msg)
    })
    test('en and de', () => {
        const msg = '/- ?@中文 ！?'
        const encodedStr = encodeStr(msg)
        const decodedStr = decodeStr(encodedStr)
        expect(encodedStr).not.toEqual(msg)
        expect(decodedStr).toEqual(msg)
    })
})
