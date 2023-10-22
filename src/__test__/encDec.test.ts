import { encrypt, decrypt } from '../encDec'
import CryptoJS from 'crypto-js'
import pkg from '../../package.json'

describe('test encrypt and decrypt', () => {

    const key = CryptoJS.SHA3(`${pkg.name}/${pkg.version}-${Date.now()}`).toString()

    test('the same secret', () => {
        const secret = 'secret'
        const message = 'message 1-M..@@'
        const encryptedMessage = encrypt(message, secret)
        expect(encryptedMessage).not.toEqual(message)

        const decryptedMessage = decrypt(encryptedMessage, secret)
        expect(decryptedMessage).toEqual(message)
    })

    test('name', () => {
        const message = '请输入项目名称：'
        const encryptedMessage = encrypt(message, key)
        expect(encryptedMessage).not.toEqual(message)
        
        const decryptedMessage = decrypt(encryptedMessage, key)
        expect(decryptedMessage).toEqual(message)
    })

    test('encode', () => {
        const message = '请输入项目名称：'
        const encodeMessage = encodeURIComponent(message)
        const encryptedMessage = encrypt(encodeMessage, key)
        expect(encryptedMessage).not.toEqual(encodeMessage)
        
        const decryptedMessage = decrypt(encryptedMessage, key)
        expect(decryptedMessage).toEqual(encodeMessage)

        expect(decodeURIComponent(decryptedMessage)).toEqual(message)
    })

    test('fields', () => {
        const fields = [
            '请输入项目名称：',
            '请输入版本号：'
        ]
        const encryFields = fields.map(item => {
            return encrypt(encodeURIComponent(item), key)
        })
        console.log('key', key)
        expect(encryFields).not.toEqual(fields)
        console.log(encryFields)
    })
})