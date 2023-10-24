import { encrypt, encodeStr, createSecret } from '../encDec'
import type { QuestionCollection } from 'inquirer'
import { encryptData, decryptData } from '../generate'

describe('test generate', () => {
    test('encrypt data and decrypt', () => {
        const key = createSecret()
        const data = {
            one: 1,
            arr: ['today', '---']
        }
        const str = encryptData(data, key)
        const decrypted = decryptData(str, key)
        expect(decrypted).toEqual(data)
    })
})

describe('target generate', () => {
    test('signature', () => {
        const key = createSecret('what.question@littlefatcat_0.oO!Lan~mxb..()^^^$$*gmail.163.qq.com')
        const signature = encrypt(createSecret('飞雷神之术@littlefatcat@163.com~gmail.com'), key)
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