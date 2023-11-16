import * as esm from 'lnote-esm'
import { cwdCacheVaild, updateCwdCache, validateLicenseFormat } from '../utils'

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

describe('test validateLicenseFormat', () => {
    test('success', () => {
        expect(
            validateLicenseFormat(
                '777cf-48349-8125c-7ca1c-0816d-1dd96-feb84-ca137-cd074-348e5-d5fcc-966f2-638a'
            )
        ).toBeTruthy()
        expect(
            validateLicenseFormat(
                'dc2c4-6d913-25d7a-87e77-8e443-08b32-57a98-9e9c3-d0921-cf700-36b8d-17473-0a1d'
            )
        ).toBeTruthy()
    })
    test('fail', () => {
        expect(validateLicenseFormat('')).toBeFalsy()
        expect(validateLicenseFormat('xxxx-')).toBeFalsy()
        expect(validateLicenseFormat('xxx-xxxxx')).toBeFalsy()
        expect(validateLicenseFormat('xxx@-xxxxx')).toBeFalsy()
    })
})
