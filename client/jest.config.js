module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'],
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  setupFiles: ['./src/setupTests.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '/axios/': 'axios/dist/node/axios.cjs',
    consts: '<rootDir>/src/consts',
    components: '<rootDir>/src/components',
    api: '<rootDir>/src/api',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageReporters: ['lcov', 'text'],
};
