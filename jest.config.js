/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    moduleDirectories: ['node_modules', 'src'],
    setupFiles: ['<rootDir>/src/__tests__/jest.setup.ts'],
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'identity-obj-proxy',
    },
    testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
};
