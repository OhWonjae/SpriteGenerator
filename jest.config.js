const config = {
  verbose: true,
  rootDir: '.',
  testMatch: ['**/?(*).(test|spec).+(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testEnvironment: 'jsdom',
  resetMocks: true,
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/mocks/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/mocks/styleMock.ts',
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/mocks/fileMock.ts',
    '@/(.*)': '<rootDir>/src/$1',
  },
};
module.exports = config;
