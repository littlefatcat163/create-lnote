import { encrypt, decrypt, encodeStr, decodeStr, createSecret, licenseKey, validateLicense } from '../encDec'
import type { QuestionCollection } from 'inquirer'
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

describe('test licensekey', () => {
    test('create', async () => {
        const lic1 = await licenseKey()
        const lic2 = await licenseKey()
        expect(lic1).toBe(lic2)
    })
    test('diffect pc serial', async () => {
        const _pci = jest.spyOn(utils, 'pcInfo')
        _pci.mockResolvedValueOnce({serial: '0000-0000'})

        const lic1 = await licenseKey();

        _pci.mockResolvedValueOnce({serial: '12345-xxxxx-00000'})
        const lic2 = await licenseKey()

        _pci.mockClear()
        expect(lic1).not.toBe(lic2)
    })
})

describe('test validateLicense', () => {
    test('license is empty', async () => {
        await expect(validateLicense()).rejects.not.toBeNull()
    })
    test('license is invalid', async () => {
        await expect(validateLicense('b8b5fd77357b134cd01eb97df8f6e37f623b98fd8aa0393be7c648d1f2d92064ccbfcaa6cba7d602291e473a3fc9b7f77614cbf368765d0903a71ec9d8a429331698063848184')).rejects.not.toBeNull()
    })
    test('license success', async () => {
        const _pci = jest.spyOn(utils, 'pcInfo')
        _pci.mockResolvedValue({serial: '00330-X0000-00000-XXXXX'})
        const lic = await licenseKey()
        await expect(validateLicense(lic)).resolves.toBeTruthy()
        _pci.mockClear()
    })
})

describe('target generate', () => {
    test('signature', () => {
        const key = createSecret('@littlefatcat_0.oO!')
        const signature = encrypt(createSecret('littlefatcat@163.com~gmail.com'), key)
        /* console.log('signature is ')
        console.log(key)
        console.log(signature) */
        expect(signature).not.toEqual(key)
    })
    test('questions', () => {
        const key = createSecret()
        const questions: QuestionCollection[] = [
            {
                type: 'input',
                name: 'lic',
                // 请输入授权码：
                message: '请输入授权码：',
            },
            {
                type: 'input',
                name: 'name',
                // 请输入项目名称：
                message: '请输入项目名称：',
            },
            {
                type: 'input',
                name: 'version',
                // 请输入版本号：
                message: '请输入版本号：',
                default: '0.1.0',
            },
        ]

        const fields = questions.map((question) => JSON.stringify(question))
        const encryFields = fields.map((item) => {
            return encrypt(encodeStr(item), key)
        })
        
        expect(encryFields).not.toEqual(fields)
        /* console.log('question is: ')
        console.log(key)
        console.dir(encryFields) */
    })
})