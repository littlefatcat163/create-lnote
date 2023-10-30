import CryptoJS from 'crypto-js'
import { encrypt, decrypt, encodeStr, decodeStr, createSecret, randomSecret } from '../encDec'
import * as utils from '../utils'

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


describe('test randomSecret', () => {
    const _rdm = jest.spyOn(utils, 'randomRange')
    
    test('<= 200', () => {
        const msg = 'msg'
        _rdm.mockReturnValueOnce(1)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA1(msg).toString())

        _rdm.mockReturnValueOnce(200)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA1(msg).toString())

        _rdm.mockReturnValueOnce(201)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA1(msg).toString())
    })

    test('<= 400', () => {
        const msg = 'msg'

        _rdm.mockReturnValueOnce(199)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA224(msg).toString())


        _rdm.mockReturnValueOnce(202)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA224(msg).toString())

        _rdm.mockReturnValueOnce(400)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA224(msg).toString())

        _rdm.mockReturnValueOnce(401)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA224(msg).toString())
    })

    test('<= 600', () => {
        const msg = 'msg'

        _rdm.mockReturnValueOnce(400)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA256(msg).toString())


        _rdm.mockReturnValueOnce(401)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA256(msg).toString())

        _rdm.mockReturnValueOnce(600)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA256(msg).toString())

        _rdm.mockReturnValueOnce(601)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA256(msg).toString())
    })

    test('<= 800', () => {
        const msg = 'msg'

        _rdm.mockReturnValueOnce(600)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA3(msg).toString())


        _rdm.mockReturnValueOnce(601)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA3(msg).toString())

        _rdm.mockReturnValueOnce(800)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA3(msg).toString())

        _rdm.mockReturnValueOnce(801)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA3(msg).toString())
    })

    test('<= 1000', () => {
        const msg = 'msg'

        _rdm.mockReturnValueOnce(800)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA384(msg).toString())


        _rdm.mockReturnValueOnce(801)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA384(msg).toString())

        _rdm.mockReturnValueOnce(1000)
        expect(randomSecret(msg)).toEqual(CryptoJS.SHA384(msg).toString())

        _rdm.mockReturnValueOnce(1001)
        expect(randomSecret(msg)).not.toEqual(CryptoJS.SHA384(msg).toString())
    })
})