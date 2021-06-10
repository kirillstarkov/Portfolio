const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "/src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./index.html"),
            filename: "index.html",
            minify: false
        }),
    ],
    // module: {
        // loaders: [
        //     {
        //         test: /\.css$/,
        //         loader: 'style!css'
        //     }
        // ]
        // rules: [
        //     {
        //         test: /\.(ts|tsx)?$/,
        //         loader: 'ts-loader',
        //         include: path.resolve(__dirname, "/src"),
                
        //     }
        // ]
    // },
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        port: 4200,
        liveReload: true,
        open: true,
    }
}