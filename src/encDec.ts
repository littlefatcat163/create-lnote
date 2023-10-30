import CryptoJS from 'crypto-js'
import _ from 'lodash'
import { randomRange } from './utils'
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
    return encrypted
}

export function decrypt(str: string, secret: string): string {
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

export function createSecret(str?: string, val: number = Date.now()) {
    return (
        CryptoJS.SHA512(
            CryptoJS.SHA384(
                CryptoJS.SHA256(
                    CryptoJS.SHA3(
                        encodeStr(`${str}+${pkg.name}@////@@@-${val + 1}`)
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

export function randomSecret(str: string) {
    const num = randomRange(1, 1000)
    if (num <= 200) {
        return CryptoJS.SHA1(str).toString()
    }
    if (num <= 400) {
        return CryptoJS.SHA224(str).toString()
    }
    if (num <= 600) {
        return CryptoJS.SHA256(str).toString()
    }
    if (num <= 800) {
        return CryptoJS.SHA3(str).toString()
    }
    if (num <= 1000) {
        return CryptoJS.SHA384(str).toString()
    }
    return CryptoJS.SHA512(str).toString()
}
