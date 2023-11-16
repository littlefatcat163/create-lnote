import si from 'systeminformation'
import { generateCache, encryptData, decryptData } from './generate'
import { getCache, setCache } from 'lnote-esm'

export function randomRange(min: number = 1, max: number = 10) {
    return Math.floor(Math.random() * (max - min)) + 1
}

export async function pcInfo() {
    const { serial } = await si.osInfo()
    return { serial }
}

const CACHE_SECRET =
    '95534e76903bc15b57b2794a6eeb34ad37396233d4feeab0ef96311cd0bdb0887b713fd28284a4de6c3f2d1965b5626e509f54075968eeb06008edd831d3afc41699205850437'

type CacheCwd = {
    lastCheckTime: number
    cacheDays: number
}

export function cwdCacheVaild() {
    try {
        const res: CacheCwd = decryptData(getCache(), CACHE_SECRET)
        const { cacheDays, lastCheckTime } = res
        const cacheTime = cacheDays * 24 * 60 * 60 * 1000
        if (Date.now() - lastCheckTime <= cacheTime) {
            return true
        }
    } catch (error) {
        return false
    }
    return false
}

export function updateCwdCache(beforeDays = 0) {
    const { days } = generateCache()
    const data: CacheCwd = {
        lastCheckTime: Date.now() - beforeDays * 24 * 60 * 60 * 1000,
        cacheDays: days,
    }
    const value = encryptData(data, CACHE_SECRET)
    setCache(value)
    return value
}

export function validateLicenseFormat(value: string) {
    return /^([a-zA-Z0-9]{5}-){1,}[a-zA-Z0-9]{1,5}$/.test(value)
}
