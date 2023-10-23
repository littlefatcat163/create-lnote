/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!src/create-lnote.ts'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'yml'
  ],
  transform: {
    '\\.yml$': 'jest-transform-yaml'
  },
  testTimeout: 10000
}