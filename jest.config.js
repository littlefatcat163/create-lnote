/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.mts',
    '!**/node_modules/**'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'mts',
    'yml'
  ],
  transform: {
    '\\.yml$': 'jest-transform-yaml'
  }
};