module.exports = {
    // 详细模式
    verbose: true,
    // 项目根目录
    roots: ['packages'],
    // 转换
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    // 模块名映射
    moduleNameMapper: {
        '^@curong/(.+)$': '<rootDir>/packages/$1/src'
    },
    // 用 `glob` 模式匹配测试文件
    testMatch: ['**/@(__test?(s)__|test?(s))/*.@(test|spec).*'],
    // 忽略的文件或文件夹
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/.vscode/',
        '/coverage/'
    ],
    // 模块文件扩展名
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'node']
};
