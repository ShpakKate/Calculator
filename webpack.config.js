const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

let mode = 'development'
if (process.env.NODE_ENV === "production") {
    mode = 'production'
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|json|xml|ico|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/dist',
    },
    devtool: 'eval-source-map',
    plugins: [
        /*new CleanWebpackPlugin(),*/
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        
        new CopyPlugin({
            patterns: [
              { from: "src/images", to: "assets" },
            ],
          }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '/dist'),
        },
        liveReload: true,
        hot: false,
        compress: false,
        port: 9000,
        host: '0.0.0.0',
    },
    optimization: {
        minimize: false,
    },
}
