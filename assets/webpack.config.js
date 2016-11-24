var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LiveReloadPlugin = require('webpack-livereload-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');

var tasks = [];

tasks.push({

    context: __dirname + '/',

    entry: {

        plates: [
            './src/plates/plates.scss',
        ]
    },

    output: {
        path: BUILD_DIR,
        filename: '[name]/[name].js'
    },

    externals: {
        "jquery": "jQuery"
    },

    module: {
        loaders: [
            {test: /\.js?/, include: path.resolve(__dirname, 'src'), loader: 'babel', query: {presets: ['es2015'], plugins: ['transform-object-rest-spread']}},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")}
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.DefinePlugin({'process.env':{'NODE_ENV': JSON.stringify('production')}}),
        new ExtractTextPlugin("src/[name]/[name].css", {
            allChunks: true
        }),

        new LiveReloadPlugin()
    ]
});


module.exports = tasks;