import * as esm from 'lnote-esm'
import { cwdCacheVaild, updateCwdCache } from '../utils'

describe('test cwd cache', () => {
    const getCache = jest.spyOn(esm, 'getCache')
    test('cache error not found', () => {
        getCache.mockImplementationOnce(() => {
            throw new Error('not found')
        })
        expect(cwdCacheVaild()).toBeFalsy()
    })
    test('cache empty', () => {
        getCache.mockReturnValueOnce('')
        expect(cwdCacheVaild()).toBeFalsy()
    })
    test('the latest', () => {
        const latest = updateCwdCache()
        getCache.mockReturnValueOnce(latest)
        expect(cwdCacheVaild()).toBeTruthy()
    })
    test('99days valid success', () => {
        const latest = updateCwdCache(99)
        getCache.mockReturnValueOnce(latest)
        expect(cwdCacheVaild()).toBeTruthy()
    })
    test('100days valid fail', () => {
        const latest = updateCwdCache(100)
        getCache.mockReturnValueOnce(latest)
        expect(cwdCacheVaild()).toBeFalsy()
        getCache.mockClear()
    })
})