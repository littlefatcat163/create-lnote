const path = require('path')
const ShebangPlugin = require('webpack-shebang-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    target: 'node',
    entry: {
        'create-lnote': './src/create-lnote.ts',
        'register-lnote': './src/register-lnote.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bin'),
        clean: true,
        // libraryTarget: 'module',
        chunkFormat: 'module',
        // module: true,
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    externalsType: 'module',
    externals: {
        // lodash: '_',
        // inquirer: 'inquirer',
        // 'fs-extra': 'fs-extra'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/**/*'],
            verbose: true,
            dry: false
        }),
        new ShebangPlugin()
    ]
}
