module.exports = {
    roots: ['packages'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@curong/(.*?)$': '<rootDir>/packages/$1/src'
    },
    testRegex: '((__tests?__|tests?)|[.](test|spec))[.][jt]sx?$',
    testPathIgnorePatterns: ['(packages/.*)?/(node_modules|dist)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
