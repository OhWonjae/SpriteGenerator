const config = {
  verbose: true,
  rootDir: '.',
  testMatch: ['**/src/**/?(*).(test|spec).+(tsx)'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/mocks/',
  ],
  testEnvironment: 'jsdom',
  resetMocks: true,
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/mocks/setupTests.ts', 'jest-canvas-mock'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/mocks/styleMock.ts',
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/mocks/fileMock.ts',
    '@/(.*)': '<rootDir>/src/$1',
  },
};
module.exports = config;
