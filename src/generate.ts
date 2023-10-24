import type { QuestionCollection } from 'inquirer'
import { encrypt, decrypt, encodeStr, decodeStr, createSecret, validateLicense } from './encDec'
// 1. 所有的都要进行加解密处理
// 那就是外面的一层需要一个看得到的key去进行加解密
// 然后里面那一层还戴着一个key，解密真正的东西出来

/**
 * @description 加密数据
 *  - 1. 将数据转为JSON字符串
 *  - 2. encode 字符串
 *  - 3. 定制新密钥加密为 value，密钥字段名为 inlineSecret
 *  - 4. encode 加密过一次的数据
 *  - 5. 用最外层的key加密
 * @param {Object} data 需要加密的数据源
 * @param {string} secret 密钥
 * @returns {string} 密文
 */
export function encryptData(data: Object, secret: string): string {
    const inlineSecret = createSecret(`__${secret}__`)
    const encrypted = {
        inlineSecret,
        value: encrypt(encodeStr(JSON.stringify(data)), inlineSecret)
    }
    return encrypt(encodeStr(JSON.stringify(encrypted)), secret)
}

/**
 * @description 解密数据
 *  - 1. 最外层解密获取 inlineSecret 和 value
 *  - 2. 解密value
 *  - 3. decode 和 JSON 格式化出 data
 * @param str 
 * @param secret 
 * @returns 
 */
export function decryptData(str: string, secret: string): any {
    try {
        const { inlineSecret, value } = JSON.parse(decodeStr(decrypt(str, secret)))
        const decrypted = JSON.parse(decodeStr(decrypt(value, inlineSecret)))
        return decrypted
    } catch (error) {
        return undefined
    }
}

export function generateQuestions(appName: string) {
    const secret = '08820fbe381adae5189f0a699c3678ad964261188895a1312f6702b221eb100dca247ec271cfde6f0c02ef9da893cb81a31707cb081ef20aee218c5009aa72461698067520319'
    const questions: QuestionCollection[] = 
    [
        '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'
    ].map(item => {
        const res = JSON.parse(decodeStr(decrypt(item, secret))) as { name: string }
        if (res.name === 'name') {
            return {
                ...res,
                default: appName
            }
        }
        if (res.name === 'lic') {
            return {
                ...res,
                validate: validateLicense
            }
        }
        return res
    })
    return questions
}