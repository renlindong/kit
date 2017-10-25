'use strict'

const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(commonConfig, {
    plugins: [
        new UglifyJSPlugin()
    ]
})