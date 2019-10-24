const ExtractTextPlugin = require('extract-text-webpack-plugin');

// importLoader:1 from https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd

module.exports = {
    devtool: 'source-map', // 'cheap-module-eval-source-map'
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract([
                {
                    loader: 'css-loader',
                    options: { importLoaders: 1, sourceMap: true },
                },
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true },
                }]
            )
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract([
                {
                    loader: 'css-loader',
                    options: { importLoaders: 1, sourceMap: true },
                },
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        data: `@import "${__dirname}/../src/static/styles/config/_variables.scss";`,
                        sourceMap: true
                    }
                }]
            )
        }],
    },
    plugins: [
        new ExtractTextPlugin('styles/[name].css')
    ]
};
