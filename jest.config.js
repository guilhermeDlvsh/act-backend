/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
    setupFiles: ["dotenv/config"],
    preset: "ts-jest",
    testEnvironment: "node",
  };