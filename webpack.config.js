const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'mailtoFixer.js',
        path: path.resolve(__dirname, 'dist'),

    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_fnames: true,
                },
            }),
        ],
    },
};