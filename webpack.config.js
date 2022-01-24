const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')
const MODE = process.env.NODE_ENV || 'development'

module.exports = {
    entry: {
        'index': `${SRC}/index.js`
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: DIST
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            MODE: JSON.stringify(MODE)
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${SRC}/index.html`
                },
                {
                    from: `${SRC}/assets`,
                    to: `${DIST}/assets`
                }
            ]
        })
    ],
    mode: MODE
}