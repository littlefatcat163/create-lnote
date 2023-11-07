jest.mock('lnote-esm', () => ({
    __esModule: true,
    default: () => {},
    getCache: jest.fn(),
    setCache: jest.fn()
}))
