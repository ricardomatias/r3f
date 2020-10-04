const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
    mode: 'development',
    // Enable sourcemaps for debugging webpack's output.
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: './src/index.tsx',
    output: {
        path: path.resolve('public'),
        filename: '[name].js',
        pathinfo: true
    },
    devtool: false,
    stats: {
        warnings: false
    },
    devServer: {
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(tsx|js|ts)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css)?$/,
                include: APP_DIR,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: /(vendor|polyfills|worker)\.js/,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ title: 'React Three Fiber', template: './src/index.html' }),
    ]
};
