const path = require('path')
            // loader: __dirname + "/../../?helperDirs[]=" + __dirname + "/helpers",

console.log("DIR IS" + __dirname)
module.exports = {
    entry: ["regenerator-runtime/runtime.js", "./ozon/src/main.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './ozon/src/dist'),
    },
    module: {
        rules: [ {
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
    }
}