const config = {
  verbose: true,
  preset: 'ts-jest',
  rootDir: '.',
  testMatch: ['**/?(*).(test|spec).+(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testEnvironment: 'jsdom',
  resetMocks: true,
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
module.exports = config;
