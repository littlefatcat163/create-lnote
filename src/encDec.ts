import CryptoJS from 'crypto-js'
import _ from 'lodash'
import { randomRange, pcInfo } from './utils'
import pkg from '../package.json'

const cryptTime = 4
type EnOrDec = {
    s: string
    n: string
}
export function encrypt(str: string, secret: string): string {
    let encrypted = str
    for (let i = 1, n = Date.now(); i <= cryptTime; i++, n--) {
        const key = i === cryptTime ? secret : `${secret}.~-.${n}`
        encrypted = CryptoJS.AES.encrypt(
            JSON.stringify({ s: encrypted, n }),
            key
        ).toString()
    }
    // return CryptoJS.AES.encrypt(str, secret).toString()
    return encrypted
}

export function decrypt(str: string, secret: string): string {
    // return CryptoJS.AES.decrypt(str, secret).toString(CryptoJS.enc.Utf8)
    let decrypted = str
    let key = secret
    for (let i = 0; i < cryptTime; i++) {
        decrypted = CryptoJS.AES.decrypt(decrypted, key).toString(
            CryptoJS.enc.Utf8
        )
        try {
            const { s, n } = JSON.parse(decrypted) as EnOrDec
            decrypted = s
            key = `${secret}.~-.${n + 1}`
        } catch (error) {
            break
        }
    }
    return decrypted
}

export function encodeStr(str: string) {
    return encodeURIComponent(encodeURIComponent(encodeURIComponent(str)))
}

export function decodeStr(str: string) {
    return decodeURIComponent(decodeURIComponent(decodeURIComponent(str)))
}

export function createSecret(str?: string) {
    const val = Date.now()
    return (
        CryptoJS.SHA512(
            CryptoJS.SHA384(
                CryptoJS.SHA256(
                    CryptoJS.SHA3(
                        encodeStr(
                            `${str}+${pkg.name}/${pkg.version}-${val + 1}`
                        )
                    ).toString() +
                        (val + 2)
                ).toString() +
                    (val + 3)
            ).toString() +
                (val + 4)
        ).toString() +
        (val + 5)
    )
}

export async function licenseKey() {
    const { serial } = await pcInfo()
    const signature = decrypt(
        'U2FsdGVkX190kwsfGz2+JIFA/MeJOS8MUGqVlPgaY8hFdNdvJr3qIrJM0L6HKAdm4gLLCZjueExfNvs19B7HTdMlO/mYXYj9F8UV00mb21QwQsv+FaMpJ81PdEiSi7/GBGwFOvMsgH8pr48fBXdWw5YYIHDgIs3KCbXG1LGDMyxuid/rkZcJY0y9iaCXQICyfmteFwF2rR5U/JRO1vCtEvTwEv/Q/jj68j9jlwQVEOxzjvIavj/PYkKVLSeYxfj4NnNsdiGNCpgYHhwMQ+rHAzPBfCUtGnKnPChELAL8//MQ3ZO23NTMIRposC4zrb8cUoO6ipSjTI2Zyxaqd293k5XDIXLEaRmIuuYUNt7sk759ndmEt0838bszGswGaMynJ560y1r7khJj83/Y5xXAln0agz1nyEMT/nes6jme57+fpAso5O5PLldNCvE4xyQzl9gXCNopmkashMhzbU8WpJnlvmM7G2iy8E9SwKW+oKVawyw2cipT6r5z0Z9Fr8A8bzN0KWdqtqlW3LeV1FZ1MRSVWnJXlUIGbuN2lGt3uyJkdudaNKe+sg1Ntxli/XzDnr8UqifmV3fmRM5pK1nTCOG0wnMToJp/LbeZ+M2MMq3nzoyiuY+kZH+nJfKxtLhCf2+gru3luMd6f4kr70cbSG98iDvxVz+aLQWSHJvI5XnS0pNmBAnd+xpHUNl80J2tnqSszyraIN83a3Jo3ySN1eJzhHejM/GR+qNECaNB7nT+Ha4h/dI40+27DCAUcqK8hr0hPzBJwBxeP354tOMHaZQz6rwJA94remhoLFV+/IWiIkV/pZWeJATLv076Wv/wVmivn2X/UtqKwPtz5TbhqFO9A8RUvt0GDcxpcBqHC9gzqKLDRS6JhquIkqJkCCaF',
        'b8b5fd77357b134cd01eb97df8f6e37f623b98fd8aa0393be7c648d1f2d92064ccbfcaa6cba7d602291e473a3fc9b7f77614cbf368765d0903a71ec9d8a429331698063848184'
    )
    const hash = CryptoJS.SHA256(`${serial}@@0ooO..@${signature}`).toString()
    const chunks = hash.match(/.{1,5}/g)
    return chunks?.join('-')
}

export function validateLicense(input?: string): Promise<boolean|string> {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(input)) {
            reject('请输入注册码')
            return
        }
        setTimeout(async () => {
            const lic = await licenseKey()
            if (lic === input) {
                resolve(true)
            } else {
                reject('无效授权码，请重新注册')
            }
        }, randomRange(1, 4) * 1000)
    })
}
