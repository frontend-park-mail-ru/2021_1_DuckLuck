const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry: ["regenerator-runtime/runtime.js", "./ozon/src/main.js"],
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './ozon/src/dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
            test: /\.hbs$/,
            loader: 'handlebars-loader',
            options: {
                helperDirs: [path.join(__dirname, '/ozon/src/utils/hbs-helpers')],
            },
            exclude: /(node_modules)/
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    "plugins": [
                        [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    ],
                }
            }
        }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'bundle.css'}),
        new HtmlWebpackPlugin({inject: true, template: path.join(__dirname, '/ozon/src/index.html')}),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, '/ozon/src/sw.js'),
        }),
    ],
}
