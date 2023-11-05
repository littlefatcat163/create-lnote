import * as all from '../all'
import { cwdCacheVaild, updateCwdCache } from '../utils'

describe('test cwd cache', () => {
    const runtimePaths = jest.spyOn(all, 'runtimePaths')
    test('empty', () => {
        runtimePaths.mockReturnValueOnce({
            workingDirname: '_my',
            rootDirname: ''
        })
        expect(cwdCacheVaild()).toBeFalsy()
    })
    test('the latest', () => {
        runtimePaths.mockReturnValue({
            workingDirname: 'latest',
            rootDirname: ''
        })
        expect(updateCwdCache()).toBeUndefined()
        expect(cwdCacheVaild()).toBeTruthy()
    })
    test('99days valid success', () => {
        runtimePaths.mockReturnValue({
            workingDirname: 'near',
            rootDirname: ''
        })
        expect(updateCwdCache(99)).toBeUndefined()
        expect(cwdCacheVaild()).toBeTruthy()
    })
    test('100days valid fail', () => {
        runtimePaths.mockReturnValue({
            workingDirname: 'out',
            rootDirname: ''
        })
        expect(updateCwdCache(100)).toBeUndefined()
        expect(cwdCacheVaild()).toBeFalsy()
        runtimePaths.mockClear()
    })
})