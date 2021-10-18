module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    'lib/shared/models/test.ts'
  ],
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
