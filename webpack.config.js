const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FontminPlugin = require('fontmin-webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/JS/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: { loader: "babel-loader" },
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    }
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif|ico|svg)$/,
            use: [
                'file-loader?name=./src/images/[name].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: {}
                },
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./src/vendor/[name].[ext]'
        },
        {
            test: /\.css$/i,
            use: [
                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                'postcss-loader'
            ]
        },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'index.[contenthash].css' }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                quality: '95-100'
            }
        }),
        new FontminPlugin({
            autodetect: true,
            glyphs: ['\uf0c8']
        })
    ]
};