import { createSecret } from '../encDec'
import type { QuestionCollection } from 'inquirer'
import {
    encryptData,
    decryptData,
    generateSignature,
    generateAdminAuthCode,
    generateRegisterQuestions,
    generateCreateQuestions,
    validateLicense,
    validateAdmin,
    licenseKey,
    createAppWording
} from '../generate'
import * as utils from '../utils'

describe('test generate', () => {
    test('encrypt data and decrypt', () => {
        const key = createSecret()
        const data = {
            one: 1,
            arr: ['today', '---'],
        }
        const str = encryptData(data, key)
        const decrypted = decryptData(str, key)
        expect(decrypted).toEqual(data)
    })

    test('generateSignature', () => {
        const sign = generateSignature()
        expect(sign).not.toBeUndefined()
    })

    test('generateAdminAuthCode', () => {
        const code = generateAdminAuthCode()
        const signature = createSecret(createSecret('xxxxxx', 0), 0)
        expect(code).not.toEqual(signature)
    })

    test('generateRegisterQuestions', () => {
        const questions: QuestionCollection[] = [
            {
                type: 'password',
                name: 'password',
                message: '请管理员输入授权码：',
                validate: validateAdmin
            },
        ]
        expect(generateRegisterQuestions()).toEqual(questions)
    })

    test('generateCreateQuestions', () => {
        const appName = 'test'
        const tqs = [
            {
                type: 'input',
                name: 'lic',
                message: '请输入注册码：',
                validate: validateLicense,
            },
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称：',
                default: 'test',
            },
            {
                type: 'input',
                name: 'version',
                message: '请输入版本号：',
                default: '0.1.0',
            },
            {
                type: 'list',
                name: 'theme',
                message: '请选择主题：',
                choices: ['auto', 'light', 'dark']
            }
        ]
        expect(generateCreateQuestions(appName)).toEqual(tqs)
    })

    test('createAppWording', () => {
        const warnings = {
            appNameEmpty: '请输入目录名',
            done: '创建成功!!!',
            confName: '_config.yml',
            confUrl: 'https://my.domain.org',
            themeConfName: '_config.lfluid.yml'
        }
        expect(createAppWording()).toEqual(warnings)
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
        _pci.mockResolvedValueOnce({ serial: '0000-0000' })

        const lic1 = await licenseKey()

        _pci.mockResolvedValueOnce({ serial: '12345-xxxxx-00000' })
        const lic2 = await licenseKey()

        _pci.mockClear()
        expect(lic1).not.toBe(lic2)
    })
})

describe('test validateLicense', () => {
    test('license is empty', async () => {
        await expect(validateLicense()).rejects.not.toBeUndefined()
    })
    test('license is invalid', async () => {
        await expect(
            validateLicense(
                'b8b5fd77357b134cd01eb97df8f6e37f623b98fd8aa0393be7c648d1f2d92064ccbfcaa6cba7d602291e473a3fc9b7f77614cbf368765d0903a71ec9d8a429331698063848184'
            )
        ).rejects.not.toBeUndefined()
    })
    test('license success', async () => {
        const _pci = jest.spyOn(utils, 'pcInfo')
        _pci.mockResolvedValue({ serial: '00330-X0000-00000-XXXXX' })
        const lic = await licenseKey()
        await expect(validateLicense(lic)).resolves.toBeTruthy()
        _pci.mockClear()
    })
})

describe('test validateAdmin code', () => {
    test('code is empty', async () => {
        await expect(validateAdmin()).rejects.toBe('请输入管理员授权码')
    })
    test('code is invalid', async () => {
        await expect(validateAdmin('xxxxx')).rejects.toBe(
            '无效授权码，请重新输入'
        )
    })
    test('code is success', async () => {
        await expect(validateAdmin('lnote-of-me@what.question.MXB@20231024')).resolves.toBeTruthy()
    })
})

describe('target generate', () => {
    /* test('encryptData inline keyword', () => {
        // encryptData inlineSecret
        const kws = [
            '...你能想象得到吗？',
            '想成功，先发疯，不顾一切向钱充！……',
            '拼一次富永久，世世代代受恩惠',
            '我自己都无法想象！哈哈哈哈@66668888………………',
            '=> 20231024 <='
        ].map(item => createSecret(item))
        const key = createSecret(kws.join('-'))
        const encrypteds = kws.map(item => {
            createSecret(item)
        })
        expect(encrypteds).not.toEqual(kws)
        const againEncrypted = encryptData(encrypteds, key)
        console.log('key', key)
        console.log(againEncrypted)
    }) */
    /* test('signature', () => {
        // generateSignature
        const secret = createSecret('what.question@littlefatcat_0.oO!Lan~mxb..()^^^$$*gmail.163.qq.com')
        const signature = createSecret('飞雷神之术@littlefatcat@163~gmail.com', 20231024)
        const againEncrypted = encryptData([createSecret(signature)], secret)
        expect(signature).not.toEqual(secret)
        console.log('signature is ')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('admin auth code', () => {
        // generateAdminAuthCode
        const secret = createSecret('what.question@littlefatcat_0.oO!Lan~mxb..()^^^$$*gmail.163.qq.com')
        const signature = createSecret('lnote-of-me@what.question.MXB@20231024', 0)
        const againEncrypted = encryptData([createSecret(signature, 0)], secret)
        expect(signature).not.toEqual(secret)
        console.log('admin is ')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('register questions', () => {
        // generateRegisterQuestions
        const secret = createSecret()
        const questions: QuestionCollection[] = [
            {
                type: 'password',
                name: 'password',
                message: '请管理员输入授权码：',
            }
        ]
        const againEncrypted = encryptData(questions, secret)
        expect(againEncrypted).not.toEqual(questions)
        console.log('register questions...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('register validate license', () => {
        // validateLicense
        const secret = createSecret()
        const warnings = [
            '请输入注册码',
            '无效注册码，请重新注册'
        ]
        const againEncrypted = encryptData(warnings, secret)
        expect(againEncrypted).not.toEqual(warnings)
        console.log('register validate license...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('create questions', () => {
        // generateCreateQuestions
        const secret = createSecret()
        const questions: QuestionCollection[] = [
            {
                type: 'input',
                name: 'lic',
                message: '请输入注册码：',
            },
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称：',
            },
            {
                type: 'input',
                name: 'version',
                message: '请输入版本号：',
                default: '0.1.0',
            },
            {
                type: 'list',
                name: 'theme',
                message: '请选择主题：',
                choices: ['auto', 'light', 'dark']
            }
        ]

        const againEncrypted = encryptData(questions, secret)
        expect(againEncrypted).not.toEqual(questions)

        console.log('question is: ')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('register validate admin', () => {
        // validateLicense
        const secret = createSecret()
        const warnings = [
            '请输入管理员授权码',
            '无效授权码，请重新输入'
        ]
        const againEncrypted = encryptData(warnings, secret)
        expect(againEncrypted).not.toEqual(warnings)
        console.log('register validate admin...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
    /* test('create app info', () => {
        // create-lnote.ts
        const secret = createSecret()
        const warnings = {
            appNameEmpty: '请输入目录名',
            done: '创建成功!!!',
            confName: '_config.yml',
            confUrl: 'https://my.domain.org',
            themeConfName: '_config.lfluid.yml'
        }
        const againEncrypted = encryptData(warnings, secret)
        expect(againEncrypted).not.toEqual(warnings)
        console.log('create app info...')
        console.log(secret)
        console.log(againEncrypted)
    }) */
})
