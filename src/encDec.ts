#!/usr/bin/env node

import CryptoJS from 'crypto-js'

/**
 * 加密
 * @param {string} str 需要加密的数据
 * @param {string} secret 密钥
 * @returns
 */
export function encrypt(str: string, secret: string): string {
    return CryptoJS.AES.encrypt(str, secret).toString()
}

/**
 * 解密
 * @param {string} str 需要解密的数据
 * @param {string} secret 密钥
 * @returns
 */
export function decrypt(str: string, secret: string): string {
    return CryptoJS.AES.decrypt(str, secret).toString(CryptoJS.enc.Utf8)
}