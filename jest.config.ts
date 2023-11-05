import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!src/create-lnote.ts',
    '!src/register-lnote.ts'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'yml'
  ],
  transform: {
    '\\.yml$': 'jest-transform-yaml',
    '^.+\\.tsx?$': ['ts-jest', {
      diagnostics: {
        ignoreCodes: [1343]
      },
      astTransformers: {
        before: [
          {
            path: 'node_modules/ts-jest-mock-import-meta',
            options: {
              metaObjectReplacement: {
                url: 'https://www.url.com'
              }
            }
          }
        ]
      }
    }]
  },
  testTimeout: 10000
}

export default jestConfig