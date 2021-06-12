function makeModuleNameMapper(srcPath, tsconfigPath) {
    // Get paths from tsconfig
    const { paths } = require(tsconfigPath).compilerOptions;

    const aliases = {};

    // Iterate over paths and convert them into moduleNameMapper format
    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '/(.*)');
        const path = paths[item][0].replace('/*', '/$1');
        aliases[key] = srcPath + '/' + path;
    });
    return aliases;
}

const TS_CONFIG_PATH = './tsconfig.json';
const SRC_PATH = '<rootDir>/src';

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testPathIgnorePatterns: ['<rootDir>/.next, <rootDir>/node_modules'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
};
