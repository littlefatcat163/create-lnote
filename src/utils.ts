import si from 'systeminformation'
import path from 'path'
import fs from 'fs'
import { generateCache, encryptData, decryptData } from './generate'
import { runtimePaths } from './all'

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

export function cwdCachePaths() {
    const { workingDirname, rootDirname } = runtimePaths()
    const { cacheDirname } = generateCache()
    return [rootDirname, cacheDirname, workingDirname]
}

export function cwdCacheVaild() {
    const cacheFile = path.resolve(...cwdCachePaths())
    if (!fs.existsSync(cacheFile)) {
        return false
    }
    try {
        const res: CacheCwd = decryptData(getCache(cacheFile), CACHE_SECRET)
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
    const paths = cwdCachePaths()
    const cachePaths = [...paths]
    cachePaths.pop()
    const cacheDir = path.resolve(...cachePaths)
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir)
    }
    setCache(path.resolve(...paths), encryptData(data, CACHE_SECRET))
}

export function getCache(cachePath: string) {
    return fs.readFileSync(cachePath, 'utf-8')
}

export function setCache(cachePath: string, value: string) {
    fs.writeFileSync(cachePath, value)
}
