import { encrypt, decrypt } from '../encDec'
import CryptoJS from 'crypto-js'
import type { QuestionCollection } from 'inquirer'
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

    test('questions', () => {
        const questions: QuestionCollection[] = [
            {
                type: 'input',
                name: 'name',
                // 请输入项目名称：
                message: '请输入项目名称：'
            },
            {
                type: 'input',
                name: 'version',
                // 请输入版本号：
                message: '请输入版本号：',
                default: '0.1.0'
            }
        ]

        const fields = questions.map(question => JSON.stringify(question))
        const encryFields = fields.map(item => {
            return encrypt(encodeURIComponent(item), key)
        })
        console.log('key', key)
        expect(encryFields).not.toEqual(fields)
        console.log(encryFields)
    })
})