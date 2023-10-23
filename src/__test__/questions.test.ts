import { generateQuestions } from '../questions'
import { validateLicense } from '../encDec'

describe('generateQuestions', () => {
    test('appName is test', () => {
        const appName = 'test'
        const tqs = [
            {
                type: 'input',
                name: 'lic',
                message: '请输入授权码：',
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
        ]
        const question = generateQuestions(appName)
        expect(question).toEqual(tqs)
    })
})
