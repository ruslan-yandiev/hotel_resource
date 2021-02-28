const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpmizeCssAssetWebpackPligin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV:', isDev);
const PUG_PAGES_PATH = path.resolve(__dirname, 'src/pug/pages');

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProd) {
        config.minimizer = [new OpmizeCssAssetWebpackPligin(), new TerserWebpackPlugin()];
    }

    return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const plugins = () => {
    const basePlugins = [
        // new BundleAnalyzerPlugin(), // пока закоментируем чтобы не мешал
        new HtmlWebpackPlugin({
            template: `${PUG_PAGES_PATH}/index.pug`,
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: 'new-index.html',
            template: `${PUG_PAGES_PATH}/new-index.pug`,
            inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `styles/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, './src/assets'), to: path.resolve(__dirname, 'dist') }],
        }),
    ];

    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),

    mode: 'development',

    entry: {
        main: ['@babel/polyfill', './javascript/index.js'],
        analytics: './javascript/analytics.js',
        testing_bable_code: './javascript/testing_bable.js',
    },

    optimization: optimization(),

    devtool: isDev ? 'source-map' : false,

    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: ['.js', '.json'],

        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@img': path.resolve(__dirname, 'src/assets/img'),
        },
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        port: 3000,
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,

                exclude: /node_modules/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },

            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },

            {
                test: /\.css$/,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ['file-loader'],
            },

            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: ['file-loader'],
            },
        ],
    },

    plugins: plugins(),
};
