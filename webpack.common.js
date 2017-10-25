'use strict'

const path = require('path')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const htmls = fs.readdirSync(__dirname + '/src/html').filter((f) => {
    return f.endsWith('.html')
}).map((f) => {
    return f.slice(0, -5)
})

let HTMLPlugins = [] //HTML集合

let Entries = {} //入口文件集合

htmls.forEach((page) => {
    const htmlPlugin = new HtmlWebpackPlugin({
        title: page,
        filename: `html/${page}.html`,
        template: path.resolve(__dirname, `src/html/${page}.html`),
        chunks: [page, 'commons']
    })
    HTMLPlugins.push(htmlPlugin)
    Entries[page] = path.resolve(__dirname, `src/js/entryjs/${page}.js`)
})

module.exports = {
    entry: Entries,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('css/style.css'),
        ...HTMLPlugins
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../',
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }
            }
        ]
    }
}